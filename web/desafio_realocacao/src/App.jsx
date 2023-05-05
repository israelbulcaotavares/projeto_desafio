import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
 
import CadastroEmpresa from './Components/CadastroEmpresa';
import EdicaoEmpresa from './Components/EdicaoEmpresa';
import CadastroFornecedor from './Components/CadastroFornecedor';
import EdicaoFornecedor from './Components/EdicaoFornecedor';
import ListaFornecedores from './Components/ListaFornecedores';
import ListaEmpresas from './Components/ListaEmpresas';
 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/empresas">Empresas</Link>
            </li>
            <li>
              <Link to="/fornecedores">Fornecedores</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/empresas/cadastro">
            <CadastroEmpresa />
          </Route>
          <Route path="/empresas/edicao/:id">
            <EdicaoEmpresa />
          </Route>
          <Route path="/empresas">
            <ListaEmpresas />
          </Route>
          <Route path="/fornecedores/cadastro">
            <CadastroFornecedor />
          </Route>
          <Route path="/fornecedores/edicao/:id">
            <EdicaoFornecedor />
          </Route>
          <Route path="/fornecedores">
            <ListaFornecedores />
          </Route>
          <Route path="/">
            <h1>Bem-vindo!</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
