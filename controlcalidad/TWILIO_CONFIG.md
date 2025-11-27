# Configuración de Notificaciones Twilio

## Descripción
El sistema envía notificaciones SMS vía Twilio cuando una bobina es rechazada (tiene parámetros marcados como "MAL").

## Mensaje de Notificación
```
🚨 BOBINA RECHAZADA 🚨

BOBINA N°XXX DEL LOTE YYY HA SIDO RECHAZADA POR:
❌ PARAMETRO_1
❌ PARAMETRO_2
...
```

## Configuración

### 1. Obtener Credenciales de Twilio

1. Crear una cuenta en [Twilio](https://www.twilio.com/try-twilio)
2. Ir a la [Consola de Twilio](https://console.twilio.com)
3. Copiar tu **Account SID** y **Auth Token**
4. Obtener un número de teléfono de Twilio en la sección "Phone Numbers"

### 2. Configurar application.properties

Editar el archivo `src/main/resources/application.properties`:

```properties
# Habilitar Twilio (cambiar a true para enviar SMS reales)
twilio.enabled=false

# Credenciales de Twilio
twilio.account.sid=TU_ACCOUNT_SID_AQUI
twilio.auth.token=TU_AUTH_TOKEN_AQUI

# Número de Twilio (formato internacional)
twilio.phone.number=+1234567890

# Números que recibirán las notificaciones (separados por comas)
# Formato para Argentina: +549XXXXXXXXXX
twilio.recipient.phone.numbers=+549XXXXXXXXXX,+549YYYYYYYYYY
```

### 3. Modo de Prueba (Sin enviar SMS)

Por defecto, `twilio.enabled=false`. En este modo:
- ✅ El sistema funciona normalmente
- ✅ Se detectan las bobinas rechazadas
- ✅ Se registran las notificaciones en los logs
- ❌ NO se envían SMS reales (solo simulación)

Para ver las notificaciones simuladas, revisar los logs de la aplicación.

### 4. Activar Envío Real de SMS

Para enviar SMS reales:

1. Configurar las credenciales correctamente
2. Cambiar `twilio.enabled=true`
3. Reiniciar la aplicación
4. Los números destinatarios deben estar verificados en cuenta Twilio trial

### 5. Compilar y Ejecutar

```bash
# Limpiar y compilar
mvn clean package -DskipTests

# Ejecutar
java -jar target/controlcalidad-0.0.1-SNAPSHOT.jar
```

## Funcionamiento

1. Cuando un operador carga una bobina con parámetros "MAL"
2. El sistema detecta automáticamente los rechazos
3. Se envía un SMS a todos los números configurados
4. El mensaje incluye:
   - Número de bobina
   - Número de lote
   - Lista de parámetros que causaron el rechazo

## Costos

⚠️ **IMPORTANTE**: Twilio cobra por cada SMS enviado
- Cuenta trial: crédito limitado gratuito
- Cuenta productiva: consultar [precios de Twilio](https://www.twilio.com/pricing)

## Solución de Problemas

### "Twilio no está habilitado o faltan credenciales"
- Verificar que `twilio.enabled=true`
- Verificar Account SID y Auth Token correctos

### "Error al enviar SMS"
- Verificar formato de números (debe incluir código de país)
- En cuenta trial, verificar que números destinatarios estén verificados
- Revisar saldo de la cuenta Twilio

### Números no reciben mensajes
- Verificar formato internacional: +[código país][número]
- Ejemplo Argentina: +5491123456789
- Verificar que el número de Twilio esté activo

## Archivos Modificados

- `pom.xml`: Dependencia Twilio agregada
- `application.properties`: Configuración Twilio
- `TwilioNotificationService.java`: Servicio de notificaciones (NUEVO)
- `BobinaService.java`: Lógica para detectar rechazos y enviar notificaciones
