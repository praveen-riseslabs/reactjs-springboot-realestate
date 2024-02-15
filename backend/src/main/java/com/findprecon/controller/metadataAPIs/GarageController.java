package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;

import com.findprecon.dto.metadataDtos.GarageDto;
import com.findprecon.service.metadataService.GarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class GarageController {

    @Autowired
    private GarageService garageService;

    @PostMapping("/garage/add")
    public ResponseEntity<GarageDto> createGarage(@RequestBody GarageDto garageDto){

        GarageDto addGarage = this.garageService.createGarage(garageDto);

        return new ResponseEntity<>(addGarage, HttpStatus.CREATED);

    }

    @PutMapping("/garage/update/{garageId}")
    public ResponseEntity<GarageDto> updateGarage(@RequestBody GarageDto garageDto, @PathVariable("garageId") UUID garageId){

        GarageDto updatedGarage = this.garageService.updateGarage(garageDto,garageId);

        return ResponseEntity.ok(updatedGarage);
    }

    @DeleteMapping("/garage/delete/{garageId}")
    public ResponseEntity<ApiResponse> deleteGarage(@PathVariable UUID garageId){
        this.garageService.deleteGarage(garageId);

        return new ResponseEntity(new ApiResponse("Garage deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/garage/all")
    public ResponseEntity<List<GarageDto>> getAllGarage(){
        return ResponseEntity.ok(this.garageService.getAllGarages());

    }
}
