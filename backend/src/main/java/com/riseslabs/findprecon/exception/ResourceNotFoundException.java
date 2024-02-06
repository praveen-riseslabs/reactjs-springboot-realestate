package com.riseslabs.findprecon.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    String resourceName;
    String fieldName;

    public ResourceNotFoundException(String resourceName, String fieldName){

        super(String.format(resourceName +" not found with "+fieldName));
        this.resourceName=resourceName;
        this.fieldName=fieldName;
    }

}
