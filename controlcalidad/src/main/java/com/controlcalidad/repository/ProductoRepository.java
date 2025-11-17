package com.controlcalidad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlcalidad.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{

}
