import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Cliente } from '../../../Classes/Cliente'; 
import { ClientesServices } from '../../../servicios/clientes.service'; 

@Component({
  moduleId: module.id,
  selector: 'listado-clientes-preview',
  templateUrl: './listado-clientes-preview.html'
  
})

export class ListadoClientesPreviewComponent{
    @Input() clientes:Array<Cliente>;
    @Output() borrado: EventEmitter<Cliente>= new EventEmitter<Cliente>();
    @Output() modificado:EventEmitter<Cliente> = new EventEmitter<Cliente>();

    displayCliente(cliente:Cliente){
        console.log(cliente);
    }

    constructor(private servicio: ClientesServices){

    }

    ngOnInit() {
        this.servicio.getCliente().subscribe(data => {
          this.clientes = data;
          console.log("datos ",this.clientes);
        });
      }

removeCliente(model:Cliente){
    this.servicio.removeCliente(model).subscribe(o => {
        this.borrado.emit(model);
    })
}
modificarCliente(model:Cliente){    
        this.modificado.emit(model);    
}

}