import { Component,Input,Output,OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { Pedido } from '../../../Classes/Pedido';
import { PedidosServices } from '../../../servicios/pedidos.service';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
//import { Chipset } from '../../Classes/Chipset';
import{RoutePedidoComponent} from '../route-pedido/route-pedido.component';
@Component({
  moduleId: module.id,
  selector: 'listado-pedidos',
  templateUrl: './listado-pedidos.html',
  styleUrls: ['./listado-pedidos.css']
})
export class ListadoPedidosComponent {

  
  constructor(private servicio_ped: PedidosServices,private servicio: ProductosServices,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) {
    
    
    
  }
  @Input() idCliente : number;
  ngOnInit() {
    console.log('id en listado pedidos ',this.idCliente);
    this.getall();
  }

  getall(){
    
    //console.log('idProveedor en listado inventarios ',this.idProveedor);
    this.servicio_ped.getPedido(this.idCliente).subscribe(data => {
      this.source.load(data);
      console.log("source ", this.source);
    });
    
  
    this.servicio_prov.getProveedor().subscribe(
      data => {
        this.source2 = new LocalDataSource(data);
        data.forEach(category => {
          // Populate the select list
          this.selectList.push({ value: category.nombre, title: category.nombre });
        });
        // Initiate the settings object
        console.log('list ',this.selectList);
        this.settings = this.loadTableSettings();
      },
      error => error
    );
    
        
   
  }

  selectList = [];
  loadTableSettings() {
    return {
    add: {
      addButtonContent: '<i ></i>',
      createButtonContent: '<i ></i>',
      cancelButtonContent: '<i ></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class=""></i>',
      saveButtonContent: '<i class=""></i>',
      cancelButtonContent: '<i class=""></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="glyphicon glyphicon-remove-sign"></i>',
      confirmDelete: true,
    },

    columns: {
      id: {
        title: 'Folio',
        type: 'number',
        editable: false,
        addable: false,
      },
      cliente: {
        title: 'Cliente',
        type: 'string',
        valuePrepareFunction: (cliente) => {
          if (cliente != null) {
            return cliente.nombre +' '+ cliente.apellido ;
          }
        },
        filterFunction(cliente?: any, search?: string): boolean {
          let match = cliente.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
        
      },
      empleado: {
        title: 'Agente de Venta',
        type: 'string',
        valuePrepareFunction: (empleado) => {
          if (empleado != null) {
            return empleado.nombre +' '+ empleado.apellido ;
          }
        },
        filterFunction(empleado?: any, search?: string): boolean {
          let match = empleado.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
      empleadosustituto: {
        title: 'Agente Sustituto',
        type: 'string',
        valuePrepareFunction: (empleadosustituto) => {
          if (empleadosustituto != null) {
            return empleadosustituto.nombre +' '+ empleadosustituto.apellido ;
          }
        },
        filterFunction(empleadosustituto?: any, search?: string): boolean {
          try{
          let match = empleadosustituto.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        }
        catch(err){if ( search === '') {
          return true;
        } else {
          return false;
        }}
        },
      },

      
      fecha: {
        title: 'Fecha',
        type: 'string',
        
      },
      total: {
        title: 'Total',
        type: 'number',
        editable:false,
        valuePrepareFunction: (value) => {
          return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)
        },
      },
      estatus: {
        title: 'Estatus',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          if(cell)
          {
          return `<div class="alert alert-success">Entregado</div>`;
          }
          else{
            return `<div class="alert alert-danger">Transito</div>`;
          }
      },
      
      },
      button:{
        title:'',
        filter: false,
        editable: false,
        type: 'custom',
        valuePrepareFunction: (cell, row,) =>  row,
        renderComponent: RoutePedidoComponent
      },
        

    },

  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  settings: Object;


  onCreateConfirm(event): void {
    this.servicio_inv.addInventario(event.newData).subscribe(data => {
      //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    this.servicio_ped.updatePedido(event.newData).subscribe();
    
    event.confirm.resolve();
    this.getall();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.servicio_ped.removePedido(event.data).subscribe(data => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
