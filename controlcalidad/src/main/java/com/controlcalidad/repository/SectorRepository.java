package com.controlcalidad.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.Sector;

public interface SectorRepository extends JpaRepository<Sector, Long> {

    List<Sector> findBySector(SectorEnum sector);

}
