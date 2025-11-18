package com.controlcalidad.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.ControlCalidad;

public interface ControlCalidadRepository extends JpaRepository<ControlCalidad, Long> {

    List<ControlCalidad> findByBobinaId(Long bobinaId);

}
