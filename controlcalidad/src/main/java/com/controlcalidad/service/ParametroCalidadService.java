package com.controlcalidad.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.repository.ParametroCalidadRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParametroCalidadService {

    private final ParametroCalidadRepository parametroCalidadRepository;

    public List<ParametroCalidad> obtenerParametrosPorSector(Long sectorId) {
        return parametroCalidadRepository.findBySectorIdOrderByOrdenAsc(sectorId);
    }
}
