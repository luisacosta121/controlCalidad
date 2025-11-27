package com.controlcalidad.config;

import org.springframework.stereotype.Component;

import com.controlcalidad.enums.RolUsuario;
import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.model.Sector;
import com.controlcalidad.model.Usuario;
import com.controlcalidad.repository.ParametroCalidadRepository;
import com.controlcalidad.repository.SectorRepository;
import com.controlcalidad.repository.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final SectorRepository sectorRepo;
    private final ParametroCalidadRepository parametroRepo;
    private final UsuarioRepository usuarioRepo;

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario administrador solo si no existe
        if (usuarioRepo.findByUsuarioAndPasswordHash("admin", "admin123").isEmpty()) {
            usuarioRepo.save(Usuario.builder()
                    .usuario("admin")
                    .nombre("Administrador")
                    .apellido("Sistema")
                    .passwordHash("admin123")
                    .rol(RolUsuario.ADMIN)
                    .activo(true)
                    .build());
        }

        // Crear sectores solo si no existen
        if (sectorRepo.count() == 0) {
        Sector extrusion = sectorRepo.save(Sector.builder().sector(SectorEnum.EXTRUSION).build());
        Sector impresion = sectorRepo.save(Sector.builder().sector(SectorEnum.IMPRESION).build());
        Sector confeccion = sectorRepo.save(Sector.builder().sector(SectorEnum.CONFECCION).build());
        Sector refilado = sectorRepo.save(Sector.builder().sector(SectorEnum.REFILADO).build());

        // ===========================
        // EXTRUSION
        // ===========================
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("ancho")
                .orden(1)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("espesor")
                .orden(2)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("arrugas")
                .orden(3)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("tubo")
                .orden(4)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("contraccion")
                .orden(5)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("brillo")
                .orden(6)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(extrusion)
                .nombreParametro("textura")
                .orden(7)
                .build());

        // ===========================
        // IMPRESION
        // ===========================
        parametroRepo.save(ParametroCalidad.builder()
                .sector(impresion)
                .nombreParametro("ancho")
                .orden(1)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(impresion)
                .nombreParametro("colores")
                .orden(2)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(impresion)
                .nombreParametro("bastoneo")
                .orden(3)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(impresion)
                .nombreParametro("retintado")
                .orden(4)
                .build());

        // ===========================
        // CONFECCION
        // ===========================
        parametroRepo.save(ParametroCalidad.builder()
                .sector(confeccion)
                .nombreParametro("soldadura")
                .orden(1)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(confeccion)
                .nombreParametro("elasticidad")
                .orden(2)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(confeccion)
                .nombreParametro("presentacion")
                .orden(3)
                .build());


        // ===========================
        // REFILADO
        // ===========================
        parametroRepo.save(ParametroCalidad.builder()
                .sector(refilado)
                .nombreParametro("ancho")
                .orden(1)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(refilado)
                .nombreParametro("largo")
                .orden(2)
                .build());
        parametroRepo.save(ParametroCalidad.builder()
                .sector(refilado)
                .nombreParametro("bujes")
                .orden(3)
                .build());
        }
    }

}
