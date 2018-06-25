import { Component,Input, Output,EventEmitter } from '@angular/core';
import { AuthServices } from '../../../servicios/Auth.Service';
import { UserPassword } from '../../../Classes/Usr';

@Component({
  moduleId: module.id,
  selector: 'cambio-password',
  templateUrl: './cambio-password.html'
  
})

export class CambioPasswordComponent{
    @Input() model: UserPassword;
    @Input() error:string;
    @Output() onsubmit = new EventEmitter<any>();
    //model: UserPassword = new UserPassword(); 
    //errorr: string;
    public guardapassword(){
        console.log('Antes ',this.model);
        if(this.model.password_anterior  == this.model.password)
        {
            this.error='El password sigue siendo el mismo';
        }
        else{
        this.onsubmit.emit(this.model);       
    }
    }

}