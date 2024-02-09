package com.findprecon.service.impl;

import com.findprecon.dto.UserDTO;
import com.findprecon.exception.EmailExistException;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.repository.UserRepository;
import com.findprecon.dto.RegisterDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import com.findprecon.service.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
                .role(Role.Agent) // Set a default role or determine it based on your requirements
                .build();
        if (!userRepository.existsByEmail(registrationModel.getEmail())) {
            // Save the entity in the database
            return userRepository.save(registrationModel);
        }
        else {
                throw new EmailExistException("Email id is already in use");
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user->new UserDTO(
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                )).collect(Collectors.toList());

    }

    @Override
    public Optional<RegistrationModel> getByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    @Override
    public void updateRoleByEmail(RegistrationModel user, Role role) {
        user.setRole(role);
        userRepository.save(user);
    }


    private boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}

