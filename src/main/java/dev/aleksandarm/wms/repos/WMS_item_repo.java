package dev.aleksandarm.wms.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.wms.models.WMS_item;
import jakarta.transaction.Transactional;

@Transactional
public interface WMS_item_repo extends JpaRepository<WMS_item, Long>{
	Boolean existsByName(String name);
	Boolean existsByLocation(String name);
	Boolean existsByReference(Long reference);
	Boolean existsByReferenceAndLocation(Long reference, String location);
	WMS_item findByReferenceAndLocation(Long reference, String location);
	List<WMS_item> findAllByLocation(String location);
	void deleteByLocation(String location);
	void deleteByReferenceAndLocation(Long reference, String location);
}
