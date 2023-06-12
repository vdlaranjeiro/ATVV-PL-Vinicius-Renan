import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class AtualizarProduto {
    private produtos: Produto[]
    private entrada: Entrada

    constructor(produtos: Produto[]){
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public atualizar(produtoAlvo: Produto){
        console.log('\nAtualização de produto:')

        let atualizarNome = this.entrada.receberTexto('Deseja atualizar o nome do produto? (S/N) ')
        if(atualizarNome.toLowerCase() === 's'){
            let novoNome = this.entrada.receberTexto('Por favor informe o novo nome do produto: ')
            produtoAlvo.setNome = novoNome
        }

        let atualizarPreco = this.entrada.receberTexto('Deseja atualizar o preço do produto? (S/N) ')
        if(atualizarPreco){
            let novoPreco = this.entrada.receberNumero('Por favor informe o novo preço do produto: ')
            produtoAlvo.setPreco = novoPreco
        }
        
        console.log('Atualização concluída')
    }
}