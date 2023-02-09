package dev.aleksandarm.wms.services;

import dev.aleksandarm.wms.models.WMS_item;

public interface WMS_services {
	// Checks if all information are sent properly.
	public abstract Boolean isFull(WMS_item item);
}
