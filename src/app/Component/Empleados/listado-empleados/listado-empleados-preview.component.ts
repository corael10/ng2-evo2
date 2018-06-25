import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Empleado } from '../../../Classes/Empleado'; 
import { EmpleadosServices } from '../../../servicios/empleados.service'; 

@Component({
  moduleId: module.id,
  selector: 'listado-empleados-preview',
  templateUrl: './listado-empleados-preview.html'
  
})

export class ListadoEmpleadosPreviewComponent{ 
    @Input() empleados:Array<Empleado>;
    @Output() borrado: EventEmitter<Empleado>= new EventEmitter<Empleado>();
    @Output() modificado:EventEmitter<Empleado> = new EventEmitter<Empleado>();

    displayCliente(empleado:Empleado){
        console.log(empleado);
    }

    constructor(private servicio: EmpleadosServices){

    }
    ngOnInit() {
        this.servicio.getEmpleado().subscribe(data => {
          this.empleados = data;
          console.log("datos ",this.empleados);
        });
      }

removeEmpleado(model:Empleado){
    this.servicio.removeEmpleado(model).subscribe(o => {
        this.borrado.emit(model);
    })
}
modificarEmpleado(model:Empleado){    
        this.modificado.emit(model);    
}

}