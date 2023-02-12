package dev.aleksandarm.hrsoft.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.aleksandarm.hrsoft.models.HRSOFT_sector_model;
import jakarta.transaction.Transactional;

@Transactional
public interface HRSOFT_sector_repo extends JpaRepository<HRSOFT_sector_model, Long>{
	HRSOFT_sector_model findByName(String name);
	Boolean existsByName(String name);
}
