package com.findprecon.model;

import com.findprecon.enums.ProjectType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.lang.model.element.Name;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="project_data")
public class ProjectData {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UUID")
    @Column(nullable=false,updatable=false)
    private UUID id;

    @Column(name="PROJECT_NAME")
    private String projectName;


    @Enumerated(EnumType.STRING)
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

    @Column(name = "SALES_REPRESENTATIVE")
    private String salesRepresentative;

    @Column(name="SALES_OFFICE_TELEPHONE")
    private String salesOfficeTelephone;

    @Column(name = "PROPERTY_AREA")
    private String propertyArea;

    @OneToOne(cascade = CascadeType.ALL)
    private Metadata metadata;
//    private List<Metadata> metadata = new ArrayList<>();

}
