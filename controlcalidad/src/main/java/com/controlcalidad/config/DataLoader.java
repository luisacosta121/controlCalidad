package com.controlcalidad.config;

import org.springframework.stereotype.Component;

import com.controlcalidad.enums.SectorEnum;
import com.controlcalidad.model.ParametroCalidad;
import com.controlcalidad.model.Sector;
import com.controlcalidad.repository.ParametroCalidadRepository;
import com.controlcalidad.repository.SectorRepository;

import org.springframework.boot.CommandLineRunner;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final SectorRepository sectorRepo;
    private final ParametroCalidadRepository parametroRepo;

    @Override
    public void run(String... args) throws Exception {
        // Crear sectores
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
