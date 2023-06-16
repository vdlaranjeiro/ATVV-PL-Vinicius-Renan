import { Request, Response } from "express"
import Produto from "../modelo/produto"

export default class ProdutoController {
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }

    public listarProdutos(req: Request, res: Response) {
        this.produtos.sort(this.compararNomes)
        res.json(this.produtos)
    }

    public cadastrarProduto(req: Request, res: Response): void {
        try {
            const dados = req.body.dados

            let codigo:number = 1
            if(this.produtos.length > 0){
                let codigoReferencia = this.produtos[this.produtos.length - 1].getCodigo
                codigo = codigoReferencia + 1
            }

            let produto = new Produto(codigo, dados.nome, dados.preco)
            this.produtos.push(produto)
            res.send(`certinho patrão`)

        } catch (error) {

            res.send(error)

        }
        
    }

    public atualizarProduto(req: Request, res: Response): void {
        try {
            const dados = req.body.dados
            const id: number = req.body.id
            
            let indiceProduto = this.produtos.findIndex(produto => produto.getCodigo === Number(id))
            let produtoAlvo = this.produtos[indiceProduto]
            if(produtoAlvo){
                //Atualização dos dados
                produtoAlvo.setNome = dados.nome
                produtoAlvo.setPreco = dados.preco
                res.send(`que coisa maravilhosa`)
            } else {
                res.send(`produto náo encontrado`)
            }
            
        } catch (error) {
            res.send(error)
        }
        
    }

    public removerProduto(req: Request, res: Response): void {
        try {
            const id :number = req.body.id
            let indiceProduto = this.produtos.findIndex(produto => produto.getCodigo === id)

            this.produtos.splice((indiceProduto), 1)
            res.send('morreu')

        } catch (error) {
            res.send(error)
        }
    }

    public consultarProduto(req: Request, res: Response) {
        const id = req.params.id

        const produtoAlvo = this.produtos.find(produto => produto.getCodigo === Number(id))
        if(produtoAlvo){
            let preco = String(produtoAlvo.getPreco)
            if(!preco.includes('.')){
                preco = `${preco},00`
            } else {
                const partesPreco = preco.split('.')
                if(partesPreco[1].length < 2){
                    const finalString = partesPreco[1].padEnd(2,'0')
                    preco = partesPreco[0] + ',' + finalString
                }
            }

            const produto = {
                nome: produtoAlvo.nome,
                preco: preco
            }

            res.send(produto)
        } else {
            res.send('Não foram encontrados produtos com esse código')
        }
    }

    public compararNomes(a: Produto, b: Produto) {
        if(a.nome < b.nome){
            return -1
        }
        if( b.nome < a.nome){
            return 1
        }
        return 0
    }
}