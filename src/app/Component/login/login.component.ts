import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../servicios/Auth.Service';
import { UserAuth } from '../../Classes/Usr';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: UserAuth = new UserAuth();
  error = '' ;
  loading: boolean = false;

  constructor( private router: Router, private authtenticationService: AuthServices) {
    
   }

  ngOnInit() {
this.authtenticationService.logout();
  }

login(){
  this.loading= true;
  console.log('model login ',this.model);
  this.authtenticationService.login(this.model)
  .subscribe(result => {console.log(result);
    if(result === true){
      this.router.navigate(['/app/grafica-clientes']);
    } else{
      this.error =  'Credenciales incorrectas';
      this.loading = false;
    }
  },e =>{
    this.error = 'Credenciales incorrectas';
    this.loading = false;
  });
}
}
