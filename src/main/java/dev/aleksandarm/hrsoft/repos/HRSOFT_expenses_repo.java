package dev.aleksandarm.hrsoft.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.hrsoft.models.HRSOFT_expenses_model;
import jakarta.transaction.Transactional;

@Transactional
public interface HRSOFT_expenses_repo extends JpaRepository<HRSOFT_expenses_model, Long>{
	Boolean existsByName(String name);
	void deleteByName(String name);
}
