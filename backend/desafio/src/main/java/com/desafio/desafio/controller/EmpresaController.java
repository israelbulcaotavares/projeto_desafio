package com.desafio.desafio.controller;

import com.desafio.desafio.model.Empresa;
import com.desafio.desafio.model.Fornecedor;
import com.desafio.desafio.model.repositories.EmpresaRepository;
import com.desafio.desafio.model.repositories.FornecedorRepository;
import com.desafio.desafio.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    // Operações CRUD para Empresa
    @GetMapping("/listar")
    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getEmpresaById(@PathVariable(value = "id") int empresaId) {
        Empresa empresa = empresaRepository.findById(empresaId);
        if (empresa == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(empresa);
    }

    @PostMapping("/criar")
    public Empresa createEmpresa(@Valid @RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Empresa> updateEmpresa(@PathVariable(value = "id") int empresaId,
                                                 @Valid @RequestBody Empresa empresaDetails) {
        Empresa empresa = empresaRepository.findById(empresaId);
        if (empresa == null) {
            return ResponseEntity.notFound().build();
        }
        empresa.setCnpj(empresaDetails.getCnpj());
        empresa.setNomeFantasia(empresaDetails.getNomeFantasia());
        empresa.setCep(empresaDetails.getCep());
        Empresa updatedEmpresa = empresaRepository.save(empresa);
        return ResponseEntity.ok(updatedEmpresa);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Empresa> deleteEmpresa(@PathVariable(value = "id") int empresaId) {
        Empresa empresa = empresaRepository.findById(empresaId);
        if (empresa == null) {
            return ResponseEntity.notFound().build();
        }
        List<Fornecedor> fornecedores = fornecedorRepository.findByEmpresaId(empresaId);
        if (!fornecedores.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        empresaRepository.delete(empresa);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/fornecedores/{id}")
    public List<Fornecedor> getFornecedoresByEmpresaId(@PathVariable(value = "id") int empresaId) {
        Empresa empresa = empresaRepository.findById(empresaId);
        if (empresa == null) {
            return null;
        }
        return empresa.getFornecedores();
    }

}