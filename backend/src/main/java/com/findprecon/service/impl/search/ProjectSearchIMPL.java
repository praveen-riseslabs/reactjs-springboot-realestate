package com.findprecon.service.impl.search;

import com.findprecon.dao.projectSearch.ProjectSearchDao;
import com.findprecon.dao.projectSearch.ProjectSearchRequest;
import com.findprecon.model.ProjectData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectSearchIMPL {

    @Autowired
    private final ProjectSearchDao projectSearchDao;

    public List<ProjectData> searchUsers(ProjectSearchRequest request) {
        return projectSearchDao.findAllCreteria(request);
    }

}