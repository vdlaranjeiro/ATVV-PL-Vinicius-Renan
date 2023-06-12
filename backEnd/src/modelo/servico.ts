import Pet from "./pet"

export default class Servico {
    private codigo: number
    public nome: string
    private preco: number
    private pet?: Pet
    private dataConsumo?: Date

    constructor(codigo: number, nome: string, preco: number, pet?: Pet, dataConsumo?: Date) {
        this.codigo = codigo
        this.nome = nome
        this.preco = preco
        this.pet = pet
        this.dataConsumo = dataConsumo
    }

    public get getCodigo(){
        return this.codigo
    }

    public get getNome(){
        return this.nome
    }
    public set setNome(novoNome:string){
        this.nome = novoNome
    }

    public get getPreco(){
        return this.preco
    }
    public set setPreco(novoPreco:number){
        this.preco = novoPreco
    }

    public get getPet(){
        return this.pet
    }
    public set setPet(novoPet: Pet){
        this.pet = novoPet
    }

    public get getData(){
        return this.dataConsumo
    }
}