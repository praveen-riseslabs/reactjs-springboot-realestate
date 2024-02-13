package com.findprecon.service;

import com.findprecon.dto.ProjectDataDto;

import java.util.List;

public interface ProjectDataService {

    ProjectDataDto createProject(ProjectDataDto projectDataDto);

    List<ProjectDataDto> getAllProjects();
}
