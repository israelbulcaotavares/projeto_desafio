import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import FiltroFornecedores from './FiltroFornecedores';

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    api.get('/fornecedores').then((response) => {
      setFornecedores(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir este fornecedor?')) {
      api.delete(`/fornecedores/${id}`).then(() => {
        alert('Fornecedor excluído com sucesso');
        setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
      }).catch((error) => {
        alert(`Erro ao excluir fornecedor: ${error.response.data.message}`);
      });
    }
  };

  return (
    <>
      <h1>Lista de Fornecedores</h1>
      <Link to="/fornecedores/cadastro">Cadastrar Fornecedor</Link>
      <FiltroFornecedores setFornecedores={setFornecedores} />
      <table>
        <thead>
          <tr>
            <th>CNPJ Empresa</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CEP</th>
            <th>RG</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.cnpjEmpresa}</td>
              <td>{fornecedor.cpf}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.cep}</td>
              <td>{fornecedor.rg}</td>
              <td>{fornecedor.dataNascimento}</td>
              <td>
                <Link to={`/fornecedores/edicao/${fornecedor.id}`}>Editar</Link>
                <button type="button" onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListaFornecedores;
