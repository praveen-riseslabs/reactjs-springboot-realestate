package com.riseslabs.findprecon.dto;

import com.riseslabs.findprecon.model.Role;
import lombok.Data;

@Data
public class RegisterDTO {
    private String name;
    private String email;
    private String password;
    private Role role;

}
