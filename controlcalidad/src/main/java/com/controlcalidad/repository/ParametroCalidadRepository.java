package com.controlcalidad.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.ParametroCalidad;

public interface ParametroCalidadRepository extends JpaRepository<ParametroCalidad, Long> {

    List<ParametroCalidad> findBySectorIdOrderByOrdenAsc(Long sectorId);

}
