package com.controlcalidad.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.controlcalidad.enums.ValorControl;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ControlResultadoDTO {

    private Long bobinaId;
    private Integer porcentajeFinal;
    private String estadoFinal;
    private LocalDateTime fechaUltimoControl;

    private List<ItemControlDTO> detalles;

    @Data
    @AllArgsConstructor
    public static class ItemControlDTO {
        private String parametro;
        private ValorControl valor;
        private String notas;
        private LocalDateTime fecha;
        private String operador;
    }
}
