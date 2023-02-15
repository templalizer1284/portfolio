package dev.aleksandarm.dataupdown.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.dataupdown.models.DATAUPDOWN_model;
import jakarta.transaction.Transactional;

@Transactional
public interface DATAUPDOWN_repo extends JpaRepository<DATAUPDOWN_model, Long>{
	boolean existsById(String id);
	boolean existsByFilename(String name);
	DATAUPDOWN_model findByFilename(String filename);
	void deleteByFilename(String filename);
}
