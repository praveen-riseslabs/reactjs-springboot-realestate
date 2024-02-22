package com.findprecon.model.metadata;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Table(
        name="front_lot",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "frontLot",
                        columnNames = "frontLot"
                )
        }
)
public class FrontLotModel {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UUID")
    @Column(nullable=false,updatable=false)
    private UUID id;

    @Min(value = 0, message = "Front Lot cannot be negative")
    @Max(value = 1000, message = "Front Lot cannot be greater than 1000")
    private int frontLot;
}
