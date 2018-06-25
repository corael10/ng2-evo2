import { Component,Input,OnInit, Output,EventEmitter } from '@angular/core';
import { Application,VersionApp } from '../../../Classes/Application';  
import { User } from '../../../Classes/Usr'; 


@Component({
  moduleId: module.id,
  selector: 'formulario-versionapp',
  templateUrl: './formulario-versionapp.html'
  
})

export class FormularioVersionAppComponent{
    @Input() model: VersionApp;     
    @Output() onsubmit = new EventEmitter<any>();
   
    public submit(){
      console.log("modelo actualizar ",this.model);
        this.onsubmit.emit(this.model);       
    }
   
}