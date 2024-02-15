package com.findprecon.dto;

import com.findprecon.enums.Basement;
import com.findprecon.enums.ProjectType;
import com.findprecon.enums.Status;
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

    private UUID id;

    @Column(name="PROJECT_NAME")
    private String projectName;

    @Column(name="PROJECT_TYPE")
    private ProjectType projectType;

    @Column(name="PROJECT_CLOSING_YEAR")
    private Date projectClosingYear;

    @Column(name="PRICE")
    private double price;

    @Column(name="CUSTOMER_SPECIAL_INCENTIVE")
    private double customerSpecialIncentive;

    @Column(name="COMMISSION")
    private double commission;

    @Column(name="BROKERAGE_SPECIAL_INCENTIVE")
    private double brokerageSpecialIncentive;

    @Column(name = "DEVELOPER")
    private String developer;

    @Column(name="DEVELOPMENT_FEES")
    private double developmentFees;

    @Column(name="DEVELOPER_EMAIL")
    private String developerEmail;


    @Column(name = "ADDRESS")
    private String address;

    @Column(name="SALES_OFFICE_TELEPHONE")
    private String salesRepresentative;

    @Column(name="SALES_OFFICE_TELEPHONE")
    private String salesOfficeTelephone;

    @Column(name="PROPERTY_AREA")
    private String propertyArea;

    @Column(name="PROPERTY_TYPE")
    private String propertyType;

    @Column(name="STATUS")
    private Status status;

    @Column(name="BEDROOMS")
    private int bedrooms;

    @Column(name="BATHROOMS")
    private int bathrooms;

    @Column(name="BASEMENT")
    private Basement basement;

    @Column(name="GARAGE")
    private int garage;

    @Column(name="FRONT_LOT")
    private int frontLot;
}
