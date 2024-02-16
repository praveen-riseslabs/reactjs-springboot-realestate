package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.FrontLotDto;
import com.findprecon.service.metadataService.FrontLotService;
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
public class FrontLotController {

    @Autowired
    private FrontLotService frontLotService;

    @PostMapping("/frontlot/add")
    public ResponseEntity<Map<String, Object>> createFrontLot(@RequestBody FrontLotDto frontLotDto){

        FrontLotDto addFrontLot = this.frontLotService.addFrontLot(frontLotDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "FrontLot field: " + frontLotDto.getFrontLot() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PutMapping("/frontlot/update/{frontLotId}")
    public ResponseEntity<Map<String, Object>> updateFrontLot(@RequestBody FrontLotDto frontLotDto, @PathVariable("frontLotId") UUID frontLotId){

        FrontLotDto updatedFrontLot = this.frontLotService.updateFrontLot(frontLotDto,frontLotId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "FrontLot field: " + frontLotDto.getFrontLot() + " Updated !");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body( response);
    }

    @DeleteMapping("/frontlot/delete/{frontLotId}")
    public ResponseEntity<Map<String, Object>> deleteFrontLot(@PathVariable UUID frontLotId){
        this.frontLotService.deleteFrontLot(frontLotId);


        Map<String, Object> response = new HashMap<>();
        response.put("message", "FrontLot type deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }


    @GetMapping("/frontlot/all")
    public ResponseEntity<List<FrontLotDto>> getAllFrontLots(){
        return ResponseEntity.ok(this.frontLotService.getAllFrontLot());

    }
}
