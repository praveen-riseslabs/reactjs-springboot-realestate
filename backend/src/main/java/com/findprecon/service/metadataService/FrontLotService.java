package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.FrontLotDto;

import java.util.List;
import java.util.UUID;

public interface FrontLotService {

    FrontLotDto addFrontLot(FrontLotDto frontLotDto);

    FrontLotDto updateFrontLot(FrontLotDto frontLotDto, UUID frontLotId);

    List<FrontLotDto> getAllFrontLot();

    void deleteFrontLot(UUID frontLotId);

}
