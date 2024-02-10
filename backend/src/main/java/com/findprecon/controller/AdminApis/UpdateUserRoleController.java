package com.findprecon.controller.AdminApis;

import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import com.findprecon.service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
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
    public ResponseEntity<Map<String, Serializable>> setRoleByEmail(
            @RequestParam String email,
            @RequestParam Role role
    ) {
        Map<String, String> response = new HashMap<>();
        Optional<RegistrationModel> userOptional = service.getByEmail(email);
        if (userOptional.isPresent()) {
            RegistrationModel user = userOptional.get();
            service.updateRoleByEmail(user, role);
            response.put("message", "Role Updated");
            int httpStatus = HttpStatus.CREATED.value();
            return ResponseEntity.status(httpStatus).body(Map.of("status", true, "message", response.get("message"), "statusCode", httpStatus));
        } else {
            int httpStatus = HttpStatus.METHOD_FAILURE.value();
            return ResponseEntity.status(httpStatus).body(Map.of("status", true, "message", response.get("message"), "statusCode", httpStatus));
        }
    }

}
