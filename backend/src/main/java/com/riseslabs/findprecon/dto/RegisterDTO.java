package com.riseslabs.findprecon.dto;

import com.riseslabs.findprecon.model.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDTO {

    @NotBlank(message = "Name is required")
    @Size(min=3, max=25, message = "At-least name should be 8-25 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$",message = "Please enter minimum 1 digit ,1 Uppercase and lower case")
    @Size(min = 8, message = "Password should be at least 8 characters")
    private String password;

    private Role role;

}
