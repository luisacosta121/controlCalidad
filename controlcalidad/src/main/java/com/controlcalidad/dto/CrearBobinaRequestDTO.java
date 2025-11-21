package com.controlcalidad.dto;

import lombok.Data;

@Data
public class CrearBobinaRequestDTO {

    private String numeroBobina;
    private Long loteId;
    private String sector;
    private String maquina;

}
