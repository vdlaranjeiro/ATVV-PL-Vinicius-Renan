import Servico from "../modelo/servico";

export default class ExcluidorServico {
    private servicos: Servico[]
    constructor(servicos: Servico[]){
        this.servicos = servicos
    }

    public excluir(codigo:number){
        let indiceServico = this.servicos.findIndex(servico => servico.getCodigo === codigo)

        this.servicos.splice(indiceServico, 1)
        console.log('Serviço excluído com sucesso')  
    }
}