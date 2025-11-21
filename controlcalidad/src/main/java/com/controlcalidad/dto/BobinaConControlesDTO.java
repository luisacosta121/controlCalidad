package com.controlcalidad.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BobinaConControlesDTO {
    private Long id;
    private Integer numero;
    private String maquinista;
    private String ayudante1;
    private String ayudante2;
    private Map<String, String> controles; // Map de nombreParametro -> valor (BIEN, REGULAR, MAL)
}
