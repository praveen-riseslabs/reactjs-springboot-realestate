package com.findprecon.dao.userSearch;

import com.findprecon.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest {
    private String name;
    private String email;
    private Role role;
}
