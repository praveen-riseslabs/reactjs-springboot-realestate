package com.findprecon.repository.metadataRepo;

import com.findprecon.model.metadata.StatusModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StatusRepository extends JpaRepository<StatusModel, UUID> {
}
