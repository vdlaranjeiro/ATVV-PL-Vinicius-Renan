// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/axios'

export default function FormularioCompra(props) {
    //CAMPOS DO FORMULÁRIO
    //Cliente
    const [clientes, setClientes] = useState([])
    const [clienteSelecionado, setClienteSelecionado] = useState({nome: '', cpf: '', pets: []})
    const [petSelecionado, setPetSelecionado] = useState({id: 0, nome: '', tipo: '', raca: '', genero: ''})

    //Compra
    const [tipoCompra, setTipoCompra] = useState('')
    const [produtos, setProdutos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState(0)
    const [servicos, setServicos] = useState([])
    const [servicoSelecionado, setServicoSelecionado] = useState(0)
    const [quantidade, setQuantidade] = useState(0)


    //MANIPULAÇÃO DOS STATES
    const handleCliente = (evento) => {
        const cliente = clientes.find(cliente => cliente.cpf.valor === evento.target.value)
        setClienteSelecionado({nome: cliente.nome, cpf: cliente.cpf.valor, pets: cliente.pets})
    }

    const handlePet = (evento) => {
        const pet = clienteSelecionado.pets.find(pet => pet.id === parseInt(evento.target.value))
        setPetSelecionado({id: pet.id, nome: pet.nome, tipo: pet.tipo, raca: pet.raca, genero: pet.genero})
    }

    const handleTipoCompra = (evento) => {
        setTipoCompra(evento.target.value)

        setProdutoSelecionado(0)
        setServicoSelecionado(0)
    }

    const handleProduto = (evento) => {
        const produto = produtos.find(produto => produto.codigo === parseInt(evento.target.value))
        setProdutoSelecionado(produto.codigo)
    }

    const handleServico = (evento) => {
        const servico = servicos.find(servico => servico.codigo === parseInt(evento.target.value))
        setServicoSelecionado(servico.codigo)
    }

    //TROCA DE ROTAS
    const navigate = useNavigate()

    //ENVIO DA COMPRA
    const validateForm = () => {
        if(tipoCompra === ''){
            window.alert('Selecione o tipo da compra')
            return false
        } else if(tipoCompra === 'Produto'){
            if(
                clienteSelecionado.cpf === '' ||
                produtoSelecionado === 0 ||
                quantidade < 1
            ){
                window.alert('Preencha todos os campos')
                return false
            } else {
                return true
            }
        } else if(tipoCompra === 'Serviço'){
            if(
                clienteSelecionado.cpf === '' ||
                petSelecionado.id === 0 ||
                servicoSelecionado === 0 ||
                quantidade < 1
            ){
                window.alert('Preencha todos os campos')
                return false
            } else {
                return true
            }
        }
    }

    const handleCompra = async (evento) => {
        evento.preventDefault()

        const validacao = validateForm()
        if(validacao){
            let cliente = {}
            let compra = {}
            if(tipoCompra === 'Produto'){
                cliente = {
                    cpf: clienteSelecionado.cpf
                }

                compra = {
                    codigo: produtoSelecionado,
                    quantidade: quantidade
                }
                //console.log({cliente, compra})
                await axios.post('/comprarProduto', {cliente, compra}).then(() => {
                    window.alert('Compra efetuada com sucesso!')
                    navigate('/clientes')
                })
            }
            else if(tipoCompra === 'Serviço'){
                cliente = {
                    cpf: clienteSelecionado.cpf,
                    pet: petSelecionado
                }

                compra = {
                    codigo: servicoSelecionado,
                    quantidade: quantidade
                }

                //console.log({cliente, compra})
                await axios.post('/comprarServico', {cliente, compra}).then(() => {
                    window.alert('Compra efetuada com sucesso!')
                    navigate('/clientes')
                })
            }  
        }
        
    }


    useEffect(() => {
        async function getDadosSistema(){
            await axios.get('/compra').then((response) => {
                const clientes = response.data.clientes
                const produtos = response.data.produtos
                const servicos = response.data.servicos

                setClientes(clientes)
                setProdutos(produtos)
                setServicos(servicos)
            }) 
        }
        getDadosSistema()
    }, [])

    return (
        <div className="container-fluid formulario">
            <form onSubmit={(e) => handleCompra(e)}>
                <div className="form-label-big">Cliente</div>
                <div>
                    <select className={`form-select form-select-lg`} aria-label="selecionador de cliente"
                    onChange={(e) => handleCliente(e)}
                    required>
                        <option>Selecione um cliente</option>
                        {clientes.map((cliente, index) => {
                            return (
                                <option key={index} value={cliente.cpf.valor}>{cliente.nome}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id='cpf' placeholder="CPF" aria-label="cpf do cliente"
                    value={clienteSelecionado.cpf}
                    readOnly
                    required/>
                    <label className='form-label-placeholder'>CPF</label>
                </div>
                <div>
                    {tipoCompra === 'Serviço' &&
                        <select className="form-select form-select-lg" aria-label="selecionador de pet"
                        onChange={(e) => handlePet(e)}
                        required>
                            <option>Selecione o pet</option>
                            {clienteSelecionado.pets.map((pet, index) => {
                                return (
                                    <option key={index} value={pet.id}>{pet.nome}</option>
                                )
                             })
                            }
                        </select> 
                    } 
                </div>
                <hr></hr>
                <div className="form-label-big">Compra</div>
                <div className='input-group mb-3'>
                    <div>
                        <select className="form-select form-select-lg" aria-label="selecionador de compra"
                        value={tipoCompra}
                        onChange={(e) => handleTipoCompra(e)}
                        required>
                            <option>Tipo</option>
                            <option value="Serviço">Serviço</option>
                            <option value="Produto">Produto</option>
                        </select>
                    </div>
                    <div>
                        {tipoCompra === 'Produto' &&
                            <select className="form-select form-select-lg" aria-label="selecionador de compra"
                            onChange={(e) => handleProduto(e)}
                            value={produtoSelecionado || 'Opção'}
                            required>
                                <option>Opção</option>
                                {produtos.map((produto, index) => {
                                    return (
                                        <option value={produto.codigo} key={index}>{produto.nome}</option>
                                    )
                                 })
                                }
                            </select>
                        }    
                        {tipoCompra === 'Serviço' &&
                            <select className="form-select form-select-lg" aria-label="selecionador de compra"
                            onChange={(e) => handleServico(e)}
                            value={servicoSelecionado || 'Opção'}
                            required>
                                <option selected>Opção</option>
                                {servicos.map((servico, index) => {
                                    return (
                                        <option value={servico.codigo} key={index}>{servico.nome}</option>
                                    )
                                 })
                                }
                            </select>
                        }
                        
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id='quantidade' placeholder="Quantidade" aria-label="quantidade da compra"
                    value={quantidade}
                    onChange={(e) => setQuantidade(parseInt(e.target.value))}
                    required/>
                    <label className='form-label-placeholder'>Quantidade</label>
                </div>

                
                <div className='submit-buttons'>
                    <button className="btn btn-primary btn-lg add-button" type="submit">Confirmar</button>
                    <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => navigate('/clientes')}>Voltar</button>
                </div>  
            </form>
        </div>
    )
}