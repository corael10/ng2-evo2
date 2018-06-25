import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Project } from '../../../Classes/Project';
import { ProjectsServices } from '../../../servicios/projects.service'; 

@Component({
  moduleId: module.id,
  selector: 'listado-projects',
  templateUrl: './listado-projects.html'
  
})

export class ListadoProjectsComponent{
    @Input() projects:Array<Project>;
    @Output() borrado: EventEmitter<Project>= new EventEmitter<Project>();
    @Output() modificado:EventEmitter<Project> = new EventEmitter<Project>();

    model_temp: Project = new Project(0, '', '');
 

    constructor(private servicio: ProjectsServices){

    }

    
removeProject(model:Project){
    this.model_temp = model;
    $('#divpop').show();
}
confirmdelete(){
    $('#divpop').hide();
    this.servicio.removeProject(this.model_temp).subscribe(o => {
        this.borrado.emit(this.model_temp);
    })           
}
closemodal(){
    $('#divpop').hide();
}


modificarProject(model:Project){    
        this.modificado.emit(model);    
}


}