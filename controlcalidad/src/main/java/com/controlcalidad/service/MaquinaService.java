package com.controlcalidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.Maquina;
import com.controlcalidad.repository.MaquinaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaquinaService {

    private final MaquinaRepository maquinaRepository;

    public List<Maquina> findAll() {
        return maquinaRepository.findAll();
    }

    public List<Maquina> findBySector(SectorEnum sector) {
        return maquinaRepository.findBySector(sector);
    }
    
    public List<Maquina> findBySectorActivas(SectorEnum sector) {
        return maquinaRepository.findBySectorAndActivoTrueAndEliminadoFalse(sector);
    }
    
    public List<Maquina> obtenerNoEliminadas() {
        return maquinaRepository.findByEliminadoFalse();
    }
    
    public Optional<Maquina> obtenerPorId(Long id) {
        return maquinaRepository.findById(id);
    }

    public Maquina save(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }
    
    public Maquina crear(Maquina maquina) {
        maquina.setEliminado(false);
        return maquinaRepository.save(maquina);
    }
    
    public Optional<Maquina> actualizar(Long id, Maquina maquinaActualizada) {
        return maquinaRepository.findById(id).map(maquina -> {
            maquina.setNumero(maquinaActualizada.getNumero());
            maquina.setSector(maquinaActualizada.getSector());
            maquina.setActivo(maquinaActualizada.isActivo());
            return maquinaRepository.save(maquina);
        });
    }
    
    public boolean eliminar(Long id) {
        return maquinaRepository.findById(id).map(maquina -> {
            maquina.setEliminado(true);
            maquinaRepository.save(maquina);
            return true;
        }).orElse(false);
    }

}
