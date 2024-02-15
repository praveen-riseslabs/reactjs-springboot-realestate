package com.findprecon.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import com.findprecon.dto.RegisterDTO;
import com.findprecon.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name="Registration")
public class RegistrationModel implements UserDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="UUID")
	@Column(nullable=false,updatable=false)
	private UUID id;

	@NotNull(message = "Name is required")
	@Size(max=25, min=3, message = "Atleast name should be 8-25 characters")
	private String name;

	@NotNull(message = "Email is required")
	@Email(message = "Invalid email address")
	private String email;

	@NotNull(message = "Password is required")
	@Size(min = 8, message = "Password should be at least 8 characters")
	private String password;
	@Column(name="reset_password_token")
	private String resetPasswordToken;
	
	private final String createdAt = LocalDateTime.now()
			.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));

	@Enumerated(EnumType.STRING)
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return role.getAuthorities();

	}


	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
