// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

export default function FormularioCompra(props) {
    

    return (
        <div className="container-fluid formulario">
            <form>
                <div className="form-label-big">Cliente</div>
                <div>
                    <select class="form-select form-select-lg" aria-label="selecionador de cliente">
                        <option selected disabled>Selecione o cliente</option>
                        <option value="1">Cliente 1</option>
                        <option value="2">Cliente 2</option>
                        <option value="3">Cliente 3</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id='cpf' placeholder="CPF" aria-label="cpf do cliente" />
                    <label for="cpf" className='form-label-placeholder'>CPF</label>
                </div>
                <div>
                    <select class="form-select form-select-lg" aria-label="selecionador de pet">
                        <option selected disabled>Selecione o pet</option>
                        <option value="1">Pet 1</option>
                        <option value="2">Pet 2</option>
                        <option value="3">Pet 3</option>
                    </select>
                </div>
                <hr></hr>
                <div className="form-label-big">Compra</div>
                <div className='input-group mb-3'>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra">
                            <option selected disabled>Tipo</option>
                            <option value="1">Serviço</option>
                            <option value="2">Produto</option>
                        </select>
                    </div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra">
                            <option selected disabled>Serviço/Produto</option>
                            <option value="1">Opção 1</option>
                            <option value="2">Opção 2</option>
                        </select>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id='quantidade' placeholder="Quantidade" aria-label="quantidade da compra"/>
                    <label for="quantidade" className='form-label-placeholder'>Quantidade</label>
                </div>

                
                <div className='submit-buttons'>
                    <button className="btn btn-primary btn-lg add-button" type="button">Confirmar</button>
                    <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => props.seletorView('Clientes', e)}>Voltar</button>
                </div>  
            </form>
        </div>
    )
}