package com.findprecon.controller.PublicApis;

import com.findprecon.dto.RegisterDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.service.Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/public")
@RequiredArgsConstructor
@Tag(name="Registration Controller", description = "This is Registration APIs for register!!")
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
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO){
		RegistrationModel createdUser =  service.registerUser(registerDTO);
		if (createdUser == null){
			return new ResponseEntity<>("User not created, come again later!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Hey "+ createdUser.getName() + " Registration successful with email " + createdUser.getEmail(), HttpStatus.CREATED);

	}
	

}
