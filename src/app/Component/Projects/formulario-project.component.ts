import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Project } from '../../Classes/Project'; 

@Component({
  moduleId: module.id,
  selector: 'formulario-project',
  templateUrl: './formulario-project.html'
  
})

export class FormularioProjectComponent{
    @Input() model: Project;
    @Output() onsubmit = new EventEmitter<any>();

    public submit(){
        this.onsubmit.emit(this.model);       
    }

}