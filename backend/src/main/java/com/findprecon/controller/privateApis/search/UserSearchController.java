package com.findprecon.controller.privateApis.search;

import com.findprecon.dao.userSearch.SearchRequest;
import com.findprecon.dto.UserDTO;
import com.findprecon.service.impl.search.UserSearchIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/private/users")
@RequiredArgsConstructor
public class UserSearchController {
    private final UserSearchIMPL userSearchIMPL;

    @GetMapping("/search")
    public List<UserDTO> searchUsers(@ModelAttribute SearchRequest request) {
        return userSearchIMPL.searchUsers(request);
    }
}
