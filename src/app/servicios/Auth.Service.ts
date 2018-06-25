import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { UserAuth} from '../Classes/Usr';
import { ConfigServices} from '../../config.service'


@Injectable()
export class AuthServices {  
    //private apiUrl = 'http://105.102.48.181:8000/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();


    login(User: UserAuth): Observable<boolean> {
        let body = 'username=' + User.Login + '&password=' + User.Password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ 'headers': headers });
        return this.http.post(this.getUrl('Authentication/login/'), body, options).map(this.getDatos).catch(this.error);
    } 

    logout(): void {
        
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('last_login');

    }

    private getDatos(data: Response) {
        console.log(data);
        let datos = data.json();
       
        if (datos ) {           
            sessionStorage.setItem('token', datos.token);
            sessionStorage.setItem('id',datos.user[0].id);
            sessionStorage.setItem('username',datos.user[0].username);
            sessionStorage.setItem('first_name',datos.user[0].first_name);
            sessionStorage.setItem('last_name',datos.user[0].last_name);
            sessionStorage.setItem('email',datos.user[0].email);
            sessionStorage.setItem('last_login',datos.user[0].last_login);
            sessionStorage.setItem('is_superuser',datos.user[0].is_superuser);               
            return true;
        }
        return false;
    }

    private error(error: any) {
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
        return Observable.throw(msg);
    }

    private getUrl(modelo: String) {
        return this.apiUrl + modelo;
    }
}