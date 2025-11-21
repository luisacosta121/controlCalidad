package com.controlcalidad.model;

import com.controlcalidad.enums.SectorEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "maquinas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Maquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer numero;

    // Cada máquina pertenece a un sector
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SectorEnum sector;
}
