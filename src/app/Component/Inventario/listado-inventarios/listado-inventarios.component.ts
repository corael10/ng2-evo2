import { Component,Input,Output,OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
//import { Chipset } from '../../Classes/Chipset';
import{RouteInventarioComponent} from '../route-inventario/route-inventario.component';
@Component({
  moduleId: module.id,
  selector: 'listado-inventarios',
  templateUrl: './listado-inventarios.html',
  styleUrls: ['./listado-inventarios.css']
})
export class ListadoInventariosComponent {

  
  constructor(private servicio: ProductosServices,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) {
    
    
    
  }
  @Input() idProveedor : number;
  ngOnInit() {
    console.log('id en listado inventarios ',this.idProveedor);
    this.getall();
  }

  getall(){
    
    //console.log('idProveedor en listado inventarios ',this.idProveedor);
    this.servicio_inv.getInventario(this.idProveedor).subscribe(data => {
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
        title: 'Folio Interno',
        type: 'number',
        editable: false,
        addable: false,
      },
      folio: {
        title: 'Folio Proveedor',
        type: 'string',
      },
      fecha_proveedor: {
        title: 'Fecha Proveedor',
        type: 'string',

      },

      proveedor: {
        title: 'Proveedor',

        valuePrepareFunction: (proveedor) => {
          if (proveedor != null) {
            return proveedor.nombre;
          }
        },
        filter: false,
        /* {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectList,
          },

        },*/
        editable:false,
        editor: {
          type: 'list',
          config: {
            //selectText: 'Select...',
            list: this.selectList,
          },

        },
      },
      fecha: {
        title: 'Fecha de Entrada',
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
      button:{
        title:'Detalle',
        filter: false,
        editable: false,
        type: 'custom',
        valuePrepareFunction: (cell, row,) =>  row,
        renderComponent: RouteInventarioComponent
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
    this.servicio_inv.updateInventario(event.newData).subscribe();
    
    event.confirm.resolve();
    this.getall();
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
