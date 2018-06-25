import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
//import { Chipset } from '../../Classes/Chipset';
import{RouteProveedorComponent} from '../route-proveedor/route-proveedor.component';
import{RouteInventarioComponent} from '../../Inventario/route-inventario/route-inventario.component';

@Component({
  moduleId: module.id,
  selector: 'listado-proveedores',
  templateUrl: './listado-proveedores.html',
  styleUrls: ['./listado-proveedores.css']
})
export class ListadoProveedoresComponent {


  constructor(private servicio: ProductosServices,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) {

    this.getall();
    
  }

  getall(){
   
  
    this.servicio_prov.getProveedor().subscribe(
      data => {
        this.source = new LocalDataSource(data);      
        this.settings = this.loadTableSettings();
      },
      error => error
    );
    
        
   
  }

  selectList = [];
  loadTableSettings() {
    return {
    add: {
      addButtonContent: '<i class="glyphicon glyphicon-plus"></i>',
      createButtonContent: '<i class="glyphicon glyphicon-ok"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove"></i>',
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
        title: 'ID Proveedor',
        type: 'number',
        editable: false,
        addable: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      direccion: {
        title: 'Direccion',
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
      fecha_registro: {
        title: 'Fecha de Registro',
        type: 'string',
        
      },
      saldo: {
        title: 'Total',
        type: 'number',
        editable: false,
        valuePrepareFunction: (value) => {
          return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)
        },
      },
      button:{
        title:'Detalle',
        filter: false,
        editable: false,
        addable: false,
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: RouteProveedorComponent
      },
        

    },

  };
}


  source: LocalDataSource = new LocalDataSource();  
  settings: Object;


  onCreateConfirm(event): void {
    this.servicio_inv.addInventario(event.newData).subscribe(data => {
      //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    this.servicio_prov.updateProveedor(event.newData).subscribe();
    //this.getall();
    event.confirm.resolve();
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.servicio_inv.removeInventario(event.data).subscribe(data => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
