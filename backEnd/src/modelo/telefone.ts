export default class Telefone {
    private ddd: string
    private numero: string
    constructor(ddd: string, numero: string) {
        this.ddd = ddd
        this.numero = numero
    }

    public get getDdd(): string {
        return this.ddd
    }
    public set setDdd(novoDdd:string){
        this.ddd = novoDdd
    }

    public get getNumero(): string {
        return this.numero
    }
    public set setNumero(novoNumero:string){
        this.numero = novoNumero
    }
}