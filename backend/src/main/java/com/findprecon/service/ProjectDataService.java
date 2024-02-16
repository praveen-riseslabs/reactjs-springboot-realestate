package com.findprecon.service;

import com.findprecon.dto.ProjectDataDto;
import com.findprecon.model.ProjectData;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectDataService {

    ProjectDataDto createProject(ProjectDataDto projectDataDto);

    List<ProjectDataDto> getAllProjects();



    void saveProjectDataToDatabase(MultipartFile file);
}
