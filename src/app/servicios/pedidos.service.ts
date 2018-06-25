import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Pedido, ProductoPedido } from '../Classes/Pedido';
import { Cliente } from '../Classes/Cliente';
import { Producto } from '../Classes/Producto';
import { ConfigServices} from '../../config.service'


@Injectable()
export class PedidosServices {
    //private apiUrl = 'http://105.102.48.181:8000/empleado/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();

    getPedido(idCliente): Observable<Pedido[]> {
        //console.log('idprove en service',idproveedor);
        if(idCliente == 0){
            return this.http.get(this.getUrl('pedido/GetPedido')).map(this.getDatos).catch(this.error);
        }
        else{
            return this.http.get(`${this.getUrl('pedido/GetPedido')}/${[idCliente]}/`, idCliente).map(this.getDatos).catch(this.error);
        }
            }

    getCliente(idCliente): Observable<Cliente[]> {
       
        return this.http.get(`${this.getUrl('cliente/GetCliente')}/${[idCliente]}/`,idCliente).map(this.getDatos).catch(this.error);
    }
 
    addPedido(model: Pedido): Observable<Pedido> {
        // console.log("datos enviados " + model);
         let data = JSON.stringify(model);
         console.log("datos enviados " + data);
         let headers = new Headers({ 'Content-Type': 'application/json' });
         return this.http.post(this.getUrl('pedido/GetPedido/'), data, { headers: headers }) // ...using post request
             .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
             .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
 
     }
     MarcaPedido(model: Number): Observable<Pedido> {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('pedido/MarcaPedido')}/${model}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
 
     }

     public getPedidoSeleccionado(idCliente): Observable<ProductoPedido[]> {
        // console.log("idInventario ", idInventario);
         return this.http.get(`${this.getUrl('pedido/GetPedSelect')}/${[idCliente]}/`, idCliente).map(this.getDatos).catch(this.error);
     }



     removePedido(model: Producto): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('pedido/GetPedido')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updatePedido(model: Producto): Observable<Comment[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('pedido/GetPedido')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    updatedetallePedido(model: Producto): Observable<ProductoPedido[]> {
        console.log('modelo actualizar ',model);
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('pedido/GetDetalleSelect')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    removedetallePedido(model: Producto): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('pedido/GetDetalleSelect')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    private error(error: any) {
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error("error en ejecucion ", msg);
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