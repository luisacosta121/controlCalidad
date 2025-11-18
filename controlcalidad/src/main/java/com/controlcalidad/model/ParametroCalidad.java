package com.controlcalidad.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parametros_calidad")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParametroCalidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_parametro", nullable = false)
    private String nombreParametro;

    @Column(nullable = false)
    private Integer orden;

    @ManyToOne
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;
}
