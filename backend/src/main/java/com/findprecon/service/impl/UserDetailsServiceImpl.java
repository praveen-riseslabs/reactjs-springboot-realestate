package com.findprecon.service.impl;


import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.repository.UserRepository;
import com.findprecon.model.RegistrationModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        //Write Logic to get the user from the DB
        RegistrationModel user = this.userRepository.findFirstByEmail(email).orElseThrow(()->new ResourceNotFoundException("User","Email : "+email));

        return user;
    }

}