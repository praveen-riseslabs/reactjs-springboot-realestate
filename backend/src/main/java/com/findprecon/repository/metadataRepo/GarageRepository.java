package com.findprecon.repository.metadataRepo;

import com.findprecon.model.metadata.GarageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GarageRepository extends JpaRepository<GarageModel, UUID> {
}
