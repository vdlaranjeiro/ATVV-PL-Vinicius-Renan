export default class RelacaoQuantidade {
    private nome: string
    private quantidade: number

    constructor(nome: string, quantidade: number){
        this.nome = nome
        this.quantidade = quantidade
    }

    public get getNome(){
        return this.nome
    }

    public get getQuantidade(){
        return this.quantidade
    }
    public set setQuantidade(novaQuantidade: number){
        this.quantidade = novaQuantidade
    }
}