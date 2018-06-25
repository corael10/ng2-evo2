import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../Classes/Usr';
import { UsersServices } from '../../servicios/users.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private servicio: UsersServices,private router: Router) { }
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: string;
  token: string;
  
  ngOnInit() {
    
    this.token = sessionStorage.getItem('token');
    this.username = sessionStorage.getItem('username');
    this.first_name = sessionStorage.getItem('first_name');
    this.last_name = sessionStorage.getItem('last_name');
    this.email = sessionStorage.getItem('email');
    this.last_login = sessionStorage.getItem('last_login');


   
  }

  logout(){
    if (window.confirm('Are you sure you want exit?')) {
    this.router.navigate(['/login']);
    }
  }
}


