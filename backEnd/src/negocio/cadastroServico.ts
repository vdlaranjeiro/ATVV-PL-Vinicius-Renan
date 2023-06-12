import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Cadastro from "./cadastro";

export default class CadastroServico extends Cadastro {

    private servicos: Servico[]
    private entrada: Entrada

    constructor(servicos: Servico[]){
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }

    public cadastrar(){
        console.log('\nInício do cadastro de serviço\n')

        let nome = this.entrada.receberTexto('Por favor informe o nome do serviço: ')
        let preco = this.entrada.receberNumero('Por favor informe o preço do serviço: ')

        let codigo:number = 1
        if(this.servicos.length > 0){
            let codigoReferencia = this.servicos[this.servicos.length - 1].getCodigo
            codigo = codigoReferencia + 1
        }

        let servico = new Servico(codigo, nome, preco)
        this.servicos.push(servico)
        
        console.log('Cadastro concluído')
    }
}