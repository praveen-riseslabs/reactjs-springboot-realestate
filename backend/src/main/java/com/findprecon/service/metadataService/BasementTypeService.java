package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.BasementTypeDto;

import java.util.List;
import java.util.UUID;

public interface BasementTypeService {

    BasementTypeDto createBasementType(BasementTypeDto basementTypeDto);

    BasementTypeDto updateBasementType(BasementTypeDto basementTypeDto, UUID basementId);

    void deleteBasementType(UUID basementId);

    List<BasementTypeDto> getAllBasementTypes();


}
