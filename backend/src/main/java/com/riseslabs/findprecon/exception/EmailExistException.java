package com.riseslabs.findprecon.exception;

public class EmailExistException extends RuntimeException{
    public EmailExistException(String message) {
        super(message);
    }

    public EmailExistException(){
        super();
    }
}
