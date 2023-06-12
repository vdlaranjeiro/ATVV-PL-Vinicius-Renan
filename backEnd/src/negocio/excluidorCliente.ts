import Cliente from "../modelo/cliente";

export default class ExcluidorCliente {
    private clientes: Cliente[]
    constructor(clientes: Cliente[]){
        this.clientes = clientes
    }

    public excluir(cpf:string){
        let indiceCliente = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf)

        this.clientes.splice(indiceCliente, 1)
        console.log('Cliente excluído com sucesso')  
    }
}