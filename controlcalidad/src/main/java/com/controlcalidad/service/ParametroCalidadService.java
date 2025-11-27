package com.controlcalidad.service;

import java.util.List;
import java.util.Optional;

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
    
    public List<ParametroCalidad> obtenerNoEliminados() {
        return parametroCalidadRepository.findByEliminadoFalse();
    }
    
    public Optional<ParametroCalidad> obtenerPorId(Long id) {
        return parametroCalidadRepository.findById(id);
    }
    
    public ParametroCalidad crear(ParametroCalidad parametro) {
        parametro.setEliminado(false);
        return parametroCalidadRepository.save(parametro);
    }
    
    public Optional<ParametroCalidad> actualizar(Long id, ParametroCalidad parametroActualizado) {
        return parametroCalidadRepository.findById(id).map(parametro -> {
            parametro.setNombreParametro(parametroActualizado.getNombreParametro());
            parametro.setSector(parametroActualizado.getSector());
            parametro.setObligatorio(parametroActualizado.isObligatorio());
            parametro.setActivo(parametroActualizado.isActivo());
            parametro.setOrden(parametroActualizado.getOrden());
            return parametroCalidadRepository.save(parametro);
        });
    }
    
    public boolean eliminar(Long id) {
        return parametroCalidadRepository.findById(id).map(parametro -> {
            parametro.setEliminado(true);
            parametroCalidadRepository.save(parametro);
            return true;
        }).orElse(false);
    }
}
