import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import RelacaoQuantidade from "./relacaoQuantidade";

export default class RankingsSistema {
    private clientes: Cliente[]
    private produtos: Produto[]
    private servicos: Servico[]

    constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]){
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
    }

    public consumoQuantidade(){
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
        
        console.log('\n')
        console.log('Top 10 clientes que mais consumiram em quantidade')
        let top10quantidade = quantidadeOrdenada.splice(0, 10)
        top10quantidade.forEach((item, index) => {
            console.log(`${index + 1} - ${item.getNome} | ${item.getQuantidade} compras`)
        })
    }

    public consumoValor(){
        let comprasCliente: RelacaoQuantidade[] = []

        this.clientes.forEach(cliente => {
            let produtosConsumidos = cliente.getProdutosConsumidos
            let servicosConsumidos = cliente.getServicosConsumidos

            let valorConsumido = 0
            produtosConsumidos.forEach(produtoConsumido => {
                let valorProduto = produtoConsumido.getPreco
                valorConsumido+=valorProduto
            })

            servicosConsumidos.forEach(servicoConsumido => {
                let valorServico = servicoConsumido.getPreco
                valorConsumido+=valorServico
            })

            let compraValorCliente = new RelacaoQuantidade(cliente.nome, valorConsumido)
            comprasCliente.push(compraValorCliente)
        })

        let quantidadeOrdenada = comprasCliente.sort(
            (a,b) => b.getQuantidade - a.getQuantidade
        )
        
        console.log('\n')
        console.log('Top 5 clientes que mais consumiram em valor')
        let top5quantidade = quantidadeOrdenada.splice(0, 5)
        top5quantidade.forEach((item, index) => {
            console.log(`${index + 1} - ${item.getNome} | R$${item.getQuantidade}`)
        })
    }

    public listarMaiorDemanda() {
        let comprasGeral: RelacaoQuantidade[] = []

        this.produtos.forEach(produto => {
            let produtoCadastrado = new RelacaoQuantidade(produto.getNome, 0)
            comprasGeral.push(produtoCadastrado)
        })
        this.servicos.forEach(servico => {
            let servicoCadastrado = new RelacaoQuantidade(servico.getNome, 0)
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

        console.log('Lista de Produtos e Serviços mais consumidos');
        comprasOrdenadas.forEach((prodOuServ, index) => {
            console.log(`${index + 1} - ${prodOuServ.getNome} | ${prodOuServ.getQuantidade} compras`)
        })
    }

    public consumoPorTipo(){
        let listaTipos: string[] = []

        this.clientes.forEach(cliente => {
            let pets = cliente.getPets
            pets.forEach(pet => {
                if(!listaTipos.includes(pet.getTipo)){
                    listaTipos.push(pet.getTipo)
                }
            })
        })

        console.log('\nServiços mais consumidos por tipo de pet')
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
            
            
            console.log(`Tipo - ${tipo}`)
            servicosTipoOrdenados.forEach((servico, index) => {
                console.log(`${index + 1} - ${servico.getNome} | ${servico.getQuantidade} compras`)
            })
            console.log('\n')
        })
    }

    public consumoPorRaca(){
        let listaTipos: string[] = []

        this.clientes.forEach(cliente => {
            let pets = cliente.getPets
            pets.forEach(pet => {
                if (!listaTipos.includes(pet.getTipo)) {
                    listaTipos.push(pet.getTipo)
                }
            })
        })

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

            console.log('\nServiços mais consumidos por raça de pet')
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

                
                console.log(`Tipo - ${tipo} | Raça - ${raca}`)
                servicosRacaOrdenados.forEach((servico, index) => {
                    console.log(`${index + 1} - ${servico.getNome} | ${servico.getQuantidade} compras`)
                })
                console.log('\n')
            })
        })
    }
}