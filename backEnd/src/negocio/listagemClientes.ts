import Cliente from "../modelo/cliente";
import Listagem from "./listagem";
import Telefone from "../modelo/telefone";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            let rgs = cliente.getRgs
            rgs.forEach((rg, index) => {
                let numeroRG = index + 1;
                console.log(`RG ${numeroRG}: ` + rg.getValor)
                
            })

            let dia = String(cliente.getDataCadastro.getDate()).padStart(2, '0')
            let mes = String(cliente.getDataCadastro.getMonth() + 1).padStart(2, '0')
            let ano = String(cliente.getDataCadastro.getFullYear())
            console.log(`Data de cadastro: ${dia}/${mes}/${ano}`)

            let telefones = cliente.getTelefones
            telefones.forEach((telefone, index) => {
                let numeroTelefone = index + 1;
                console.log(`Telefone ${numeroTelefone}: (${telefone.getDdd}) ${telefone.getNumero}`)
            })

            console.log('\nPets cadastrados:\n')
            let pets = cliente.getPets
            pets.forEach(pet => {
                console.log('Id:' + pet.getId)
                console.log('Nome: ' + pet.getNome)
                console.log('Tipo: ' + pet.getTipo)
                console.log('Raça: ' + pet.getRaca)
                console.log('Gênero: ' + pet.getGenero)
                console.log('------------------\n')
            })
            console.log(`--------------------------------------`);
            
        });
        console.log(`\n`);
    }
}