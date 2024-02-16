package com.findprecon.service.impl.metadataImpl;

import com.findprecon.dto.metadataDtos.GarageDto;
import com.findprecon.exception.ResourceNotFoundException;
import com.findprecon.model.metadata.GarageModel;
import com.findprecon.repository.metadataRepo.GarageRepository;
import com.findprecon.service.metadataService.GarageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GarageImpl implements GarageService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private GarageRepository garageRepository;


    @Override
    public GarageDto createGarage(GarageDto garageDto) {

        GarageModel garageModel = this.dtoToGarageModel(garageDto);

        GarageModel savedGarage = this.garageRepository.save(garageModel);

        return this.garageToDto(savedGarage);
    }

    @Override
    public GarageDto updateGarage(GarageDto garageDto, UUID garageId) {

        GarageModel garageModel = this.garageRepository.findById((garageId))
                .orElseThrow(() -> new ResourceNotFoundException("Garage ","Id : "+garageId));

        garageModel.setGarage(garageDto.getGarage());

        GarageModel updateGarage = this.garageRepository.save(garageModel);

        GarageDto garageDto1 = this.garageToDto(updateGarage);

        return garageDto1;
    }

    @Override
    public List<GarageDto> getAllGarages() {
        List<GarageModel> garageModels = this.garageRepository.findAll();

        List<GarageDto> garageDtos = garageModels.stream().map( garage -> this.garageToDto(garage)).collect(Collectors.toList());

        return garageDtos;
    }

    @Override
    public void deleteGarage(UUID garageId) {

        GarageModel garageModel = this.garageRepository.findById((garageId))
                .orElseThrow(() -> new ResourceNotFoundException("Garage ","Id : "+garageId));
        this.garageRepository.delete(garageModel);
    }

    private GarageModel dtoToGarageModel(GarageDto garageDto){

        GarageModel garageModel = this.modelMapper.map(garageDto,GarageModel.class);

        return garageModel;
    }

    private GarageDto garageToDto(GarageModel garageModel){

        GarageDto garageDto = this.modelMapper.map(garageModel, GarageDto.class);

        return garageDto;
    }
}
