import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class AtualizarServico {
    private servicos: Servico[]
    private entrada: Entrada

    constructor(servicos: Servico[]){
        this.servicos = servicos
        this.entrada = new Entrada()
    }

    public atualizar(servicoAlvo: Servico){
        console.log('\nAtualização de produto:')

        let atualizarNome = this.entrada.receberTexto('Deseja atualizar o nome do serviço? (S/N) ')
        if(atualizarNome.toLowerCase() === 's'){
            let novoNome = this.entrada.receberTexto('Por favor informe o novo nome do serviço: ')
            servicoAlvo.setNome = novoNome
        }

        let atualizarPreco = this.entrada.receberTexto('Deseja atualizar o preço do serviço? (S/N) ')
        if(atualizarPreco){
            let novoPreco = this.entrada.receberNumero('Por favor informe o novo preço do serviço: ')
            servicoAlvo.setPreco = novoPreco
        }
        
        console.log('Atualização concluída')
    }
}