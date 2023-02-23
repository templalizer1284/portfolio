package dev.aleksandarm.wms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.aleksandarm.wms.models.WMS_item;
import dev.aleksandarm.wms.models.WMS_location;
import dev.aleksandarm.wms.repos.WMS_item_repo;
import dev.aleksandarm.wms.repos.WMS_location_repo;

@CrossOrigin("http://localhost:3000")
@RestController
public class WMS_controller {
	
	@Autowired
	WMS_location_repo location_repo;
	
	@Autowired
	WMS_item_repo item_repo;
	
	@GetMapping(path = "/api/wms/layout/location_get")
	public List<WMS_location> location_get() {
		List<WMS_location> loc = location_repo.findAll();
		return loc;
	}
	
	@GetMapping(path = "/api/wms/layout/location_add",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String location_add(
			@RequestParam("name") String name,
			@RequestParam("description") String description) {
		if(location_repo.existsByName(name)) {
			return "Sorry, location already exist.";
		}
		
		WMS_location loc = new WMS_location(name, description);
		location_repo.save(loc);
		
		return "Location registered.";
	}
	
	@GetMapping(path = "/api/wms/layout/location_delete",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String location_delete(@RequestParam("name") String name) {
		if(location_repo.existsByName(name)) {
			location_repo.deleteByName(name);
			item_repo.deleteByLocation(name);
			return "Location deleted.";
		}
		
		return "Location doesn't exist.";
	}
	
	@GetMapping(path = "/api/wms/layout/fetch_items",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<WMS_item> fetch_items(@RequestParam("location") String location) {
		List<WMS_item> items = item_repo.findAllByLocation(location);
		return items;
	}
	
	@PostMapping(path = "/api/wms/inventory/register",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String inventory_register(@RequestBody WMS_item data) {
		if(item_repo.existsByReferenceAndLocation(data.getReference(), data.getLocation())) {
			return "Item already exists";
		} else {
			item_repo.save(data);
			return "Item registered successfully.";
		}
	}
	
	@GetMapping(path = "/api/wms/inventory/delete",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String inventory_delete(
			@RequestParam("reference") Long reference,
			@RequestParam("location") String location) {
		if(item_repo.existsByReference(reference)) {
			if(item_repo.existsByLocation(location)) {
				// ok
			} else {
				return "Item doesn't exist by location";
			}
		} else {
			return "Item doesn't exist by reference.";
		}
		
		item_repo.deleteByReferenceAndLocation(reference, location);
		
		return "Item successfully deleted.";
	}
	
	@GetMapping(path = "/api/wms/inventory/modify_quantity",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String inventory_modify_quantity(
			@RequestParam("reference") Long reference,
			@RequestParam("location") String location,
			@RequestParam("quantity") Integer quantity) {
		if(item_repo.existsByReferenceAndLocation(reference, location)) {
			WMS_item item = item_repo.findByReferenceAndLocation(reference, location);
			if((quantity + item.getQuantity()) < 0) {
				return "Sorry, current quantity is " + item.getQuantity() + " result will be below zero";
			}
			
			item.setQuantity(item.getQuantity() + quantity);
			item_repo.save(item);
			return "Record successfully updated.";
		} else {
			return "Item doesn't exist by reference or location.";			
		}
	}
	
	@GetMapping(path = "/api/wms/inventory/relocate",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String relocate(
			@RequestParam("reference") Long reference,
			@RequestParam("location_from") String location_from,
			@RequestParam("location_to") String location_to) {
		if(item_repo.existsByReferenceAndLocation(reference, location_from)) {
			if(item_repo.existsByReferenceAndLocation(reference, location_to)) {
				return "Item with reference " + reference + " already exists on location " + location_to + ".";
			} else {
				// Get item that should be moved.
				WMS_item item = item_repo.findByReferenceAndLocation(reference, location_from);
				
				// Change the location and save it.
				item.setLocation(location_to);
				item_repo.save(item);
				
				return "Item relocated successfully.";
			}
		} else {
			return "Item with reference " + reference + " doesn't exist on location " + location_from + ".";
		}
	}
}
