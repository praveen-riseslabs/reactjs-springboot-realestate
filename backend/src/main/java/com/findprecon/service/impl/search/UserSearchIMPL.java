package com.findprecon.service.impl.search;


import com.findprecon.dao.userSearch.SearchRequest;
import com.findprecon.dao.userSearch.UserSearchDao;
import com.findprecon.dto.UserDTO;
import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserSearchIMPL {
    private final UserSearchDao userSearchDao;

    public List<UserDTO> searchUsers(SearchRequest request) {
        List<RegistrationModel> registrationModels = userSearchDao.findAllCreteria(request);
        return registrationModels.stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN))
                .map(user -> {
                    List<Role> remainingRoles = Arrays.stream(Role.values())
                            .filter(role -> !role.equals(user.getRole()))
                            .collect(Collectors.toList());
                    return new UserDTO(
                            user.getName(),
                            user.getEmail(),
                            user.getCreatedAt(),
                            user.getRole(),
                            remainingRoles
                    );
                })
                .collect(Collectors.toList());
    }
}
