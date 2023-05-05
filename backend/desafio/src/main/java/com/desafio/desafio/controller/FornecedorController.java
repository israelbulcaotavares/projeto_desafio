package com.desafio.desafio.controller;

import com.desafio.desafio.model.Empresa;
import com.desafio.desafio.model.Fornecedor;
import com.desafio.desafio.model.repositories.EmpresaRepository;
import com.desafio.desafio.model.repositories.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    // Operações CRUD para Fornecedor

    @GetMapping("")
    public List<Fornecedor> getAllFornecedores() {
        return fornecedorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> getFornecedorById(@PathVariable(value = "id") int fornecedorId) {
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId);
        if (fornecedor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(fornecedor);
    }

    @PostMapping("/criar")
    public Fornecedor createFornecedor(@Valid @RequestBody Fornecedor fornecedor) {
        Empresa empresa = empresaRepository.findByCnpj(fornecedor.getCnpjCpf());
        if (empresa == null) {
            return null;
        }
        fornecedor.setEmpresa(empresa);
        return fornecedorRepository.save(fornecedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> updateFornecedor(@PathVariable(value = "id") int fornecedorId,
                                                       @Valid @RequestBody Fornecedor fornecedorDetails) {
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId);
        if (fornecedor == null) {
            return ResponseEntity.notFound().build();
        }
        Empresa empresa = empresaRepository.findByCnpj(fornecedorDetails.getCnpjCpf());
        if (empresa == null) {
            return ResponseEntity.badRequest().build();
        }
        fornecedor.setCnpjCpf(fornecedorDetails.getCnpjCpf());
        fornecedor.setNome(fornecedorDetails.getNome());
        fornecedor.setEmail(fornecedorDetails.getEmail());
        fornecedor.setCep(fornecedorDetails.getCep());
        fornecedor.setEmpresa(empresa);
        Fornecedor updatedFornecedor = fornecedorRepository.save(fornecedor);
        return ResponseEntity.ok(updatedFornecedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Fornecedor> deleteFornecedor(@PathVariable(value = "id") int fornecedorId) {
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId);
        if (fornecedor == null) {
            return ResponseEntity.notFound().build();
        }
        fornecedorRepository.delete(fornecedor);
        return ResponseEntity.ok().build();
    }
}
