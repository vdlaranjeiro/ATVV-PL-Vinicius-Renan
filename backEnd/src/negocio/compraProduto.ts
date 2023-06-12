import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";

export default class CompraProduto {
    
    private cliente: Cliente
    private produto: Produto

    constructor(cliente: Cliente, produto: Produto){
        this.cliente = cliente
        this.produto = produto
    }

    public realizarCompra(quantidade:number){
        
        let comprasCliente = this.cliente.getProdutosConsumidos
        
        for(let i = 0; i < quantidade; i++){
            let compra = new Produto(0, this.produto.getNome, this.produto.getPreco, new Date())
            comprasCliente.push(compra)
        }
        this.cliente.setProdutosConsumidos = comprasCliente
        
        console.log('Compra realizada com sucesso')
    }
}