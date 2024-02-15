package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.GarageDto;

import java.util.List;
import java.util.UUID;

public interface GarageService {

    GarageDto createGarage(GarageDto garageDto);

    GarageDto updateGarage(GarageDto garageDto, UUID garageId);

    List<GarageDto> getAllGarages();

    void deleteGarage(UUID garageId);
}
