import React from 'react';
import api from '../api';

const FiltroFornecedores = ({ setFornecedores }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    api.get(`/fornecedores?nome=${searchTerm}&cpfCnpj=${searchTerm}`).then((response) => {
      setFornecedores(response.data);
    });
  };

  return (
    <div>
      <label htmlFor="filtro">Filtrar por Nome ou CPF/CNPJ</label>
      <input type="text" id="filtro" name="filtro" onChange={handleSearch} />
    </div>
  );
};

export default FiltroFornecedores;