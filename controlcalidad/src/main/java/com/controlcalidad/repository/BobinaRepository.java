package com.controlcalidad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.Bobina;
import com.controlcalidad.model.Lote;

public interface BobinaRepository extends JpaRepository<Bobina, Long> {

    /**
     * Cuenta la cantidad de bobinas asociadas a un lote específico.
     * @param loteId El ID del lote.
     * @return La cantidad de bobinas en el lote.
     */
    int countByLoteId(Long loteId); // Método para contar bobinas por lote

    int countByLote(Lote lote);

}
