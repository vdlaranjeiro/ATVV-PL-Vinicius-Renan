// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

export default function FormularioCadastroServico(props) {
    

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
                {props.editar ? 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="button">Editar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button">Excluir</button>
                    </div>
                    : 
                    <div>
                        <button className="btn btn-primary btn-lg add-button" type="button">Cadastrar</button>
                    </div>
                }
                
            </form>
        </div>
    )
}