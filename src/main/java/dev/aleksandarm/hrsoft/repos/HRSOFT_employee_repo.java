package dev.aleksandarm.hrsoft.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.hrsoft.models.HRSOFT_employee_model;
import jakarta.transaction.Transactional;

@Transactional
public interface HRSOFT_employee_repo extends JpaRepository<HRSOFT_employee_model, Long>{
	boolean existsById(Long id);
	void deleteById(Long id);
}
