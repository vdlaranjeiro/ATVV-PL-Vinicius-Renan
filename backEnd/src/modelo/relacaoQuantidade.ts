export default class RelacaoQuantidade {
    private nome: string
    private quantidade: number
    private tipo?: string

    constructor(nome: string, quantidade: number, tipo?: string){
        this.nome = nome
        this.quantidade = quantidade
        this.tipo = tipo
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