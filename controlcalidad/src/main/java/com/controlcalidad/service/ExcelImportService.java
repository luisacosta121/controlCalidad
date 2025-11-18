package com.controlcalidad.service;

import java.io.InputStream;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.controlcalidad.dto.ResultadoImportacionDTO;
import com.controlcalidad.model.Lote;
import com.controlcalidad.model.Producto;
import com.controlcalidad.repository.LoteRepository;
import com.controlcalidad.repository.ProductoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelImportService {

    private final ProductoRepository productoRepo;
    private final LoteRepository loteRepo;

    public ResultadoImportacionDTO importarLotes(MultipartFile file) throws Exception {

        ResultadoImportacionDTO resultado = new ResultadoImportacionDTO();

        InputStream is = file.getInputStream();
        Workbook workbook = WorkbookFactory.create(is);
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {

            if (row.getRowNum() == 0) {
                continue; // Saltar encabezado
            }

            Cell loteCell = row.getCell(0);
            Cell nombreCell = row.getCell(1);

            if (loteCell == null || nombreCell == null) {
                continue;
            }

            String numeroLote = loteCell.toString().trim().replace(".0", "");
            String nombreTrabajo = nombreCell.toString().trim();

            // Buscar lote
            Optional<Lote> existeLote = loteRepo.findByNumeroLote(numeroLote);

            Lote lote;

            if (existeLote.isEmpty()) {
                // Crear nuevo lote
                lote = Lote.builder()
                        .numeroLote(numeroLote)
                        .producto(null)
                        .build();

                lote = loteRepo.save(lote);
                resultado.setLotesActualizados(resultado.getLotesActualizados() + 1);

            } else {
                lote = existeLote.get();
            }

            // Buscar o crear producto
            Optional<Producto> posibleProd = productoRepo.findByNombre(nombreTrabajo);
            Producto producto;

            if (posibleProd.isEmpty()) {
                producto = productoRepo.save(Producto.builder()
                        .nombre(nombreTrabajo)
                        .build());
                resultado.setProductosCreados(resultado.getProductosCreados() + 1);
            } else {
                producto = posibleProd.get();
            }

            // Asociar producto al lote
            lote.setProducto(producto);
            loteRepo.save(lote);
        }

        workbook.close();
        return resultado;
    }
}