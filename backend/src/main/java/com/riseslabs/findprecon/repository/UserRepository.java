package com.riseslabs.findprecon.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.riseslabs.findprecon.model.RegistrationModel;

@Repository
public interface UserRepository extends JpaRepository<RegistrationModel, UUID>{

    boolean existsByEmail(String email);

    Optional<RegistrationModel> findFirstByEmail(String email);

    RegistrationModel findByEmail(String email);

    RegistrationModel findByResetPasswordToken(String token);
}
