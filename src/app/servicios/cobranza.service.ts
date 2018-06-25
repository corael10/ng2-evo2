import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Pedido, ProductoPedido } from '../Classes/Pedido';
import { Cliente } from '../Classes/Cliente';
import { Cobranza } from '../Classes/Cobranza';
import { ConfigServices} from '../../config.service'


@Injectable()
export class CobranzaServices {
   //private apiUrl = 'http://105.102.48.181:8000/empleado/';

   constructor(private http: Http,private servicio_config: ConfigServices) { }
   private apiUrl=this.servicio_config.getUrl();

    getCobranza(idCliente): Observable<Cobranza[]> {
        //console.log('idprove en service',idproveedor);
        if(idCliente == 0){
            return this.http.get(this.getUrl('cobranza/GetCobranza')).map(this.getDatos).catch(this.error);
        }
        else{
            return this.http.get(`${this.getUrl('cobranza/GetCobranza')}/${[idCliente]}/`, idCliente).map(this.getDatos).catch(this.error);
        }
            }

            addCobranza(model: Cobranza): Observable<Cobranza> {
                 
                 let data = JSON.stringify(model);
                 console.log("datos enviados " + data);
                 let headers = new Headers({ 'Content-Type': 'application/json' });         
                 return this.http.post(this.getUrl('cobranza/GetCobranza/'), data, { headers: headers }) // ...using post request
                     .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
             }

             removeCobranza(model: Cobranza): Observable<Comment[]> {
                 console.log('remove cobranza ', model);
                return this.http.delete(`${this.getUrl('cobranza/GetCobranza')}/${model.id}`) // ...using put request
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