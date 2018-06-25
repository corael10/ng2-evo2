import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class ConfigServices {  
    //public apiUrl = 'http://192.168.1.78:8000/';
    public apiUrl = 'http://105.102.48.181:8000/';

    constructor(private http: Http) { }

    

    public getUrl() {
        return this.apiUrl;
    }
}