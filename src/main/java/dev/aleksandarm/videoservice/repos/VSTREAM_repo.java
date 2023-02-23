package dev.aleksandarm.videoservice.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.videoservice.models.VSTREAM_model;
import jakarta.transaction.Transactional;

@Transactional
public interface VSTREAM_repo extends JpaRepository<VSTREAM_model, Long>{
	Boolean existsByVideotitle(String title);
	VSTREAM_model findByFilename(String videoname);
	void deleteById(Long id);
}
