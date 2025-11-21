package com.controlcalidad.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.controlcalidad.enums.SectorEnum;

@Service
public class SectorService {

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

}
