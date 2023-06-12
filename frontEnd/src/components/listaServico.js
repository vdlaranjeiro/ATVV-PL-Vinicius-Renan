/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import listaCliente from '../styles/components/listas.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'


export default function ListaServico(props) {
    

    return (
        <div className="container-fluid">
            <div className="list-group">
                <div className='title-register'>
                    <h2>Serviços cadastrados</h2>
                    <button onClick={(e) => props.seletorView('CadastroServico', e, false)} className="btn btn-secondary add-button">+ Cadastrar um novo</button>
                </div>
                <li className="list-group-item"> Serviço 1 <button onClick={(e) => props.seletorView('CadastroServico', e, true)} className="btn btn-secondary add-button">Detalhes</button> </li>
                <li className="list-group-item"> Serviço 2 <button onClick={(e) => props.seletorView('CadastroServico', e, true)} className="btn btn-secondary add-button">Detalhes</button> </li>
                <li className="list-group-item"> Serviço 3 <button onClick={(e) => props.seletorView('CadastroServico', e, true)} className="btn btn-secondary add-button">Detalhes</button> </li>
                <li className="list-group-item"> Serviço 4 <button onClick={(e) => props.seletorView('CadastroServico', e, true)} className="btn btn-secondary add-button">Detalhes</button> </li>
            </div>
        </div>
    )
}