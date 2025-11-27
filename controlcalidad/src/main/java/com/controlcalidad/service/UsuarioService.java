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

    public boolean eliminar(Long id) {
        // Marcamos el usuario como eliminado para mantener integridad referencial
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setEliminado(true);
            usuarioRepository.save(usuario);
            return true;
        }).orElse(false);
    }

    public List<Usuario> obtenerNoEliminados() {
        return usuarioRepository.findByEliminadoFalse();
    }

    public Optional<Usuario> login(String usuario, String password) {
        return usuarioRepository.findByUsuarioAndPasswordHash(usuario, password);
    }
}
