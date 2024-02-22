package com.findprecon.controller.privateApis.search;

import com.findprecon.dao.projectSearch.ProjectSearchRequest;
import com.findprecon.model.ProjectData;
import com.findprecon.service.impl.search.ProjectSearchIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/private/projects")
@RequiredArgsConstructor
public class ProjectSearchController {
    @Autowired
    private ProjectSearchIMPL projectSearchIMPL;
    @GetMapping("/search")
    public List<ProjectData> searchUsers(@ModelAttribute ProjectSearchRequest request) {
        return projectSearchIMPL.searchUsers(request);
    }
}
