package com.controlcalidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.controlcalidad.dto.CrearBobinaResponseDTO;
import com.controlcalidad.dto.ProcesoListadoDTO;
import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.Bobina;
import com.controlcalidad.model.Lote;
import com.controlcalidad.model.Sector;
import com.controlcalidad.repository.BobinaRepository;
import com.controlcalidad.repository.LoteRepository;
import com.controlcalidad.repository.SectorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BobinaService {

    private final BobinaRepository bobinaRepo;
    private final LoteRepository loteRepo;
    private final SectorRepository sectorRepo;

    public Optional<CrearBobinaResponseDTO> crearBobina(Long loteId, String sectorStr, String maquina) {

        Optional<Lote> loteOpt = loteRepo.findById(loteId);

        if (loteOpt.isEmpty()) {
            return Optional.empty();
        }

        Lote lote = loteOpt.get();

        // cuántas bobinas tiene este lote actualmente
        int cantidad = bobinaRepo.countByLoteId(lote.getId());
        int nroBobina = cantidad + 1;

        SectorEnum sectorEnum = SectorEnum.valueOf(sectorStr);

        List<Sector> sectores = sectorRepo.findBySector(sectorEnum);

        if (sectores.isEmpty()) {
            throw new RuntimeException("Sector no encontrado");
        }

        Sector sector = sectores.get(0); // usamos el primero

        Bobina b = Bobina.builder()
                .numeroBobina(nroBobina)
                .lote(lote)
                .sector(sector)
                .maquina(maquina)
                .build();

        b = bobinaRepo.save(b);

        CrearBobinaResponseDTO dto = new CrearBobinaResponseDTO(b.getId(), nroBobina, b.getMaquina());
        return Optional.of(dto);
    }

    public List<ProcesoListadoDTO> listarProcesos() {
        List<Bobina> bobinas = bobinaRepo.findAll();

        return bobinas.stream().map(b -> new ProcesoListadoDTO(
                b.getId(),
                b.getSector().getSector().name(),
                b.getMaquina(),
                b.getLote().getNumeroLote(),
                b.getLote().getProducto().getNombre() // o trabajo, segun tu DTO
        )).toList();
    }
}
