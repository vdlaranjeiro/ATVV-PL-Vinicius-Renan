/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom"


export default function ListaServico(props) {
    const navigate = useNavigate()

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    <h2>Serviços cadastrados</h2>
                    <button onClick={(e) => navigate('/cadastroServico')} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                <li className="list-group-item"> Serviço 1 <button onClick={(e) => navigate('/detalhesServico/1')} className="btn btn-secondary add-button">Detalhes</button> </li>
            </div>
        </div>
    )
}