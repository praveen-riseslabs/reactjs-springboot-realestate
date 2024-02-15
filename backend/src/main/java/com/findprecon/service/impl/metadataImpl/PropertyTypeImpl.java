package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.PropertyTypeDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.PropertyTypeModel;
import com.findprecon.repository.metadataRepo.PropertyTypeRepository;
import com.findprecon.service.metadataService.PropertyTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PropertyTypeImpl  implements PropertyTypeService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

    @Override
    public PropertyTypeDto createPropertyType(PropertyTypeDto propertyTypeDto) {

        PropertyTypeModel propertyTypeModel = this.dtoToPropertyTypeModel(propertyTypeDto);

        PropertyTypeModel savedProperty = this.propertyTypeRepository.save(propertyTypeModel);

        return this.propertyTypeModelToDto(savedProperty);
    }

    @Override
    public PropertyTypeDto updatePropertyType(PropertyTypeDto propertyTypeDto, UUID propertyId) {

        PropertyTypeModel propertyTypeModel = this.propertyTypeRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Propert Type"," Id : "+propertyId));
        propertyTypeModel.setPropertyField(propertyTypeDto.getPropertyField());

        PropertyTypeModel updateProperty = this.propertyTypeRepository.save(propertyTypeModel);

        PropertyTypeDto propertyTypeDto1 = this.propertyTypeModelToDto(updateProperty);

        return propertyTypeDto1;
    }

    @Override
    public List<PropertyTypeDto> getAllPropertyType() {
        List<PropertyTypeModel> propertyTypeModels = this.propertyTypeRepository.findAll();

        List<PropertyTypeDto> propertyTypeDtos = propertyTypeModels.stream().map(property -> this.propertyTypeModelToDto(property)).collect(Collectors.toList());

        return propertyTypeDtos;
    }

    @Override
    public void deletePropertyType(UUID propertyId) {

        PropertyTypeModel propertyTypeModel = this.propertyTypeRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Propert Type"," Id : "+propertyId));
        this.propertyTypeRepository.delete(propertyTypeModel);

    }

    private PropertyTypeModel dtoToPropertyTypeModel(PropertyTypeDto propertyTypeDto){
        PropertyTypeModel propertyTypeModel = this.modelMapper.map(propertyTypeDto,PropertyTypeModel.class);

        return propertyTypeModel;
    }

    private PropertyTypeDto propertyTypeModelToDto(PropertyTypeModel propertyTypeModel){

        PropertyTypeDto propertyTypeDto = this.modelMapper.map(propertyTypeModel,PropertyTypeDto.class);

        return propertyTypeDto;
    }

}
