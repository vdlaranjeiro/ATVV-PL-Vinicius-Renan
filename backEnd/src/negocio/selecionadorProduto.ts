import Produto from "../modelo/produto";

export default class SelecionadorProduto {
    private produtos: Produto[]

    constructor(produtos: Produto[]){
        this.produtos = produtos
    }

    public selecionar(codigo:number){
        let produtoAlvo = this.produtos.find(produto => produto.getCodigo === codigo)
        if(produtoAlvo){
            return produtoAlvo
        } else {
            console.log('Não foram encontrados produtos com esse código')
        }
    }
}