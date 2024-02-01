package com.findprecon.controller.privateApis;

import com.findprecon.repository.UserRepository;
import com.findprecon.model.RegistrationModel;
import com.findprecon.service.impl.UserDetailsServiceImpl;
import com.findprecon.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/private")
public class HomeController {


    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping("/home")
    public ResponseEntity<Map<String, String>> getUserDetails(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " from the token
        String username = jwtUtil.extractUsername(token);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        RegistrationModel user = userRepository.findFirstByEmail(username);

        Map<String, String> userDetailsMap = new HashMap<>();

        userDetailsMap.put("name", user.getName());
        userDetailsMap.put("email", user.getEmail());
        userDetailsMap.put("role", user.getRole().name());

        return ResponseEntity.ok(userDetailsMap);

    }
}

