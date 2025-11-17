package com.controlcalidad.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.Lote;

public interface LoteRepository extends JpaRepository<Lote, Long>{
    Optional<Lote> findByNumeroLote(String numeroLote);
}
