import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../Classes/Project';
import { ProjectsServices } from '../../servicios/projects.service';
//import { ProductosServices } from '../../servicios/productos.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  projects: Array<Project> = [];
  project: Project = new Project(0, '', '');
  @ViewChild('modal')
  modal: ModalComponent;
    constructor(private servicio: ProjectsServices) { }

  ngOnInit() {
    this.servicio.getProjectAll().subscribe(data => {
      this.projects = data;
      console.log("datos ", this.projects);
    });
  }

  guardar(model: Project) {
    if (model.id === 0) {
      this.servicio.addProject(model).subscribe(data => {
        this.projects.push(data);
      });
    }
    else {
      this.servicio.updateProject(model).subscribe();
    }
    this.modal.dismiss();


  }
  addProject() {
    this.project = new Project(0, '', '');
    this.modal.open();
  }
  onBorrar(model: Project) {
    this.projects.splice(this.projects.indexOf(model), 1);
  }
  onModificar(model: Project) {
    this.project = model;
    this.modal.open();
  }
  
}


