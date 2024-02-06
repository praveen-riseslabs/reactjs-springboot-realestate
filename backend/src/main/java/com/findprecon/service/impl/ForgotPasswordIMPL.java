package com.findprecon.service.impl;

import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.RegistrationModel;
import com.findprecon.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordIMPL  {
    @Autowired
    private UserRepository userRepository;

    public void updateResetPasswordToken(String token, String email) {
        RegistrationModel user = userRepository.findByEmail(email);
        if (user != null) {
            user.setResetPasswordToken(token);
            userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User" ,"email : "+ email);
        }
    }
}
