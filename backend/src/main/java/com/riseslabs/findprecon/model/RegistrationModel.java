package com.riseslabs.findprecon.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name="Registration")
public class RegistrationModel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="UUID")
	@Column(nullable=false,updatable=false)
	private UUID id;

	@NotBlank(message = "Name is required")
	@Size(max=25, min=3, message = "Atleast name should be 8-25 characters")
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email address")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password should be at least 8 characters")
	private String password;
	@Column(name="reset_password_token")
	private String resetPasswordToken;
	
	private final String createdAt = LocalDateTime.now()
			.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
	
	private Role role;
	
}
