package dev.aleksandarm.wms.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.wms.models.WMS_location;
import jakarta.transaction.Transactional;

@Transactional
public interface WMS_location_repo extends JpaRepository<WMS_location, Long>{
	Boolean existsByName(String name);
	void deleteByName(String name);
}
