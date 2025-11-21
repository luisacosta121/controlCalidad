package com.controlcalidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.dto.CrearBobinaConControlesDTO;
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

    @GetMapping("/proceso/{procesoId}/controles")
    public ResponseEntity<?> obtenerControlesPorProceso(@PathVariable Long procesoId) {
        return ResponseEntity.ok(bobinaService.obtenerControlesPorProceso(procesoId));
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

    @PostMapping("/crear-con-controles")
    public ResponseEntity<?> crearBobinaConControles(@RequestBody CrearBobinaConControlesDTO request) {
        try {
            return ResponseEntity.ok(bobinaService.crearBobinaConControles(request));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/finalizar/{id}")
    public ResponseEntity<Void> finalizarTrabajo(@PathVariable Long id) {
        bobinaService.finalizarTrabajo(id);
        return ResponseEntity.ok().build();
    }
}