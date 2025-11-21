package com.controlcalidad.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcalidad.model.Usuario;
import com.controlcalidad.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/activos")
    public ResponseEntity<List<Usuario>> obtenerUsuariosActivos() {
        List<Usuario> usuarios = usuarioService.obtenerUsuariosActivos();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String usuario = request.get("usuario");
        String password = request.get("password");

        Optional<Usuario> userOpt = usuarioService.login(usuario, password);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrecta");
        }

        Usuario u = userOpt.get();

        if (!u.isActivo()) {
            return ResponseEntity.status(403).body("Usuario inactivo");
        }

        return ResponseEntity.ok(u);
    }

}
