package dev.aleksandarm.videoservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "vstream_info")
public class VSTREAM_videoinfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty
	private Long id;
	
	@JsonProperty
	private String title;
	
	@JsonProperty
	private String description;
	
	@Lob
	@Column(columnDefinition = "mediumblob")
	@JsonProperty
	private byte[] thumbnail;

	public VSTREAM_videoinfo() {
		super();
	}

	public VSTREAM_videoinfo(String title, String description, byte[] thumbnail) {
		super();
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
	}

	public VSTREAM_videoinfo(Long id, String title, String description, byte[] thumbnail) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}
}
