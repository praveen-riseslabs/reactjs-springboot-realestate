package com.riseslabs.findprecon.controller.PublicApis;

import com.riseslabs.findprecon.dto.RegisterDTO;
import com.riseslabs.findprecon.dto.UserDTO;
import com.riseslabs.findprecon.model.RegistrationModel;
import com.riseslabs.findprecon.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class RegistrationController {

	@Autowired
	private Service service;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO){
		RegistrationModel createdUser =  service.registerUser(registerDTO);
		if (createdUser == null){
			return new ResponseEntity<>("User not created, come again later!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}
	

}
