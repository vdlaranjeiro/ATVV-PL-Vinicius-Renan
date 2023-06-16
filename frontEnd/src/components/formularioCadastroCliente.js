import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BarraSecao from './barraSecao'
import axios from '../services/axios'
import InputMask from 'react-input-mask'

export default function FormularioCadastroCliente(props) {
    const [secaoAtual, setSecaoAtual] = useState('Informações')


     //CAMPOS DO FORMULÁRIO
     const [nome, setNome] = useState('')
     const [nomeSocial, setNomeSocial] = useState('')
     const [cpf, setCpf] = useState({valor: '', dataEmissao: ''})
     const [rgs, setRgs] = useState([{id: 1, valor:'', dataEmissao:''}])
     const [telefones, setTelefones] = useState([{id: 1, ddd: '', numero: ''}])
     const [pets, setPets] = useState([{id:1, nome: '', tipo: '', raca: '', genero: ''}])

     const [cpfsExistente, setCpfsExistente] = useState([])
     useEffect(() => {
        async function getCpfExistentes(){
            await axios.get('/cpfs').then((response) => {
                const cpfs = response.data
                setCpfsExistente(cpfs)
            })
        }
        getCpfExistentes()
     }, [])

     //INFORMAÇÕES DAS COMPRAS
     const [compras, setCompras] = useState([])

    //TROCA DE ROTAS
    const navigate = useNavigate()

    //LISTA DE RGS
    const listarRgs = () => {
        let listaRgs = rgs.map((rg, index) => 
            <div className='mb-3' key={index}>
                <label className="form-label">RG {index + 1}</label>
                <div className="input-group mb-3">
                    <div className='form-floating mb-3'>
                        <InputMask type="text" id={`rg-${index}`} aria-label="documento de identidade" className="form-control" placeholder='RG'
                        mask='99.999.999-9'
                        maskChar='_'
                        value={rgs[index].valor}
                        onChange={(e) => handleValorRG(e, index)}
                        required/>
                        <label className='form-label-placeholder'>RG</label>
                    </div>
                    {rgs.length > 1 &&
                        <button className="btn btn-outline-secondary remove-input-button" type="button"
                                onClick={() => removerRg(rg.id)}
                        >-</button>
                    }
                    {index === rgs.length - 1 && 
                    <button className="btn btn-outline-secondary add-input-button" type="button"
                            onClick={adicionarRg}
                    >+</button>
                    }
                </div>
                <label>Data de emissão</label>
                <input type="date" className="form-control" id="dateInput"
                value={rgs[index].dataEmissao}
                onChange={(e) => handleDataRG(e, index)}
                required/>
                <hr></hr>            
            </div> 
        )
        return listaRgs
    }

    const adicionarRg = () => {
        const idNovo = rgs[rgs.length - 1].id + 1
        const rgNovo = {id: idNovo, valor:'', dataEmissao:''}
        setRgs([...rgs, rgNovo])
    }

    const removerRg = (id) => {
        if(rgs.length > 1){
            const novosRgs = rgs.filter(rg => rg.id !== id)
            setRgs(novosRgs)
        }
    }

    const handleValorRG = (evento, index) => {
        const novosRgs = [...rgs]
        novosRgs[index] = {...novosRgs[index], valor: evento.target.value}
        setRgs(novosRgs)
    }

    const handleDataRG = (evento, index) => {
        const novosRgs = [...rgs]
        novosRgs[index] = {...novosRgs[index], dataEmissao: evento.target.value}
        setRgs(novosRgs)
    }


    // LISTA DE TELEFONES
    const listarTelefones = () => {
        let listaTelefones = telefones.map((telefone, index) => 
            <div className='mb-3' key={index}>
                <label className="form-label form-label">Telefone {index + 1}</label>
                <div className="input-group mb-3">
                    <div className='form-floating mb-3'>
                        <InputMask type="text" id={`telefone-${index}`} aria-label="número de telefone" className="form-control" placeholder='DDD + Número'
                        mask={telefones[index].numero.length <= 8 ? '(99) 99999999' : '(99) 999999999'}
                        value={telefones[index].ddd + telefones[index].numero}
                        onChange={(e) => handleTelefone(e, index)}
                        required/>
                        <label className='form-label-placeholder'>DDD + Número</label>
                    </div>
                    {telefones.length > 1 &&
                        <button className="btn btn-outline-secondary remove-input-button" type="button"
                                onClick={() => removerTelefone(telefone.id)}
                        >-</button>
                    }
                    {index === telefones.length - 1 && 
                    <button className="btn btn-outline-secondary add-input-button" type="button"
                            onClick={adicionarTelefone}
                    >+</button>
                    }
                </div> 
            </div>
        )
        return listaTelefones
    }

    const adicionarTelefone = () => {
        const idNovo = telefones[telefones.length - 1].id + 1
        const telefoneNovo = {id: idNovo, ddd: '', numero: ''}
        setTelefones([...telefones, telefoneNovo])
    }

    const removerTelefone = (id) => {
        if(telefones.length > 1){
            const novosTelefones = telefones.filter(telefone => telefone.id !== id)
            setTelefones(novosTelefones)
        }
    }

    const handleTelefone = (evento, index) => {
       const novoTelefone = evento.target.value

       const novoDDD = novoTelefone.substring(1,3)
       let novoNumero = novoTelefone.substring(4)

       if(novoNumero.charAt(novoNumero.length - 1) === '_'){
            novoNumero = novoTelefone.substring(5,13)
       }

       const novosTelefones = [...telefones]
       novosTelefones[index] = {...novosTelefones[index], ddd: novoDDD, numero: novoNumero}
       setTelefones(novosTelefones)
    }


    // LISTA DE PETS
    const listarPets = () => {
        let listaPets = pets.map((pet, index) => 
            <div key={index} className='mb-3'>
                <div className='form-floating mb-3'>
                    <input type="text" id='nomePet' aria-label="nome do pet" className="form-control" placeholder='Nome'
                    value={pets[index].nome}
                    onChange={(e) => handleNomePet(e, index)}
                    required/>
                    <label className='form-label-placeholder'>Nome</label>
                </div>
                <div className='input-group mb-3'>
                    <div className='form-floating mb-3'>
                        <input type="text" id='tipoPet' aria-label="tipo do pet" className="form-control" placeholder='Tipo'
                        value={pets[index].tipo}
                        onChange={(e) => handleTipoPet(e, index)}
                        required />
                        <label className='form-label-placeholder'>Tipo</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type="text" id='racaPet' aria-label="raça do pet" className="form-control" placeholder='Raça'
                        value={pets[index].raca}
                        onChange={(e) => handleRacaPet(e, index)}
                        required />
                        <label className='form-label-placeholder'>Raça</label>
                    </div>
                </div>
                <div>
                    <select className="form-select" aria-label="gênero do pet"
                    value={pets[index].genero}
                    onChange={(e) => handleGeneroPet(e, index)}
                    required >
                        <option>Gênero</option>
                        <option value="F">Fêmea</option>
                        <option value="M">Macho</option>
                    </select>
                </div>
                <div className='pet-buttons'>
                    {pets.length > 1 &&
                            <button className="btn btn-secondary remove-button" type="button"
                                    onClick={() => removerPet(pet.id)}
                            >- Remover </button>
                        }
                    {index === pets.length - 1 && 
                        <button className="btn btn-secondary add-button" type="button"
                                onClick={adicionarPet}
                        >+ Adicionar </button>
                    }
                </div>
                
                <hr></hr>  
            </div>
            
        )
        return listaPets
    }

    const adicionarPet = () => {
        const idNovo = pets[pets.length - 1].id + 1
        const petNovo = {id: idNovo, nome: '', tipo: '', raca: '', genero: ''}
        setPets([...pets, petNovo])
    }

    const removerPet = (id) => {
        if(pets.length > 1){
            const novosPets = pets.filter(pet => pet.id !== id)
            setPets(novosPets)
        }  
    }

    const handleNomePet = (evento, index, alteracao) => {
        const novosPets = [...pets]
        novosPets[index] = {...novosPets[index], nome: evento.target.value}
        setPets(novosPets)
    }
    const handleTipoPet = (evento, index) => {
        const novosPets = [...pets]
        novosPets[index] = {...novosPets[index], tipo: evento.target.value}
        setPets(novosPets)
    }
    const handleRacaPet = (evento, index) => {
        const novosPets = [...pets]
        novosPets[index] = {...novosPets[index], raca: evento.target.value}
        setPets(novosPets)
    }
    const handleGeneroPet = (evento, index) => {
        const novosPets = [...pets]
        novosPets[index] = {...novosPets[index], genero: evento.target.value}
        setPets(novosPets)
    }

    //ENVIO DO FORMULÁRIO
    const validaForm = () => {
        if(cpfsExistente.some(cpfsExistente => cpfsExistente === cpf.valor)){
            window.alert('CPF já cadastrado')
            return false
        } else if(cpf.valor.charAt(cpf.valor.length -1) === '_'){
            window.alert('CPF incompleto!')
            return false
        } else if(rgs.some(rg => rg.valor.charAt(rg.valor.length - 1) === '_')){
            window.alert('RG incompleto!')
            return false
        } else if(telefones.some(telefone => telefone.numero.length < 8)){
            window.alert('Telefone incompleto!')
            return false
        } else {
            return true
        }
    }

    const handleCadastro = async (evento) => {
        evento.preventDefault()

        const validacao = validaForm()

        if(validacao){
            const dados = {
                nome: nome,
                nomeSocial: nomeSocial,
                cpf: cpf,
                rgs: rgs,
                telefones: telefones,
                pets: pets
            }
    
            await axios.post('/cadastrarCliente', {dados: dados}).then((response) => {
                alert('Cadastro bem-sucedido')
                navigate('/clientes')})
        }
        
    }

    //REVISÃO E EDIÇÃO DE CLIENTES
    const [editar, setEditar] = useState(false)
    const {id} = useParams()

    const handleEdicao = async (evento) => {
        evento.preventDefault()

        const dados = {
            nome: nome,
            nomeSocial: nomeSocial,
            cpf: cpf,
            rgs: rgs,
            telefones: telefones,
            pets: pets
        }

        await axios.post('/atualizarCliente', {dados: dados, id: id}).then(() => {
            alert('Dados atualizados')
        })
    }

    const handleExclusao = async () => {
        const confirmacao = window.confirm('Deseja excluir este cliente?')

        if(confirmacao){
            await axios.post(`/removerCliente`, {id: id}).then(() => {
                alert('Cliente excluído')
                navigate('/clientes')
            })
        }
    }

    const formatarCompras = (compras) => {
        const comprasFormatadas = compras.map((compra) => {

            //FORMATAÇÃO DA DATA
            const dataOriginal = compra.dataConsumo
            const partesData = dataOriginal.split("-")
            const dataFormatada = `${partesData[2].substring(0,2)}/${partesData[1]}/${partesData[0]}`

            //FORMATAÇÃO DA MOEDA
            const valorFormatado = parseFloat(compra.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

            //FORMANDO O NOVO OBJETO
            const compraFormatada = {
                nome: compra.nome,
                dataConsumo: dataFormatada,
                preco: valorFormatado
            }

            return compraFormatada
        })

        return comprasFormatadas
    }

    useEffect(() => {
        if(id){
            setEditar(true)
            async function getDadosCliente(){
                await axios.get(`/cliente/${id}`).then((response) =>{
                    const dados = response.data.informacoes
                    setNome(dados.nome)
                    setNomeSocial(dados.nomeSocial)
                    setCpf(dados.cpf)
                    setRgs(dados.rgs)
                    setTelefones(dados.telefones)
                    setPets(dados.pets)

                    const compras = response.data.compras
                    const comprasFormatadas = formatarCompras(compras)
                    setCompras(comprasFormatadas)
                })
            }
            getDadosCliente()
        }
    }, [id])


    return (
        <>
        {editar &&
            <BarraSecao secaoAtual={secaoAtual} alterarSecao={setSecaoAtual} secoes={['Informações', 'Histórico de compras']}/>
        }
        
        {secaoAtual === 'Informações' &&
            <div className="container-fluid">
                <form onSubmit={(e) => {editar === true ? handleEdicao(e) : handleCadastro(e)}}>
                    <div className="form-label-big">Informações pessoais</div>
                    <div className='form-floating mb-3'>
                        <input type="text" className="form-control" id='nome' placeholder="nome" aria-label="nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)}
                        required/>
                        <label className='form-label-placeholder'>Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id='nomeSocial' placeholder="nomeSocial" aria-label="nomeSocial" 
                        value={nomeSocial}
                        onChange={(e) => setNomeSocial(e.target.value)} 
                        required />
                        <label className='form-label-placeholder'>Nome social</label>
                    </div>
                    <div className='form-label-big'>CPF</div>
                    <div className="form-floating mb-3">
                        <InputMask className='form-control' type='text' placeholder='CPF' aria-label="cpf"
                        mask='999.999.999-99' 
                        maskchar=''
                        value={cpf.valor}
                        onChange={(e) => setCpf({...cpf, valor: e.target.value})} 
                        required 
                        readOnly={editar}
                        />
                        <label className='form-label-placeholder'>CPF</label>
                    </div>
                    <label>Data de emissão</label><br></br>
                    <input type='date' className='form-control'
                    value={cpf.dataEmissao}
                    onChange={(e) => setCpf({...cpf, dataEmissao: e.target.value})}
                    required
                    readOnly={editar} />
                    <hr></hr>
                    <div className='form-label-big'>RGs</div>
                    {listarRgs()}
                    <div className='form-label-big'>Telefones</div>
                    {listarTelefones()}
                    <div className='form-label-big'>Pets</div>
                    {listarPets()}
                    {editar ? 
                        <div className='submit-buttons'>
                            <button className="btn btn-primary btn-lg add-button" type="submit">Editar</button>
                            <button className="btn btn-primary btn-lg remove-button" type="button" onClick={() => handleExclusao()}>Excluir</button>
                        </div>
                        : 
                        <div className='submit-buttons'>
                            <button className="btn btn-primary btn-lg add-button" type="submit">Cadastrar</button>
                            <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => navigate('/clientes')}>Voltar</button>
                        </div>
                    }
                </form>
            </div>
        }
        {secaoAtual === 'Histórico de compras' &&
            <div className='container-fluid'>
                <form>
                    <div className="table-responsive">
                        <table className="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">Descricao</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compras.map((compra, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{compra.nome}</td>
                                            <td>{compra.dataConsumo}</td>
                                            <td>{compra.preco}</td>
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
        </>

    )
}