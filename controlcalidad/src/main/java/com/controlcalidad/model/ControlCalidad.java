package com.controlcalidad.model;

import java.time.LocalDateTime;

import com.controlcalidad.enums.ValorControl;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "controles_calidad")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ControlCalidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "parametro_id")
    private ParametroCalidad parametro;   // ← CORRECTO

    @ManyToOne(optional = false)
    @JoinColumn(name = "bobina_id")
    private Bobina bobina;

    @ManyToOne(optional = false)
    @JoinColumn(name = "operador_id")
    private Usuario operador;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id")
    private Sector sector;

    private LocalDateTime fecha;

    private Integer porcentajeAprobado;

    private String notas;

    @Enumerated(EnumType.STRING)
    private ValorControl valor;
}
