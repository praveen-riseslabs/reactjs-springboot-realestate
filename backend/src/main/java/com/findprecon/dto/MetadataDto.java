package com.findprecon.dto;

import com.findprecon.enums.Basement;
import com.findprecon.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class MetadataDto {

    private UUID id;

    private String propertyType;

    private Status status;

    private int bedrooms;

    private int bathrooms;

    private Basement basement;
    private int garage;

    private int frontLot;
}
