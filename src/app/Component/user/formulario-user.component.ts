import { Component,Input, Output,EventEmitter } from '@angular/core';
import { User } from '../../Classes/Usr';  
import { UsersServices } from '../../servicios/users.service';

@Component({
  moduleId: module.id,
  selector: 'formulario-user',
  templateUrl: './formulario-user.html'
  
})

export class FormularioUserComponent{
    @Input() model: User;
    @Output() onsubmit = new EventEmitter<any>();
    constructor(private servicio: UsersServices) { }
    public submit(){
        console.log('model con imagen ',this.model);
        this.onsubmit.emit(this.model);       
    }
    /*public onArchivoSeleccionado($event) {
        if ($event.target.files.length === 1) {
            this.servicio.subirArchivo($event.target.files[0]).subscribe(response => {
                // respuesta
            },
            error => {
                console.error(error);
            });
        }
    }*/
    
    
    
}