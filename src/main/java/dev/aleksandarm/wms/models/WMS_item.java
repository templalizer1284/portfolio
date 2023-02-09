package dev.aleksandarm.wms.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "wms_item")
public class WMS_item {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonProperty
	@Column(length = 1000)
	private String name;
	
	@JsonProperty
	@Column(length = 1000)
	private String customer;
	
	@JsonProperty
	private Long reference;
	
	@JsonProperty
	@Column(length = 1000)
	private String location;
	
	@JsonProperty
	private Integer quantity;
	
	@JsonProperty
	private Integer ppu; // Price per unit

	public WMS_item() {
		super();
	}

	public WMS_item(String name, String customer, Long reference, String location, Integer quantity, Integer ppu) {
		super();
		this.name = name;
		this.customer = customer;
		this.reference = reference;
		this.location = location;
		this.quantity = quantity;
		this.ppu = ppu;
	}

	public WMS_item(Long id, String name, String customer, Long reference, String location, Integer quantity,
			Integer ppu) {
		super();
		this.id = id;
		this.name = name;
		this.customer = customer;
		this.reference = reference;
		this.location = location;
		this.quantity = quantity;
		this.ppu = ppu;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public Long getReference() {
		return reference;
	}

	public void setReference(Long reference) {
		this.reference = reference;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getPpu() {
		return ppu;
	}

	public void setPpu(Integer ppu) {
		this.ppu = ppu;
	}
}
