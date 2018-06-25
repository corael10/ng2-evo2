import { Component,Input, Output,EventEmitter } from '@angular/core';
import { User } from '../../Classes/Usr';  

@Component({
  moduleId: module.id,
  selector: 'formulario-user',
  templateUrl: './formulario-user.html'
  
})

export class FormularioUserComponent{
    @Input() model: User;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}