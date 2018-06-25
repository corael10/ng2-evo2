import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Proveedor } from '../../Classes/Proveedor'; 

@Component({
  moduleId: module.id,
  selector: 'formulario-proveedor',
  templateUrl: './formulario-proveedor.html'
  
})

export class FormularioProveedorComponent{
    @Input() model: Proveedor;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}