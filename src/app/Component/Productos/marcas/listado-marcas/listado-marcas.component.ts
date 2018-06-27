import { Component,Output,EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../../Classes/Producto';
import { ProductosServices } from '../../../../servicios/productos.service';
import { ProveedoresServices } from '../../../../servicios/proveedores.service';

//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { Chipset } from '../../Classes/Chipset';

@Component({
  selector: 'listado-marcas',
  templateUrl: './listado-marcas.html',
  styleUrls: ['./listado-marcas.css']
})
export class ListadoMarcasComponent {

  constructor(private servicio: ProductosServices,private servicio_prov: ProveedoresServices) {

    this.getall();
  }

getall(){
    this.servicio.getMarcas().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });

      this.servicio_prov.getProveedor().subscribe(
        data => {
          this.source2 = new LocalDataSource(data);
          data.forEach(category => {
            // Populate the select list
            this.selectListMarca.push({ value: category.id, title: category.nombre });
          });
          // Initiate the settings object
          console.log('list ',this.selectListMarca);
          this.settings = this.loadTableSettings();
        },
        error => error
      );

    
 
}
selectListMarca = [];


loadTableSettings() {
  return {
    add: {
      addButtonContent: '<i class="glyphicon glyphicon-plus" ></i>',
      createButtonContent: '<i class="glyphicon glyphicon-ok"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove" ></i>',
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
        type: 'string',
        editable: false,
        addable: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      proveedor: {
        title: 'Proveedor',
        type: 'string',
        valuePrepareFunction: (proveedor) => {
          if (proveedor != null) {
            return proveedor.nombre;
          }
          
        },
        editor: 
         {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectListMarca,
          },

        },
      },
        
        
      
    },

  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
 
  settings: Object;
  //public marcaID: any;
  @Output() marcaID = new EventEmitter();
  onUserRowSelect(event): void {
    this.marcaID.emit({id:event.data});
    /*this.servicio.getFamilia_Select(event.data.id).subscribe(data => {
      console.log('familias ', data);
      //this.source3.load(data);
      this.marcaID.emit({nombre:data});
    });*/
    
    $('#familias').show();
    //this.marcaID= event.data.id;    
    //console.log('event marca ',this.marcaID);
}

  onCreateConfirm(event): void {
    this.servicio.addMarca(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    
    this.servicio.updateMarca(event.newData).subscribe();    
    //this.getall();
    event.confirm.resolve();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.servicio.removeMarca(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
