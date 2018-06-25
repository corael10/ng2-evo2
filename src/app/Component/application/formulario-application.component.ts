import { Component,Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { Application,VersionApp } from '../../Classes/Application';  
import { ApplicationsServices } from '../../servicios/applications.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'formulario-application',
  templateUrl: './formulario-application.html',
  styleUrls: ['./formulario-application.component.css']
  
})

export class FormularioApplicationComponent{
    @Input() public versionsapps: Array<VersionApp> = []; 
    @Input() model: Application;
    @Output() onsubmit = new EventEmitter<any>();
    banderasubmit=true;
    appversions: Array<VersionApp> = []; 

    constructor(private service: ApplicationsServices) { }
    version: VersionApp = new VersionApp(0, '');
    @ViewChild('modalversionapp')
    modal: ModalComponent;


    addVersionApp(){     
        this.banderasubmit=false;   
        this.version = new VersionApp(0, '');
        this.modal.open();
        }
        submitApp(){
            this.banderasubmit=true;
        }
    public submit(){
        console.log("bandera ",this.banderasubmit);
        if(this.banderasubmit){
        this.onsubmit.emit(this.model); 
        }      
    }
   

    guardarVersionapp(model: VersionApp) {
        if (model.id === 0) {
          this.service.addVersionApp(model).subscribe(data => {
              console.log("data ",data);
              this.versionsapps.push(data);
          
          });
        }
        else {/*
          this.service.updateApplication(model).subscribe(data => {
           console.log("model actualizar ",model);
           this.idAppUpdate = model.id;
           this.service.getApplication().subscribe(data => {
            this.applications = data;
            console.log("datos  Application", this.applications);
          });
        });*/
        }
        this.modal.dismiss();
    
    
      }

}