package com.desafio.desafio.model.repositories;

import com.desafio.desafio.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    List<Fornecedor> findByNomeContainingIgnoreCase(String nome);
}
*/

public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer> {

    Fornecedor findById(int id);

    List<Fornecedor> findByEmpresaId(int empresaId);
}