package com.findprecon.controller.PublicApis;

import com.findprecon.dto.Request.ForgotPasswordRequest;
import com.findprecon.service.impl.ForgotPasswordIMPL;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class ForgotPasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ForgotPasswordIMPL forgotPassword; // Assuming you have UserDao class

    @PostMapping("/forgotpassword")
    public ResponseEntity<Map<String, String>> processForgetPasswordForm(
            @RequestBody ForgotPasswordRequest forgotPasswordRequest,
            HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        String email = forgotPasswordRequest.getEmail();
        String token = DigestUtils.sha256Hex(email) + RandomStringUtils.randomAlphanumeric(30);

        try {
            forgotPassword.updateResetPasswordToken(token, email);

            // generate reset password link
            String resetPasswordLink = "http://localhost:8080" + "/reset_password?token=" + token;
            System.out.println(resetPasswordLink);

            // send email
            sendEmail(email, resetPasswordLink);

            // alert message to tell mail sent
            response.put("message", "We have sent the email. Please check.");

            System.out.println("Received email parameter: " + email);

        } catch (UsernameNotFoundException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (UnsupportedEncodingException | MessagingException e) {
            response.put("error", "Error while sending email");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        return ResponseEntity.ok(response);
    }

    private void sendEmail(String email, String resetPasswordLink) throws UnsupportedEncodingException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("AjayGowlikar@gmail.com", "Support");
        helper.setTo(email);

        String subject = "Here Is the link to reset the password";
        String content = "<p>Hello</p> +" +
                "<p>You have requested to reset your password</p>" +
                "<p>Click on below link to change your password : </p>" +
                "<p><b>" + resetPasswordLink + "</b></p>" +
                "<p>Ignore if not requested</p>";
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

}
