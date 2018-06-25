import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../Classes/Cliente';
import { ClientesServices } from '../../servicios/clientes.service';
import { Empleado } from '../../Classes/Empleado';
import { EmpleadosServices } from '../../servicios/empleados.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-cliente', 
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes: Array<Cliente> = [];
  empleados: Array<Empleado> = [];
  cliente: Cliente = new Cliente(0, '', '', '', '', '', '', 0);
  bandera= false;
  @ViewChild('modal')
  modal: ModalComponent;
    constructor(private servicio: ClientesServices,private servicio_emp:EmpleadosServices) { }

  ngOnInit() {
   /* this.servicio.getCliente().subscribe(data => {
      this.clientes = data;
      console.log("datos ", this.clientes);
    });*/
  }

  guardar(model: Cliente) {
    if (model.id === 0) {
      this.servicio.addCliente(model).subscribe(data => {
        this.clientes.push(data);
        this.bandera=true;
        if(this.bandera)(
          this.servicio.getCliente().subscribe(data => {
           this.clientes = data;
           console.log('entra a productos ', this.clientes);
         })
       )
      });
    }
    else {
      this.servicio.updateCliente(model).subscribe();
    }
    this.modal.dismiss();


  }
  addCliente() {
    this.servicio_emp.getEmpleado().subscribe(data => {
      this.empleados = data;
      console.log("datos ",this.empleados);
    });

    this.cliente = new Cliente(0, '', '', '', '', '', '', 0);
    this.modal.open();
  }
  onBorrar(model: Cliente) {
    this.clientes.splice(this.clientes.indexOf(model), 1);
  }
  onModificar(model: Cliente) {
    this.servicio_emp.getEmpleado().subscribe(data => {
      this.empleados = data;
      console.log("datos ",this.empleados);
    });
    this.cliente = model;
    this.modal.open();
  }
  
}


