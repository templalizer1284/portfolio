package dev.aleksandarm.videoservice.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.videoservice.models.VSTREAM_videoinfo;
import jakarta.transaction.Transactional;

@Transactional
public interface VSTREAM_videoinfo_repo extends JpaRepository<VSTREAM_videoinfo, Long>{
	void deleteById(Long id);
}
