package com.findprecon.repository;

import com.findprecon.model.ProjectData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ProjectDataRepository extends JpaRepository<ProjectData, UUID> {

}
