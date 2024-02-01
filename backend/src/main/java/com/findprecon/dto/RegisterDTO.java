package com.findprecon.dto;

import com.findprecon.model.Role;
import lombok.Data;

@Data
public class RegisterDTO {
    private String name;
    private String email;
    private String password;
    private Role role;

}
