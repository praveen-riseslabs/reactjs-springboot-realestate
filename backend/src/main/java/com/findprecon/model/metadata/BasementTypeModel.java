package com.findprecon.model.metadata;

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
@Table(name="basement_type")
public class BasementTypeModel {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UUID")
    @Column(nullable=false,updatable=false)
    private UUID id;

    private String basementField;

}
