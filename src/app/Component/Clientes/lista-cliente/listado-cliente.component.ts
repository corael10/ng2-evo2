import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { ClientesServices } from '../../../servicios/clientes.service';
import { EmpleadosServices } from '../../../servicios/empleados.service';
import { RoutePedidoComponent } from '../../Pedidos/route-pedido/route-pedido.component';
//import { RouteClienteComponent} from '../../Pedidos/route-pedido/route-cliente-pedidos.component';
import { RouteClienteComponent} from '../../Clientes/route-cliente/route-cliente.component';
//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { Chipset } from '../../Classes/Chipset';

@Component({
  selector: 'listado-cliente',
  templateUrl: './listado-cliente.html',
  styleUrls: ['./listado-cliente.css']
})
export class ListaClienteComponent {

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
      fecha_registro: {
        title: 'Fecha de Registro',
        type: 'string',
      },
     /* empleado: {
        title: 'Agente de Venta',
        type: 'string',
        valuePrepareFunction: (empleado) => {
          if (empleado != null) {
            return empleado.nombre;
          }
        },
        editor: 
         {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectListEmpleado,
          },

        },
        
      },*/
      empleado: {
        title:"Agente",
        valuePrepareFunction: (empleado) => {
          return empleado.nombre ;
        },
        
        filterFunction(empleado?: any, search?: string): boolean {
          let match = empleado.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
        editor: 
         {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectListEmpleado,
          },

        },
      },
        button:{
          title:'Funciones',
          filter: false,
          editable: false,
          type: 'custom',
          valuePrepareFunction: (cell, row,) =>  row,
          renderComponent: RouteClienteComponent 
        },
        /*button2:{
          title:'Pedido',
          filter: false,
          editable: false,
          type: 'custom',
          valuePrepareFunction: (cell, row,) =>  row,
          renderComponent: RoutePedidoComponent 
        },*/
      
    }, 
  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  settings: Object;
  bandera= false;
  constructor(private servicio: ClientesServices,private servicio_emp: EmpleadosServices) {

    this.getall();
  }

public getall(){
 
    this.servicio.getCliente().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });

      this.servicio_emp.getEmpleado().subscribe(
        data => {
          this.source2 = new LocalDataSource(data);
          data.forEach(category => {
            // Populate the select list
            this.selectListEmpleado.push({ value: category.id, title: category.nombre });
          });
          // Initiate the settings object
          console.log('list ',this.selectListEmpleado);
          this.settings = this.loadTableSettings();
        },
        error => error
      );
      
 
}
selectListEmpleado = [];
  onCreateConfirm(event): void {
    this.servicio.addCliente(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    setTimeout(function() {
      this.bandera=true;    
    }, 500);
      
    if(this.bandera){
      this.getall();   
    }
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {

    if(typeof event.newData.empleado['id'] != "undefined" )
    //typeof this.idChipset === "undefined"
      {
        console.log('entra ');
        let empleado=event.newData.empleado['id'];
        event.newData.empleado=empleado;
      }



    this.servicio.updateCliente(event.newData).subscribe();  
    
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
        this.servicio.removeCliente(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
