package com.controlcalidad.controller;

import java.util.List;

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

    @GetMapping("/{sector}")
    public List<Maquina> getBySector(@PathVariable SectorEnum sector) {
        return maquinaService.findBySector(sector);
    }

    @PostMapping
    public Maquina create(@RequestBody Maquina maquina) {
        return maquinaService.save(maquina);
    }
}
