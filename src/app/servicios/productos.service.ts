import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Producto,PrecioPromo, Familia,Marca } from '../Classes/Producto';
import { ConfigServices} from '../../config.service'


@Injectable()
export class ProductosServices {
    //private apiUrl = 'http://105.102.48.181:8000/';

    constructor(private http: Http,private servicio_config: ConfigServices) { }
    private apiUrl=this.servicio_config.getUrl();

    getProducto(): Observable<Producto[]> {
        return this.http.get(this.getUrl('producto/GetProducto')).map(this.getDatos).catch(this.error);
    }
    getProducto_Select(idProd): Observable<Producto[]> {
       // console.log("idProd ", idProd);
        return this.http.get(`${this.getUrl('producto/GetProducto')}/${[idProd]}/`, idProd).map(this.getDatos).catch(this.error);
    }

    addProducto(model: Producto): Observable<Producto> {
        
        let data = JSON.stringify(model);
       // console.log("datos enviados " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('producto/GetProducto/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }

    removeProducto(model: Producto): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('producto/GetProducto')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateProducto(model: Producto): Observable<Comment[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
       // console.log('update producto ',model)
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('producto/GetProducto')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    UpdatePromo(model: PrecioPromo): Observable<Comment[]> {
        let bodyString = JSON.stringify(model); // Stringify payload
       // console.log('update producto ',model)
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('producto/UpdatePromo')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    
    GetFamilia_Promocion(): Observable<Familia[]> {
        return this.http.get(this.getUrl('producto/GetFamilia_Promocion')).map(this.getDatos).catch(this.error);
    }
    addFamilia(model: Familia): Observable<Familia> {    
        console.log('add Familia ',model);    
        let data = JSON.stringify(model);
       // console.log("datos enviados " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('producto/GetFamilia/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    updateFamilia(model: Familia): Observable<Comment[]> {
        console.log('update Familia ',model);  
        let bodyString = JSON.stringify(model); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('producto/GetFamilia')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    removeFamilia(model: Familia): Observable<Comment[]> {
        console.log('remoce ',model);  
        return this.http.delete(`${this.getUrl('producto/GetFamilia')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }



    getMarcas(): Observable<Producto[]> {
        return this.http.get(this.getUrl('producto/GetMarca')).map(this.getDatos).catch(this.error);
    }

    addMarca(model: Marca): Observable<Marca> {    
        console.log('add marcar ',model);    
        let data = JSON.stringify(model);
       // console.log("datos enviados " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('producto/GetMarca/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    updateMarca(model: Marca): Observable<Comment[]> {
        console.log('update marcar ',model);  
        let bodyString = JSON.stringify(model); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('producto/GetMarca')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    removeMarca(model: Marca): Observable<Comment[]> {
        console.log('remoce ',model);  
        return this.http.delete(`${this.getUrl('producto/GetMarca')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }



    getProv_Select(idProv): Observable<Producto[]> {
       // console.log("idProv ", idProv);
        return this.http.get(`${this.getUrl('producto/getProv_Select')}/${[idProv]}/`, idProv).map(this.getDatos).catch(this.error);
    }
    getMarca_Select(idMarca): Observable<Producto[]> {
       // console.log("maaaarcaaaa ", idMarca);
        return this.http.get(`${this.getUrl('producto/getMarc_Select')}/${[idMarca]}/`, idMarca).map(this.getDatos).catch(this.error);
    }

    getFamilia(): Observable<Producto[]> {
        return this.http.get(this.getUrl('producto/GetFamilia')).map(this.getDatos).catch(this.error);
    }
    getFamilia_Select(idFamilia): Observable<Producto[]> {
        //console.log("maaaarcaaaa ", idFamilia);
        return this.http.get(`${this.getUrl('producto/GetFamilia_select')}/${[idFamilia]}/`, idFamilia).map(this.getDatos).catch(this.error);
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