package com.findprecon.service;

import com.findprecon.dto.RegisterDTO;
import com.findprecon.dto.UserDTO;
import com.findprecon.model.RegistrationModel;


@org.springframework.stereotype.Service
public interface Service {

	RegistrationModel registerUser(RegisterDTO registerDTO);

}
