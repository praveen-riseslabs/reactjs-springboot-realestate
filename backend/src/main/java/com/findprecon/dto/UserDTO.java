package com.findprecon.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.findprecon.model.Role;
import lombok.Data;

@Data
public class UserDTO {

    @NotBlank(message = "Name is required")
    @Size(min=3, max=25, message = "At-least name should be 8-25 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;
    private Role role;
}
