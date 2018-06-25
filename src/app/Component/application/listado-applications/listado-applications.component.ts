import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Application } from '../../../Classes/Application'; 
import { ApplicationsServices } from '../../../servicios/applications.service';  

@Component({
  moduleId: module.id,
  selector: 'listado-applications',
  templateUrl: './listado-applications.html',
  styleUrls: ['./listado-applications.component.css'] 
})
 
export class ListadoApplicationsComponent{
    @Input() applications:Array<Application>;
    @Output() borrado: EventEmitter<Application>= new EventEmitter<Application>();
    @Output() modificado:EventEmitter<Application> = new EventEmitter<Application>();
    model_temp: Application = new Application(0, '', '', '');

    displayUser(application:Application){
        console.log(application);
    }

    constructor(private servicio: ApplicationsServices){

    }

    
removeApplication(model:Application){
    this.model_temp = model;
    $('#divpop').show();
    }
confirmdelete(){
    $('#divpop').hide();
    this.servicio.removeApplication(this.model_temp).subscribe(o => { 
        this.borrado.emit(this.model_temp);
    })          
}
closemodal(){
    $('#divpop').hide();
}


modificarApplication(model:Application){    
        this.modificado.emit(model);    
}
}