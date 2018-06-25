import { Component,Input,Output,OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { Pedido } from '../../../Classes/Pedido';
import { CobranzaServices } from '../../../servicios/cobranza.service';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'listado-cobranza',
  templateUrl: './listado-cobranza.html',
  styleUrls: ['./listado-cobranza.css']
})
export class ListadoCobranzaComponent {

  
  constructor(private servicio_cob: CobranzaServices,private servicio: ProductosServices,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) {
    
    
    
  }
  @Input() idCliente : number;
  ngOnInit() {
    console.log('id en listado cobranza ',this.idCliente);
    this.getall();
  }

  getall(){
    
    //console.log('idProveedor en listado inventarios ',this.idProveedor);
    this.servicio_cob.getCobranza(this.idCliente).subscribe(data => {
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
        filter:false,
        valuePrepareFunction: (cliente) => {
          if (cliente != null) {
            return cliente.nombre +' '+ cliente.apellido ;
          }
        },
      },
      empleado: {
        title: 'Agente de Venta',
        type: 'string',
        filter:false,
        valuePrepareFunction: (empleado) => {
          if (empleado != null) {
            return empleado.nombre +' '+ empleado.apellido ;
          }
        },
      },

      
      fecha: {
        title: 'Fecha',
        type: 'string',
        
      },
      abono: {
        title: 'Abono',
        type: 'number',
        editable:false,
        valuePrepareFunction: (value) => {
          return value === 'Abono'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
      },
      total: {
        title: 'Total',
        type: 'number',
        editable:false,
        valuePrepareFunction: (value) => {
          return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
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


  onDeleteConfirm(event): void {
    
    if (window.confirm('Are you sure you want to delete?')) {
      console.log('eliminar ', event.data)
      this.servicio_cob.removeCobranza(event.data).subscribe(data => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
