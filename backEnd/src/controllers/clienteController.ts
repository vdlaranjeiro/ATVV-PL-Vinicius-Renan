import { Request, Response } from "express"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import CPF from "../modelo/cpf"
import RG from "../modelo/rg"
import Pet from "../modelo/pet"
import Telefone from "../modelo/telefone"

export default class ClienteController {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }

    public listarClientes(req: Request, res: Response) {
        this.clientes.sort(this.compararNomes)
        res.json(this.clientes)
    }

    public cadastrarCliente(req: Request, res: Response): void {
        try {
            const dados = req.body.dados

            //CPF
            let cpf = new CPF(dados.cpf.valor, dados.cpf.dataEmissao)

            //RGS
            let rgs: RG[] = []
            for(let i = 0; i < dados.rgs.length; i++){
                let rg = new RG(dados.rgs[i].valor, dados.rgs[i].dataEmissao)
                rgs.push(rg)
            }

            //TELEFONES
            let telefones: Telefone[] = []
            for(let i = 0; i < dados.telefones.length; i++){
                let telefone = new Telefone(dados.telefones[i].ddd, dados.telefones[i].numero)
                telefones.push(telefone)
            }

            //PETS
            let pets: Pet[] = []
            for(let i = 0; i < dados.pets.length; i++){
                let pet = new Pet(dados.pets[i].id, dados.pets[i].nome, dados.pets[i].raca, dados.pets[i].genero, dados.pets[i].tipo)
                pets.push(pet)
            }

            let cliente = new Cliente(dados.nome, dados.nomeSocial, cpf, rgs, new Date(), telefones, pets)
            this.clientes.push(cliente)
            res.send(cliente)

        } catch (error) {

            res.send(error)

        }
        
    }

    public atualizarCliente(req: Request, res: Response): void {
        try {
            const dados = req.body.dados
            const id: number = req.body.id
            
            let clienteAlvo = this.clientes[Number(id) - 1]
            if(clienteAlvo){
                //Atualização dos dados
                clienteAlvo.nome = dados.nome
                clienteAlvo.nomeSocial = dados.nomeSocial

                let rgs: RG[] = []
                for(let i = 0; i < dados.rgs.length; i++){
                    let rg = new RG(dados.rgs[i].valor, dados.rgs[i].dataEmissao)
                    rgs.push(rg)
                }
                clienteAlvo.setRgs = rgs

                let telefones: Telefone[] = []
                for(let i = 0; i < dados.telefones.length; i++){
                    let telefone = new Telefone(dados.telefones[i].ddd, dados.telefones[i].numero)
                    telefones.push(telefone)
                }
                clienteAlvo.setTelefones = telefones

                let pets: Pet[] = []
                for(let i = 0; i < dados.pets.length; i++){
                    let pet = new Pet(dados.pets[i].id, dados.pets[i].nome, dados.pets[i].raca, dados.pets[i].genero, dados.pets[i].tipo)
                    pets.push(pet)
                }
                clienteAlvo.setPets = pets

                res.send(`que coisa maravilhosa`)
            } else {
                res.send(`cliente náo encontrado`)
            }
            
        } catch (error) {
            res.send(error)
        }
        
    }

    public removerCliente(req: Request, res: Response): void {
        try {
            const id :number = req.body.id

            this.clientes.splice((id - 1), 1)
            res.send('morreu')

        } catch (error) {
            res.send(error)
        }
    }

    public consultarCliente(req: Request, res: Response){
        try {
            const id = req.params.id

            let clienteAlvo = this.clientes[Number(id) - 1]
            if(clienteAlvo){
                let comprasCliente:(Produto | Servico)[] = []

                let produtosConsumidos = clienteAlvo.getProdutosConsumidos
                produtosConsumidos.forEach(produto => comprasCliente.push(produto))
                
                let servicosConsumidos = clienteAlvo.getServicosConsumidos
                servicosConsumidos.forEach(servico => comprasCliente.push(servico))

               res.send({informacoes: clienteAlvo, compras: comprasCliente})
            } else {
                res.send(`cliente náo encontrado`)
            }
        } catch (error) {
            
        }
    }

    public compararNomes(a: Cliente, b: Cliente) {
        if(a.nome < b.nome){
            return -1
        }
        if( b.nome < a.nome){
            return 1
        }
        return 0
    }

    public cpfExistentes(request: Request, res: Response){

        const listaCpfs: Array<string> = []
        this.clientes.forEach(cliente => {
            const cpf = cliente.getCpf.getValor
            listaCpfs.push(cpf)
        })

        res.send(listaCpfs)
    }
}