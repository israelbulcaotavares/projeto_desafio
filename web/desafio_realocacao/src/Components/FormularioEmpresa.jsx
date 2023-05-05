import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const FormularioEmpresa = () => {
  const formik = useFormik({
    initialValues: {
      cnpj: '',
      nomeFantasia: '',
      cep: '',
    },
    validationSchema: Yup.object({
      cnpj: Yup.string()
        .required('Campo obrigatório')
        .length(14, 'CNPJ deve ter 14 dígitos'),
      nomeFantasia: Yup.string().required('Campo obrigatório'),
      cep: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: (values, { resetForm }) => {
      api.post('/empresa/criar', values).then(() => {
        alert('Empresa cadastrada com sucesso');
        resetForm();
        history.push('/');
      }).catch((error) => {
        alert(`Erro ao cadastrar empresa: ${error.response.data.message}`);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="cnpj">CNPJ</label>
        <input type="text" id="cnpj" name="cnpj" onChange={formik.handleChange} value={formik.values.cnpj} />
        {formik.errors.cnpj && formik.touched.cnpj && <div>{formik.errors.cnpj}</div>}
      </div>
      <div>
        <label htmlFor="nomeFantasia">Nome Fantasia</label>
        <input type="text" id="nomeFantasia" name="nomeFantasia" onChange={formik.handleChange} value={formik.values.nomeFantasia} />
        {formik.errors.nomeFantasia && formik.touched.nomeFantasia && <div>{formik.errors.nomeFantasia}</div>}
      </div>
      <div>
        <label htmlFor="cep">CEP</label>
        <input type="text" id="cep" name="cep" onChange={formik.handleChange} value={formik.values.cep} />
        {formik.errors.cep && formik.touched.cep && <div>{formik.errors.cep}</div>}
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioEmpresa;
