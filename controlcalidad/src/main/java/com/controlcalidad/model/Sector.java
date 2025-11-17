package com.controlcalidad.model;

import com.controlcalidad.enums.SectorEnum;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sectores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SectorEnum sector;

}
