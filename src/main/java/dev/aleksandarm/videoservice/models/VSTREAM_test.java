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
@Table(name = "vstream_test")
public class VSTREAM_test {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty
	private Long id;
	
	@Lob
	@Column(columnDefinition = "mediumblob")
	@JsonProperty
	private byte[] thumbnail;

	public VSTREAM_test() {
		super();
	}

	public VSTREAM_test(byte[] thumbnail) {
		super();
		this.thumbnail = thumbnail;
	}

	public VSTREAM_test(Long id, byte[] thumbnail) {
		super();
		this.id = id;
		this.thumbnail = thumbnail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}
}
