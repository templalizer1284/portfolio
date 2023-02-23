package dev.aleksandarm.dataupdown.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.dataupdown.models.DATAUPDOWN_model;
import dev.aleksandarm.dataupdown.repos.DATAUPDOWN_repo;

@CrossOrigin()
@RestController
public class DATAUPDOWN_controller {
	
	@Autowired
	DATAUPDOWN_repo repo;
	
	@PostMapping(path = "/api/dataupdown/upload")
	public String upload(
			@RequestParam("file") MultipartFile file) throws IOException {
		if(repo.existsByFilename(file.getOriginalFilename())) {
			return "File already exists in DB.";
		} else {
			DATAUPDOWN_model data = new DATAUPDOWN_model(
						file.getOriginalFilename(),
						file.getContentType(),
						file.getBytes()
					);
			repo.save(data);
			return "Data named " + file.getOriginalFilename() + " successfully saved!";
		}
	}
	
	@GetMapping(path = "/api/dataupdown/get_all")
	public List<DATAUPDOWN_model> get_all() {
		List<DATAUPDOWN_model> data = repo.findAll();
		return data;
	}
	
	@GetMapping(path = "/api/dataupdown/download")
	public DATAUPDOWN_model get_all(
			@RequestParam("filename") String filename) {
		DATAUPDOWN_model file = repo.findByFilename(filename);
		return file;
	}
	
	@GetMapping(path = "/api/dataupdown/delete")
	public String delete(
			@RequestParam("filename") String filename) {
		if(repo.existsByFilename(filename)) {
			repo.deleteByFilename(filename);
			return "File " + filename + " deleted.";
		} else {
			return "This is impossible, but file doesn't exist.";
		}
	}
}
