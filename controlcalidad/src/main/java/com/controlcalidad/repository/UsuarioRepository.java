package com.controlcalidad.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> findByActivoTrue();

    Optional<Usuario> findByUsuarioAndPasswordHash(String usuario, String passwordHash);
    
    List<Usuario> findByEliminadoFalse();
}