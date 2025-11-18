package com.controlcalidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.dto.SeleccionSectorDTO;
import com.controlcalidad.service.SectorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/operador")
@RequiredArgsConstructor
public class SectorController {

    private final SectorService sectorService;

    @PostMapping("/seleccionar-sector")
    public ResponseEntity<?> seleccionarSector(@RequestBody SeleccionSectorDTO request) {
        if (request.getUsuarioId() == null || request.getSector() == null) {
            return ResponseEntity.badRequest().body("Datos incompletos");
        }

        boolean valido = sectorService.validarSector(request.getSector());

        if(!valido){
            return ResponseEntity.badRequest().body("Sector inválido");
        }

        return ResponseEntity.ok("Sector seleccionado correctamente "  + request.getSector());
    }

}