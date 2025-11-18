package com.controlcalidad.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.controlcalidad.dto.LoteInfoResponseDTO;
import com.controlcalidad.model.Lote;
import com.controlcalidad.repository.LoteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoteService {

    private final LoteRepository loteRepository;

    public Optional<LoteInfoResponseDTO> buscarLote(String numeroLote){

        Optional<Lote> loteOpt = loteRepository.findByNumeroLote(numeroLote);

        if(loteOpt.isEmpty()){
            return Optional.empty();
        } 

        Lote lote = loteOpt.get();

        if(lote.getProducto() == null){
            return Optional.of(new LoteInfoResponseDTO("Trabajo no encontrado"));
        }
        
        return Optional.of(new LoteInfoResponseDTO(lote.getProducto().getNombre()));
    }

}
