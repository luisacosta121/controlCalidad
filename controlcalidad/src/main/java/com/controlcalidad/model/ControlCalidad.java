package com.controlcalidad.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @OneToMany(mappedBy = "controlCalidad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ControlParametro> parametros;

}
