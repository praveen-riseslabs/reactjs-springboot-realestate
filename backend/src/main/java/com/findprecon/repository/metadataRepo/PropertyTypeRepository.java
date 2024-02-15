package com.findprecon.repository.metadataRepo;

import com.findprecon.model.metadata.PropertyTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PropertyTypeRepository extends JpaRepository<PropertyTypeModel, UUID> {
}
