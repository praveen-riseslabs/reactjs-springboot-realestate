package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.metadataDtos.StatusDto;
import com.findprecon.service.metadataService.StatusService;
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
public class StatusController {

    @Autowired
    private StatusService statusService;

    @PostMapping("/status/add")
    public ResponseEntity<Map<String, Object>> createStatus(@RequestBody StatusDto statusDto){

        StatusDto addStatus = this.statusService.createStatus(statusDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + statusDto.getStatus() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }


    @PutMapping("/status/update/{statusId}")
    public ResponseEntity<Map<String, Object>> updateStatus(@RequestBody StatusDto statusDto, @PathVariable("statusId") UUID statusId){

        StatusDto updatedStatus = this.statusService.updateStatus(statusDto, statusId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Status: " + updatedStatus.getStatus() + " Updated!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }



    @DeleteMapping("/status/delete/{statusId}")
    public ResponseEntity<Map<String, Object>> deleteStatus(@PathVariable UUID statusId){
        this.statusService.deleteStatus(statusId);


        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement type deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/status/all")
    public ResponseEntity<List<StatusDto>> getAllStatus(){
        return ResponseEntity.ok(this.statusService.getAllStatus());

    }

    @GetMapping("/status/values")

    public ResponseEntity<List<StatusDto>> getAllStatusdropdown(){

        List<StatusDto> allStatus = this.statusService.getAllStatus();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "All statuses retrieved successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.OK.value());

        return ResponseEntity.status(HttpStatus.OK).body(allStatus);
    }
}
