import Cliente from "../modelo/cliente";


export default class SelecionadorCliente {
    private clientes: Cliente[]

    constructor(clientes: Cliente[]){
        this.clientes = clientes
    }

    public selecionar(cpf:string) {
        let clienteAlvo = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        if(clienteAlvo){
            return clienteAlvo
        } else {
            console.log('Não foram encontrados clientes com esse CPF')
        }
    }
}