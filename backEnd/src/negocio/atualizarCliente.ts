import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"

export default class AtualizarCliente {
    private clientes: Cliente[]
    private entrada: Entrada

    constructor(clientes: Cliente[]){
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public atualizar(clienteAlvo: Cliente){
        console.log('\nAtualização de cliente\n')

        let atualizarNome = this.entrada.receberTexto('Deseja atualizar o nome? (S/N) ')
        if(atualizarNome.toLowerCase() === 's'){
            let novoNome = this.entrada.receberTexto('Por favor informe o novo nome: ')
            clienteAlvo.nome = novoNome
        }

        let atualizarNomeSocial = this.entrada.receberTexto('Deseja atualizar o nome social? (S/N) ')
        if(atualizarNomeSocial.toLowerCase() === 's'){
            let novoNomeSocial = this.entrada.receberTexto('Por favor informe o novo nome social: ')
            clienteAlvo.nomeSocial = novoNomeSocial
        }

        let atualizarCPF = this.entrada.receberTexto('Deseja atualizar o CPF? (S/N) ')
        if(atualizarCPF.toLowerCase() === 's'){
            let valorCPF = this.entrada.receberTexto(`Por favor informe o novo número do cpf: `);

            let dataEmissaoCPF: Date | undefined
            let verifDataCPF = true
            while(verifDataCPF){
                let dataCPF = this.entrada.receberTexto(`Por favor informe a nova data de emissão do cpf, no padrão dd/mm/aaaa: `);
                let partesDataCPF = dataCPF.split('/')
                if(partesDataCPF.length !== 3){
                    console.log('Formato de data errado')
                } else {
                    let anoCPF = Number(partesDataCPF[2])
                    let mesCPF = Number(partesDataCPF[1]) - 1
                    let diaCPF = Number(partesDataCPF[0])
    
                    if(partesDataCPF[2].length !== 4 || partesDataCPF[1].length !== 2 || partesDataCPF[0].length !== 2 ||
                        isNaN(anoCPF) || isNaN(mesCPF) || isNaN(diaCPF)){
                            console.log('Formato de data errado')
                    } else {
                        dataEmissaoCPF = new Date(anoCPF, mesCPF, diaCPF)
                        verifDataCPF = false
                    }
                }
            }

            let novoCpf: CPF | undefined
            if(dataEmissaoCPF === undefined){
                throw new Error('Data do CPF fornecida incorretamente')
            } else {
                novoCpf = new CPF(valorCPF, dataEmissaoCPF);
                clienteAlvo.setCpf = novoCpf
            }
            
        }

        let atualizarRg = this.entrada.receberTexto('Deseja atualizar os RGs? (S/N) ')
        if(atualizarRg.toLowerCase() === 's'){
            let execucaoAtualizacaoRG = true
            while(execucaoAtualizacaoRG){
                console.log('1 - Atualizar um RG existente')
                console.log('2 - Excluir um RG existente')
                console.log('3 - Adicionar um novo RG')
                console.log('0 - Voltar')
                
                let rgs = clienteAlvo.getRgs
                let opcaoRG = this.entrada.receberNumero('Por favor selecione uma opção: ')
                switch(opcaoRG){
                    case 1:
                        let numeroAlvoAtualizar = this.entrada.receberTexto('Por favor informe o número do RG que deseja atualizar: ')
                        let rgAlvoAtualizar = rgs.find(rg => rg.getValor === numeroAlvoAtualizar)
                        if(rgAlvoAtualizar){
                            let valorRG1 = this.entrada.receberTexto('Por favor informe o número do RG: ')

                            let dataEmissaoRG1: Date | undefined
                            let verifDataRG1 = true
                            while(verifDataRG1){
                                let dataRG = this.entrada.receberTexto('Por favor informe a nova data de emissão do RG, no padrão dd/mm/aaaa: ')
                                let partesDataRG = dataRG.split('/')
                                if(partesDataRG.length !== 3){
                                    console.log('Formato de data errado')
                                } else {
                                    let anoRG = Number(partesDataRG[2])
                                    let mesRG = Number(partesDataRG[1]) - 1
                                    let diaRG = Number(partesDataRG[0])
                
                                    if(partesDataRG[2].length !== 4 || partesDataRG[1].length !== 2 || partesDataRG[0].length !== 2 ||
                                        isNaN(anoRG) || isNaN(mesRG) || isNaN(diaRG)){
                                            console.log('Formato de data errado')
                                    } else {
                                        dataEmissaoRG1 = new Date(anoRG, mesRG, diaRG)
                                        verifDataRG1 = false
                                    }
                                }
                            }
                            if(dataEmissaoRG1 === undefined){
                                throw new Error('Data do RG fornecida incorretamente')
                            } else {
                                rgAlvoAtualizar.setValor = valorRG1
                                rgAlvoAtualizar.setDataEmissao = dataEmissaoRG1
                                console.log('RG atualizado com sucesso')
                                console.log('----------------------------------')
                                break;
                            }
                        } else {
                            console.log('Não foram encontrados RGs com esse número neste usuário')
                            break;
                        }
                    case 2:
                        let numeroAlvoExcluir = this.entrada.receberTexto('Por favor insira o número do RG que deseja excluir: ')
                        let rgAlvoExcluir = rgs.findIndex(rg => rg.getValor === numeroAlvoExcluir)
                        if(rgAlvoExcluir !== -1){
                            rgs.splice(rgAlvoExcluir, 1)
                            clienteAlvo.setRgs = rgs
                            console.log('RG excluído com sucesso')
                            console.log('----------------------------------')
                            break;
                        } else {
                            console.log('Não foram encontrados RGs com esse número neste usuário')
                            break;
                        }
                    case 3:
                        let valorRG2 = this.entrada.receberTexto('Por favor informe o número do RG: ')
                        
                        let dataEmissaoRG2: Date | undefined
                        let verifDataRG2 = true
                        while(verifDataRG2){
                            let dataRG = this.entrada.receberTexto('Por favor informe a data de emissão do RG, no padrão dd/mm/aaaa: ')
                            let partesDataRG = dataRG.split('/')
                            if(partesDataRG.length !== 3){
                                console.log('Formato de data errado')
                            } else {
                                let anoRG = Number(partesDataRG[2])
                                let mesRG = Number(partesDataRG[1]) - 1
                                let diaRG = Number(partesDataRG[0])
            
                                if(partesDataRG[2].length !== 4 || partesDataRG[1].length !== 2 || partesDataRG[0].length !== 2 ||
                                    isNaN(anoRG) || isNaN(mesRG) || isNaN(diaRG)){
                                        console.log('Formato de data errado')
                                } else {
                                    dataEmissaoRG2 = new Date(anoRG, mesRG, diaRG)
                                    verifDataRG2 = false
                                }
                            }
                        }
                        if(dataEmissaoRG2 === undefined){
                            throw new Error('Data do RG fornecida incorretamente')
                        } else{
                            let rg = new RG(valorRG2, dataEmissaoRG2)
                            rgs.push(rg)
                            clienteAlvo.setRgs = rgs
                            console.log('RG adicionado com sucesso')
                            console.log('----------------------------------')
                            break;
                        }
                    case 0:
                        execucaoAtualizacaoRG = false
                        break;
                }
            }
        }

        let atualizarTelefone = this.entrada.receberTexto('Deseja atualizar os telefones? (S/N) ')
        if(atualizarTelefone.toLowerCase() === 's'){
            let execucaoAtualizacaoTel = true
            while(execucaoAtualizacaoTel){
                console.log('1 - Atualizar um telefone existente')
                console.log('2 - Excluir um telefone existente')
                console.log('3 - Adicionar um novo telefone')
                console.log('0 - Voltar')
                
                let telefones = clienteAlvo.getTelefones
                let opcaoTel = this.entrada.receberNumero('Por favor selecione uma opção: ')

                switch(opcaoTel){
                    case 1:
                        let numeroAlvoAtualizar = this.entrada.receberTexto('Por favor informe o número do telefone que deseja atualiazar (sem o DDD): ')
                        let telAlvoAtualizar = telefones.find(tel => tel.getNumero === numeroAlvoAtualizar)
                        
                        if(telAlvoAtualizar){
                            let dddAtualizar = this.entrada.receberTexto('Por favor informe o novo ddd do seu telefone: ')
                            let numeroAtualizar = this.entrada.receberTexto('Por favor informe o novo número do seu telefone: ')
                            telAlvoAtualizar.setDdd = dddAtualizar
                            telAlvoAtualizar.setNumero = numeroAtualizar
                            console.log('Telefone atualizado com sucesso')
                            console.log('----------------------------------')
                            break;
                        } else{
                            console.log('Não foram encontrados telefones com este número neste usuário')
                            break;
                        }
                    case 2:
                        let numeroAlvoExcluir = this.entrada.receberTexto('Por favor informe o número do telefone que deseja excluir (sem o DDD): ')
                        let telAlvoExcluir = telefones.findIndex(tel => tel.getNumero === numeroAlvoExcluir)

                        if(telAlvoExcluir !== -1){
                            telefones.splice(telAlvoExcluir, 1)
                            clienteAlvo.setTelefones = telefones
                            console.log('Telefone excluído com sucesso')
                            console.log('----------------------------------')
                            break;
                        } else{
                            console.log('Não foram encontrados telefones com este número neste usuário')
                            break;
                        }
                    case 3:
                        let dddNovo = this.entrada.receberTexto('Por favor informe o ddd do seu telefone: ')
                        let numeroNovo = this.entrada.receberTexto('Por favor informe o número do seu telefone: ')
                        let telNovo = new Telefone(dddNovo, numeroNovo)
                        telefones.push(telNovo)
                        clienteAlvo.setTelefones = telefones
                        console.log('Telefone adicionado com sucesso')
                        console.log('----------------------------------')
                        break;
                    case 0:
                        execucaoAtualizacaoTel = false
                        break;         
                    }
                    
            }
        }

        let atualizarPets = this.entrada.receberTexto('Deseja atualizar os dados dos seus Pets? (S/N) ')
        if(atualizarPets.toLowerCase() === 's'){
            let execucaoAtualizacaoPets = true
            while(execucaoAtualizacaoPets){
                console.log('1 - Atualizar os dados de um Pet existente')
                console.log('2 - Excluir um Pet existente')
                console.log('3 - Adicionar um novo Pet')
                console.log('0 - Voltar')

                let pets = clienteAlvo.getPets
                let opcaoPet = this.entrada.receberNumero('Por favor selecione uma opção: ')
                switch(opcaoPet){
                    case 1:
                        let numeroAlvoAtualizar = this.entrada.receberNumero('Por favor informe o Id do Pet que deseja atualizar: ')
                        let petAlvoAtualizar = pets.find(pet => pet.getId === numeroAlvoAtualizar)

                        if(petAlvoAtualizar){
                            let atualizarNomePet = this.entrada.receberTexto('Deseja atualizar o nome do Pet? (S/N) ')
                            if(atualizarNomePet.toLowerCase() === 's'){
                                let novoNomePet = this.entrada.receberTexto('Por favor informe o novo nome do Pet: ')
                                petAlvoAtualizar.setNome = novoNomePet
                                console.log('Nome do Pet atualizado com sucesso')
                            }
                            let atualizarRacaPet = this.entrada.receberTexto('Deseja atualizar a raça do Pet? (S/N) ')
                            if(atualizarRacaPet.toLocaleLowerCase() === 's'){
                                let novaRacaPet = this.entrada.receberTexto('Por favor informe a raça do Pet: ')
                                petAlvoAtualizar.setRaca = novaRacaPet
                                console.log('Raça do Pet atualizada com sucesso')
                            }
                            let atualizarTipoPet = this.entrada.receberTexto('Deseja atualizar o tipo do Pet? (S/N) ')
                            if(atualizarTipoPet.toLocaleLowerCase() === 's'){
                                let novoTipoPet = this.entrada.receberTexto('Por favor informe o tipo do Pet: ')
                                petAlvoAtualizar.setTipo = novoTipoPet
                                console.log('Tipo do Pet atualizado com sucesso')
                            }
                            let atualizarGeneroPet = this.entrada.receberTexto('Deseja atualizar o gênero do Pet? (S/N) ')
                            if(atualizarGeneroPet.toLocaleLowerCase() === 's'){
                                let novoGeneroPet = this.entrada.receberTexto('Por favor informe o gênero do Pet (F/M): ')
                                petAlvoAtualizar.setGenero = novoGeneroPet
                                console.log('Gênero do Pet atualizado com sucesso')
                            }
                            console.log('Informações do Pet atualizadas com sucesso')
                            console.log('------------------------------------------')
                            break;
                        } else {
                            console.log('Nenhum pet com esse Id encontrado nesse cliente')
                            break;
                        }
                    case 2:
                        let numeroAlvoExcluir = this.entrada.receberNumero('Por favor informe o Id do Pet que deseja excluir: ')
                        let petAlvoExcluir = pets.findIndex(pet => pet.getId === numeroAlvoExcluir)
                        
                        if(petAlvoExcluir !== -1){
                            pets.splice(petAlvoExcluir, 1)
                            clienteAlvo.setPets = pets
                            console.log('Pet excluído com sucesso')
                            console.log('------------------------------------------')
                            break;
                        } else {
                            console.log('Não foram encontrados Pets com esse Id nesse cliente')
                            break;
                        }
                    case 3:
                        let nomePet = this.entrada.receberTexto('Por favor informe o nome do seu Pet: ')
                        let tipoPet = this.entrada.receberTexto('Por favor informe o tipo do seu Pet: ')
                        let racaPet = this.entrada.receberTexto('Por favor informe a raca do seu Pet: ')
                        let generoPet = this.entrada.receberTexto('Por favor informe o genero do seu Pet: (F/M)')
                        let idPet:number = 1
                        if(pets.length > 0){
                            let idReferencia = pets[pets.length - 1].getId
                            idPet = idReferencia + 1
                        }
                        let pet = new Pet(idPet, nomePet, racaPet, generoPet, tipoPet)
                        pets.push(pet)
                        console.log('Pet cadastrado com sucesso')
                        console.log('------------------------------------------')
                        break;
                    case 0:
                        execucaoAtualizacaoPets = false
                        break;
                }
            }
        }
        console.log('Atualização concluída')
    }
}