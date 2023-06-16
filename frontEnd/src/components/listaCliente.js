/* eslint-disable jsx-a11y/anchor-is-valid */
import listaCliente from '../styles/components/listas.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios  from '../services/axios'

export default function ListaCliente(props) {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        async function getClientes(){
            await axios.get('/clientes').then((response) => {
                const dados = response.data
                //console.log(dados)
                setClientes(dados)
            })
        }
        getClientes()
    }, [])

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    {clientes.length > 0 ?
                        <h2>Clientes cadastrados</h2>
                        :
                        <h2>Ainda não há clientes cadastrados</h2>
                    }
                    <button onClick={(e) => navigate('/cadastroCliente', {editar: false})} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                {clientes.map((cliente, index) => {
                    return (
                        <li key={index} className="list-group-item"> {cliente.nome} <button onClick={(e) => navigate(`/detalhesCliente/${index + 1}`)} className="btn btn-secondary add-button">Detalhes</button> </li>
                    )
                })
                }
            </div>
        </div>
    )
}