import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from '../services/axios'
import CurrencyInput from 'react-currency-input-field'


export default function FormularioCadastroServico(props) {
    
    //CAMPOS DO FORMULÁRIO
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')


    //TROCA DE ROTAS
    const navigate = useNavigate()

    //TRATAMENTO DE DADOS
    const blurPreco = () => {
        let precoAtual = preco
        if(!precoAtual.includes(',')){
            precoAtual = `${precoAtual},00`
            setPreco(precoAtual)
        } else {
            const partesPreco = precoAtual.split(',')
            if(partesPreco[1].length < 2){
                const finalString = partesPreco[1].padEnd(2,'0')
                precoAtual = partesPreco[0] + ',' + finalString
                setPreco(precoAtual)
            }
        }
    }

    //ENVIO DO FORMULÁRIO
    const handleCadastro = async (evento) => {
        evento.preventDefault()

        const precoFormatado = preco.replace(',', '.')
        const dados = {
            nome: nome,
            preco: parseFloat(precoFormatado)
        }

        await axios.post('/cadastrarServico', {dados: dados}).then(() => {
            alert('Cadastro bem-sucedido!')
            navigate('/serviços')
        })

    }

    //REVISÃO E EDIÇÃO DE SERVIÇOS
    const [editar, setEditar] = useState(false)
    const {id} = useParams()

    const handleEdicao = async (evento) => {
        evento.preventDefault()

        const precoFormatado = preco.replace(',', '.')
        const dados = {
            nome: nome,
            preco: parseFloat(precoFormatado)
        }

        await axios.post('/atualizarServico', {dados: dados, id: id}).then(() => {
            alert('Dados atualizados!')
        })

    }

    const handleExclusao = async () => {
        const confirmacao = window.confirm('Deseja excluir este serviço?')

        if(confirmacao){
            await axios.post(`/removerServico`, {id: id}).then(() => {
                alert('Serviço excluído')
                navigate('/serviços')
            })
        }
    }

    useEffect(() => {
        if(id){
            setEditar(true)
            async function getDadosServico(){
                await axios.get(`/servico/${id}`).then((response) => {
                    const dados = response.data
                    setNome(dados.nome)
                    setPreco(dados.preco)
                })
            }
            getDadosServico()
        }
    }, [id])

    return (
        <div className="container-fluid formulario">
            <form onSubmit={(e) => {editar === true ? handleEdicao(e) : handleCadastro(e)}}>
                <div className="form-label-big">Descrição do serviço</div>
                <div className='form-floating mb-3'>
                    <input type="text" className="form-control" id='descricao-servico' placeholder="ex: Consulta veterinária..." aria-label="descrição do serviço"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required/>
                    <label for="descricao-servico" className='form-label-placeholder'>ex: Consulta veterinária...</label>
                </div>
                <div className="form-label-big">Preço</div>
                <div className="form-floating mb-3">
                    <CurrencyInput
                        className="form-control"
                        id="preco"
                        placeholder="R$00,00"
                        aria-label="preço do produto"
                        value={preco}
                        onValueChange={(valor) => setPreco(valor)}
                        onBlur={blurPreco}
                        required
                        prefix="R$"
                        allowNegativeValue={false}
                        decimalsLimit={2}
                        decimalSeparator=","
                        />
                    <label for="preco" className='form-label-placeholder'>R$00,00</label>
                </div>
                {editar ? 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="submit">Editar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button" onClick={() => handleExclusao()}>Excluir</button>
                    </div>
                    : 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="submit">Cadastrar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => navigate('/serviços')}>Voltar</button>
                    </div>
                }
                
            </form>
        </div>
    )
}