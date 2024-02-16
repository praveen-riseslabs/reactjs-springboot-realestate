package com.findprecon.controller.privateApis;

import com.findprecon.dto.ProjectDataDto;
import com.findprecon.model.ProjectData;
import com.findprecon.service.ProjectDataService;
import com.findprecon.service.impl.ProjectDataServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/public/project-details")
public class ProjectDataController {
    @Autowired
    private ProjectDataService projectDataService;
    @Autowired
    private ProjectDataServiceImpl ProjectDataService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createProject(@RequestBody ProjectDataDto projectDataDto){
        ProjectDataDto createProjectDataDto = this.projectDataService.createProject(projectDataDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Project data successfully saved");
        response.put("status", true);
        response.put("statusCode", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/get-all-projects")
    public ResponseEntity<List<ProjectDataDto>> getAllProjects(){
        return ResponseEntity.ok(this.projectDataService.getAllProjects());
    }

    @PostMapping("/upload-customers-data")
    public ResponseEntity<Map<String, Object>> uploadCustomersData(@RequestParam("file") MultipartFile file){
        this.projectDataService.saveProjectDataToDatabase(file);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Customers data uploaded and saved to database successfully");
        response.put("status", true);
        response.put("statusCode", HttpStatus.OK.value());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
