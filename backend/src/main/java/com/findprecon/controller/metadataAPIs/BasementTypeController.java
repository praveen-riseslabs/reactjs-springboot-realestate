package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.BasementTypeDto;
import com.findprecon.service.metadataService.BasementTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/metadata")
public class BasementTypeController {

    @Autowired
    private BasementTypeService basementTypeService;

    @PostMapping("/create/basement")
    public ResponseEntity<Map<String, Object>> createBasement(@RequestBody BasementTypeDto basementTypeDto){
        BasementTypeDto createdBasementDto = this.basementTypeService.createBasementType(basementTypeDto);

      try{
          Map<String, Object> response = new HashMap<>();
          response.put("message", "Basement field: " + basementTypeDto.getBasementField() + " added!!");
          response.put("status", true);
          response.put("statusCode", HttpStatus.CREATED.value());

          return ResponseEntity.status(HttpStatus.CREATED).body(response);

      }catch (Exception e){
          Map<String, Object> response = new HashMap<>();
          response.put("message", "Basement field: " + basementTypeDto.getBasementField() + " already exists !!");
          response.put("status", false);
          response.put("statusCode", HttpStatus.BAD_REQUEST.value());

          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

      }
    }

    @PutMapping("/update/basement/{basementId}")
    public ResponseEntity<Map<String, Object>> updateBasement(@RequestBody BasementTypeDto basementTypeDto, @PathVariable("basementId") UUID basementId){
        BasementTypeDto updatedBasementDto = this.basementTypeService.updateBasementType(basementTypeDto, basementId);
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Basement field: " + basementTypeDto.getBasementField() + " updated!!");
            response.put("status", true);
            response.put("statusCode", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Basement field: " + basementTypeDto.getBasementField() + " already exists!!");
            response.put("status", false);
            response.put("statusCode", HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/delete/basement/{basementId}")
    public ResponseEntity<Map<String, Object>> deleteBasementType(@PathVariable UUID basementId){
        this.basementTypeService.deleteBasementType(basementId);

        try {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Basement type deleted successfully");
            response.put("status", true);
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Basement field unable to delete!!");
            response.put("status", false);
            response.put("statusCode", HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @GetMapping("/basement/all")
    public ResponseEntity<List<BasementTypeDto>> getAllBasements(){
        return ResponseEntity.ok(this.basementTypeService.getAllBasementTypes());
    }




}
