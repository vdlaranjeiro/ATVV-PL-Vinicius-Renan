import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Pet from "../modelo/pet"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        //Nome do cliente
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)

        //CPF
        let valorCPF = this.entrada.receberTexto(`Por favor informe o número do cpf (sem pontos ou traços): `);

        //verificação do formato da data
        let dataEmissaoCPF: Date | undefined
        let verifDataCPF = true
        while(verifDataCPF){
            let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/aaaa: `);
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
        
        let cpf: CPF | undefined
        if(dataEmissaoCPF === undefined){
            throw new Error('Data do CPF não fornecida corretamente')
        } else {
            cpf = new CPF(valorCPF, dataEmissaoCPF);
        }
        
        //RG
        let rgs: RG[] = []
        let cadastrarRG = true
        while(cadastrarRG){
            let valorRG = this.entrada.receberTexto('Por favor informe o número do RG: ')

            //verificação no formato da data
            let dataEmissaoRG: Date | undefined
            let verifDataRG = true
            while(verifDataRG){
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
                        dataEmissaoRG = new Date(anoRG, mesRG, diaRG)
                        verifDataRG = false
                    }
                }
            }
            
            let rg: RG | undefined
            if(dataEmissaoRG === undefined){
                throw new Error('Data do RG não fornecida corretamente')
            } else {
                rg = new RG(valorRG, dataEmissaoRG)
                rgs.push(rg)
            }
            
            let respostaRG = this.entrada.receberTexto('Deseja cadastrar mais um RG? (S/N) ')
            if(respostaRG.toLowerCase() === 'n'){
                cadastrarRG = false
            }
        }

        //Telefone
        let telefones: Telefone[] = []
        let cadastrarTelefone = true
        while(cadastrarTelefone){
            let ddd = this.entrada.receberTexto('Por favor informe o ddd do seu telefone: ')
            let numero = this.entrada.receberTexto('Por favor informe o número do seu telefone: ')
            let telefone = new Telefone(ddd, numero)
            telefones.push(telefone)

            let respostaTel = this.entrada.receberTexto('Deseja cadastrar mais um telefone? (S/N) ')
            if(respostaTel.toLowerCase() === 'n'){
                cadastrarTelefone = false
            }
        }

        //Pets
        let pets: Pet[] = []
        let cadastrarPet = true
        let idPet = 1
        while(cadastrarPet){
            let nomePet = this.entrada.receberTexto('Por favor informe o nome do seu Pet: ')
            let tipoPet = this.entrada.receberTexto('Por favor informe o tipo do seu Pet: ')
            let racaPet = this.entrada.receberTexto('Por favor informe a raca do seu Pet: ')
            let generoPet = this.entrada.receberTexto('Por favor informe o genero do seu Pet: (F/M) ')
            let pet = new Pet(idPet, nomePet, racaPet, generoPet, tipoPet)
            idPet +=1
            pets.push(pet)

            let respostaPets = this.entrada.receberTexto('Deseja cadastrar mais um pet? (S/N) ')
            if(respostaPets.toLowerCase() === 'n'){
                cadastrarPet = false
            }
        }
        

        let cliente = new Cliente(nome, nomeSocial, cpf, rgs, telefones, pets);
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}