import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Mensajes } from '../Classes/mensajes';
import { ConfigServices} from '../../config.service'




@Injectable()
export class MensajesServices {
   // private apiUrl = 'http://105.102.48.181:8000/';
    //private apiUrl = 'http://localhost:8000/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();

    getMensajesList(): Observable<Mensajes[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('mensajes/GetMensaje/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }
    
    removeUser(model: Mensajes): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('chipset/GetChipset')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateUser(model: Mensajes): Observable<Comment[]> {
        //console.log("datos actualizar ",model);
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('chipset/GetChipset')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

  

    

    private error(error: any) {
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error("error en ejecucion ",msg); 
        return Observable.throw(msg);
    }

    private getDatos(data: Response) {
        let datos = data.json();
        return datos || [];
    }

    private getUrl(modelo: String) {
        return this.apiUrl + modelo;
    }
}