package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.metadataDtos.BathroomsDto;
import com.findprecon.service.metadataService.BathroomsService;
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
public class BathroomsController {

    @Autowired
private BathroomsService bathroomsService;

    @PostMapping("/bathroom/add")
    public ResponseEntity<Map<String, Object>> createBathroom(@RequestBody BathroomsDto bathroomsDto){

        BathroomsDto addBathroomDto = this.bathroomsService.addBathrooms(bathroomsDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + bathroomsDto.getNumberOfBathrooms() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body( response);

    }

    @PutMapping("/bathroom/update/{bathroomId}")
    public ResponseEntity<Map<String, Object>> updateBathroom(@RequestBody BathroomsDto bathroomsDto, @PathVariable("bathroomId")UUID bathroomId){

        BathroomsDto updateBathroom = this.bathroomsService.updateBathrooms(bathroomsDto,bathroomId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + bathroomsDto.getNumberOfBathrooms() + " Updated !");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body( response);
    }

    @DeleteMapping("/bathroom/delete/{bathroomId}")
    public ResponseEntity<Map<String, Object>> deleteBathroom(@PathVariable UUID bathroomId){
        this.bathroomsService.deleteBathrooms(bathroomId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement type deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/bathroom/all")
    public ResponseEntity<List<BathroomsDto>> getAllBathRooms(){
        return ResponseEntity.ok(this.bathroomsService.getAllBathromms());

    }


}
