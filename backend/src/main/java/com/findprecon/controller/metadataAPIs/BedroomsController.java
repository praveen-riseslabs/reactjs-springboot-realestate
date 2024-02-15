package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.BedroomsDto;
import com.findprecon.service.metadataService.BedroomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/metadata")
public class BedroomsController {

    @Autowired
    private BedroomsService bedroomsService;



    @PostMapping("/bedroom/add")
    public ResponseEntity<BedroomsDto> createBedroom(@RequestBody BedroomsDto bedroomsDto){

        BedroomsDto addBedrooms = this.bedroomsService.addBedrooms(bedroomsDto);

        return new ResponseEntity<>(addBedrooms, HttpStatus.CREATED);

    }

    @PutMapping("/bedroom/update/{bedroomId}")
    public ResponseEntity<BedroomsDto> updateBedroom(@RequestBody BedroomsDto bedroomsDto, @PathVariable("bedroomId") UUID bedroomId){

        BedroomsDto updatedBedrooms = this.bedroomsService.updateBedrooms(bedroomsDto,bedroomId);

        return ResponseEntity.ok(updatedBedrooms);
    }

    @DeleteMapping("/bedroom/delete/{bedroomId}")
    public ResponseEntity<ApiResponse> deleteBedroom(@PathVariable UUID bedroomId){
        this.bedroomsService.deleteBedroom(bedroomId);

        return new ResponseEntity(new ApiResponse("Bedroom deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/bedroom/all")
    public ResponseEntity<List<BedroomsDto>> getAllBedrooms(){
        return ResponseEntity.ok(this.bedroomsService.getAllBedrooms());

    }

}
