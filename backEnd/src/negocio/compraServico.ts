import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";

export default class CompraServico {
    
    private cliente: Cliente
    private servico: Servico
    private entrada: Entrada

    constructor(cliente: Cliente, servico: Servico){
        this.cliente = cliente
        this.servico = servico
        this.entrada = new Entrada()
    }

    public realizarCompra(quantidade:number){
        let pets = this.cliente.getPets
        console.log(`\nPets do cliente ${this.cliente.nome}: \n`)
        pets.forEach(pet => {
            console.log(`Id: ${pet.getId}`)
            console.log(`Nome: ${pet.getNome}`)
            console.log(`Tipo: ${pet.getTipo}`)
            console.log(`Raça: ${pet.getRaca}`)
            console.log('---------------------')
        })
        let codigoPet = this.entrada.receberNumero('Informe o código do pet a qual o serviço é destinado: ')
        let pet = this.cliente.getPet(codigoPet)
        if(pet){
            let comprasCliente = this.cliente.getServicosConsumidos

            for(let i = 0; i < quantidade; i++) {
                let compra = new Servico(0, this.servico.getNome, this.servico.getPreco, pet, new Date())
                comprasCliente.push(compra)
            }
            this.cliente.setServicosConsumidos = comprasCliente
            
            console.log('Compra realizada com sucesso')
        }
        
    }
}