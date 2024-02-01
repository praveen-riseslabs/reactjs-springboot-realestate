package com.findprecon.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.findprecon.model.RegistrationModel;

@Repository
public interface UserRepository extends JpaRepository<RegistrationModel, UUID>{

    boolean existsByEmail(String email);

    RegistrationModel findFirstByEmail(String email);

    RegistrationModel findByEmail(String email);

    RegistrationModel findByResetPasswordToken(String token);
}
