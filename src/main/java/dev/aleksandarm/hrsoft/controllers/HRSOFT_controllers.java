package dev.aleksandarm.hrsoft.controllers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.aleksandarm.hrsoft.models.HRSOFT_employee_model;
import dev.aleksandarm.hrsoft.models.HRSOFT_expenses_model;
import dev.aleksandarm.hrsoft.models.HRSOFT_sector_model;
import dev.aleksandarm.hrsoft.repos.HRSOFT_employee_repo;
import dev.aleksandarm.hrsoft.repos.HRSOFT_expenses_repo;
import dev.aleksandarm.hrsoft.repos.HRSOFT_sector_repo;

@CrossOrigin("http://localhost:3000")
@RestController
public class HRSOFT_controllers {
	
	@Autowired
	HRSOFT_employee_repo employee_repo;
	
	@Autowired
	HRSOFT_sector_repo sector_repo;
	
	@Autowired
	HRSOFT_expenses_repo expenses_repo;
	
	@GetMapping(path = "/api/hrsoft/get_sectors",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HRSOFT_sector_model> get_sectors() {
		List<HRSOFT_sector_model> sec = sector_repo.findAll();
		return sec;
	}
	
	@GetMapping(path = "/api/hrsoft/get_employees",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HRSOFT_employee_model> get_employees() {
		List<HRSOFT_employee_model> em = employee_repo.findAll();
		return em;
	}
	
	@GetMapping(path = "/api/hrsoft/employee/terminate",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String employee_terminate(
			@RequestParam("id") Long id) {
		if(employee_repo.existsById(id)) {
			employee_repo.deleteById(id);
			return "Employee successfully terminated.";
		} else {
			return "Employee doesn't exist by that ID.";
		}
	}
	
	@GetMapping(path = "/api/hrsoft/employee/modify",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String employee_modify(
			@RequestParam("id") Long id,
			@RequestParam("sector") String sector) {
		if(employee_repo.existsById(id)) {
			HRSOFT_employee_model emp = employee_repo.getById(id);
			if(emp.getSector().equals(sector)) {
				return "Employee is already on that sector.";
			} else {
				emp.setSector(sector);
				employee_repo.save(emp);
				return "Contract is successfully modified.";
			}
		} else {
			return "Employee doesn't exists by ID.";
		}
	}
	
	@PostMapping(path = "/api/hrsoft/expenses_add",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String expenses_add(
			@RequestBody HRSOFT_expenses_model exp) {
		if(expenses_repo.existsByName(exp.getName())) {
			return "Expense already exists by that name.";
		} else {
			expenses_repo.save(exp);
			return "Expense successfully saved.";
		}
	}
	
	@GetMapping(path = "/api/hrsoft/expenses_remove",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String expenses_remove(
			@RequestParam("name") String name) {
		if(expenses_repo.existsByName(name)) {
			expenses_repo.deleteByName(name);
			return "Expenses successfully deleted.";
		} else {
			return "Expense doesn exist by that name.";
		}
	}
	
	@GetMapping(path = "/api/hrsoft/expenses_list",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HRSOFT_expenses_model> expenses_list() {
		List<HRSOFT_expenses_model> exp = expenses_repo.findAll();
		return exp;
	}
	
	@GetMapping(path = "/api/hrsoft/expenses_calculate",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Integer expenses_calculate(
			@RequestParam("month") Integer month) {
		
		// Get current date as a starting date.
		LocalDate startDate = LocalDate.now();
		if(month != 100) {
			startDate = startDate.withMonth(month);
		}
		
		// Set it to the first day of current month.
		startDate = startDate.withDayOfMonth(1);
		
		// Create end date exactly one month after starting date.
		LocalDate endDate = startDate.plusMonths(1L);
		
		// Set approved working days, aka first five days of week.
		final Set<DayOfWeek> workingDays = Set.of(
				DayOfWeek.MONDAY, DayOfWeek.TUESDAY,
				DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY);
		
		// Get all working days between starting date and ending date.
		List<LocalDate> allDates = startDate.datesUntil(endDate)
				.filter(t -> workingDays.contains(t.getDayOfWeek()))
				.collect(Collectors.toList());
		
		// Get all expenses
		List<HRSOFT_expenses_model> exp = expenses_repo.findAll();
		
		int exp_sum = 0;
		
		// Check if empty.
		if(exp.isEmpty()) {
			return 0;
		}
		
		// Calculate all expenses.
		for(int i = 0; i < exp.size(); i++) {
			exp_sum += exp.get(i).getPrice();
		}
		
		// Get Salaries and sectors
		List<HRSOFT_employee_model> emp = employee_repo.findAll();
		HRSOFT_sector_model sec;
		
		int sal_sum = 0; // Salary sum
		
		// If not empty
		if(emp.isEmpty()) {
			return 0;
		}
		
		// Calculate salaries.
		for(int i = 0; i < emp.size(); i++) {
			sec = sector_repo.findByName(emp.get(i).getSector());
			sal_sum += (((allDates.size() * 8) * sec.getPph()));
		}
		
		exp_sum += sal_sum;
		
		return exp_sum;
	}
	
	@GetMapping(path = "/api/hrsoft/invoice_get",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String invoice_get(
			@RequestParam("id") Long id,
			@RequestParam("month") Integer month) {
		
		if(employee_repo.existsById(id)) {
			//ok
		} else {
			return "Employee by that ID doesn't exist.";
		}
		
		// Get current date as a starting date.
		LocalDate startDate = LocalDate.now();
		startDate = startDate.withMonth(month);
		startDate = startDate.withDayOfMonth(1);
				
		LocalDate endDate = startDate.plusMonths(1L);
				
		final Set<DayOfWeek> workingDays = Set.of(
				DayOfWeek.MONDAY, DayOfWeek.TUESDAY,
				DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY);
				
		List<LocalDate> allDates = startDate.datesUntil(endDate)
				.filter(t -> workingDays.contains(t.getDayOfWeek()))
				.collect(Collectors.toList());
		
		HRSOFT_employee_model emp = employee_repo.getById(id);
		HRSOFT_sector_model sec = sector_repo.findByName(emp.getSector());
		Integer sal = (sec.getPph() * (allDates.size() * 8));

		return "Amount of " + sal.toString() + " RSD has been send to " + emp.getFirst_name() + " " + emp.getLast_name() + ".";
	}
	
	@PostMapping(path = "/api/hrsoft/employee/recruit",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String employee_recruit(
			@RequestBody HRSOFT_employee_model employee) {
		HRSOFT_employee_model em = new HRSOFT_employee_model(
					employee.getDob(),
					employee.getFirst_name(),
					employee.getLast_name(),
					employee.getSector()
				);
		
		employee_repo.save(em);
		
		return "Employee successfully saved.";
	}
}
