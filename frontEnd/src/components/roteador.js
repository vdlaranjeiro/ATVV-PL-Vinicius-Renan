/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "./barraNavegacao"
import BarraSecao from './barraSecao'
import ListaCliente from "./listaCliente";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaServico from "./listaServico";
import FormularioCadastroServico from "./formularioCadastroServico"
import ListaProduto from "./listaProduto";
import FormularioCadastroProduto from "./formularioCadastroProduto"
import FormularioCompra from "./formularioCompra"
import DadosConsumo from "./dadosConsumo";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes')
    const [botoes, setBotoes] = useState(['Clientes', 'Serviços', 'Produtos', 'Compra', 'Dados de consumo'])
    const [editar, setEditar] = useState(false)
    const selecionarView = (valor, e, editar) => {
        e.preventDefault()
        setTela(valor)
        setEditar(editar)
    }

    const construirView = () => {
        if (tela === 'Clientes') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <ListaCliente seletorView={selecionarView} />
                </>
            )
        } else if(tela === 'CadastroCliente' && editar) {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <FormularioCadastroCliente seletorView={selecionarView} editar={editar}/>
                </>
            )
        } else if(tela === 'CadastroCliente' && !editar) {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <FormularioCadastroCliente seletorView={selecionarView} editar={editar}/>
                </>
            )
        }else if(tela === 'Serviços') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <ListaServico seletorView={selecionarView} />
                </>
            )
        } else if(tela === 'CadastroServico') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <FormularioCadastroServico editar={editar}/>
                </>
            )
        } else if(tela === 'Produtos') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <ListaProduto seletorView={selecionarView}/>
                </>
            )
        } else if(tela === 'CadastroProduto') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <FormularioCadastroProduto editar={editar}/>
                </>
            )
        } else if(tela === 'Compra') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <FormularioCompra seletorView={selecionarView}/>
                </>
            )
        } else if(tela === 'Dados de consumo') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} botoes={botoes} tema='purple'/>
                    <DadosConsumo seletorView={selecionarView}/>
                </>
            )
        } 
    }

    return (
        construirView()
    )
}