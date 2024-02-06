package com.riseslabs.findprecon.service.impl;

import com.riseslabs.findprecon.dto.RegisterDTO;
import com.riseslabs.findprecon.exception.EmailExistException;
import com.riseslabs.findprecon.model.RegistrationModel;
import com.riseslabs.findprecon.model.Role;
import com.riseslabs.findprecon.repository.UserRepository;
import com.riseslabs.findprecon.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@org.springframework.stereotype.Service
public class ServiceIMPL implements Service {
    @Autowired
    private UserRepository userRepository;

    public RegistrationModel registerUser(RegisterDTO registerDTO) {
        // Validate input if necessary

        RegistrationModel registrationModel = RegistrationModel.builder()
                .name(registerDTO.getName())
                .email(registerDTO.getEmail())
                .password(new BCryptPasswordEncoder().encode(registerDTO.getPassword()))
                .role(Role.Admin) // Set a default role or determine it based on your requirements
                .build();
        if (!userRepository.existsByEmail(registrationModel.getEmail())) {
            // Save the entity in the database
            return userRepository.save(registrationModel);
        }
        else {
                throw new EmailExistException("Email id is already in use");
        }
    }
    private boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}

