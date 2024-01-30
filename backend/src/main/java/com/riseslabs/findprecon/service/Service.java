package com.riseslabs.findprecon.service;

import com.riseslabs.findprecon.dto.RegisterDTO;
import com.riseslabs.findprecon.model.RegistrationModel;


@org.springframework.stereotype.Service
public interface Service {


	RegistrationModel registerUser(RegisterDTO registerDTO);
}
