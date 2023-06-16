/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../services/axios'

export default function ListaProduto(props) {
    const navigate = useNavigate()
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function getProdutos(){
            await axios.get('/produtos').then((response) => {
                const dados = response.data
                //console.log(dados)
                setProdutos(dados)
            })
        }
        getProdutos()
    }, [])

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    {produtos.length > 0 ?
                        <h2>Produtos cadastrados</h2>
                        :
                        <h2>Ainda não há produtos cadastrados</h2>
                    }
                    <button onClick={(e) => navigate('/cadastroProduto')} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                {produtos.map((produto, index) => {
                    return (
                        <li key={produto.codigo} className="list-group-item"> {produto.nome} <button onClick={(e) => navigate(`/detalhesProduto/${produto.codigo}`)} className="btn btn-secondary add-button">Detalhes</button> </li>
                    )
                })
                }
            </div>
        </div>
    )
}