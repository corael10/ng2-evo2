import { Component, OnInit,ViewChild } from '@angular/core';
import { User } from '../../Classes/Usr';
import { UsersServices } from '../../servicios/users.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] 
})
export class UserComponent implements OnInit {

  users: Array<User> = []; 
  user: User = new User(0,0, '', '', '', '', '', '', '', '');
  @ViewChild('modaluser')
  modal: ModalComponent;
    constructor(private servicio: UsersServices) { }

  ngOnInit() {
    this.servicio.getUserList().subscribe(data => {
      this.users = data;
      console.log("datos ", this.users);
    });
  }

  guardar(model: User) {
    if (model.id === 0) {
      this.servicio.addUser(model).subscribe(data => {
        this.users.push(data);
      });
    }
   /* else {
      this.servicio.updateUser(model).subscribe();
    }*/
    this.modal.dismiss();


  }
  addUser() {
    this.user = new User(0,0, '', '', '', '', '', '', '', '');
    this.modal.open();
  }
  onBorrar(model: User) {
    this.users.splice(this.users.indexOf(model), 1);
  }
  onModificar(model: User) {
    this.user = model;
    this.modal.open();
  }

}









