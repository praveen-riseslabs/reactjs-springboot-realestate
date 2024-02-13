package com.findprecon.dto;

import com.findprecon.enums.ProjectType;
import com.findprecon.model.Metadata;
import com.findprecon.model.ProjectData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDataDto {

    private UUID id;

    private String projectName;

    private ProjectType projectType;

    private Date projectClosingYear;

    private double price;

    private double customerSpecialIncentive;

    private double commission;

    private double brokerageSpecialIncentive;

    private String developer;

    private double developmentFees;

    private String developerEmail;

    private String address;

    private String salesRepresentative;

    private String salesOfficeTelephone;

    private String propertyArea;

    private Metadata metadata;
}
