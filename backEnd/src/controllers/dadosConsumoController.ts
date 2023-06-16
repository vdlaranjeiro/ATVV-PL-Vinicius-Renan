import { Request, Response } from "express"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import RelacaoQuantidade from "../modelo/relacaoQuantidade"

export default class DadosConsumoController {
    private clientes: Cliente[]
    private produtos: Produto[]
    private servicos: Servico[]

    constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]){
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
    }

    public listarMaiorDemanda(req: Request, res: Response){
        let comprasGeral: RelacaoQuantidade[] = []

        //Iniciando a quantidade de todos os produtos/serviços em 0
        this.produtos.forEach(produto => {
            let produtoCadastrado = new RelacaoQuantidade(produto.getNome, 0, 'produto')
            comprasGeral.push(produtoCadastrado)
        })
        this.servicos.forEach(servico => {
            let servicoCadastrado = new RelacaoQuantidade(servico.getNome, 0, 'serviço')
            comprasGeral.push(servicoCadastrado)
        })

        this.clientes.forEach(cliente => {

            //consumo de produtos
            let produtosConsumidos = cliente.getProdutosConsumidos
            comprasGeral.forEach(compra => {
                produtosConsumidos.forEach(produtoConsumido => {
                    if(compra.getNome === produtoConsumido.getNome){
                        compra.setQuantidade = (compra.getQuantidade + 1)
                    }
                })
            })

            //consumo de servicos
            let ServicosConsumidos = cliente.getServicosConsumidos
            comprasGeral.forEach(compra => {
                ServicosConsumidos.forEach(servicosConsumido => {
                    if(compra.getNome === servicosConsumido.getNome){
                        compra.setQuantidade = (compra.getQuantidade + 1)
                    }
                })
            })
        })
        let comprasOrdenadas = comprasGeral.sort(
            (a,b) => b.getQuantidade - a.getQuantidade
        )

        res.send(comprasOrdenadas)
    }

    public consumoQuantidade(req: Request, res: Response){
        let comprasCliente: RelacaoQuantidade[] = []

        this.clientes.forEach(cliente => {
            let produtos = cliente.getProdutosConsumidos.length
            let servicos = cliente.getServicosConsumidos.length
            let compraCliente = new RelacaoQuantidade(cliente.nome, (produtos + servicos))

            comprasCliente.push(compraCliente)
        })

        let quantidadeOrdenada = comprasCliente.sort(
            (a,b) => b.getQuantidade - a.getQuantidade
        )
        
        let top10quantidade = quantidadeOrdenada.splice(0, 10)
        res.send(top10quantidade)
    }

    public consumoValor(req: Request, res: Response){
        let comprasCliente: RelacaoQuantidade[] = []

        this.clientes.forEach(cliente => {
            let produtosConsumidos = cliente.getProdutosConsumidos
            let servicosConsumidos = cliente.getServicosConsumidos

            let valorConsumido = 0
            produtosConsumidos.forEach(produtoConsumido => {
                let valorProduto = Number(produtoConsumido.getPreco)
                valorConsumido+=valorProduto
            })

            servicosConsumidos.forEach(servicoConsumido => {
                let valorServico = Number(servicoConsumido.getPreco)
                valorConsumido+=valorServico
            })

            let compraValorCliente = new RelacaoQuantidade(cliente.nome, valorConsumido)
            comprasCliente.push(compraValorCliente)
        })

        let quantidadeOrdenada = comprasCliente.sort(
            (a,b) => b.getQuantidade - a.getQuantidade
        )
        
        let top10quantidade = quantidadeOrdenada.splice(0, 10)
        res.send(top10quantidade)
    }

    public consumoPorTipo(req: Request, res: Response){
        let listaTipos: string[] = []

        this.clientes.forEach(cliente => {
            let pets = cliente.getPets
            pets.forEach(pet => {
                if(!listaTipos.includes(pet.getTipo)){
                    listaTipos.push(pet.getTipo)
                }
            })
        })

        let listaConsumoPorTipo: { tipo: string; lista: RelacaoQuantidade[] }[] = []
        listaTipos.forEach(tipo => {
        
            let servicosTipo: RelacaoQuantidade[] = []

            this.clientes.forEach(cliente => {
                let servicosConsumidos = cliente.getServicosConsumidos
                servicosConsumidos.forEach(servicoConsumido => {
                    let pet = servicoConsumido.getPet
                    if(pet){
                        if(pet.getTipo === tipo){  
                            if(!servicosTipo.some(servicoTipo => servicoTipo.getNome === servicoConsumido.getNome)){
                                let servico = new RelacaoQuantidade(servicoConsumido.getNome, 1)
                                servicosTipo.push(servico)
                            } else {
                                let servicoAlvo = servicosTipo.find(servico => servico.getNome === servicoConsumido.getNome)
                                if(servicoAlvo){
                                    servicoAlvo.setQuantidade = (servicoAlvo.getQuantidade + 1)
                                }
                            }
                        }
                    }
                })
            })

            let servicosTipoOrdenados = servicosTipo.sort(
                (a,b) => b.getQuantidade - a.getQuantidade
            )
            
            let listaConsumoTipo = {
                tipo: tipo,
                lista: servicosTipoOrdenados
            }

            listaConsumoPorTipo.push(listaConsumoTipo)
        })
        
        res.send(listaConsumoPorTipo)
    }

    public consumoPorRaca(req: Request, res: Response){
        let listaTipos: string[] = []

        this.clientes.forEach(cliente => {
            let pets = cliente.getPets
            pets.forEach(pet => {
                if (!listaTipos.includes(pet.getTipo)) {
                    listaTipos.push(pet.getTipo)
                }
            })
        })

        let listaConsumoPorRaca: { tipo: string; raca: string; lista: RelacaoQuantidade[] }[] = []
        listaTipos.forEach(tipo => {
            
            let listaRacas: string[] = []

            this.clientes.forEach(cliente => {
                let pets = cliente.getPets
                pets.forEach(pet => {
                    if (pet.getTipo === tipo && !listaRacas.includes(pet.getRaca)) {
                        listaRacas.push(pet.getRaca)
                    }
                })
            })

            listaRacas.forEach(raca => {
                let servicosRaca: RelacaoQuantidade[] = []

                this.clientes.forEach(cliente => {
                    let servicosConsumidos = cliente.getServicosConsumidos
                    servicosConsumidos.forEach(servicoConsumido => {
                        let pet = servicoConsumido.getPet
                        if (pet && pet.getTipo === tipo && pet.getRaca === raca) {
                            if (!servicosRaca.some(servicoRaca => servicoRaca.getNome === servicoConsumido.getNome)) {
                                let servico = new RelacaoQuantidade(servicoConsumido.getNome, 1)
                                servicosRaca.push(servico)
                            } else {
                                let servicoAlvo = servicosRaca.find(servico => servico.getNome === servicoConsumido.getNome)
                                if (servicoAlvo) {
                                    servicoAlvo.setQuantidade = (servicoAlvo.getQuantidade + 1)
                                }
                            }
                        }
                    })
                })

                let servicosRacaOrdenados = servicosRaca.sort(
                    (a, b) => b.getQuantidade - a.getQuantidade
                )
                
                let listaConsumoRaca = {
                    tipo: tipo,
                    raca: raca,
                    lista: servicosRacaOrdenados
                }
                
                listaConsumoPorRaca.push(listaConsumoRaca)
                
            })
        })

        res.send(listaConsumoPorRaca)
    }
}