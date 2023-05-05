import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormularioFornecedor from './FormularioFornecedor';
import api from '../api';

const EdicaoFornecedor = () => {
  const { id } = useParams();
  const [fornecedor, setFornecedor] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get(`/fornecedores/${id}`).then((response) => {
      setFornecedor(response.data);
    });
    api.get('/empresas').then((response) => {
      setEmpresas(response.data);
    });
  }, [id]);

  const handleSubmit = (values) => {
    api.put(`/fornecedores/${id}`, values).then(() => {
      alert('Fornecedor atualizado com sucesso');
      history.push('/fornecedores');
    }).catch((error) => {
      alert(`Erro ao atualizar fornecedor: ${error.response.data.message}`);
    });
  };

  return (
    <>
      <h1>Edição de Fornecedor</h1>
      <FormularioFornecedor initialValues={fornecedor} empresas={empresas} onSubmit={handleSubmit} />
    </>
  );
};

export default EdicaoFornecedor;
