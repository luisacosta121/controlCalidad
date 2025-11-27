package com.controlcalidad.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.service.SectorService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/sectores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SectoresController {

    private final SectorService sectorService;

    @GetMapping()
    public Object obtenerSectores() {
        return sectorService.obtenerTodosLosSectores();
    }

    @GetMapping("/con-id")
    public Object obtenerSectoresConId() {
        return sectorService.obtenerTodosLosSectoresConId();
    }


}
