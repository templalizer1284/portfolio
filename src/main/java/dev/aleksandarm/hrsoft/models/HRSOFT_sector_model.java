package dev.aleksandarm.hrsoft.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hrsoft_sectors")
public class HRSOFT_sector_model {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@JsonProperty
	private String name;
	
	@JsonProperty
	private Integer pph; // Price per hour

	public HRSOFT_sector_model() {
		super();
	}

	public HRSOFT_sector_model(String name, Integer pph) {
		super();
		this.name = name;
		this.pph = pph;
	}

	public HRSOFT_sector_model(Long id, String name, Integer pph) {
		super();
		this.id = id;
		this.name = name;
		this.pph = pph;
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

	public Integer getPph() {
		return pph;
	}

	public void setPph(Integer pph) {
		this.pph = pph;
	}
}
