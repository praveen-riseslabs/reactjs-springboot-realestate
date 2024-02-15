package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.BedroomsDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.BedroomsModel;
import com.findprecon.repository.metadataRepo.BedroomsRepository;
import com.findprecon.service.metadataService.BedroomsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BedroomsImpl implements BedroomsService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BedroomsRepository bedroomsRepository;
    @Override
    public BedroomsDto addBedrooms(BedroomsDto bedroomsDto) {

        BedroomsModel bedroomsModel = this.dtoBedroomModel(bedroomsDto);

        BedroomsModel savedBedroom = this.bedroomsRepository.save(bedroomsModel);

        return this.bedroomsModelToDto(savedBedroom);
    }

    @Override
    public BedroomsDto updateBedrooms(BedroomsDto bedroomsDto, UUID bedroomId) {

        BedroomsModel bedroomsModel = this.bedroomsRepository.findById(bedroomId)
                .orElseThrow(() ->new ResourceNotFoundException("Bedroom "," Id :"+bedroomId));
        bedroomsModel.setNumberOfBedrooms(bedroomsDto.getNumberOfBedrooms());

        BedroomsModel updateBedroom = this.bedroomsRepository.save(bedroomsModel);
        BedroomsDto bedroomsDto1 = this.bedroomsModelToDto(updateBedroom);

        return bedroomsDto1;
    }

    @Override
    public List<BedroomsDto> getAllBedrooms() {

        List <BedroomsModel> bedroomsModels = this.bedroomsRepository.findAll();

        List<BedroomsDto> bedroomsDtos = bedroomsModels.stream().map(bedroom ->this.bedroomsModelToDto(bedroom)).collect(Collectors.toList());

        return bedroomsDtos;
    }

    @Override
    public void deleteBedroom(UUID bedroomId) {

        BedroomsModel bedroomsModel = this.bedroomsRepository.findById(bedroomId)
                .orElseThrow(() -> new ResourceNotFoundException("Bedroom "," Id :"+bedroomId));

        this.bedroomsRepository.delete(bedroomsModel);

    }

    private BedroomsModel dtoBedroomModel(BedroomsDto bedroomsDto){

        BedroomsModel bedroomsModel = this.modelMapper.map(bedroomsDto,BedroomsModel.class);

        return bedroomsModel;
    }

    private BedroomsDto bedroomsModelToDto(BedroomsModel bedroomsModel){
        BedroomsDto bedroomsDto = this.modelMapper.map(bedroomsModel, BedroomsDto.class);

        return bedroomsDto;
    }
}
