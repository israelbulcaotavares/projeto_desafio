import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import FiltroEmpresas from './FiltroEmpresas';

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    api.get('/empresa/listar').then((response) => {
      setEmpresas(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir esta empresa?')) {
      api.delete(`/empresa/deletar/${id}`).then(() => {
        alert('Empresa excluída com sucesso');
        setEmpresas(empresas.filter((empresa) => empresa.id !== id));
      }).catch((error) => {
        alert(`Erro ao excluir empresa: ${error.response.data.message}`);
      });
    }
  };

  return (
    <>
      <h1>Lista de Empresas</h1>
      <Link to="/empresas/cadastro">Cadastrar Empresa</Link>
      <FiltroEmpresas setEmpresas={setEmpresas} />
      <table>
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Nome Fantasia</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.cnpj}</td>
              <td>{empresa.nomeFantasia}</td>
              <td>{empresa.cep}</td>
              <td>
                <Link to={`/empresas/edicao/${empresa.id}`}>Editar</Link>
                <button type="button" onClick={() => handleDelete(empresa.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListaEmpresas;
