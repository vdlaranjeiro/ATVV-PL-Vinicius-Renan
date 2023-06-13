/* eslint-disable jsx-a11y/anchor-is-valid */
import listaCliente from '../styles/components/listas.css'
import { useNavigate } from "react-router-dom"

export default function ListaCliente(props) {
    const navigate = useNavigate()

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    <h2>Clientes cadastrados</h2>
                    <button onClick={(e) => navigate('/cadastroCliente', {editar: false})} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                <li className="list-group-item"> Cliente 1 <button onClick={(e) => navigate('/detalhesCliente/1')} className="btn btn-secondary add-button">Detalhes</button> </li>
            </div>
        </div>
    )
}