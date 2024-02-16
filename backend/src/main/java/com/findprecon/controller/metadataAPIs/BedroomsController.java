package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.metadataDtos.BedroomsDto;
import com.findprecon.service.metadataService.BedroomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/metadata")
public class BedroomsController {

    @Autowired
    private BedroomsService bedroomsService;



    @PostMapping("/bedroom/add")
    public ResponseEntity<Map<String, Object>> createBedroom(@RequestBody BedroomsDto bedroomsDto){

        BedroomsDto addBedrooms = this.bedroomsService.addBedrooms(bedroomsDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " +bedroomsDto.getNumberOfBedrooms() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PutMapping("/bedroom/update/{bedroomId}")
    public ResponseEntity<Map<String, Object>> updateBedroom(@RequestBody BedroomsDto bedroomsDto, @PathVariable("bedroomId") UUID bedroomId){

        BedroomsDto updatedBedrooms = this.bedroomsService.updateBedrooms(bedroomsDto,bedroomId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + bedroomsDto.getNumberOfBedrooms() + " Updated !");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/bedroom/delete/{bedroomId}")
    public ResponseEntity<Map<String, Object>> deleteBedroom(@PathVariable UUID bedroomId){
        this.bedroomsService.deleteBedroom(bedroomId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement type deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/bedroom/all")
    public ResponseEntity<List<BedroomsDto>> getAllBedrooms(){
        return ResponseEntity.ok(this.bedroomsService.getAllBedrooms());

    }

}
