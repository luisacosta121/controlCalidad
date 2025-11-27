package com.controlcalidad.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.service.ParametroCalidadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/parametros")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ParametroCalidadController {

    private final ParametroCalidadService parametroCalidadService;

    @GetMapping("/sector/{sectorId}")
    public ResponseEntity<List<ParametroCalidad>> obtenerParametrosPorSector(@PathVariable Long sectorId) {
        List<ParametroCalidad> parametros = parametroCalidadService.obtenerParametrosPorSector(sectorId);
        return ResponseEntity.ok(parametros);
    }
    
    @GetMapping("/no-eliminados")
    public List<ParametroCalidad> getNoEliminados() {
        return parametroCalidadService.obtenerNoEliminados();
    }
    
    @PostMapping
    public ParametroCalidad create(@RequestBody ParametroCalidad parametro) {
        return parametroCalidadService.crear(parametro);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ParametroCalidad> update(@PathVariable Long id, @RequestBody ParametroCalidad parametro) {
        return parametroCalidadService.actualizar(id, parametro)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean eliminado = parametroCalidadService.eliminar(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
