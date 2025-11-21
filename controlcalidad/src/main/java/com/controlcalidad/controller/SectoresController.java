package com.controlcalidad.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.service.SectorService;


@RestController
@RequestMapping("/sectores")
public class SectoresController {

    private final SectorService sectorService = new SectorService();

    @GetMapping()
    public Object obtenerSectores() {
        return sectorService.obtenerTodosLosSectores();
    }


}
