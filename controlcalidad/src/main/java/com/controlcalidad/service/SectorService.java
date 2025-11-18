package com.controlcalidad.service;

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

}
