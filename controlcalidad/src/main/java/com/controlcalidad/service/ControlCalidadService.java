package com.controlcalidad.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.controlcalidad.dto.ControlCalidadRequestDTO;
import com.controlcalidad.dto.ControlIndividualDTO;
import com.controlcalidad.dto.ControlResultadoDTO;
import com.controlcalidad.enums.ValorControl;
import com.controlcalidad.enums.EstadoCalidadBobina;
import com.controlcalidad.model.Bobina;
import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.model.Usuario;
import com.controlcalidad.model.ControlCalidad;
import com.controlcalidad.repository.BobinaRepository;
import com.controlcalidad.repository.ControlCalidadRepository;
import com.controlcalidad.repository.ParametroCalidadRepository;
import com.controlcalidad.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ControlCalidadService {

    private final BobinaRepository bobinaRepo;
    private final UsuarioRepository usuarioRepo;
    private final ParametroCalidadRepository parametroRepo;
    private final ControlCalidadRepository controlRepo;

    private static final int PORCENTAJE_MINIMO = 70;

    public boolean guardarControles(ControlCalidadRequestDTO request) {

        Bobina bobina = bobinaRepo.findById(request.getBobinaId())
                .orElseThrow(() -> new RuntimeException("Bobina no encontrada"));

        Usuario operador = usuarioRepo.findById(request.getOperadorId())
                .orElseThrow(() -> new RuntimeException("Operador no encontrado"));

        int total = request.getControles().size();
        double puntos = 0.0;

        // Calcular puntaje total ANTES de guardar
        for (ControlIndividualDTO dto : request.getControles()) {
            ValorControl valor = ValorControl.valueOf(dto.getValor());

            puntos += switch (valor) {
                case BIEN -> 1.0;
                case REGULAR -> 0.5;
                default -> 0.0;
            };
        }

        int porcentaje = (int) ((puntos / total) * 100);
        boolean aprobada = porcentaje >= PORCENTAJE_MINIMO;

        // Guardar los controles AHORA sí con porcentaje correcto
        for (ControlIndividualDTO dto : request.getControles()) {

            ParametroCalidad parametro = parametroRepo.findById(dto.getParametroId())
                    .orElseThrow(() -> new RuntimeException("Parámetro no encontrado"));

            ValorControl valor = ValorControl.valueOf(dto.getValor());

            ControlCalidad reg = ControlCalidad.builder()
                    .bobina(bobina)
                    .operador(operador)
                    .parametro(parametro)
                    .sector(parametro.getSector())
                    .valor(valor)
                    .fecha(LocalDateTime.now())
                    .porcentajeAprobado(porcentaje)   // ← CORRECTO
                    .notas(request.getNotas())
                    .build();

            controlRepo.save(reg);
        }

        // Actualizar bobina
        bobina.setAprobada(aprobada);
        bobina.setEstadoCalidad(aprobada ? EstadoCalidadBobina.APROBADA : EstadoCalidadBobina.RECHAZADA);
        bobinaRepo.save(bobina);

        return aprobada;
    }

    public ControlResultadoDTO obtenerResultado(Long bobinaId) {

    Bobina bobina = bobinaRepo.findById(bobinaId)
            .orElseThrow(() -> new RuntimeException("Bobina no encontrada"));

    List<ControlCalidad> registros = controlRepo.findByBobinaId(bobinaId);

    if (registros.isEmpty()) {
        throw new RuntimeException("La bobina aún no tiene controles registrados");
    }

    // Último control por fecha
    ControlCalidad ultimo = registros.stream()
            .max(Comparator.comparing(ControlCalidad::getFecha))
            .orElseThrow();

    // Convertir cada control en DTO
    List<ControlResultadoDTO.ItemControlDTO> detalles = registros.stream()
            .map(r -> new ControlResultadoDTO.ItemControlDTO(
                    r.getParametro().getNombreParametro(),
                    r.getValor(),
                    r.getNotas(),
                    r.getFecha(),
                    r.getOperador().getNombre()
            ))
            .toList();

    return new ControlResultadoDTO(
            bobina.getId(),
            ultimo.getPorcentajeAprobado(),
            bobina.getAprobada() ? "APROBADA" : "RECHAZADA",
            ultimo.getFecha(),
            detalles
    );
}

}
