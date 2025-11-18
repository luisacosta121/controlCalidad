package com.controlcalidad.model;

import com.controlcalidad.enums.RolUsuario;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;

    private String nombre;
    
    private String apellido;
    
    private String passwordHash;
    
    @Enumerated(EnumType.STRING)
    private RolUsuario rol;
    
    private boolean activo;

}
