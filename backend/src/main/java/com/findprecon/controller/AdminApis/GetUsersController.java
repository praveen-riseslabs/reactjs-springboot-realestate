package com.findprecon.controller.AdminApis;

import com.findprecon.dto.UserDTO;
import com.findprecon.service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/private")
@RequiredArgsConstructor
public class GetUsersController {


    @Autowired
    private Service service;

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return service.getAllUsers();
    }

}
