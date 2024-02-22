package com.findprecon.service.impl.search;

import com.findprecon.dao.projectSearch.ProjectSearchDao;
import com.findprecon.dao.projectSearch.ProjectSearchRequest;
import com.findprecon.model.ProjectData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectSearchIMPL {
    private final ProjectSearchDao projectSearchDao;

    public List<ProjectData> searchUsers(ProjectSearchRequest request) {
        return projectSearchDao.findAllCriteria(request);
    }

}
