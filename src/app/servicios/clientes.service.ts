import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Cliente } from '../Classes/Cliente';
import { ConfigServices} from '../../config.service'

@Injectable()
export class ClientesServices {
   // private apiUrl = 'http://105.102.48.181:8000/cliente/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();

    getCliente(): Observable<Cliente[]> {
        return this.http.get(this.getUrl('cliente/GetCliente/')).map(this.getDatos).catch(this.error);
    }
    public getClienteSeleccionado(idCliente): Observable<Cliente[]> {
        // console.log("idInventario ", idInventario);
         return this.http.get(`${this.getUrl('cliente/GetCliente')}/${[idCliente]}/`, idCliente).map(this.getDatos).catch(this.error);
     }
    public getEmpleadoSeleccionado(idEmpleado): Observable<Cliente[]> {
        // console.log("idInventario ", idInventario);
         return this.http.get(`${this.getUrl('cliente/GetEmpSelect')}/${[idEmpleado]}/`, idEmpleado).map(this.getDatos).catch(this.error);
     }

    addCliente(model: Cliente): Observable<Cliente> {  
       // console.log("datos enviados " + model);
        let data = JSON.stringify(model);
        //console.log("datos enviados " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('cliente/GetCliente/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any 

    }

    removeCliente(model: Cliente): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('cliente/GetCliente')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateCliente(model: Cliente): Observable<Comment[]> {
       // console.log('model update ',model);
        //let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('cliente/GetCliente')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    getClienteMes(): Observable<Cliente[]> {
        return this.http.get(this.getUrl('cliente/GetClienteMes/')).map(this.getDatos).catch(this.error);
    }
    public getClienteMesRango(modelRango): Observable<Cliente[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('cliente/GetClienteMes')}/${1}/`, modelRango, { headers: headers }) // ...using put request
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