package dev.aleksandarm.videoservice.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.videoservice.models.VSTREAM_model;
import dev.aleksandarm.videoservice.models.VSTREAM_test;
import dev.aleksandarm.videoservice.models.VSTREAM_videoinfo;
import dev.aleksandarm.videoservice.repos.VSTREAM_repo;
import dev.aleksandarm.videoservice.repos.VSTREAM_test_repo;
import dev.aleksandarm.videoservice.repos.VSTREAM_videoinfo_repo;

@CrossOrigin()
@RestController
public class VSTREAM_controller {
	
	@Autowired
	VSTREAM_repo repo;
	
	@Autowired
	VSTREAM_videoinfo_repo info_repo;
	
	@GetMapping(path = "/api/vstream/test")
	public String test() {
		return "test";
	}
	
	@PostMapping(path = "/api/vstream/upload")
	public ResponseEntity<String> upload(
			@RequestParam("videotitle") String videotitle,
			@RequestParam("videodescription") String videodescription,
			@RequestParam("videodata") MultipartFile videodata,
			@RequestParam("thumbnail") MultipartFile thumbnail) throws IOException {
		if(repo.existsByVideotitle(videodata.getOriginalFilename())) {
			return new ResponseEntity<String> ("Video with that title already exists.", HttpStatus.BAD_REQUEST);
		} else {
			
			if(videotitle.isBlank() ||
					videodescription.isBlank()) {
				return new ResponseEntity<String> ("Form is empty.", HttpStatus.BAD_REQUEST);
			}
			
			Random rand = new Random();
			
			String[] split_type = videodata.getContentType().split("/");
			String hashstring = String.valueOf(videodata.getOriginalFilename().hashCode() * rand.nextInt(15000) * rand.nextInt(15000));
			String format = split_type[1];
			
			VSTREAM_model file = new VSTREAM_model(
					hashstring.concat(".").concat(format).substring(1),
					videotitle,
					videodescription,
					videodata.getBytes()
					);
			
			VSTREAM_videoinfo info = new VSTREAM_videoinfo(
					file.getId(),
					file.getVideotitle(),
					file.getVideodescription(),
					thumbnail.getBytes()
					);
			
			repo.save(file);
			info_repo.save(info);
			
			return new ResponseEntity<String> ("Video titled " + videotitle + " is succesfully uploaded.", HttpStatus.OK);
		}
	}

	@Autowired
	VSTREAM_test_repo trepo;
	
	@PostMapping(path = "/api/test")
	public ResponseEntity<String> test(
			@RequestParam("thumbnail") MultipartFile data) throws IOException {
		VSTREAM_test f = new VSTREAM_test(
				data.getBytes()
				);
		trepo.save(f);
		return new ResponseEntity<String> ("Uploaded. OK", HttpStatus.OK); 
	}
	
	@GetMapping(path = "/api/vstream/get_videos")
	public List<VSTREAM_videoinfo> get_videos() {
		List<VSTREAM_videoinfo> infos = info_repo.findAll();
		return infos;
	}
	
	@GetMapping(path = "/api/vstream/fetch_video")
	public Optional<VSTREAM_model> fetch_video(
			@RequestParam("id") Long id) {
			Optional<VSTREAM_model> video = repo.findById(id);
			return video;
	}
	
	@GetMapping(path = "/api/vstream/delete_video")
	public ResponseEntity<String> delete_video(
			@RequestParam("id") Long id,
			@RequestParam("info_id") Long info_id) {
		if(repo.existsById(id) || info_repo.existsById(info_id)) {
			repo.deleteById(id);
			info_repo.deleteById(info_id);
			
			return new ResponseEntity<> ("Video deleted.", HttpStatus.OK);
		} else {
			return new ResponseEntity<> ("Problem occured, video probably doesn't exist in database.", HttpStatus.BAD_REQUEST);
		}
	}
}
