package com.controlcalidad.dto;

import lombok.Data;

@Data
public class ResultadoImportacionDTO {
    private int productosCreados;
    private int lotesActualizados;
    private int lotesNoExistentes;
}
