package com.findprecon.service.impl;

import com.findprecon.repository.UserRepository;
import com.findprecon.dto.RegisterDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import com.findprecon.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@org.springframework.stereotype.Service
public class ServiceIMPL implements Service {
    @Autowired
    private UserRepository userRepository;

    public RegistrationModel registerUser(RegisterDTO registerDTO) {
        // Validate input if necessary
        if (emailExists(registerDTO.getEmail())) {
            throw new EmailExistsException("Email address is already in use");
        }

        RegistrationModel registrationModel = RegistrationModel.builder()
                .name(registerDTO.getName())
                .email(registerDTO.getEmail())
                .password(new BCryptPasswordEncoder().encode(registerDTO.getPassword()))
                .role(Role.Admin) // Set a default role or determine it based on your requirements
                .build();

        // Save the entity in the database
        return userRepository.save(registrationModel);
    }
    private boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    public class EmailExistsException extends RuntimeException {
        public EmailExistsException(String message) {
            super(message);
        }
    }
}

