import { Component,OnInit,ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { Project } from '../../Classes/Project';
import { ProjectsServices } from './servicios/projects.service';
import { UsersServices } from './servicios/users.service';
import { Project } from './Classes/Project';
import { UserPassword } from './Classes/Usr';
import { Router, CanActivate } from '@angular/router';
import { MensajesServices } from './servicios/mensajes.service';
import { Mensajes } from './Classes/mensajes';
import  { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
public is_superuser;
public id_user;
projects: Array<Project> = []; 
mensajes: Array<Mensajes> = [];
numeroMensajes : number = 0;
banderamensaje : boolean = false;
@ViewChild('modal')
modal :ModalComponent; 
model: UserPassword = new UserPassword(); 
userpassword: Array<UserPassword> = [];
error = '' ;

constructor(private servicio: ProjectsServices,private router: Router, private servicio_mensaje: MensajesServices, private servicio_user: UsersServices) { }
  first_name: string;
  last_name: string;
  username: string;
  
  ngOnInit() {
    this.first_name = sessionStorage.getItem('first_name');
    this.last_name = sessionStorage.getItem('last_name');
    this.is_superuser = sessionStorage.getItem('is_superuser');
    this.username = sessionStorage.getItem('username');
    console.log('is superuser ',this.is_superuser);


    this.Mensajes();
    
  }

  Mensajes(){
    this.servicio_mensaje.getMensajesList().subscribe(data => {
      this.mensajes = data;
     console.log("mensajes ",this.mensajes);
     this.numeroMensajes= this.mensajes.length;
    });
  }

  muestrMensajes(){
    if(!this.banderamensaje){
    this.banderamensaje =true;
    $('#mensajes').show();
    }
    else{
      this.banderamensaje =false;
      $('#mensajes').hide();
    }
     
  }

  logout(){
    if (confirm('Esta seguro que desea salir?')) {
    this.router.navigate(['/login']);
    }
  }

  CambioPassword(){
    this.model = new UserPassword();
    this.modal.open();
  }

  guardarpassword(model: UserPassword) {    
  this.model.id = parseInt(sessionStorage.getItem('id'));
  this.model.usuario = sessionStorage.getItem('username');
  console.log('model cambio pass ', this.model);
  this.servicio_user.updatePassword(model).subscribe(result => {
    if(result['token'] != ''){  
      this.modal.dismiss();
    } else{
      this.error =  'Password Anterior Incorrecto';      
    }
  },e =>{
    this.error = 'Password Anterior incorrecto';
   
  }); 
  


  }

  
}
