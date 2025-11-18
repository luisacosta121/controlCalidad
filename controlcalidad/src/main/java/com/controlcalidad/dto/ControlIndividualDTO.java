package com.controlcalidad.dto;

import lombok.Data;

@Data
public class ControlIndividualDTO {

    private Long parametroId;
    private String valor;  // "BIEN" - "REGULAR" - "MAL"

}
