import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProduto extends Listagem {
    private produtos: Produto[]

    constructor(produtos: Produto[]){
        super()
        this.produtos = produtos
    }

    public listar(){
        console.log('\nLista de todos os produtos: ')
        this.produtos.forEach(produto => {
            console.log('Código: ' + produto.getCodigo)
            console.log('Nome: ' + produto.getNome)
            console.log('Preço: ' + produto.getPreco)
            console.log(`--------------------------------------`)
        })
    }
}