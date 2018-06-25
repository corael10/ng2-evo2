import { Injectable} from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router) { }

    canActivate() {
        if(sessionStorage.getItem('token')){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}