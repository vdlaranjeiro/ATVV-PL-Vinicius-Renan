import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {

    private produtos: Produto[]
    private entrada: Entrada

    constructor(produtos: Produto[]){
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public cadastrar(){
        console.log('\nInício do cadastro de produtos\n')

        let nome = this.entrada.receberTexto('Por favor informe o nome do produto: ')
        let preco = this.entrada.receberNumero('Por favor informe o preço do produto: ')

        let codigo:number = 1
        if(this.produtos.length > 0){
            let codigoReferencia = this.produtos[this.produtos.length - 1].getCodigo
            codigo = codigoReferencia + 1
        }

        let produto = new Produto(codigo, nome, preco)
        this.produtos.push(produto)
        
        console.log('Cadastro concluído')
    }
}