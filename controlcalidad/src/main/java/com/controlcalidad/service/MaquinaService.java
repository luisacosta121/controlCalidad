package com.controlcalidad.service;

import java.util.List;

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

    public Maquina save(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

}
