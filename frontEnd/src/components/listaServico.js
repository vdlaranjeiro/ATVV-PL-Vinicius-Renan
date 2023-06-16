/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../services/axios'


export default function ListaServico(props) {
    const navigate = useNavigate()
    const [servicos, setServicos] = useState([])

    useEffect(() => {
        async function getServicos(){
            await axios.get('/servicos').then((response) => {
                const dados = response.data
                console.log(dados)
                setServicos(dados)
            })
        }
        getServicos()
    }, [])

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    {servicos.length > 0 ?
                        <h2>Serviços cadastrados</h2>
                        :
                        <h2>Ainda não há serviços cadastrados</h2>
                    }
                    <button onClick={(e) => navigate('/cadastroServico')} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                {servicos.map((servico, index) => {
                    return (
                        <li key={servico.codigo} className="list-group-item"> {servico.nome} <button onClick={(e) => navigate(`/detalhesServico/${servico.codigo}`)} className="btn btn-secondary add-button">Detalhes</button> </li>
                    )
                })
                }
            </div>
        </div>
    )
}