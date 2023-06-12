export default class Pet {
    private id: number
    private nome: string
    private tipo: string
    private raca: string
    private genero: string

    constructor(id:number, nome: string, raca: string, genero: string, tipo: string) {
        this.id = id
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
    }
    public get getId(){return this.id}

    public get getNome(){return this.nome}
    public set setNome(novoNome:string){this.nome = novoNome}

    public get getRaca(){return this.raca}
    public set setRaca(novaRaca:string){this.raca = novaRaca}

    public get getGenero(){return this.genero}
    public set setGenero(novoGenero:string){this.genero = novoGenero}

    public get getTipo(){return this.tipo}
    public set setTipo(novoTipo:string){this.tipo = novoTipo}
}