import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Application,VersionApp } from '../Classes/Application';


@Injectable()
export class ApplicationsServices {
    private apiUrl = 'http://105.102.48.181:8000/';
    //private apiUrl = 'http://localhost:8000/';

    constructor(private http: Http) { }

    getApplication(): Observable<Application[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('apps/GetApp/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }

    addApplication(model: Application): Observable<Application> {  
       
        let data = JSON.stringify(model);
        console.log("Application enviados a registrar " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('apps/GetApp/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any 

    }

    removeApplication(model: Application): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('apps/GetApp')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateApplication(model: Application): Observable<Comment[]> {
        console.log("datos Application actualizar ",model);
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('apps/GetApp')}/${model['id']}/`, model, { headers: headers }) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    GetApp(idApp): Observable<Application[]> {
        
         return this.http.get(`${this.getUrl('apps/GetApp')}/${[idApp]}/`,idApp).map(this.getDatos).catch(this.error);
     }

    getVersionApp(): Observable<VersionApp[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('apps/GetVersionApp/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }

    addVersionApp(model: VersionApp): Observable<VersionApp> {  
        
         let data = JSON.stringify(model);
         console.log("Version APp enviados a registrar " + data);
         let headers = new Headers({ 'Content-Type': 'application/json' });
         return this.http.post(this.getUrl('apps/GetVersionApp/'), data, { headers: headers }) // ...using post request
             .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
             .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any 
 
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