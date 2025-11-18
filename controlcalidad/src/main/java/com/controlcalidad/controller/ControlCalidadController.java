package com.controlcalidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.controlcalidad.dto.ControlCalidadRequestDTO;
import com.controlcalidad.service.ControlCalidadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/controles")
@RequiredArgsConstructor
public class ControlCalidadController {

    private final ControlCalidadService service;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody ControlCalidadRequestDTO req) {
        boolean aprobado = service.guardarControles(req);
        return ResponseEntity.ok(aprobado ? "APROBADA" : "RECHAZADA");
    }
}
