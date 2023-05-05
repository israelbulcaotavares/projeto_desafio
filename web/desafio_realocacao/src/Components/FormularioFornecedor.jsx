import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const FormularioFornecedor = () => {
  const [empresas, setEmpresas] = useState([]);
  const formik = useFormik({
    initialValues: {
      cnpjEmpresa: '',
      cpf: '',
      nome: '',
      email: '',
      cep: '',
      rg: '',
      dataNascimento: '',
    },
    validationSchema: Yup.object({
      cnpjEmpresa: Yup.string()
        .required('Campo obrigatório')
        .length(14, 'CNPJ deve ter 14 dígitos'),
      cpf: Yup.string()
        .required('Campo obrigatório')
        .length(11, 'CPF deve ter 11 dígitos'),
      nome: Yup.string().required('Campo obrigatório'),
      email: Yup.string().required('Campo obrigatório').email('Email inválido'),
      cep: Yup.string().required('Campo obrigatório'),
      rg: Yup.string(),
      dataNascimento: Yup.date(),
    }),
    onSubmit: (values, { resetForm }) => {
      api.post('/fornecedores/criar', values).then(() => {
        alert('Fornecedor cadastrado com sucesso');
        resetForm();
      }).catch((error) => {
        alert(`Erro ao cadastrar fornecedor: ${error.response.data.message}`);
      });
    },
  });

  useEffect(() => {
    api.get('/empresas').then((response) => {
      setEmpresas(response.data);
    });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="cnpjEmpresa">CNPJ da Empresa</label>
        <select id="cnpjEmpresa" name="cnpjEmpresa" onChange={formik.handleChange} value={formik.values.cnpjEmpresa}>
          <option value="">Selecione uma empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.cnpj}>{empresa.nomeFantasia}</option>
          ))}
        </select>
        {formik.errors.cnpjEmpresa && formik.touched.cnpjEmpresa && <div>{formik.errors.cnpjEmpresa}</div>}
      </div>
      <div>
        <label htmlFor="cpf">CPF</label>
        <input type="text" id="cpf" name="cpf" onChange={formik.handleChange} value={formik.values.cpf} />
        {formik.errors.cpf && formik.touched.cpf && <div>{formik.errors.cpf}</div>}
      </div>
      <div>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" onChange={formik.handleChange} value={formik.values.nome} />
        {formik.errors.nome && formik.touched.nome && <div>{formik.errors.nome}</div>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
      </div>
      <div>
        <label htmlFor="cep">CEP</label>
        <input type="text" id="cep" name="cep" onChange={formik.handleChange} value={formik.values.cep} />
        {formik.errors}
      </div>
      <div>
        <label htmlFor="rg">RG</label>
        <input type="text" id="rg" name="rg" onChange={formik.handleChange} value={formik.values.rg} />
        {formik.errors.rg && formik.touched.rg && <div>{formik.errors.rg}</div>}
      </div>
      <div>
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input type="date" id="dataNascimento" name="dataNascimento" onChange={formik.handleChange} value={formik.values.dataNascimento} />
        {formik.errors.dataNascimento && formik.touched.dataNascimento && <div>{formik.errors.dataNascimento}</div>}
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioFornecedor;
