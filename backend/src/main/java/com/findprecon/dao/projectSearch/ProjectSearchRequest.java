package com.findprecon.dao.projectSearch;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectSearchRequest {
    private String projectName;
    private String propertyType;
    private int totalDeposit;
    private String propertyArea;
    private int forntLotSize;
    private int garage;
    private String basement;
    private String basementType;
    private String developer;
    private int propClosingYear;
}
