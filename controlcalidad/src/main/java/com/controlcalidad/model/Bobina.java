package com.controlcalidad.model;

import java.time.LocalDateTime;

import com.controlcalidad.enums.EstadoCalidadBobina;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bobinas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bobina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numeroBobina;

    @ManyToOne(optional = false) // Cada bobina debe pertenecer a un lote
    @JoinColumn(name = "lote_id") // Clave foránea al lote
    private Lote lote;

    @ManyToOne(optional = false) // Cada bobina debe pertenecer a un sector 
    @JoinColumn(name = "sector_id") // Clave foránea al sector
    private Sector sector;

    private String maquina;

    private LocalDateTime fechaProduccion;

    @Enumerated(EnumType.STRING)
    private EstadoCalidadBobina estadoCalidad;

    private Boolean aprobada;

    private Boolean finalizado;

}
