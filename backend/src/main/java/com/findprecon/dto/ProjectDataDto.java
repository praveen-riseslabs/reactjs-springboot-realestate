package com.findprecon.dto;


import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDataDto {

    private String propertyType;
    private String propertyArea;
    private String projectName;
    private String developer;
    private String propClosing;
    private int propClosingYear;
    private String status;
    private float commission;
    private String commissionPayment;
    private String developerEmail;
    private String salesReprasentatives;
    private String address;
    private String salesOfficeTelephone;
    private String modelName;
    private long modelCost;
    private int modelSize;
    private int story;
    private int frontLotSize;
    private int lotDepth;
    private int bedrooms;
    private float bathrooms;
    private int garage;
    private String basement;
    private String basementType;
    private String inclusion;
    private String addOn;
    private String intersection;
    private int projectPhase;
    private int totalDeposit;
    private String depositSubmission;
    private long developmentCharges;
    private int maintainanceFreehold;
    private String maintainanceAmount;
    private String developerSpecialIncentive;
    private long dhreSpecialIncentive;
    private String websiteLink;

}
