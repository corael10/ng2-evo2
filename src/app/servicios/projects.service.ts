import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/index';
import { Project } from '../Classes/Project';


@Injectable()
export class ProjectsServices {
    private apiUrl = 'http://105.102.48.181:8000/';
    //private apiUrl = 'http://localhost:8000/';

    constructor(private http: Http) { }


    getUsersProject(idUser): Observable<Project[]> {
        
        return this.http.get(`${this.getUrl('project/GetUsersProject')}/${[idUser]}/`,idUser).map(this.getDatos).catch(this.error);
    }

    getProject(): Observable<Project[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('project/GetProject/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }
    getProjectAll(): Observable<Project[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.getUrl('project/GetAllProject/'),{ headers: headers }).map(this.getDatos).catch(this.error); 
    }

    addProject(model: Project): Observable<Project> {  
       
        let data = JSON.stringify(model);
        console.log("Application enviados a registrar " + data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUrl('project/GetProject/'), data, { headers: headers }) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any 

    }

    removeProject(model: Project): Observable<Comment[]> {
        return this.http.delete(`${this.getUrl('project/GetProject')}/${model.id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateProject(model: Project): Observable<Comment[]> {
        console.log("datos Application actualizar ",model);
        let bodyString = JSON.stringify(model); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
        return this.http.put(`${this.getUrl('project/GetProject')}/${model['id']}/`, model, { headers: headers }) // ...using put request
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