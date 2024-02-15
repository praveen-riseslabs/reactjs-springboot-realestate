package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.BedroomsDto;

import java.util.List;
import java.util.UUID;

public interface BedroomsService {

    BedroomsDto addBedrooms (BedroomsDto bedroomsDto);

    BedroomsDto updateBedrooms(BedroomsDto bedroomsDto, UUID bedroomId);

    List<BedroomsDto> getAllBedrooms();

    void deleteBedroom(UUID bedroomId);

}
