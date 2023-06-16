export default class Produto {
    private codigo: number
    public nome: string
    private preco: number
    private dataConsumo?: Date

    constructor(codigo:number, nome:string, preco:number, dataConsumo?: Date){
        this.codigo = codigo
        this.nome = nome
        this.preco = preco
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

    public get getData(){
        return this.dataConsumo
    }
    public set setData(data: Date){
        this.dataConsumo = data
    }
}