package com.findprecon.controller.PublicApis;

import com.findprecon.dto.RegisterDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.service.Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin
@RequestMapping("/api/public")
@RequiredArgsConstructor
@Tag(name="Registration Controller", description = "This is Registration APIs for register!!")
public class RegistrationController {

	@Autowired
	private Service service;

	@Autowired
	private JavaMailSender mailSender;


	@PostMapping("/register")
	@Operation(summary = "create new user !!, this is registration api !!")
	@ApiResponses(value ={
			@ApiResponse(responseCode = "200", description = "Success | OK"),
			@ApiResponse(responseCode = "401", description = "not authorized"),
			@ApiResponse(responseCode = "201", description = "new user created")
	})
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO) throws MessagingException, UnsupportedEncodingException {
		RegistrationModel createdUser =  service.registerUser(registerDTO);
		if (createdUser == null){
			return new ResponseEntity<>(Map.of("status", false, "message", "User not created, come again later!"), HttpStatus.BAD_REQUEST);
		}

		sendEmail(createdUser.getEmail());
		String message = String.format("Hey %s Registration successful with email %s", createdUser.getName(), createdUser.getEmail());
		return new ResponseEntity<>(Map.of("status", true, "message", message), HttpStatus.CREATED);

	}

	private void sendEmail(String email) throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom("AjayGowlikar@gmail.com", "Support");
		helper.setTo(email);

		String subject = "Welcome to FPC Organization";
		String content = "<p>Hello,</p>" +
				"<p>You have successfully registered with FPC Organization.</p>" +
				"<p>Welcome aboard!</p>" ;
		helper.setSubject(subject);
		helper.setText(content, true);
		mailSender.send(message);
	}

}
