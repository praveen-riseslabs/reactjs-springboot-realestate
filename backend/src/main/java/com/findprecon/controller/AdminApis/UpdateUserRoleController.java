package com.findprecon.controller.AdminApis;

import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import com.findprecon.service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/private")
@RequiredArgsConstructor
public class UpdateUserRoleController {

    @Autowired
    private Service service;

    @PostMapping("/give-role")
    public ResponseEntity<Map<String, String>> setRoleByEmail(
            @RequestParam String email,
            @RequestParam Role role
    ) {
        Map<String, String> response = new HashMap<>();
        Optional<RegistrationModel> userOptional = service.getByEmail(email);
        if (userOptional.isPresent()) {
            RegistrationModel user = userOptional.get();
            service.updateRoleByEmail(user, role);
            response.put("message", "Role Updated");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid User email");
            return ResponseEntity.badRequest().body(response);
        }
    }

}
