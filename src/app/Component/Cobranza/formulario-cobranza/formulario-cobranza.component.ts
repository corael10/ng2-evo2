import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Cobranza } from '../../../Classes/Cobranza'; 

@Component({
  moduleId: module.id,
  selector: 'formulario-cobranza',
  templateUrl: './formulario-cobranza.html'
  
})

export class FormularioCobranzaComponent{
    @Input() model: Cobranza;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}