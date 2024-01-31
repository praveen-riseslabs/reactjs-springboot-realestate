package com.riseslabs.findprecon.controller.PublicApis;

import com.riseslabs.findprecon.dto.RegisterDTO;
import com.riseslabs.findprecon.dto.UserDTO;
import com.riseslabs.findprecon.model.RegistrationModel;
import com.riseslabs.findprecon.service.Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name="Registration Controller", description = "This is Registration APIs for register !!")
public class RegistrationController {

	@Autowired
	private Service service;

	@PostMapping("/register")
	@Operation(summary = "create new user !!, this is registration api !!")
	@ApiResponses(value ={
			@ApiResponse(responseCode = "200", description = "Success | OK"),
			@ApiResponse(responseCode = "401", description = "not authorized"),
			@ApiResponse(responseCode = "201", description = "new user created")
	})
	public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO){
		RegistrationModel createdUser =  service.registerUser(registerDTO);
		if (createdUser == null){
			return new ResponseEntity<>("User not created, come again later!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}
	

}
