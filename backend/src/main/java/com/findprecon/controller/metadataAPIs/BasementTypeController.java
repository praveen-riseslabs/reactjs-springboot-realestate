package com.findprecon.controller.metadataAPIs;

import com.findprecon.dto.Response.ApiResponse;
import com.findprecon.dto.metadataDtos.BasementTypeDto;
import com.findprecon.service.metadataService.BasementTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/metadata")
public class BasementTypeController {

    @Autowired
    private BasementTypeService basementTypeService;

    @PostMapping("/create/basement")
    public ResponseEntity<BasementTypeDto> createBasement (@RequestBody BasementTypeDto basementTypeDto){

        BasementTypeDto creteBasementDto = this.basementTypeService.createBasementType(basementTypeDto);

        return new ResponseEntity<>(creteBasementDto, HttpStatus.CREATED);
    }
    @PutMapping("/update/basement/{basementId}")
    public ResponseEntity <BasementTypeDto> updateBasement(@RequestBody BasementTypeDto basementTypeDto, @PathVariable("basementId")UUID basementId){
        BasementTypeDto updateBasement = this.basementTypeService.updateBasementType(basementTypeDto,basementId);

        return ResponseEntity.ok(updateBasement);
    }
    @DeleteMapping("/delete/basement/{basementId}")
    public ResponseEntity<ApiResponse> deleteBasementType(@PathVariable UUID basementId){
        this.basementTypeService.deleteBasementType(basementId);

        return new ResponseEntity(new ApiResponse("Basement type deleted successfully", true), HttpStatus.OK);

    }

    @GetMapping("/basement/all")
    public ResponseEntity<List<BasementTypeDto>> getAllBasements(){
        return ResponseEntity.ok(this.basementTypeService.getAllBasementTypes());
    }





}
