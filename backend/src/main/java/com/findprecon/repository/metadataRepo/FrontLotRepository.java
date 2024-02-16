package com.findprecon.repository.metadataRepo;

import com.findprecon.model.metadata.FrontLotModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FrontLotRepository extends JpaRepository<FrontLotModel, UUID> {
}
