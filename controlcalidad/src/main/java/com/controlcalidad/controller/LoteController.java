package com.controlcalidad.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.dto.LoteInfoResponseDTO;
import com.controlcalidad.service.LoteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/lotes")
@RequiredArgsConstructor
public class LoteController {

    private final LoteService loteService;

    @GetMapping("/buscar/{numero}")
    public ResponseEntity<?> buscarLote(@PathVariable String numero){

        Optional<LoteInfoResponseDTO> loteRespo = loteService.buscarLote(numero);

        if(loteRespo.isEmpty()) {
            return ResponseEntity.status(400).body("Trabajo no encontrado");
        }

        return ResponseEntity.ok(loteRespo.get());
    }


}
