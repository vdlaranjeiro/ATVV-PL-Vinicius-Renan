// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../services/axios'
import CurrencyInput from 'react-currency-input-field'


export default function FormularioCadastroProduto(props) {

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
        };
        
        await axios.post('/cadastrarProduto', { dados: dados }).then(() => {
          alert('Cadastro bem-sucedido!');
          navigate('/produtos');
        });
    };

    //REVISÃO E EDIÇÃO DE PRODUTOS
    const [editar, setEditar] = useState(false)
    const {id} = useParams()

    const handleEdicao = async (evento) => {
        evento.preventDefault()

        const precoFormatado = preco.replace(',', '.')
        const dados = {
            nome: nome,
            preco: parseFloat(precoFormatado)
        }

        await axios.post('/atualizarProduto', {dados: dados, id: id}).then((response) => {
            console.log(response)
            alert('Dados atualizados!')
        })

    }

    const handleExclusao = async () => {
        const confirmacao = window.confirm('Deseja excluir este produto?')

        if(confirmacao){
            await axios.post(`/removerProduto`, {id: id}).then(() => {
                alert('Produto excluído')
                navigate('/produtos')
            })
        }
    }

    useEffect(() => {
        if(id){
            setEditar(true)
            async function getDadosProduto(){
                await axios.get(`/produto/${id}`).then((response) => {
                    const dados = response.data
                    console.log(dados)
                    setNome(dados.nome)
                    setPreco(dados.preco)
                })
            }
            getDadosProduto()
        }
    }, [id])

    return (
        <div className="container-fluid formulario">
            <form onSubmit={(e) => {editar === true ? handleEdicao(e) : handleCadastro(e)}}>
                <div className="form-label-big">Nome do produto</div>
                <div className='form-floating mb-3'>
                    <input type="text" className="form-control" id='nome-produto' placeholder="ex: Ração..." aria-label="nome do produto"
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                    required/>
                    <label for="nome-produto" className='form-label-placeholder'>ex: Ração...</label>
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
                        <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => handleExclusao()}>Excluir</button>
                    </div>
                    : 
                    <div className='submit-buttons'>
                        <button className="btn btn-primary btn-lg add-button" type="submit">Cadastrar</button>
                        <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => navigate('/serviços')}>Voltar</button>
                    </div>
                }
                
            </form>
            <button onClick={() => console.log(preco.replace(',', '.'))}></button>
        </div>
    )
}