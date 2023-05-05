import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const EdicaoEmpresa = () => {
  const { id } = useParams();
  const history = useHistory();

  const [empresa, setEmpresa] = useState({ cnpj: '', nomeFantasia: '', cep: '' });

  useEffect(() => {
    api.get(`/empresa/${id}`).then((response) => {
      setEmpresa(response.data);
    });
  }, [id]);
  
  const formik = useFormik({
    initialValues: {
      cnpj: empresa.cnpj,
      nomeFantasia: empresa.nomeFantasia,
      cep: empresa.cep
    },
    validationSchema: Yup.object({
      cnpj: Yup.string().required('CNPJ é obrigatório'),
      nomeFantasia: Yup.string().required('Nome Fantasia é obrigatório'),
      cep: Yup.string().required('CEP é obrigatório')
    }),
    onSubmit: (values) => {
      api.put(`/empresa/atualizar/${id}`, values).then(() => {
        alert('Empresa atualizada com sucesso');
        history.push('/empresas');
      }).catch((error) => {
        alert(`Erro ao atualizar empresa: ${error.response.data.message}`);
      });
    }
  });

  return (
    <>
      <h1>Editar Empresa</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" name="cnpj" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cnpj} />
          {formik.touched.cnpj && formik.errors.cnpj ? <div>{formik.errors.cnpj}</div> : null}
        </div>
        <div>
          <label htmlFor="nomeFantasia">Nome Fantasia:</label>
          <input type="text" id="nomeFantasia" name="nomeFantasia" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nomeFantasia} />
          {formik.touched.nomeFantasia && formik.errors.nomeFantasia ? <div>{formik.errors.nomeFantasia}</div> : null}
        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input type="text" id="cep" name="cep" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cep} />
          {formik.touched.cep && formik.errors.cep ? <div>{formik.errors.cep}</div> : null}
        </div>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default EdicaoEmpresa;
