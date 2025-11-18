package com.controlcalidad.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsuarioAndPasswordHash(String usuario, String passwordHash);
}
