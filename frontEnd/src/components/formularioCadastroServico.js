import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function FormularioCadastroServico(props) {
    
    //TROCA DE ROTAS
    const navigate = useNavigate()

    //REVISÃO E EDIÇÃO DE SERVIÇOS
    const [editar, setEditar] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        if(id){
            setEditar(true)
        }
    }, [id])

    return (
        <div className="container-fluid formulario">
            <form>
                <div className="form-label-big">Descrição do serviço</div>
                <div className='form-floating mb-3'>
                    <input type="text" className="form-control" id='descricao-servico' placeholder="ex: Consulta veterinária..." aria-label="descrição do serviço" aria-describedby="basic-addon1" />
                    <label for="descricao-servico" className='form-label-placeholder'>ex: Consulta veterinária...</label>
                </div>
                <div className="form-label-big">Preço</div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id='preco' placeholder="R$00,00" aria-label="preço do serviço" aria-describedby="basic-addon1" />
                    <label for="preco" className='form-label-placeholder'>R$00,00</label>
                </div>
                {editar ? 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="button">Editar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button">Excluir</button>
                    </div>
                    : 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="button">Cadastrar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => navigate('/serviços')}>Voltar</button>
                    </div>
                }
                
            </form>
        </div>
    )
}