package com.riseslabs.findprecon.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        // Create a custom ErrorResponse class to send meaningful error messages
//        return new ResponseEntity<>(new ErrorResponse("Something went wrong"), HttpStatus.INTERNAL_SERVER_ERROR);
        return null;
    }

    // Handle specific exceptions if needed
}

