import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServico extends Listagem {
    private servicos: Servico[]

    constructor(servicos: Servico[]){
        super()
        this.servicos = servicos
    }

    public listar(){
        console.log('\nLista de todos os serviços: ')
        this.servicos.forEach(servico  => {
            console.log('Código: ' + servico.getCodigo)
            console.log('Nome: ' + servico.getNome)
            console.log('Preço: ' + servico.getPreco)
            console.log(`--------------------------------------`)
        })
    }
}