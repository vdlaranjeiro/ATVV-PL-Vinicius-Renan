import { useState } from 'react'
import BarraSecao from './barraSecao'
// eslint-disable-next-line no-unused-vars
import formularioCadastro from '../styles/components/formularioCadastro.css'
// eslint-disable-next-line no-unused-vars
import botoes from '../styles/botoes.css'

export default function FormularioCadastroCliente(props) {
    const [secaoAtual, setSecaoAtual] = useState('Informações')

    //LISTA DE RGS
    const [rgs, setRgs] = useState([{id: 1, rg:'', dataEmissao:''}])
    const listarRgs = () => {
        let listaRgs = rgs.map((rg, index) => 
            <div className='mb-3' key={index}>
                <label for="" className="form-label">RG {index + 1}</label>
                <div className="input-group mb-3">
                    <div className='form-floating mb-3'>
                        <input type="text" id={`rg-${index}`} aria-label="documento de identidade" className="form-control" placeholder='00000000-0'></input>
                        <label htmlFor={`rg-${index}`} className='form-label-placeholder'>00000000-0</label>
                    </div>
                    {index > 0 &&
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
            </div>
        )
        return listaRgs
    }

    const adicionarRg = () => {
        const idNovo = rgs[rgs.length - 1].id + 1
        const rgNovo = {id: idNovo, numero: ''}
        setRgs([...rgs, rgNovo])
    }

    const removerRg = (id) => {
        const novosRgs = rgs.filter(rg => rg.id !== id)
        setRgs(novosRgs)
    }


    // LISTA DE TELEFONES
    const [telefones, setTelefones] = useState([{id: 1, telefone:''}])
    const listarTelefones = () => {
        let listaTelefones = telefones.map((telefone, index) => 
            <div className='mb-3' key={index}>
                <label for="" className="form-label form-label">Telefone {index + 1}</label>
                <div className="input-group mb-3">
                    <div className='form-floating mb-3'>
                        <input type="text" id={`telefone-${index}`} aria-label="número de telefone" className="form-control" placeholder='DDD + Número'></input>
                        <label htmlFor={`telefone-${index}`} className='form-label-placeholder'>DDD + Número</label>
                    </div>
                    {index > 0 &&
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
        const telefoneNovo = {id: idNovo, numero: ''}
        setTelefones([...telefones, telefoneNovo])
    }

    const removerTelefone = (id) => {
        const novosTelefones = telefones.filter(telefone => telefone.id !== id)
        setTelefones(novosTelefones)
    }


    // LISTA DE PETS
    const [pets, setPets] = useState([{id:1, nome: '', tipo: '', raca: '', genero: ''}])
    const listarPets = () => {
        let listaPets = pets.map((pet, index) => 
            <div className='mb-3'>
                <div className='form-floating mb-3'>
                    <input type="text" id='nomePet' aria-label="nome do pet" className="form-control" placeholder='Nome'></input>
                    <label for="nomePet" className='form-label-placeholder'>Nome</label>
                </div>
                <div className='input-group mb-3'>
                    <div className='form-floating mb-3'>
                        <input type="text" id='tipoPet' aria-label="tipo do pet" className="form-control" placeholder='Tipo'></input>
                        <label for="tipoPet" className='form-label-placeholder'>Tipo</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type="text" id='racaPet' aria-label="raça do pet" className="form-control" placeholder='Raça'></input>
                        <label for="racaPet" className='form-label-placeholder'>Raça</label>
                    </div>
                </div>
                <div>
                    <select className="form-select" aria-label="gênero do pet">
                        <option selected disabled>Gênero</option>
                        <option value="F">Fêmea</option>
                        <option value="M">Macho</option>
                    </select>
                </div>
                {index > 0 &&
                        <button className="btn btn-secondary remove-button" type="button"
                                onClick={() => removerPet(pet.id)}
                        >- Remover </button>
                    }
                {index === pets.length - 1 && 
                    <button className="btn btn-secondary add-button" type="button"
                            onClick={adicionarPet}
                    >+ Adicionar </button>
                }
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
        const novosPets = pets.filter(pet => pet.id !== id)
        setPets(novosPets)
    }

    return (
        <>
        {props.editar &&
            <BarraSecao secaoAtual={secaoAtual} alterarSecao={setSecaoAtual} secoes={['Informações', 'Histórico de compras']}/>
        }
        
        {secaoAtual === 'Informações' &&
            <div className="container-fluid">
                <form>
                    <div className="form-label-big">Informações pessoais</div>
                    <div className='form-floating mb-3'>
                        <input type="text" className="form-control" id='nome' placeholder="nome" aria-label="nome" aria-describedby="basic-addon1" />
                        <label for="nome" className='form-label-placeholder'>Nome</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id='nomeSocial' placeholder="nomeSocial" aria-label="nomeSocial" aria-describedby="basic-addon1" />
                        <label for="nomeSocial" className='form-label-placeholder'>Nome social</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id='cpf' placeholder="cpf" aria-label="cpf" aria-describedby="basic-addon1" />
                        <label for="cpf" className='form-label-placeholder'>CPF</label>
                    </div>
                    <div className='form-label-big'>RG</div>
                    {listarRgs()}
                    <div className='form-label-big'>Telefones</div>
                    {listarTelefones()}
                    <div className='form-label-big'>Pets</div>
                    {listarPets()}
                    {props.editar ? 
                        <div className='submit-buttons'>
                            <button className="btn btn-primary btn-lg add-button" type="button">Editar</button>
                            <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => props.seletorView('Clientes', e)}>Excluir</button>
                        </div>
                        : 
                        <div className='submit-buttons'>
                            <button className="btn btn-primary btn-lg add-button" type="button">Cadastrar</button>
                            <button className="btn btn-primary btn-lg remove-button" type="button" onClick={(e) => props.seletorView('Clientes', e)}>Voltar</button>
                        </div>
                    }
                </form>
            </div>
        }
        {secaoAtual === 'Histórico de compras' &&
            <div className='container-fluid'>
                <form>
                    <div>
                        <select class="form-select form-select-lg" aria-label="selecionador de compra">
                            <option selected>Todos</option>
                            <option value="1">Serviços</option>
                            <option value="2">Produtos</option>
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table class="table table-striped purchase-table">
                            <thead>
                                <tr>
                                    <th scope="col">Descricao</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Produto exemplo 1</td>
                                    <td>10/06/2023</td>
                                    <td>R$120,00</td>
                                </tr>
                                <tr>
                                    <td>Serviço exemplo 2</td>
                                    <td>12/06/2023</td>
                                    <td>R$50,00</td>
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