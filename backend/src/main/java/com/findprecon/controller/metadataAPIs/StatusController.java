package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.StatusDto;
import com.findprecon.service.metadataService.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @PostMapping("/status/add")
    public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto){

        StatusDto addStatus = this.statusService.createStatus(statusDto);

        return new ResponseEntity<>(addStatus, HttpStatus.CREATED);

    }

    @PutMapping("/status/update/{statusId}")
    public ResponseEntity<StatusDto> updateStatus(@RequestBody StatusDto statusDto, @PathVariable("statusId") UUID statusId){

        StatusDto updatedStatus = this.statusService.updateStatus(statusDto,statusId);

        return ResponseEntity.ok(updatedStatus);
    }

    @DeleteMapping("/status/delete/{garageId}")
    public ResponseEntity<ApiResponse> deleteStatus(@PathVariable UUID statusId){
        this.statusService.deleteStatus(statusId);

        return new ResponseEntity(new ApiResponse("Bedroom deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/status/all")
    public ResponseEntity<List<StatusDto>> getAllStatus(){
        return ResponseEntity.ok(this.statusService.getAllStatus());

    }
}
