package com.controlcalidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.controlcalidad.dto.ResultadoImportacionDTO;
import com.controlcalidad.service.ExcelImportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class ImportarExcelController {

    private final ExcelImportService excelService;

    @PostMapping("/importar-lotes")
    public ResponseEntity<?> importar(@RequestParam("file") MultipartFile file){
        try {
            ResultadoImportacionDTO resultado = excelService.importarLotes(file);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al importar el archivo: " + e.getMessage());
        }
    }

}
