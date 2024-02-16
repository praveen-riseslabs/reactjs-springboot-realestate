package com.findprecon.service.metadataService;

import com.findprecon.dto.metadataDtos.PropertyTypeDto;

import java.util.List;
import java.util.UUID;

public interface PropertyTypeService {

    PropertyTypeDto createPropertyType(PropertyTypeDto propertyTypeDto);

    PropertyTypeDto updatePropertyType(PropertyTypeDto propertyTypeDto, UUID propertyId);

    List<PropertyTypeDto> getAllPropertyType();

    void deletePropertyType(UUID propertyId);
}
