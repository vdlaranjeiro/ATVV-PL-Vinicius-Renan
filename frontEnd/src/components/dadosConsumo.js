import { useState } from 'react'
import BarraSecao from "./barraSecao"

export default function DadosConsumo(props){
    const [secaoAtual, setSecaoAtual] = useState('Produtos/Serviços')
    const [mercadoria, setMercadoria] = useState('Produto/Serviço')
    const [consumo, setConsumo] = useState('Quantidade')

    return (
        <>
        <BarraSecao secoes={['Produtos/Serviços', 'Top 10 clientes', 'Por tipo de pet', 'Por raça de pet']} secaoAtual={secaoAtual} alterarSecao={setSecaoAtual}/>

        {secaoAtual === 'Produtos/Serviços' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Mais consumidos</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" onChange={(e) => setMercadoria(e.target.value)}>
                            <option selected value={'Produto/Serviço'}>Produtos/Serviços</option>
                            <option value={"Serviço"}>Serviços</option>
                            <option value={"Produto"}>Produtos</option>
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        }
        {secaoAtual === 'Top 10 clientes' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Líderes em compra</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" onChange={(e) => setConsumo(e.target.value)}>
                            <option selected value={'Quantidade'}>Quantidade</option>
                            <option value={"Valor"}>Valor</option>
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">{consumo}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        }
        {secaoAtual === 'Por tipo de pet' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Mais consumidos</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" disabled>
                            <option selected>Produtos/Serviços</option>
                        </select>
                    </div>
                    <hr></hr>
                    <div className='form-label-big'>Tipo 1</div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                    <div className='form-label-big'>Tipo 2</div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>    
        }
        {secaoAtual === 'Por raça de pet' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Mais consumidos</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" disabled>
                            <option selected>Produtos/Serviços</option>
                        </select>
                    </div>
                    <hr></hr>
                    <div className='form-label-big'>Tipo 1 | Raça 1</div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                    <div className='form-label-big'>Tipo 1 | Raça 2</div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                    <div className='form-label-big'>Tipo 2 | Raça 1</div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{mercadoria}</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Exemplo 1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Exemplo 2</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>    
        }
        </>

    )
}