package com.controlcalidad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProcesoListadoDTO {
    private Long id;
    private String sector;
    private String maquina;
    private String lote;
    private String trabajo;
}
