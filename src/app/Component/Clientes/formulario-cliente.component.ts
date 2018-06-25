import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Cliente } from '../../Classes/Cliente'; 
import { Empleado } from '../../Classes/Empleado'; 

@Component({
  moduleId: module.id,
  selector: 'formulario-cliente',
  templateUrl: './formulario-cliente.html'
  
})

export class FormularioClienteComponent{
    @Input() model: Cliente;
    @Input() empleados: Empleado;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}