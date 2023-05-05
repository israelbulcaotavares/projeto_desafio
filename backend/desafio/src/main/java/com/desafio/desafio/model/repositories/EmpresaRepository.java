package com.desafio.desafio.model.repositories;

import com.desafio.desafio.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
@Repository
public interface EmpresaRepository extends CrudRepository<Empresa, Integer>{
    List<Empresa> findByNomeFantasiaContainingIgnoreCase(String nome);
}
*/


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {

    Empresa findById(int id);

    Empresa findByCnpj(String cnpj);
}