import Cliente from "../modelo/cliente";

export default class ConsultaCompras {

    private cliente: Cliente

    constructor(cliente: Cliente) {
        this.cliente = cliente
    }

    public consultarProdutos(){
        console.log('\nConsulta de produtos adquiridos')
        console.log(`Cliente: ${this.cliente.nome}`)
        console.log(`CPF: ${this.cliente.getCpf.getValor}`)

        let produtosAdquiridos = this.cliente.getProdutosConsumidos
        produtosAdquiridos.forEach(produto => {
            console.log(`Produto: ${produto.getNome}`)
            console.log(`Preço: ${produto.getPreco}`)
            let data = produto.getData
            if(data){
                let dia = String(data.getDate()).padStart(2, '0')
                let mes = String(data.getMonth() + 1).padStart(2, '0')
                let ano = String(data.getFullYear())

                console.log(`Data da compra: ${dia}/${mes}/${ano}`)
            }
            console.log('---------------------------')
        })
    }

    public consultarServicos(){
        console.log('\nConsulta de serviços adquiridos')
        console.log('\n')
        console.log(`Cliente: ${this.cliente.nome}`)
        console.log(`CPF: ${this.cliente.getCpf.getValor}`)

        let servicosAdquiridos = this.cliente.getServicosConsumidos
        servicosAdquiridos.forEach(servico => {
            let pet = servico.getPet
            console.log('---------------------------------------')
            console.log(`Serviço: ${servico.getNome}`)
            console.log(`Preço: ${servico.getPreco}`)
            console.log(`Pet: ${pet?.getNome} | Tipo: ${pet?.getTipo} | Raça: ${pet?.getRaca}`)
            let data = servico.getData
            if(data){
                let dia = String(data.getDate()).padStart(2, '0')
                let mes = String(data.getMonth() + 1).padStart(2, '0')
                let ano = String(data.getFullYear())

                console.log(`Data da compra: ${dia}/${mes}/${ano}`)
            }
            console.log('---------------------------')   
        })
    }
}