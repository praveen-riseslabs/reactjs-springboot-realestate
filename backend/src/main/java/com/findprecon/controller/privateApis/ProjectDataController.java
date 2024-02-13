package com.findprecon.controller.privateApis;

import com.findprecon.dto.ProjectDataDto;
import com.findprecon.service.ProjectDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/public/project-details")
public class ProjectDataController {
    @Autowired
    private ProjectDataService projectDataService;

    @PostMapping("/create")
    public ResponseEntity<ProjectDataDto> createProject(@RequestBody ProjectDataDto projectDataDto){
        ProjectDataDto createProjectDataDto = this.projectDataService.createProject(projectDataDto);

        return new ResponseEntity<>(createProjectDataDto, HttpStatus.CREATED);
    }

    @GetMapping("/get-details")
    public ResponseEntity<List<ProjectDataDto>> getAllProjects(){
        return ResponseEntity.ok(this.projectDataService.getAllProjects());
    }
}
