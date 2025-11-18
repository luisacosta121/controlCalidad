package com.controlcalidad.dto;

import java.util.List;

import lombok.Data;

@Data
public class ControlCalidadRequestDTO {

    private Long bobinaId;
    private Long operadorId;
    private String notas;

    private List<ControlIndividualDTO> controles;

}
