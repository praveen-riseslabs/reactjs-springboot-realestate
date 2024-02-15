package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.BathroomsDto;

import java.util.List;
import java.util.UUID;

public interface BathroomsService {

    BathroomsDto addBathrooms(BathroomsDto bathroomsDto);

    BathroomsDto updateBathrooms(BathroomsDto bathroomsDto, UUID bathroomId);

   void deleteBathrooms(UUID bathroomId);

   List<BathroomsDto> getAllBathromms();

}
