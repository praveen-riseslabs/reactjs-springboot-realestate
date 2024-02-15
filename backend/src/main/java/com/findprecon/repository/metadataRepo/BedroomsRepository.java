package com.findprecon.repository.metadataRepo;

import com.findprecon.model.metadata.BedroomsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BedroomsRepository extends JpaRepository<BedroomsModel, UUID> {
}
