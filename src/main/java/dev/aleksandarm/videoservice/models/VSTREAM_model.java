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
@Table(name = "vstream")
public class VSTREAM_model {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonProperty
	@Column(length = 100)
	private String filename;
	
	@JsonProperty
	@Column(length = 1000)
	private String videotitle;
	
	@JsonProperty
	@Column(length = 1000)
	private String videodescription;
	
	@JsonProperty
	@Lob
	@Column(columnDefinition = "longblob")
	private byte[] videodata;

	public VSTREAM_model() {
		super();
	}

	public VSTREAM_model(String filename, String videotitle, String videodescription, byte[] videodata) {
		super();
		this.filename = filename;
		this.videotitle = videotitle;
		this.videodescription = videodescription;
		this.videodata = videodata;
	}

	public VSTREAM_model(Long id, String filename, String videotitle, String videodescription, byte[] videodata) {
		super();
		this.id = id;
		this.filename = filename;
		this.videotitle = videotitle;
		this.videodescription = videodescription;
		this.videodata = videodata;
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

	public String getVideotitle() {
		return videotitle;
	}

	public void setVideotitle(String videotitle) {
		this.videotitle = videotitle;
	}

	public String getVideodescription() {
		return videodescription;
	}

	public void setVideodescription(String videodescription) {
		this.videodescription = videodescription;
	}

	public byte[] getVideodata() {
		return videodata;
	}

	public void setVideodata(byte[] videodata) {
		this.videodata = videodata;
	}
}
