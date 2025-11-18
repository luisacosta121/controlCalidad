package com.controlcalidad.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.controlcalidad.model.Usuario;
import com.controlcalidad.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Optional<Usuario> login(String usuario, String password) {
        return usuarioRepository.findByUsuarioAndPasswordHash(usuario, password);
    }
}
