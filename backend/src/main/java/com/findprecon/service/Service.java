package com.findprecon.service;

import com.findprecon.dto.RegisterDTO;
import com.findprecon.dto.UserDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;

import java.util.List;
import java.util.Optional;


@org.springframework.stereotype.Service
public interface Service {

	RegistrationModel registerUser(RegisterDTO registerDTO);

    List<UserDTO> getAllUsers();

    Optional<RegistrationModel> getByEmail(String email);

    void updateRoleByEmail(RegistrationModel user, Role role);
}
