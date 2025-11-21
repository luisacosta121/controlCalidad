package com.controlcalidad.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearBobinaConControlesDTO {
    private Long procesoId; // ID de la bobina del proceso
    private Long operadorId;
    private Long ayudante1Id;
    private Long ayudante2Id;
    private Map<String, String> controles; // Map de nombreParametro -> valor (BIEN, REGULAR, MAL)
}
