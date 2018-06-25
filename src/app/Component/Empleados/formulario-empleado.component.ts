import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Empleado } from '../../Classes/Empleado'; 

@Component({
  moduleId: module.id,
  selector: 'formulario-empleado',
  templateUrl: './formulario-empleado.html'
  
})

export class FormularioEmpleadoComponent{
    @Input() model: Empleado;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}