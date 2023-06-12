import Servico from "../modelo/servico";

export default class SelecionadorServico {
    private servicos: Servico[]

    constructor(servicos: Servico[]){
        this.servicos = servicos
    }

    public selecionar(codigo:number){
        let servicoAlvo = this.servicos.find(servico => servico.getCodigo === codigo)
        if(servicoAlvo){
            return servicoAlvo
        } else {
            console.log('Não foram encontrados serviços com esse código')
        }
    }
}