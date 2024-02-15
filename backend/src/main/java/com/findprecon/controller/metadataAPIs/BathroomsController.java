package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.BathroomsDto;
import com.findprecon.repository.metadataRepo.BathroomsRepository;
import com.findprecon.service.metadataService.BathroomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class BathroomsController {

    @Autowired
private BathroomsService bathroomsService;

    @PostMapping("/bathroom/add")
    public ResponseEntity<BathroomsDto> createBathroom(@RequestBody BathroomsDto bathroomsDto){

        BathroomsDto addBathroomDto = this.bathroomsService.addBathrooms(bathroomsDto);

        return new ResponseEntity<>(addBathroomDto, HttpStatus.CREATED);

    }

    @PutMapping("/bathroom/update/{bathroomId}")
    public ResponseEntity<BathroomsDto> updateBathroom(@RequestBody BathroomsDto bathroomsDto, @PathVariable("bathroomId")UUID bathroomId){

        BathroomsDto updateBathroom = this.bathroomsService.updateBathrooms(bathroomsDto,bathroomId);

        return ResponseEntity.ok(updateBathroom);
    }

    @DeleteMapping("/bathroom/delete/{bathroomId}")
    public ResponseEntity<ApiResponse> deleteBathroom(@PathVariable UUID bathroomId){
        this.bathroomsService.deleteBathrooms(bathroomId);

        return new ResponseEntity(new ApiResponse("Bathroom deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/bathroom/all")
    public ResponseEntity<List<BathroomsDto>> getAllBathRooms(){
        return ResponseEntity.ok(this.bathroomsService.getAllBathromms());

    }


}
