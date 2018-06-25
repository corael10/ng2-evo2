import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EmpleadosServices } from '../../../servicios/empleados.service';


@Component({
  selector: 'listado-empleado',
  templateUrl: './listado-empleado.html',
  styleUrls: ['./listado-empleado.css']
})
export class ListadoEmpleadoComponent {

  loadTableSettings() {
    return {
      add: {
        addButtonContent: '<i ></i>',
        createButtonContent: '<i></i>',
        cancelButtonContent: '<i ></i>',
        confirmCreate: true,
      },
    edit: {
      editButtonContent: '<i class="glyphicon glyphicon-pencil"></i>',
      saveButtonContent: '<i class="glyphicon glyphicon-ok"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="glyphicon glyphicon-remove-sign"></i>',
      confirmDelete: true,
    },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable : false,
        addable: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      apellido: {
        title: 'Apellido',
        type: 'string',
      },
      ciudad: {
        title: 'Ciudad',
        type: 'string',
      },
      telefono: {
        title: 'Telefono',
        type: 'string',
      },
      saldo: {
        title: 'Saldo',
        type: 'string',
        valuePrepareFunction: (value) => {
           return value === 'Saldo'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
          },
          fecha_contra: {
        title: 'Fecha de Contratacion',
        type: 'string',
      },     
      
    }, 
  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  settings: Object;
  bandera= false;
  constructor(private servicio_emp: EmpleadosServices) {

    this.getall();
  }

public getall(){
 
  this.servicio_emp.getEmpleado().subscribe(
    data => {
      this.source = new LocalDataSource(data);      
      this.settings = this.loadTableSettings();
    },
    error => error
  );
}

  onSaveConfirm(event): void {
console.log('new data empleado ', event.newData.id);
    if(typeof event.newData.id != "undefined" )
    //typeof this.idChipset === "undefined"
      {
        console.log('entra ');
        let empleado=event.newData.id;
        event.newData.empleado=empleado;
      }



    this.servicio_emp.updateEmpleado(event.newData).subscribe();  
    
  setTimeout(function() {
    this.bandera=true;    
  }, 500);
    
  if(this.bandera){
    this.getall();   
  }
  event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.servicio_emp.removeEmpleado(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
