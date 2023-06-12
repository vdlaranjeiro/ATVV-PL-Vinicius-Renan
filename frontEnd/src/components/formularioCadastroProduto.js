// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

export default function FormularioCadastroProduto(props) {
    

    return (
        <div className="container-fluid formulario">
            <form>
                <div className="form-label-big">Nome do produto</div>
                <div className='form-floating mb-3'>
                    <input type="text" className="form-control" id='nome-produto' placeholder="ex: Ração..." aria-label="nome do produto" />
                    <label for="nome-produto" className='form-label-placeholder'>ex: Ração...</label>
                </div>
                <div className="form-label-big">Preço</div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id='preco' placeholder="R$00,00" aria-label="preço do produto" />
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