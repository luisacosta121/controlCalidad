package com.controlcalidad.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.Maquina;
import com.controlcalidad.service.MaquinaService;

import lombok.*;

@RestController
@RequestMapping("/maquinas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MaquinaController {

    private final MaquinaService maquinaService;

    @GetMapping
    public List<Maquina> getAll() {
        return maquinaService.findAll();
    }
    
    @GetMapping("/no-eliminadas")
    public List<Maquina> getNoEliminadas() {
        return maquinaService.obtenerNoEliminadas();
    }

    @GetMapping("/sector/{sector}")
    public List<Maquina> getBySector(@PathVariable SectorEnum sector) {
        return maquinaService.findBySector(sector);
    }
    
    @GetMapping("/sector/{sector}/activas")
    public List<Maquina> getBySectorActivas(@PathVariable SectorEnum sector) {
        return maquinaService.findBySectorActivas(sector);
    }

    @PostMapping
    public Maquina create(@RequestBody Maquina maquina) {
        return maquinaService.crear(maquina);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Maquina> update(@PathVariable Long id, @RequestBody Maquina maquina) {
        return maquinaService.actualizar(id, maquina)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean eliminado = maquinaService.eliminar(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
