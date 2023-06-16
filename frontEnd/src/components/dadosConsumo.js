import { useState, useEffect } from 'react'
import axios from '../services/axios'
import BarraSecao from "./barraSecao"

export default function DadosConsumo(props){
    const [secaoAtual, setSecaoAtual] = useState('Produtos/Serviços')
    const [mercadoria, setMercadoria] = useState('Produto/Serviço')
    const [consumo, setConsumo] = useState('Quantidade')

    //SESSÕES DE DADOS
    //Produtos/Serviços mais consumidos
    const [demanda, setDemanda] = useState([])
    const [demandaFiltrada, setDemandaFiltrada] = useState([])

    //Top 10 clientes
    const [consumoValor, setConsumoValor] = useState([])
    const [consumoQuantidade, setConsumoQuantidade] = useState([])

    //Consumos por tipo e raça
    const [consumoTipo, setConsumoTipo] = useState([])
    const [consumoRaca, setConsumoRaca] = useState([])

    useEffect(() => {
        async function getDadosConsumo(){
            await axios.get('/demandaGeral').then((response) => {
                const dados = response.data
                setDemanda(dados)
                setDemandaFiltrada(dados)
            })

            await axios.get('/consumoQuantidade').then((response) => {
                const dados = response.data
                setConsumoQuantidade(dados)
            })

            await axios.get('/consumoValor').then((response) => {
                const dados = response.data
                setConsumoValor(dados)
            })

            await axios.get('consumoTipo').then((response) => {
                const dados = response.data
                setConsumoTipo(dados)
            })

            await axios.get('/consumoRaca').then((response) => {
                const dados = response.data
                setConsumoRaca(dados)
            })
        }
        getDadosConsumo()
    }, [])


    //FILTROS DAS TABELAS
    useEffect(() => {
        const filtrarDemanda = () => {
            if(mercadoria === 'Produto/Serviço'){
                setDemandaFiltrada(demanda)
            } else if(mercadoria === 'Produto'){
                const filtroProduto = demanda.filter(item => item.tipo === 'produto')
                setDemandaFiltrada(filtroProduto)
            } else if(mercadoria === 'Serviço'){
                const filtroProduto = demanda.filter(item => item.tipo === 'serviço')
                setDemandaFiltrada(filtroProduto)
            } 
        }
        filtrarDemanda()
    }, [mercadoria, demanda])

    //FORMATAÇÃO DE DADOS
    const formatarDinheiro = (valor) => {
        const dinheiroFormatado = parseFloat(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
        return dinheiroFormatado
    }

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
                                {demandaFiltrada.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        }
        {secaoAtual === 'Top 10 clientes' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Líderes em compras</div>
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
                                {consumo === 'Quantidade' ?
                                    consumoQuantidade.map((cliente, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{cliente.nome}</td>
                                                <td>{cliente.quantidade}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    consumoValor.map((cliente, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{cliente.nome}</td>
                                                <td>{formatarDinheiro(cliente.quantidade)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        }
        {secaoAtual === 'Por tipo de pet' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Serviços mais consumidos</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" disabled>
                            <option selected>Produtos/Serviços</option>
                        </select>
                    </div>
                    <hr></hr>
                    {consumoTipo.map((tipo, index) => {
                        return (
                            <>
                            <div className='form-label-big'>{tipo.tipo}</div>
                            <div className="table-responsive">
                                <table class="table table-striped purchase-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Serviço</th>
                                            <th scope="col">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tipo.lista.map((item, index) => {
                                            return (
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{item.nome}</td>
                                                    <td>{item.quantidade}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <hr></hr>
                            </>
                        )
                    }) 
                    }
                </form>
            </div>    
        }
        {secaoAtual === 'Por raça de pet' &&
            <div className='container-fluid'>
                <form>
                    <div className='form-label-big'>Serviços mais consumidos</div>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra" disabled>
                            <option selected>Produtos/Serviços</option>
                        </select>
                    </div>
                    <hr></hr>
                    {consumoRaca.map((raca, index) => {
                        return (
                            <>
                            <div className='form-label-big'>{`${raca.tipo} | ${raca.raca}`}</div>
                            <div className="table-responsive">
                                <table class="table table-striped purchase-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Serviço</th>
                                            <th scope="col">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {raca.lista.map((item, index) => {
                                            return (
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{item.nome}</td>
                                                    <td>{item.quantidade}</td>
                                                </tr>
                                            )
                                        })

                                        }
                                    </tbody>
                                </table>
                            </div>
                            <hr></hr>
                            </>
                        )
                    })
                    }
                </form>
            </div>    
        }
        </>

    )
}