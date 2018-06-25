import { Component, OnInit,ViewChild } from '@angular/core';
import { Application,VersionApp } from '../../Classes/Application';
import { ApplicationsServices } from '../../servicios/applications.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  idAppUpdate: number;
  versionsapps: Array<VersionApp> = []; 
  applications: Array<Application> = []; 
  application: Application = new Application(0, '', '', '');
  application2: Application = new Application(0, '', '', '');
  @ViewChild('modalapplication')
  modal: ModalComponent;
    constructor(private service: ApplicationsServices) { }

  ngOnInit() {
    this.service.getApplication().subscribe(data => {
      this.applications = data;
      console.log("datos  Application", this.applications);
    });
  }

  guardar(model: Application) {
    if (model.id === 0) {
      this.service.addApplication(model).subscribe(data => {
        this.applications.push(data[0]);
      });
    }
    else {
      this.service.updateApplication(model).subscribe(data => {
       console.log("model actualizar ",model);
       this.idAppUpdate = model.id;
       this.service.getApplication().subscribe(data => {
        this.applications = data;
        console.log("datos  Application", this.applications);
      });
    });
    }
    this.modal.dismiss();


  }
  addApplication() {

    this.service.getVersionApp().subscribe(data => {
      this.versionsapps = data;
      console.log("versions apps ", this.versionsapps);
    });

    this.application = new Application(0, '', '', '');
    this.application2 = new Application(0, '', '', '');
    this.modal.open();
  }
  onBorrar(model: Application) {
    this.applications.splice(this.applications.indexOf(model), 1);
  }
  onModificar(model: Application) {
    this.service.getVersionApp().subscribe(data => {
      this.versionsapps = data;
      console.log("versions apps ", this.versionsapps);
    });
    this.application = model;
    this.application2= Object.assign({}, this.application);
    this.modal.open();
  }

}









