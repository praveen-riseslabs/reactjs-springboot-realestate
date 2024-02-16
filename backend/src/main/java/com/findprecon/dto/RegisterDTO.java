package com.findprecon.dto;

import com.findprecon.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {
    @NotBlank(message = "Name is required")
    @Size(min=3, max=25, message = "name should be 8-25 characters only")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$",message = "Please enter minimum 1 digit ,1 Uppercase, 1 lower case and one special character !!")
    @Size(min = 8, message = "Password should be minimum 8 characters")
    private String password;


    private Role role;

}
