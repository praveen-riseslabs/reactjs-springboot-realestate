package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.FrontLotDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.BedroomsModel;
import com.findprecon.model.metadata.FrontLotModel;
import com.findprecon.repository.metadataRepo.FrontLotRepository;
import com.findprecon.service.metadataService.FrontLotService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FrontLotImpl implements FrontLotService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FrontLotRepository frontLotRepository;




    @Override
    public FrontLotDto addFrontLot(FrontLotDto frontLotDto) {

        FrontLotModel frontLotModel = this.dtoToFrontLotModel(frontLotDto);

        FrontLotModel savedFrontLot = this.frontLotRepository.save(frontLotModel);

        return this.frontLotModelToDto(savedFrontLot);
    }

    @Override
    public FrontLotDto updateFrontLot(FrontLotDto frontLotDto, UUID frontLotId) {

        FrontLotModel frontLotModel = this.frontLotRepository.findById(frontLotId)
                .orElseThrow(() -> new ResourceNotFoundException("FrontLot"," Id : "+frontLotId));

        frontLotModel.setFrontLot(frontLotDto.getFrontLot());

        FrontLotModel updateFrontLot = this.frontLotRepository.save(frontLotModel);
        FrontLotDto frontLotDto1 = this.frontLotModelToDto(updateFrontLot);

        return frontLotDto1;
    }

    @Override
    public List<FrontLotDto> getAllFrontLot() {

        List<FrontLotModel> frontLotModels = frontLotRepository.findAll();

        List<FrontLotDto> frontLotDtos = frontLotModels.stream().map(frontLot -> this.frontLotModelToDto(frontLot)).collect(Collectors.toList());

        return frontLotDtos;
    }

    @Override
    public void deleteFrontLot(UUID frontLotId) {
        FrontLotModel frontLotModel =this.frontLotRepository.findById(frontLotId)
                .orElseThrow(() -> new ResourceNotFoundException("frontLot "," Id :"+frontLotId));
        this.frontLotRepository.delete(frontLotModel);

    }

    private FrontLotModel dtoToFrontLotModel (FrontLotDto frontLotDto){

        FrontLotModel frontLotModel = this.modelMapper.map(frontLotDto, FrontLotModel.class);

        return frontLotModel;
    }

    private FrontLotDto frontLotModelToDto (FrontLotModel frontLot){

        FrontLotDto frontLotDto = this.modelMapper.map(frontLot, FrontLotDto.class);

        return frontLotDto;
    }
}
