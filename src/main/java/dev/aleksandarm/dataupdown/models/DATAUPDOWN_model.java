package dev.aleksandarm.dataupdown.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "dataupdown")
public class DATAUPDOWN_model {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty
	private Long id;
		
	@JsonProperty
	private String filename;
	
	@JsonProperty
	private String filetype;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	@JsonProperty
	private byte[] data;

	public DATAUPDOWN_model() {
		super();
	}

	public DATAUPDOWN_model(String filename, String filetype, byte[] data) {
		super();
		this.filename = filename;
		this.filetype = filetype;
		this.data = data;
	}

	public DATAUPDOWN_model(Long id, String filename, String filetype, byte[] data) {
		super();
		this.id = id;
		this.filename = filename;
		this.filetype = filetype;
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
