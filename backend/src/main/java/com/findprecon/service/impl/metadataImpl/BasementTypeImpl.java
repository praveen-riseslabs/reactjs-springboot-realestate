package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.BasementTypeDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.BasementTypeModel;
import com.findprecon.repository.metadataRepo.BasementTypeRepository;
import com.findprecon.service.metadataService.BasementTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BasementTypeImpl implements BasementTypeService {

    @Autowired
    private BasementTypeRepository basementTypeRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BasementTypeDto createBasementType(BasementTypeDto basementTypeDto) {

        BasementTypeModel basementTypeModel = this.dtoToBasementModel(basementTypeDto);

        BasementTypeModel savedBasementType = this.basementTypeRepository.save(basementTypeModel);

        return this.basementModelToDto(savedBasementType);
    }

    @Override
    public BasementTypeDto updateBasementType(BasementTypeDto basementTypeDto, UUID basementId) {

        BasementTypeModel basementTypeModel = this.basementTypeRepository.findById(basementId)
                .orElseThrow(() -> new ResourceNotFoundException("BasementType", "Id "+basementId));

        basementTypeModel.setBasementField(basementTypeDto.getBasementField());

        BasementTypeModel updateBasement = this.basementTypeRepository.save(basementTypeModel);

        BasementTypeDto basementTypeDto1 = this.basementModelToDto(updateBasement);

        return basementTypeDto1;
    }

    @Override
    public void deleteBasementType(UUID basementId) {

        BasementTypeModel basementTypeModel = this.basementTypeRepository.findById(basementId)
                .orElseThrow(() -> new ResourceNotFoundException("BasementType", "Id "+basementId));

        this.basementTypeRepository.delete(basementTypeModel);

    }

    @Override
    public List<BasementTypeDto> getAllBasementTypes() {

        List<BasementTypeModel> basementTypeModels = this.basementTypeRepository.findAll();

        List<BasementTypeDto> basementTypeDtos = basementTypeModels.stream().map(basement -> this.basementModelToDto(basement)).collect(Collectors.toList());
        return basementTypeDtos;
    }

    

    private BasementTypeModel dtoToBasementModel(BasementTypeDto basementTypeDto){
        BasementTypeModel basement = this.modelMapper.map(basementTypeDto,BasementTypeModel.class);

        return basement;
    }

    private BasementTypeDto basementModelToDto(BasementTypeModel basementTypeModel){
        BasementTypeDto basementTypeDto = this.modelMapper.map(basementTypeModel,BasementTypeDto.class);

        return basementTypeDto;
    }
}
