package com.controlcalidad.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.service.ParametroCalidadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/parametros")
@RequiredArgsConstructor
public class ParametroCalidadController {

    private final ParametroCalidadService parametroCalidadService;

    @GetMapping("/sector/{sectorId}")
    public ResponseEntity<List<ParametroCalidad>> obtenerParametrosPorSector(@PathVariable Long sectorId) {
        List<ParametroCalidad> parametros = parametroCalidadService.obtenerParametrosPorSector(sectorId);
        return ResponseEntity.ok(parametros);
    }
}
