package dev.aleksandarm.wms.services;

import org.springframework.stereotype.Service;

import dev.aleksandarm.wms.models.WMS_item;

@Service
public class WMS_service_implementation implements WMS_services{
	@Override
	public Boolean isFull(WMS_item item) {
		if(item.getName().isBlank()) {
			return false;
		}
		if(item.getCustomer().isBlank()) {
			return false;
		}
		if(item.getLocation().isBlank()) {
			return false;
		}
		if(item.getReference() == null && item.getReference() == 0) {
			return false;
		}
		if(item.getQuantity() == null && item.getQuantity() == 0) {
			return false;
		}
		if(item.getPpu() == null && item.getQuantity() == 0) {
			return false;
		}
		
		return true;
	}
}
