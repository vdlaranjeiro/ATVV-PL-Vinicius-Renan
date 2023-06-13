/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import barraNavegacao from '../styles/components/barraNavegacao.css'

export default function BarraNavegacao(props) {
    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = props.botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="" onClick={(e) => trocarRota(valor, e)}>{valor}</a>
                </li>
            )
            return lista
        }
    }

    //ELEMENTOS PARA NAVEGAÇÃO ENTRE AS PÁGINAS
    const navigate = useNavigate()
    const trocarRota = (rota, e) => {
        e.preventDefault()
        const rotaSemEspacos = rota.toLowerCase().replace(/\s+/g, "")
        navigate(`/${rotaSemEspacos}`)
    }

    let tema = props.tema
    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{ backgroundColor: tema, marginBottom: 10 }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 logo" onClick={(e) => navigate('clientes')}>PetLovers</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {gerarListaBotoes()}
                        </ul>
                    </div>
                    <button className="btn btn-primary ms-auto back-button" onClick={(e) => navigate('clientes')}>Voltar</button>
                </div>
            </nav>
        </>
    )
}