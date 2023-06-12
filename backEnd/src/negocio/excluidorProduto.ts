import Produto from "../modelo/produto";

export default class ExcluidorProduto {
    private produtos: Produto[]
    constructor(produtos: Produto[]){
        this.produtos = produtos
    }

    public excluir(codigo:number){
        let indiceProduto = this.produtos.findIndex(produto => produto.getCodigo === codigo)

        this.produtos.splice(indiceProduto, 1)
        console.log('Produto excluído com sucesso')  
    }
}