import { Component, OnInit,ViewChild} from '@angular/core';
import { Empleado } from '../../Classes/Empleado';
import { EmpleadosServices } from '../../servicios/empleados.service';
//import { ProductosServices } from '../../servicios/productos.service';
import  { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-emp', 
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit { 

  empleados: Array<Empleado> = [];
  empleado: Empleado = new Empleado(0,'','','','','','',1,0);
  @ViewChild('modal')
  modal :ModalComponent; 
  constructor(private servicio: EmpleadosServices) { } 

  ngOnInit() {
   /* this.servicio.getEmpleado().subscribe(data => {
      this.empleados = data;
     // console.log("datos ",this.empleados);
    });*/
  }
 
  guardar(model: Empleado) {
    if(model.id === 0){

     this.servicio.addEmpleado(model).subscribe(data => {
     this.empleados.push(data);
    });
  }
  else{
    this.servicio.updateEmpleado(model).subscribe();
  }
  this.modal.dismiss();


  }
addEmpleado(){
  this.empleado = new Empleado(0,'','','','','','',1,0);
  this.modal.open();
}
  onBorrar(model:Empleado){
    this.empleados.splice(this.empleados.indexOf(model),1);
  }
  onModificar(model:Empleado){
    this.empleado = model;
    this.modal.open();
  }
}
