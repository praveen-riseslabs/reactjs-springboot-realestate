package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.StatusDto;

import java.util.List;
import java.util.UUID;

public interface StatusService {

    StatusDto createStatus (StatusDto statusDto);

    StatusDto updateStatus(StatusDto statusDto, UUID statusId);
    List<StatusDto> getAllStatus();

    void deleteStatus(UUID statusID);
}
