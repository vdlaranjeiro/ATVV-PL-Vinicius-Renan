import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>
    
    constructor(nome: string, nomeSocial: string, cpf: CPF, rgs: RG[], dataCadastro: Date, telefones: Telefone[], pets: Pet[]) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = rgs
        this.dataCadastro = dataCadastro
        this.telefones = telefones
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = pets
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public set setCpf(cpfNovo: CPF) {
        this.cpf = cpfNovo
    }

    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public set setRgs(rgsNovos: RG[]){
        this.rgs = rgsNovos
    }

    public get getDataCadastro(): Date {
        return this.dataCadastro
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public set setTelefones(novosTelefones: Telefone[]){
        this.telefones = novosTelefones
    }

    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public set setProdutosConsumidos(novosProdutos: Produto[]){
        this.produtosConsumidos = novosProdutos
    }
    
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public set setServicosConsumidos(novosServicos: Servico[]){
        this.servicosConsumidos = novosServicos
    }

    public get getPets(): Array<Pet>{
        return this.pets
    }
    public getPet(codigoPet: number): Pet | undefined {
        let petAlvo = this.pets.find(pet => pet.getId === codigoPet)
        if(petAlvo){
            return petAlvo
        } else {
            console.log('Pet não encontrado')
        }
        
    }
    public set setPets(novosPets: Pet[]){
        this.pets = novosPets
    }
}