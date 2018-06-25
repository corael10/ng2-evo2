import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Cliente } from '../../../Classes/Cliente';
import { Pedido } from '../../../Classes/Pedido';  
import { ClientesServices } from '../../../servicios/clientes.service'; 

@Component({
  moduleId: module.id,
  selector: 'listado-clientes',
  templateUrl: './listado-clientes.html'
  
})

export class ListadoClientesComponent{
    @Input() clientes:Array<Cliente>;
    @Output() borrado: EventEmitter<Cliente>= new EventEmitter<Cliente>();
    @Output() modificado:EventEmitter<Cliente> = new EventEmitter<Cliente>();
    @Output() nuevopedido:EventEmitter<Cliente> = new EventEmitter<Cliente>();

    displayCliente(cliente:Cliente){
        console.log(cliente);
    }

    constructor(private servicio: ClientesServices){

    }

    
removeCliente(model:Cliente){
    this.servicio.removeCliente(model).subscribe(o => {
        this.borrado.emit(model);
    })
}
modificarCliente(model:Cliente){    
        this.modificado.emit(model);    
}
NuevoPedido(model:Cliente){    
    this.nuevopedido.emit(model);    
}


}