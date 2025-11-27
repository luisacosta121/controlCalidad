package com.controlcalidad.repository;

import com.controlcalidad.model.Maquina;
import com.controlcalidad.enums.SectorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaquinaRepository extends JpaRepository<Maquina, Long> {

    List<Maquina> findBySector(SectorEnum sector);
    
    List<Maquina> findByEliminadoFalse();
    
    List<Maquina> findBySectorAndActivoTrueAndEliminadoFalse(SectorEnum sector);
}
