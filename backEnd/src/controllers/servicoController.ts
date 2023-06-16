import { Request, Response } from "express"
import Servico from "../modelo/servico"

export default class ServicoController {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
    }

    public listarServicos(req: Request, res: Response) {
        this.servicos.sort(this.compararNomes)
        res.json(this.servicos)
    }

    public cadastrarServico(req: Request, res: Response): void {
        try {
            const dados = req.body.dados

            let codigo:number = 1
            if(this.servicos.length > 0){
                let codigoReferencia = this.servicos[this.servicos.length - 1].getCodigo
                codigo = codigoReferencia + 1
            }

            let servico = new Servico(codigo, dados.nome, dados.preco)
            this.servicos.push(servico)
            res.send(`certinho patrão`)

        } catch (error) {

            res.send(error)

        }
        
    }

    public atualizarServico(req: Request, res: Response): void {
        try {
            const dados = req.body.dados
            const id: number = req.body.id
            
            let indiceServico = this.servicos.findIndex(servico => servico.getCodigo === Number(id))
            let servicoAlvo = this.servicos[indiceServico]
            if(servicoAlvo){
                //Atualização dos dados
                servicoAlvo.setNome = dados.nome
                servicoAlvo.setPreco = dados.preco
                res.send(`que coisa maravilhosa`)
            } else {
                res.send(`serviço náo encontrado`)
            }
            
        } catch (error) {
            res.send(error)
        }
        
    }

    public removerServico(req: Request, res: Response): void {
        try {
            const id :number = req.body.id
            let indiceServico = this.servicos.findIndex(servico => servico.getCodigo === id)

            this.servicos.splice((indiceServico), 1)
            res.send('morreu')

        } catch (error) {
            res.send(error)
        }
    }

    public consultarServico(req: Request, res: Response) {
        const id = req.params.id

        const servicoAlvo = this.servicos.find(servico => servico.getCodigo === Number(id))
        if(servicoAlvo){

            let preco = String(servicoAlvo.getPreco)
            if(!preco.includes('.')){
                preco = `${preco},00`
            } else {
                const partesPreco = preco.split('.')
                if(partesPreco[1].length < 2){
                    const finalString = partesPreco[1].padEnd(2,'0')
                    preco = partesPreco[0] + ',' + finalString
                }
            }

            const servico = {
                nome: servicoAlvo.nome,
                preco: preco
            }
            res.send(servico)
        } else {
            res.send('Não foram encontrados serviços com esse código')
        }
    }

    public compararNomes(a: Servico, b: Servico) {
        if(a.nome < b.nome){
            return -1
        }
        if( b.nome < a.nome){
            return 1
        }
        return 0
    }
}