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
@Table
        (
                name="bathroom",
                uniqueConstraints = {
                        @UniqueConstraint(
                                name = "numberOfBathrooms",
                                columnNames = "numberOfBathrooms"
                        )
                }
        )
public class BathroomsModel {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UUID")
    @Column(nullable=false,updatable=false)
    private UUID id;

    private float numberOfBathrooms;
}
