package com.controlcalidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.controlcalidad.model.Usuario;
import com.controlcalidad.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public List<Usuario> obtenerUsuariosActivos() {
        return usuarioRepository.findByActivoTrue();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario crear(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> actualizar(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setUsuario(usuarioActualizado.getUsuario());
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setApellido(usuarioActualizado.getApellido());
            if (usuarioActualizado.getPasswordHash() != null && !usuarioActualizado.getPasswordHash().isEmpty()) {
                usuario.setPasswordHash(usuarioActualizado.getPasswordHash());
            }
            usuario.setRol(usuarioActualizado.getRol());
            usuario.setActivo(usuarioActualizado.isActivo());
            return usuarioRepository.save(usuario);
        });
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> login(String usuario, String password) {
        return usuarioRepository.findByUsuarioAndPasswordHash(usuario, password);
    }
}
