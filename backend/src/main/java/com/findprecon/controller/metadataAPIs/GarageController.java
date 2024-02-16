package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.metadataDtos.GarageDto;
import com.findprecon.service.metadataService.GarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class GarageController {

    @Autowired
    private GarageService garageService;

    @PostMapping("/garage/add")
    public ResponseEntity<Map<String, Object>> createGarage(@RequestBody GarageDto garageDto){

        GarageDto addGarage = this.garageService.createGarage(garageDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Garage field: " + garageDto.getGarage() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PutMapping("/garage/update/{garageId}")
    public ResponseEntity<Map<String, Object>> updateGarage(@RequestBody GarageDto garageDto, @PathVariable("garageId") UUID garageId){

        GarageDto updatedGarage = this.garageService.updateGarage(garageDto,garageId);


        Map<String, Object> response = new HashMap<>();
        response.put("message", "Garage field: " + garageDto.getGarage() + " Updated !");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body( response);
    }

    @DeleteMapping("/garage/delete/{garageId}")
    public ResponseEntity<Map<String, Object>> deleteGarage(@PathVariable UUID garageId){
        this.garageService.deleteGarage(garageId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Garage deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/garage/all")
    public ResponseEntity<List<GarageDto>> getAllGarage(){
        return ResponseEntity.ok(this.garageService.getAllGarages());

    }
}
