package com.findprecon.dto.metadataDtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class BasementTypeDto {

    private UUID id;

    private String basementField;
}
