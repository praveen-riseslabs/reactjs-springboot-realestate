package com.riseslabs.findprecon.dto;

import com.riseslabs.findprecon.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String email;
    private Role role;
}
