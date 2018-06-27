import { Component,Input, Output,EventEmitter } from '@angular/core';
import { User } from '../../../../Classes/Usr';  
import { UsersServices } from '../../../../servicios/users.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  moduleId: module.id,
  selector: 'formulario-imagen',
  templateUrl: './formulario-imagen.html',
  styleUrls: ['./formulario-imagen.css'] 
  
})

export class FormularioImagenComponent{    
    @Output() onsubmit = new EventEmitter<any>();
    @Input() usuario:string;
    constructor(private servicio: UsersServices,public ngProgress: NgProgress) { }
    public submit($event){
       
        //this.onsubmit.emit(this.model);       
    }
    public onArchivoSeleccionado($event) {
        
    //this.ngProgress.start();    
    this.servicio.subirArchivo($event.target.files[0],this.usuario).subscribe(data => { 
        //this.ngProgress.done();
        //this.posts = response.json();
      });
/*

        if ($event.target.files.length === 1) {
            this.servicio.subirArchivo($event.target.files[0],this.usuario).subscribe(response => {
                // respuesta
                console.log('listo');
            },
            error => {
                console.error(error);
            });
    }*/
    }
    
    
    
}