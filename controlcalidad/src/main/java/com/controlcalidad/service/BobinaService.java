package com.controlcalidad.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.controlcalidad.dto.BobinaConControlesDTO;
import com.controlcalidad.dto.CrearBobinaConControlesDTO;
import com.controlcalidad.dto.CrearBobinaResponseDTO;
import com.controlcalidad.dto.ProcesoListadoDTO;
import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.enums.ValorControl;
import com.controlcalidad.model.Bobina;
import com.controlcalidad.model.ControlCalidad;
import com.controlcalidad.model.Lote;
import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.model.Sector;
import com.controlcalidad.model.Usuario;
import com.controlcalidad.repository.BobinaRepository;
import com.controlcalidad.repository.ControlCalidadRepository;
import com.controlcalidad.repository.LoteRepository;
import com.controlcalidad.repository.ParametroCalidadRepository;
import com.controlcalidad.repository.SectorRepository;
import com.controlcalidad.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BobinaService {

    private final BobinaRepository bobinaRepo;
    private final LoteRepository loteRepo;
    private final SectorRepository sectorRepo;
    private final ControlCalidadRepository controlRepo;
    private final UsuarioRepository usuarioRepo;
    private final ParametroCalidadRepository parametroRepo;

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

        // Solo mostrar las bobinas "proceso" (sin controles de calidad) y no finalizadas
        // Las bobinas con controles son las que se crean al "Cargar Bobina"
        return bobinas.stream()
                .filter(b -> controlRepo.findByBobinaId(b.getId()).isEmpty())
                .filter(b -> b.getFinalizado() == null || !b.getFinalizado())
                .map(b -> new ProcesoListadoDTO(
                        b.getId(),
                        b.getSector().getSector().name(),
                        b.getSector().getId(),
                        b.getMaquina(),
                        b.getLote().getNumeroLote(),
                        b.getLote().getProducto().getNombre() // o trabajo, segun tu DTO
                )).toList();
    }

    @Transactional
    public BobinaConControlesDTO crearBobinaConControles(CrearBobinaConControlesDTO dto) {
        // 1. Obtener la bobina del proceso (para obtener lote y sector)
        Bobina procesoOriginal = bobinaRepo.findById(dto.getProcesoId())
                .orElseThrow(() -> new RuntimeException("Proceso no encontrado"));

        // 2. Crear una nueva bobina para este control
        // Contar bobinas que tienen controles en este lote Y sector
        List<Bobina> bobinasDelLote = bobinaRepo.findByLoteId(procesoOriginal.getLote().getId());
        long bobinasConControles = bobinasDelLote.stream()
                .filter(b -> b.getSector().getId().equals(procesoOriginal.getSector().getId())) // Filtrar por sector
                .filter(b -> !controlRepo.findByBobinaId(b.getId()).isEmpty())
                .count();
        
        // El número de bobina será: bobinas con controles + 1 (empezamos desde 1)
        int nroBobina = (int) bobinasConControles + 1;
        
        Bobina nuevaBobina = Bobina.builder()
                .numeroBobina(nroBobina)
                .lote(procesoOriginal.getLote())
                .sector(procesoOriginal.getSector())
                .maquina(procesoOriginal.getMaquina())
                .finalizado(false)
                .build();
        
        nuevaBobina = bobinaRepo.save(nuevaBobina);

        // 3. Obtener operador y ayudantes
        Usuario operador = usuarioRepo.findById(dto.getOperadorId())
                .orElseThrow(() -> new RuntimeException("Operador no encontrado"));
        
        Usuario ayudante1 = dto.getAyudante1Id() != null ? 
                usuarioRepo.findById(dto.getAyudante1Id()).orElse(null) : null;
        
        Usuario ayudante2 = dto.getAyudante2Id() != null ? 
                usuarioRepo.findById(dto.getAyudante2Id()).orElse(null) : null;

        // 4. Crear controles de calidad dinámicamente para cada parámetro recibido
        LocalDateTime ahora = LocalDateTime.now();
        Long sectorId = nuevaBobina.getSector().getId();
        
        if (dto.getControles() != null) {
            for (Map.Entry<String, String> entry : dto.getControles().entrySet()) {
                String nombreParametro = entry.getKey();
                String valorControl = entry.getValue();
                
                // Buscar el parámetro en el sector
                ParametroCalidad parametro = parametroRepo.findByNombreParametroAndSectorId(nombreParametro, sectorId)
                        .orElseThrow(() -> new RuntimeException("Parámetro '" + nombreParametro + "' no encontrado para el sector"));
                
                // Crear el control de calidad
                ControlCalidad control = ControlCalidad.builder()
                        .bobina(nuevaBobina)
                        .parametro(parametro)
                        .operador(operador)
                        .sector(nuevaBobina.getSector())
                        .fecha(ahora)
                        .valor(ValorControl.valueOf(valorControl))
                        .build();
                
                controlRepo.save(control);
            }
        }

        // 5. Devolver DTO con los datos
        return new BobinaConControlesDTO(
                nuevaBobina.getId(),
                nuevaBobina.getNumeroBobina(),
                operador.getNombre() + " " + operador.getApellido(),
                ayudante1 != null ? ayudante1.getNombre() + " " + ayudante1.getApellido() : null,
                ayudante2 != null ? ayudante2.getNombre() + " " + ayudante2.getApellido() : null,
                dto.getControles()
        );
    }

    public List<BobinaConControlesDTO> obtenerControlesPorProceso(Long procesoId) {
        // Obtener la bobina del proceso para conocer el lote y el sector
        Bobina procesoOriginal = bobinaRepo.findById(procesoId)
                .orElseThrow(() -> new RuntimeException("Proceso no encontrado"));
        
        // Obtener todas las bobinas del mismo lote Y mismo sector
        List<Bobina> bobinasDelLote = bobinaRepo.findByLoteId(procesoOriginal.getLote().getId());
        
        // Para cada bobina, obtener sus controles
        return bobinasDelLote.stream()
                .filter(bobina -> bobina.getSector().getId().equals(procesoOriginal.getSector().getId())) // Filtrar por sector
                .filter(bobina -> !controlRepo.findByBobinaId(bobina.getId()).isEmpty())
                .map(bobina -> {
                    List<ControlCalidad> controles = controlRepo.findByBobinaId(bobina.getId());
                    
                    // Crear un mapa con los valores de cada parámetro
                    Map<String, String> mapaControles = new java.util.HashMap<>();
                    String operadorNombre = null;
                    
                    for (ControlCalidad control : controles) {
                        String nombreParam = control.getParametro().getNombreParametro();
                        String valor = control.getValor().name();
                        
                        if (operadorNombre == null && control.getOperador() != null) {
                            operadorNombre = control.getOperador().getNombre() + " " + control.getOperador().getApellido();
                        }
                        
                        mapaControles.put(nombreParam, valor);
                    }
                    
                    return new BobinaConControlesDTO(
                            bobina.getId(),
                            bobina.getNumeroBobina(),
                            operadorNombre,
                            null, // ayudante1 - no lo guardamos en ControlCalidad
                            null, // ayudante2 - no lo guardamos en ControlCalidad
                            mapaControles
                    );
                })
                .toList();
    }

    @Transactional
    public void finalizarTrabajo(Long procesoId) {
        Bobina bobina = bobinaRepo.findById(procesoId)
                .orElseThrow(() -> new RuntimeException("Proceso no encontrado"));
        bobina.setFinalizado(true);
        bobinaRepo.save(bobina);
    }
}
