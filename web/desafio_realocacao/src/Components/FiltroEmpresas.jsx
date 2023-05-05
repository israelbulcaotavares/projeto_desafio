import React from 'react';
import api from '../api';

const FiltroEmpresas = ({ setEmpresas }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    api.get(`/empresa?nomeFantasia=${searchTerm}&cnpj=${searchTerm}&cep=${searchTerm}`).then((response) => {
      setEmpresas(response.data);
    });
  };

  return (
    <div>
      <label htmlFor="filtro">Filtrar por Nome Fantasia, CNPJ ou CEP</label>
      <input type="text" id="filtro" name="filtro" onChange={handleSearch} />
    </div>
  );
};

export default FiltroEmpresas;
