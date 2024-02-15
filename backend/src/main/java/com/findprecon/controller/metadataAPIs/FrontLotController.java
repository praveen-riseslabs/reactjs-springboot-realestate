package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;

import com.findprecon.dto.metadataDtos.FrontLotDto;
import com.findprecon.service.metadataService.FrontLotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class FrontLotController {

    @Autowired
    private FrontLotService frontLotService;

    @PostMapping("/frontlot/add")
    public ResponseEntity<FrontLotDto> createFrontLot(@RequestBody FrontLotDto frontLotDto){

        FrontLotDto addFrontLot = this.frontLotService.addFrontLot(frontLotDto);

        return new ResponseEntity<>(addFrontLot, HttpStatus.CREATED);

    }

    @PutMapping("/frontlot/update/{frontLotId}")
    public ResponseEntity<FrontLotDto> updateFrontLot(@RequestBody FrontLotDto frontLotDto, @PathVariable("frontLotId") UUID frontLotId){

        FrontLotDto updatedFrontLot = this.frontLotService.updateFrontLot(frontLotDto,frontLotId);

        return ResponseEntity.ok(updatedFrontLot);
    }

    @DeleteMapping("/frontlot/delete/{frontLotId}")
    public ResponseEntity<ApiResponse> deleteFrontLot(@PathVariable UUID frontLotId){
        this.frontLotService.deleteFrontLot(frontLotId);

        return new ResponseEntity(new ApiResponse("Front Lot deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/frontlot/all")
    public ResponseEntity<List<FrontLotDto>> getAllFrontLots(){
        return ResponseEntity.ok(this.frontLotService.getAllFrontLot());

    }
}
