import Empresa from "../modelo/empresa";
import AtualizarCliente from "../negocio/atualizarCliente";
import AtualizarProduto from "../negocio/atualizarProduto";
import AtualizarServico from "../negocio/atualizarServico";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import CompraProduto from "../negocio/compraProduto";
import CompraServico from "../negocio/compraServico";
import ConsultaCompras from "../negocio/consultaCompras";
import ExcluidorCliente from "../negocio/excluidorCliente";
import ExcluidorProduto from "../negocio/excluidorProduto";
import ExcluidorServico from "../negocio/excluidorServico";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProduto from "../negocio/listagemProduto";
import ListagemServico from "../negocio/listagemServico";
import RankingsSistema from "../negocio/rankingsSistema";
import SelecionadorCliente from "../negocio/selecionadorCliente";
import SelecionadorProduto from "../negocio/selecionadorProduto";
import SelecionadorServico from "../negocio/selecionadorServico";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log('----------------------------------')
    console.log(`Opções:`);
    console.log(`1 - Sessão de cadastros`);
    console.log(`2 - Listagem de cadastros`);
    console.log('3 - Excluir dados')
    console.log('4 - Atualizar cadastros')
    console.log('5 - Registrar compras')
    console.log('6 - Consultar compras')
    console.log('7 - Listagem de estatísticas')
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let execucaoCadastro = true
            while(execucaoCadastro){
                console.log('----------------------------------')
                console.log('1 - Cadastro de clientes')
                console.log('2 - Cadastro de produtos')
                console.log('3 - Cadastro de serviços')
                console.log('0 - Voltar')
                
                let opcaoCadastro = entrada.receberNumero(`Selecione a opção que você deseja cadastrar: `)

                switch(opcaoCadastro){
                    case 1:
                        let cadastroCliente = new CadastroCliente(empresa.getClientes)
                        cadastroCliente.cadastrar()
                        break;
                    case 2:
                        let cadastroProduto = new CadastroProduto(empresa.getProdutos)
                        cadastroProduto.cadastrar()
                        break;
                    case 3:
                        let cadastroServico = new CadastroServico(empresa.getServicos)
                        cadastroServico.cadastrar()
                        break;
                    case 0:
                        execucaoCadastro = false
                        break;
                }
            }
            break;    
        case 2:
            let execucaoListagem = true
            while(execucaoListagem){
                console.log('----------------------------------')
                console.log('1 - Listagem de clientes')
                console.log('2 - Listagem de produtos')
                console.log('3 - Listagem de serviços')
                console.log('0 - Voltar')

                let opcaoListagem = entrada.receberNumero(`Selecione a opção que você deseja listar: `)

                switch(opcaoListagem){
                    case 1:
                        let listagemCliente = new ListagemClientes(empresa.getClientes)
                        listagemCliente.listar()
                        break;
                    case 2:
                        let listagemProduto = new ListagemProduto(empresa.getProdutos)
                        listagemProduto.listar()
                        break;
                    case 3:
                        let listagemServico = new ListagemServico(empresa.getServicos)
                        listagemServico.listar()
                        break;
                    case 0:
                        execucaoListagem = false
                        break;
                }
            }
            break;
        case 3:
            let execucaoExclusao = true
            while(execucaoExclusao){
                console.log('----------------------------------')
                console.log('1 - Excluir clientes')
                console.log('2 - Excluir produtos')
                console.log('3 - Excluir serviços')
                console.log('0 - Voltar')
                
                let opcaoExclusao = entrada.receberNumero(`Selecione a opção do que você deseja excluir: `)

                switch(opcaoExclusao){
                    case 1:
                        let selecionadorCliente = new SelecionadorCliente(empresa.getClientes)
                        let cpf = entrada.receberTexto('Digite o cpf do cliente que deseja excluir: ')
                        let cliente = selecionadorCliente.selecionar(cpf)

                        if(cliente){
                            let excluidorCliente = new ExcluidorCliente(empresa.getClientes)
                            excluidorCliente.excluir(cpf)
                            break;
                        } else {
                            break;
                        }
                    case 2:
                        let selecionadorProduto = new SelecionadorProduto(empresa.getProdutos)
                        let codigoProduto = entrada.receberNumero('Digite o código do produto que deseja excluir: ')
                        let produto = selecionadorProduto.selecionar(codigoProduto)

                        if(produto){
                            let excluidorProduto = new ExcluidorProduto(empresa.getProdutos)
                            excluidorProduto.excluir(codigoProduto)
                            break;
                        } else {
                            break;
                        }
                    case 3:
                        let selecionadorServico= new SelecionadorServico(empresa.getServicos)
                        let codigoServico = entrada.receberNumero('Digite o código do serviço que deseja excluir: ')
                        let servico = selecionadorServico.selecionar(codigoServico)
    
                        if(servico){
                            let excluidorServico = new ExcluidorServico(empresa.getServicos)
                            excluidorServico.excluir(codigoServico)
                            break;
                        } else {
                            break;
                        }
                    case 0:
                        execucaoExclusao = false
                        break;
                }
            }
            break;
        case 4:
            let execucaoAtualizacao = true
            while(execucaoAtualizacao){
                console.log('----------------------------------')
                console.log('1 - Atualizar clientes')
                console.log('2 - Atualizar produtos')
                console.log('3 - Atualizar serviços')
                console.log('0 - Voltar')
                
                let opcaoAtualizacao = entrada.receberNumero(`Selecione o que você deseja atualizar: `)

                switch(opcaoAtualizacao){
                    case 1:
                        let selecionadorCliente = new SelecionadorCliente(empresa.getClientes)
                        let cpf = entrada.receberTexto('Digite o cpf do cliente que deseja atualizar: ')
                        let cliente = selecionadorCliente.selecionar(cpf)

                        if(cliente){
                            let atualizarCliente = new AtualizarCliente(empresa.getClientes)
                            atualizarCliente.atualizar(cliente)
                            break;
                        } else {
                            break;
                        }
                    case 2:
                        let selecionadorProduto = new SelecionadorProduto(empresa.getProdutos)
                        let codigoProduto = entrada.receberNumero('Digite o código do produto que deseja atualizar: ')
                        let produto = selecionadorProduto.selecionar(codigoProduto)

                        if(produto){
                            let atualizarProduto = new AtualizarProduto(empresa.getProdutos)
                            atualizarProduto.atualizar(produto)
                            break;
                        } else {
                            break;
                        }
                    case 3:
                        let selecionadorServico = new SelecionadorServico(empresa.getServicos)
                        let codigoServico = entrada.receberNumero('Digite o código do serviço que deseja atualizar: ')
                        let servico = selecionadorServico.selecionar(codigoServico)
    
                        if(servico){
                            let atualizarServico = new AtualizarServico(empresa.getServicos)
                            atualizarServico.atualizar(servico)
                            break;
                        } else {
                             break;
                        }
                    case 0:
                        execucaoAtualizacao = false
                        break;
                }
            }
            break;
        case 5:
            let execucaoCompras = true
            while(execucaoCompras){
                console.log('----------------------------------')
                console.log('1 - Compra de produtos')
                console.log('2 - Compra de serviços')
                console.log('0 - Voltar')

                let opcaoCompra = entrada.receberNumero('Selecione o tipo de compra: ')
                switch(opcaoCompra){
                    case 1:
                        let selecionadorCliente1 = new SelecionadorCliente(empresa.getClientes)
                        let selecionadorProduto = new SelecionadorProduto(empresa.getProdutos)

                        let cpfCompraProduto = entrada.receberTexto('Informe o CPF do cliente: ')
                        let clienteCompraProduto = selecionadorCliente1.selecionar(cpfCompraProduto)

                        let codigoProduto = entrada.receberNumero('Informe o código do produto: ')
                        let produto = selecionadorProduto.selecionar(codigoProduto)

                        if(!clienteCompraProduto || !produto){
                            break;
                        } else {
                            let quantidade = entrada.receberNumero('Informe a quantidade do produto escolhido: ')
                            let compraProduto = new CompraProduto(clienteCompraProduto, produto)
                            compraProduto.realizarCompra(quantidade)
                            break;
                        }   
                    case 2:
                        let selecionadorCliente2 = new SelecionadorCliente(empresa.getClientes)
                        let selecionadorServico = new SelecionadorServico(empresa.getServicos)

                        let cpfCompraServico = entrada.receberTexto('Informe o CPF do cliente: ')
                        let clienteCompraServico = selecionadorCliente2.selecionar(cpfCompraServico)

                        let codigoServico = entrada.receberNumero('Informe o código do serviço: ')
                        let servico = selecionadorServico.selecionar(codigoServico)

                        if(!clienteCompraServico || !servico){
                            break;
                        } else {
                            let quantidade = entrada.receberNumero('Informe a quantidade do serviço escolhido: ')
                            let compraServico = new CompraServico(clienteCompraServico, servico)
                            compraServico.realizarCompra(quantidade)
                            break;
                        }     
                    case 0:
                        execucaoCompras = false
                        break;
                }
            }
            break;
        case 6:
            let execucaoConsulta = true
            while(execucaoConsulta){
                console.log('----------------------------------')
                console.log('1 - Consultar produtos adquiridos por clientes')
                console.log('2 - Consultar serviços adquiridos por clientes')
                console.log('0 - Voltar')

                let opcaoConsulta = entrada.receberNumero('Selecione a opção que deseja consultar: ')
                let selecionadorCliente = new SelecionadorCliente(empresa.getClientes)
                let cpf : string

                switch(opcaoConsulta){
                    case 1:
                        cpf = entrada.receberTexto('Informe o CPF do cliente que deseja consultar: ')
                        let clienteConsultaProduto = selecionadorCliente.selecionar(cpf)

                        if(clienteConsultaProduto){
                            let consultaProdutos = new ConsultaCompras(clienteConsultaProduto)
                            consultaProdutos.consultarProdutos()
                        }
                        break;
                    case 2:
                        cpf = entrada.receberTexto('Informe o CPF do cliente que deseja consultar: ')
                        let clienteConsultaServico = selecionadorCliente.selecionar(cpf)

                        if(clienteConsultaServico){
                            let consultaServicos = new ConsultaCompras(clienteConsultaServico)
                            consultaServicos.consultarServicos()
                        }
                        break;
                    case 0:
                        execucaoConsulta = false
                        break;
                }
            }
            break;
        case 7:
            let execucaoEstatistica = true
            while(execucaoEstatistica){
                console.log('----------------------------------')
                console.log('1 - Top 10 clientes que mais consumiram em quantidade')
                console.log('2 - Top 5 clientes que mais consumiram em valor')
                console.log('3 - Top produtos ou serviços mais consumidos')
                console.log('4 - Top serviços mais consumidos por tipo de pet')
                console.log('5 - Top serviços mais consumidos por raça de pet')
                console.log('0 - Voltar')

                let opcaoEstatistica = entrada.receberNumero('Por favor selecione uma opção: ')
                let rankingsSistema = new RankingsSistema(empresa.getClientes, empresa.getProdutos, empresa.getServicos)

                switch(opcaoEstatistica){
                    case 1:
                        rankingsSistema.consumoQuantidade()
                        break;
                    case 2:
                        rankingsSistema.consumoValor()
                        break;
                    case 3:
                        rankingsSistema.listarMaiorDemanda()
                        break;
                    case 4:
                        rankingsSistema.consumoPorTipo()
                        break;
                    case 5:
                        rankingsSistema.consumoPorRaca()
                        break
                    case 0:
                        execucaoEstatistica = false
                        break;
                }
            }
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}