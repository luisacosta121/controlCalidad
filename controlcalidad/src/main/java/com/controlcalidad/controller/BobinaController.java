package com.controlcalidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.dto.CrearBobinaRequestDTO;
import com.controlcalidad.dto.CrearBobinaResponseDTO;
import com.controlcalidad.service.BobinaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bobinas")
@RequiredArgsConstructor
public class BobinaController {

    private final BobinaService bobinaService;

    @GetMapping("/procesos")
    public ResponseEntity<?> listarProcesos() {
        return ResponseEntity.ok(bobinaService.listarProcesos());
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearBobina(@RequestBody CrearBobinaRequestDTO request) {

        java.util.Optional<CrearBobinaResponseDTO> resultado = bobinaService.crearBobina(request.getLoteId(),
                request.getSector(), request.getMaquina());

        if (resultado.isEmpty()) {
            return ResponseEntity.status(404).body("Lote no encontrado");
        }

        return ResponseEntity.ok(resultado.get());
    }
}