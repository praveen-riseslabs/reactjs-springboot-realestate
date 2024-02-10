package com.findprecon.controller.PublicApis;

import com.findprecon.model.RegistrationModel;
import com.findprecon.service.impl.ResetPasswordIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class ResetPasswordController {

    @Autowired
    private ResetPasswordIMPL resetPasswordIMPL;

    @PostMapping("/reset_password")
    public ResponseEntity<Map<String, Serializable>> processResetPassword(@RequestParam String token, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();
        RegistrationModel user = resetPasswordIMPL.getByResetPasswordToken(token);

        if (user == null) {
            response.put("title", "Reset your Password");
            response.put("message", "Invalid Password Reset Link");
            int httpStatus = HttpStatus.BAD_REQUEST.value();
            return ResponseEntity.status(httpStatus).body(Map.of("status", false, "message", response.get("message"), "statusCode", httpStatus));
        }
        else {
            resetPasswordIMPL.updatePassword(user, password);
            response.put("title", "Reset password successful");
            response.put("message", "Password reset successful");
            int httpStatus = HttpStatus.CREATED.value();
            return ResponseEntity.status(httpStatus).body(Map.of("status", true, "message", response.get("message"), "statusCode", httpStatus));
        }
    }

}
