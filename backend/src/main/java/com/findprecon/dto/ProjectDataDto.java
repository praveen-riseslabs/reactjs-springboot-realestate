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
    private String statusValididty;
    private float commission;
    private String commissionPayment;
    private String DeveloperEmail;
    private String salesReprasentatives;
    private String address;
    private String salesOfficeTelePhone;
    private String modelName;
    private long modelCost;
    private int modelSize;
    private int story;
    private int forntLotSize;
    private int lotDepth;
    private int bedrooms;
    private float bathroomSize;
    private int garage;
    private String basement;
    private String basementType;
    private String inculsion;
    private String addOn;
    private String intersection;
    private int projectPhase;
    private int totalDeposit;
    private String depositSubmission;
    private long developmentCharges;
    private int maintananceFreeHold;
    private String maintananceAmount;
    private String developerSpecial;
    private long dhreSpcialIncentive;
    private String websiteLink;

}
