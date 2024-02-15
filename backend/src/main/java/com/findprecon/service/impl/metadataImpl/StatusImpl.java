package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.StatusDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.StatusModel;
import com.findprecon.repository.metadataRepo.StatusRepository;
import com.findprecon.service.metadataService.StatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StatusImpl implements StatusService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public StatusDto createStatus(StatusDto statusDto) {

        StatusModel statusModel = this.dtoToStatusModel(statusDto);

        StatusModel savedStatus = this.statusRepository.save(statusModel);

        return this.statusModelToDto(savedStatus);
    }

    @Override
    public StatusDto updateStatus(StatusDto statusDto, UUID statusId) {

        StatusModel statusModel = this.statusRepository.findById(statusId)
                .orElseThrow(() -> new ResourceNotFoundException(" Status ","ID "+statusId));

        statusModel.setStatus(statusDto.getStatus());

        StatusModel updateStatus = this.statusRepository.save(statusModel);

        StatusDto statusDto1 = this.statusModelToDto(updateStatus);

        return statusDto1;
    }

    @Override
    public List<StatusDto> getAllStatus() {

        List<StatusModel> statusModels = this.statusRepository.findAll();

        List<StatusDto> statusDtos = statusModels.stream().map(status -> this.statusModelToDto(status)).collect(Collectors.toList());

        return statusDtos;
    }

    @Override
    public void deleteStatus(UUID statusID) {

        StatusModel statusModel = this.statusRepository.findById(statusID)
                .orElseThrow(() -> new ResourceNotFoundException(" Status ","ID "+statusID));

        this.statusRepository.delete(statusModel);

    }

    private StatusModel dtoToStatusModel(StatusDto statusDto){

        StatusModel statusModel = this.modelMapper.map(statusDto,StatusModel.class);

        return statusModel;
    }

    private StatusDto statusModelToDto(StatusModel statusModel){

        StatusDto statusDto = this.modelMapper.map(statusModel,StatusDto.class);

        return statusDto;
    }
}
