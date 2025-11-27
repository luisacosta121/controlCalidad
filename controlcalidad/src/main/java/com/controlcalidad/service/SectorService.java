package com.controlcalidad.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.Sector;
import com.controlcalidad.repository.SectorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;

    public boolean validarSector(String sectorStr) {
        try {
            SectorEnum.valueOf(sectorStr);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<SectorEnum> obtenerTodosLosSectores() {
        return List.of(SectorEnum.values());
    }

    public List<Sector> obtenerTodosLosSectoresConId() {
        return sectorRepository.findAll();
    }

}
