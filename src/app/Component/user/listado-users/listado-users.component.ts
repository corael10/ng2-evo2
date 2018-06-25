import { Component,Input,Output,EventEmitter } from '@angular/core';
import { User } from '../../../Classes/Usr'; 
import { UsersServices } from '../../../servicios/users.service';  

@Component({
  moduleId: module.id,
  selector: 'listado-users',
  templateUrl: './listado-users.html',
  styleUrls: ['./listado-users.component.css'] 
})
 
export class ListadoUsersComponent{
    @Input() users:Array<User>;
    @Output() borrado: EventEmitter<User>= new EventEmitter<User>();
    @Output() modificado:EventEmitter<User> = new EventEmitter<User>();
    @Output() nuevopedido:EventEmitter<User> = new EventEmitter<User>(); 

    displayUser(users:User){
        console.log(users);
    }

    constructor(private servicio: UsersServices){

    }

    
removeUser(model:User){
    this.servicio.removeUser(model).subscribe(o => { 
        this.borrado.emit(model);
    })
}
modificarUser(model:User){    
        this.modificado.emit(model);    
}
}