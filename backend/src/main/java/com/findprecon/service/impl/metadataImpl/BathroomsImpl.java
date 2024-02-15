package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.BathroomsDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.BathroomsModel;
import com.findprecon.repository.metadataRepo.BathroomsRepository;
import com.findprecon.service.metadataService.BathroomsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BathroomsImpl implements BathroomsService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BathroomsRepository bathroomsRepository;
    @Override
    public BathroomsDto addBathrooms(BathroomsDto bathroomsDto) {

        BathroomsModel bathroomsModel = this.dtoToBathroomsModel(bathroomsDto);

        BathroomsModel savedBathrooms = this.bathroomsRepository.save(bathroomsModel);

        return this.bathroomsModelToDto(savedBathrooms);
    }

    @Override
    public BathroomsDto updateBathrooms(BathroomsDto bathroomsDto, UUID bathroomId) {

        BathroomsModel bathroomsModel = this.bathroomsRepository.findById(bathroomId)
                .orElseThrow(() -> new ResourceNotFoundException("Bathroom ","Id : "+bathroomId));

        bathroomsModel.setNumberOfBathrooms(bathroomsDto.getNumberOfBathrooms());

        BathroomsModel updateBathroom = this.bathroomsRepository.save(bathroomsModel);
        BathroomsDto bathroomsDto1 = this.bathroomsModelToDto(updateBathroom);


        return bathroomsDto1;
    }

    @Override
    public void deleteBathrooms(UUID bathroomId) {

        BathroomsModel bathroomsModel = this.bathroomsRepository.findById(bathroomId)
                .orElseThrow(() -> new ResourceNotFoundException("Bathroom ","Id : "+bathroomId));

        this.bathroomsRepository.delete(bathroomsModel);

    }

    @Override
    public List<BathroomsDto> getAllBathromms() {

        List<BathroomsModel> bathroomsModels = this.bathroomsRepository.findAll();

        List<BathroomsDto> bathroomsDtos = bathroomsModels.stream().map(bathroom -> this.bathroomsModelToDto(bathroom)).collect(Collectors.toList());

        return bathroomsDtos;
    }

    private BathroomsModel dtoToBathroomsModel(BathroomsDto bathroomsDto){
        BathroomsModel bathroomsModel = this.modelMapper.map(bathroomsDto,BathroomsModel.class);

        return bathroomsModel;
    }

    private BathroomsDto bathroomsModelToDto(BathroomsModel bathroomsModel){
        BathroomsDto bathroomsDto = this.modelMapper.map(bathroomsModel,BathroomsDto.class);

        return bathroomsDto;
    }
}
