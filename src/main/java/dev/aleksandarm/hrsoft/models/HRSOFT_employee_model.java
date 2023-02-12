package dev.aleksandarm.hrsoft.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hrsoft_employees")
public class HRSOFT_employee_model {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonProperty
	private LocalDate dob;
	
	@JsonProperty
	private String first_name;
	
	@JsonProperty
	private String last_name;
	
	@JsonProperty
	private String sector;
	
	public HRSOFT_employee_model() {
		super();
	}

	public HRSOFT_employee_model(LocalDate dob, String first_name, String last_name, String sector) {
		super();
		this.dob = dob;
		this.first_name = first_name;
		this.last_name = last_name;
		this.sector = sector;
	}

	public HRSOFT_employee_model(Long id, LocalDate dob, String first_name, String last_name, String sector) {
		super();
		this.id = id;
		this.dob = dob;
		this.first_name = first_name;
		this.last_name = last_name;
		this.sector = sector;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}
}
