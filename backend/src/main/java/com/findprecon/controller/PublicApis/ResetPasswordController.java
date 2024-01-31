package com.findprecon.controller.PublicApis;

import com.findprecon.model.RegistrationModel;
import com.findprecon.service.impl.ResetPasswordIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class ResetPasswordController {

    @Autowired
    private ResetPasswordIMPL resetPasswordIMPL;

    @PostMapping("/reset_password")
    public ResponseEntity<Map<String, String>> processResetPassword(@RequestParam String token, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();
        RegistrationModel user = resetPasswordIMPL.getByResetPasswordToken(token);

        if (user == null) {
            response.put("title", "Reset your Password");
            response.put("message", "Invalid token");
            return ResponseEntity.ok(response);
        }
        else {
            resetPasswordIMPL.updatePassword(user, password);
            response.put("title", "Reset password successful");
            response.put("message", "Password reset successful");
            return ResponseEntity.ok(response);
        }
    }

}
