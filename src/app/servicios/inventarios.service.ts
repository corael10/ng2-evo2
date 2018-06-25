import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Producto,ProductoInventario } from '../Classes/Producto';
import { Inventario } from '../Classes/Inventario';
import { ConfigServices} from '../../config.service'


@Injectable()
export class InventariosServices {
    //private apiUrl = 'http://105.102.48.181:8000/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();

    getInventario(idproveedor): Observable<Inventario[]> {
        //console.log('idprove en service',idproveedor);
        if(idproveedor == 0){
            return this.http.get(this.getUrl('inventario/GetInventario')).map(this.getDatos).catch(this.error);
        }
        else{
            return this.http.get(`${this.getUrl('inventario/GetInventario')}/${[idproveedor]}/`, idproveedor).map(this.getDatos).catch(this.error);
        }
            }

    addInventario(model: Inventario): Observable<Inventario> {
       // console.log("datos enviados " + model);
        let data = JSON.stringify(model);
       // console.log("datos enviados " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('inventario/GetInventario/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }

    public getInventarioSeleccionado(idInventario): Observable<ProductoInventario[]> {
       // console.log("idInventario ", idInventario);
        return this.http.get(`${this.getUrl('inventario/GetInvSelect')}/${[idInventario]}/`, idInventario).map(this.getDatos).catch(this.error);
    }

    

    removeInventario(model: Producto): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('inventario/GetInventario')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateInventario(model: Producto): Observable<Comment[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('inventario/GetInventario')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    updatedetalleInventario(model: Producto): Observable<ProductoInventario[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('inventario/GetDetalleSelect')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    removedetalleInventario(model: Producto): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('inventario/GetDetalleSelect')}/${model.id}`) // ...using put request
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