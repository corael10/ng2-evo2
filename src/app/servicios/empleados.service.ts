import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Empleado } from '../Classes/Empleado';
import { ConfigServices} from '../../config.service'

@Injectable()
export class EmpleadosServices {
    //private apiUrl = 'http://105.102.48.181:8000/empleado/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();


    getEmpleado(): Observable<Empleado[]> {

        return this.http.get(this.getUrl('empleado/GetEmpleado')).map(this.getDatos).catch(this.error);

    }


    addEmpleado(model: Empleado): Observable<Empleado> {
       // console.log("datos enviados " + model);
        let data = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.getUrl('empleado/GetEmpleado/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    removeEmpleado(model: Empleado): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('empleado/GetEmpleado')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    removeEmpleado2(model: Empleado) {
        let body = JSON.stringify(model);
        return this.http.delete(this.getUrl('empleado/GetEmpleado/') + model.id, body).catch(this.error);
    }
    updateEmpleado(model: Empleado) {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('empleado/GetEmpleado')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    private error(error: any) {
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
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