package com.controlcalidad.model;

import java.time.LocalDateTime;

import com.controlcalidad.enums.EstadoLote;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numeroLote;

    @ManyToOne(optional = true)
    @JoinColumn(name = "producto_id", nullable = true)
    private Producto producto;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    @Enumerated(EnumType.STRING)
    private EstadoLote estado;

}
