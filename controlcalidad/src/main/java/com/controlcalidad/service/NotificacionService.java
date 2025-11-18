package com.controlcalidad.service;

import org.springframework.stereotype.Service;

import com.controlcalidad.model.Bobina;

@Service
public class NotificacionService {

    public void enviarRechazo(Bobina bobina, int porcentaje) {

        String mensaje = String.format(
                "ALERTA: Bobina %d del lote %s fue RECHAZADA (calidad %d%%)",
                bobina.getNumeroBobina(),
                bobina.getLote().getNumeroLote(),
                porcentaje
        );

        // Más adelante acá integro TWILIO
        System.out.println(mensaje);
    }
}