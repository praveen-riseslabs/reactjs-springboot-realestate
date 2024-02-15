package com.findprecon.service.impl;

import com.findprecon.dto.ProjectDataDto;
import com.findprecon.model.ProjectData;
import com.findprecon.repository.ProjectDataRepository;
import com.findprecon.service.ProjectDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectDataServiceImpl implements ProjectDataService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProjectDataRepository projectDataRepository;


    @Override
    public ProjectDataDto createProject(ProjectDataDto projectDataDto) {

        ProjectData project = this.dtotoProjectData(projectDataDto);
        ProjectData savedProject = this.projectDataRepository.save(project);
        return this.projectDatatoDto(savedProject);
    }

    @Override
    public List<ProjectDataDto> getAllProjects() {

        List<ProjectData> projects = this.projectDataRepository.findAll();

        List<ProjectDataDto> projectDataDtos = projects.stream().map(project-> this.projectDatatoDto(project)).collect(Collectors.toList());

        return projectDataDtos;
    }


    private ProjectData dtotoProjectData(ProjectDataDto projectDataDto){
        ProjectData project = this.modelMapper.map(projectDataDto,ProjectData.class);

        return project;
    }

    private ProjectDataDto projectDatatoDto(ProjectData projectData){
        ProjectDataDto projectDto = this.modelMapper.map(projectData,ProjectDataDto.class);

        return projectDto;
    }
}
