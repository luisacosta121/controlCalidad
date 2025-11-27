package com.controlcalidad.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
@Slf4j
public class TwilioNotificationService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.from-number}")
    private String fromPhoneNumber;

    @Value("${twilio.to-number}")
    private String toPhoneNumber;

    @Value("${twilio.enabled:false}")
    private boolean twilioEnabled;

    @PostConstruct
    public void init() {
        if (twilioEnabled && accountSid != null && authToken != null) {
            Twilio.init(accountSid, authToken);
            log.info("Twilio inicializado correctamente");
        } else {
            log.warn("Twilio no está habilitado o faltan credenciales");
        }
    }

    public void enviarNotificacionRechazo(int numeroBobina, String sector, String lote, String trabajo, List<String> parametrosRechazados) {
        if (!twilioEnabled) {
            log.info("Twilio deshabilitado. Notificación simulada - Bobina N°{} del Lote {} rechazada por: {}", 
                    numeroBobina, lote, String.join(", ", parametrosRechazados));
            return;
        }

        StringBuilder mensaje = new StringBuilder();
        mensaje.append("🚨 BOBINA RECHAZADA 🚨\n\n");
        mensaje.append(String.format("BOBINA N°%d, SECTOR %s, LOTE %s, TRABAJO %s, HA SIDO RECHAZADA POR:\n", 
                numeroBobina, sector, lote, trabajo));
        
        for (String parametro : parametrosRechazados) {
            mensaje.append("❌ ").append(parametro).append("\n");
        }

        String mensajeTexto = mensaje.toString();
        
        log.info("=== INTENTO DE ENVÍO DE NOTIFICACIÓN ===");
        log.info("Número origen: {}", fromPhoneNumber);
        log.info("Número destino: {}", toPhoneNumber);
        log.info("Mensaje: {}", mensajeTexto);

        // Validar que no sea el mismo número
        if (toPhoneNumber.equals(fromPhoneNumber)) {
            log.error("ERROR: No puedes enviar un mensaje a tu propio número de Twilio");
            return;
        }
        
        try {
            log.info("Enviando mensaje WhatsApp a: {}", toPhoneNumber);
            Message message = Message.creator(
                    new PhoneNumber(toPhoneNumber),
                    new PhoneNumber(fromPhoneNumber),
                    mensajeTexto
            ).create();

            log.info("✅ Mensaje WhatsApp enviado exitosamente - SID: {} - Status: {}", 
                    message.getSid(), message.getStatus());
        } catch (Exception e) {
            log.error("❌ Error al enviar mensaje WhatsApp: {}", e.getMessage(), e);
        }
    }
}
