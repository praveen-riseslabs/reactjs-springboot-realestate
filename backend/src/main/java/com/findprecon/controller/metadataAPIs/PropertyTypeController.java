package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.metadataDtos.PropertyTypeDto;
import com.findprecon.service.metadataService.PropertyTypeService;
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
public class PropertyTypeController {

    @Autowired
    private PropertyTypeService propertyTypeService;


    @PostMapping("/property/add")
    public ResponseEntity<Map<String, Object>> createPropertyType(@RequestBody PropertyTypeDto propertyTypeDto){

        PropertyTypeDto addPropertyType = this.propertyTypeService.createPropertyType(propertyTypeDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + propertyTypeDto.getPropertyField() + " added!!");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PutMapping("/property/update/{propertyId}")
    public ResponseEntity<Map<String, Object>> updatePropertyType(@RequestBody PropertyTypeDto propertyTypeDto, @PathVariable("propertyId") UUID propertyId){

        PropertyTypeDto updatedPropertyType = this.propertyTypeService.updatePropertyType(propertyTypeDto,propertyId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement field: " + propertyTypeDto.getPropertyField() + " Updated !");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body( response);

    }

    @DeleteMapping("/property/delete/{propertyId}")
    public ResponseEntity<Map<String, Object>> deletePropertyType(@PathVariable UUID propertyId){
        this.propertyTypeService.deletePropertyType(propertyId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Basement type deleted successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/property/all")
    public ResponseEntity<List<PropertyTypeDto>> getAllPropertyType(){
        return ResponseEntity.ok(this.propertyTypeService.getAllPropertyType());

    }
}
