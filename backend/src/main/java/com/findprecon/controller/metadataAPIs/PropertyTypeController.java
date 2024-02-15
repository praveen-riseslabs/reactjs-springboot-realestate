package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;

import com.findprecon.dto.metadataDtos.PropertyTypeDto;
import com.findprecon.service.metadataService.PropertyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/metadata")
public class PropertyTypeController {

    @Autowired
    private PropertyTypeService propertyTypeService;


    @PostMapping("/property/add")
    public ResponseEntity<PropertyTypeDto> createPropertyType(@RequestBody PropertyTypeDto propertyTypeDto){

        PropertyTypeDto addPropertyType = this.propertyTypeService.createPropertyType(propertyTypeDto);

        return new ResponseEntity<>(addPropertyType, HttpStatus.CREATED);

    }

    @PutMapping("/property/update/{propertyId}")
    public ResponseEntity<PropertyTypeDto> updatePropertyType(@RequestBody PropertyTypeDto propertyTypeDto, @PathVariable("propertyId") UUID propertyId){

        PropertyTypeDto updatedPropertyType = this.propertyTypeService.updatePropertyType(propertyTypeDto,propertyId);

        return ResponseEntity.ok(updatedPropertyType);
    }

    @DeleteMapping("/property/delete/{garageId}")
    public ResponseEntity<ApiResponse> deletePropertyType(@PathVariable UUID propertyId){
        this.propertyTypeService.deletePropertyType(propertyId);

        return new ResponseEntity(new ApiResponse("Bedroom deleted successfully", true),HttpStatus.OK);

    }

    @GetMapping("/property/all")
    public ResponseEntity<List<PropertyTypeDto>> getAllPropertyType(){
        return ResponseEntity.ok(this.propertyTypeService.getAllPropertyType());

    }
}
