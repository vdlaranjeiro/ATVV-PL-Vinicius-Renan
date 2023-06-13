/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom"

export default function ListaProduto(props) {
    const navigate = useNavigate()

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    <h2>Produtos cadastrados</h2>
                    <button onClick={(e) => navigate('/cadastroProduto')} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                <li className="list-group-item"> Produto 1 <button onClick={(e) => navigate('/detalhesProduto/1')} className="btn btn-secondary add-button">Detalhes</button> </li>
            </div>
        </div>
    )
}