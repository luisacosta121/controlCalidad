package com.controlcalidad.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "controles_parametros")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ControlParametro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "control_calidad_id")
    private ControlCalidad controlCalidad;

    private String nombreParametro;

    // 0 = mal; 1 = regular; 2 = bien
    private Integer valor;

}
