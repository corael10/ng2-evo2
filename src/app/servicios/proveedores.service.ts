import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Proveedor } from '../Classes/Proveedor';
import { ConfigServices} from '../../config.service'


@Injectable()
export class ProveedoresServices{
   // private apiUrl = 'http://105.102.48.181:8000/';

    constructor(private http:Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();


    getProveedor(): Observable<Proveedor[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('proveedor/GetProveedor/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }
    
    

    addProveedor(model: Proveedor): Observable<Proveedor> {
       // console.log("datos enviados " + model);
        let data = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('proveedor/GetProveedor/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }

    removeProveedor(model: Proveedor): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('proveedor/GetProveedor')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateProveedor(model: Proveedor): Observable<Comment[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('proveedor/GetProveedor')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    private error(error:any){
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
        return Observable.throw(msg);
    }

    private getDatos(data:Response){
        let datos = data.json();
        return datos || [];
    }

    private getUrl(modelo:String){
         return this.apiUrl+modelo;
    }
}