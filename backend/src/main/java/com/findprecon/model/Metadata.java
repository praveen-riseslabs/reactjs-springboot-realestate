package com.findprecon.model;

import com.findprecon.enums.Basement;
import com.findprecon.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="metadata")
public class Metadata {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UUID")
    @Column(nullable=false,updatable=false)
    private UUID id;

    @Column(name="PROPERTY_TYPE")
    private String propertyType;

    @Enumerated(EnumType.STRING)
    @Column(name="STATUS")
    private Status status;

    @Column(name="BEDROOMS")
    private int bedrooms;

    @Column(name="BATHROOMS")
    private int bathrooms;

    @Enumerated(EnumType.STRING)
    @Column(name="BASEMENT")
    private Basement basement;

    @Column(name="GARAGE")
    private int garage;

    @Column(name="FRONT_LOT")
    private int frontLot;
}
