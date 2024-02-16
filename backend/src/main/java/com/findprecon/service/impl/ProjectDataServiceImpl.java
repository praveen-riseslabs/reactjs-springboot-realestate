package com.findprecon.service.impl;

import com.findprecon.dto.ProjectDataDto;
import com.findprecon.model.ProjectData;
import com.findprecon.repository.ProjectDataRepository;
import com.findprecon.service.ProjectDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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






    @Override
    public void saveProjectDataToDatabase(MultipartFile file) {
        if(ExcelUploadService.isValidExcelFile(file)){
            try {
                List<ProjectData> customers = ExcelUploadService.getCustomersDataFromExcel(file.getInputStream());
                this.projectDataRepository.saveAll(customers);
            } catch (IOException e) {
                throw new IllegalArgumentException("The file is not a valid excel file");
            }
        }
    }
}
