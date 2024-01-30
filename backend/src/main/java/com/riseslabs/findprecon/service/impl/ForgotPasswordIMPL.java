package com.riseslabs.findprecon.service.impl;

import com.riseslabs.findprecon.model.RegistrationModel;
import com.riseslabs.findprecon.repository.UserRepository;
import com.riseslabs.findprecon.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class ForgotPasswordIMPL  {
    @Autowired
    private UserRepository userRepository;

    public void updateResetPasswordToken(String token, String email) {
        RegistrationModel user = userRepository.findByEmail(email);
        if (user != null) {
            user.setResetPasswordToken(token);
            userRepository.save(user);
        } else {
            throw new UsernameNotFoundException("Could not find any email with " + email);
        }
    }
}
