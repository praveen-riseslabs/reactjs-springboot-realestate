package com.findprecon.dto;

import com.findprecon.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String email;
    private Role role;
}
