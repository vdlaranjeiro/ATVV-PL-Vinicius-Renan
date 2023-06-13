import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Roteador from './components/roteador';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

//IMPORT DE COMPONENETES
import App from './components/App';
import ListaCliente from './components/listaCliente';
import ListaServico from './components/listaServico';
import ListaProduto from './components/listaProduto';
import FormularioCompra from './components/formularioCompra';
import DadosConsumo from './components/dadosConsumo';
import FormularioCadastroCliente from './components/formularioCadastroCliente';
import FormularioCadastroServico from './components/formularioCadastroServico';
import FormularioCadastroProduto from './components/formularioCadastroProduto'


const router = createBrowserRouter([
  {
    element:<App />,
    children: [
      {
        path: "/clientes",
        element: <ListaCliente/> 
      },
      {
        path: "/serviços",
        element: <ListaServico/> 
      },
      {
        path: "/produtos",
        element: <ListaProduto/> 
      },
      {
        path: "/compra",
        element: <FormularioCompra/> 
      },
      {
        path: "/dadosdeconsumo",
        element: <DadosConsumo/> 
      },
      {
        path: "/cadastroCliente",
        element: <FormularioCadastroCliente/> 
      },
      {
        path: "/detalhesCliente/:id",
        element: <FormularioCadastroCliente/> 
      },
      {
        path: "/cadastroServico",
        element: <FormularioCadastroServico/> 
      },
      {
        path: "/detalhesServico/:id",
        element: <FormularioCadastroServico/> 
      },
      {
        path: "/cadastroProduto",
        element: <FormularioCadastroProduto/> 
      },
      {
        path: "/detalhesProduto/:id",
        element: <FormularioCadastroProduto/> 
      },

    ]
  }
])

if (window.location.pathname === '/') {
  window.location.replace('/clientes');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
