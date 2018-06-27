import { Component,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { User } from '../../../Classes/Usr'; 
import { UsersServices } from '../../../servicios/users.service';  
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

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
    public usuario:string;
    @ViewChild('modalimagen')
    modal: ModalComponent;
    displayUser(users:User){
        console.log(users);
    }

    constructor(private servicio: UsersServices){

    }

    addUser(userparam)
{
    this.usuario= userparam;    
    this.modal.open();
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