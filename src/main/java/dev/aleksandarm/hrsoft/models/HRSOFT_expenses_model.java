package dev.aleksandarm.hrsoft.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hrsoft_expenses")
public class HRSOFT_expenses_model {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long id;
	
	@JsonProperty
	private String name;
	
	@JsonProperty
	private Integer price;

	public HRSOFT_expenses_model() {
		super();
	}

	public HRSOFT_expenses_model(String name, Integer price) {
		super();
		this.name = name;
		this.price = price;
	}

	public HRSOFT_expenses_model(Long id, String name, Integer price) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}
}
