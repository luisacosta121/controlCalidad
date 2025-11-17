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

    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id")
    private Sector sector;

    private String nombreParametro;

    // Muestra el orden en que se deben evaluar los parámetros
    private Integer orden;

}
