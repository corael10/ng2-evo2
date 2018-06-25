import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../Classes/Producto';
import { ProductosServices } from '../../../servicios/productos.service';

//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { Chipset } from '../../Classes/Chipset';

@Component({
  selector: 'listado-inventario',
  templateUrl: './listado-inventario.html',
  styleUrls: ['./listado-inventario.css']
})
export class ListadoInventarioComponent {

  constructor(private servicio: ProductosServices) {

    this.getall();
  }

getall(){
    this.servicio.getProducto().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });

      this.servicio.getMarcas().subscribe(
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

      this.servicio.getFamilia().subscribe(
        data => {
          this.source3 = new LocalDataSource(data);
          data.forEach(category => {
            // Populate the select list
            this.selectListFamilia.push({ value: category.id, title: category.nombre });
          });
          // Initiate the settings object
          console.log('list ',this.selectListFamilia);
          this.settings = this.loadTableSettings();
        },
        error => error
      );
      
      
      
 
}
selectListMarca = [];
selectListFamilia = [];

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
      codigo: {
        title: 'Codigo',
        type: 'string',
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      descripcion: {
        title: 'Descripcion',
        type: 'string',
      },
      marca: {
        title: 'Marca',
        type: 'string',
        valuePrepareFunction: (marca) => {
          if (marca != null) {
            return marca.nombre;
          }          
        },
        filterFunction(marca?: any, search?: string): boolean {
          let match = marca.nombre.indexOf(search) > -1
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
            list: this.selectListMarca,
          },

        },
        
        
        },
      familia: {
        title: 'Familia',
        type: 'string',
        valuePrepareFunction: (familia) => {
          if (familia != null) {
            return familia.nombre;
          }
        },
        filterFunction(familia?: any, search?: string): boolean {
          try{
          let match = familia.nombre.indexOf(search) > -1
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
        editor: 
         {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectListFamilia,
          },

        },
        
      },      
      precio_proveedor: {
        title: 'Precio Proveedor',
        type: 'string',
        valuePrepareFunction: (precio_proveedor) => {
          if (precio_proveedor != null) {
            return '$'+precio_proveedor;
          }
        }
      },
      unidades: {
        title: 'Unidades',
        type: 'number',
        editable:false
      },
        

    },

  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  settings: Object;



  onCreateConfirm(event): void {
    this.servicio.addProducto(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }
fam: any;
  onSaveConfirm(event): void {
    console.log('dsadas ', event.newData.familia['id']);
    if(typeof event.newData.familia['id'] != "undefined" )
    //typeof this.idChipset === "undefined"
      {
        console.log('entra ');
        let fam=event.newData.familia['id'];
        event.newData.familia=fam;
      }
      if(typeof event.newData.marca['id'] != "undefined" )
    //typeof this.idChipset === "undefined"
      {
        console.log('entra ');
        let marca=event.newData.marca['id'];
        event.newData.marca=marca;
      }
    this.servicio.updateProducto(event.newData).subscribe();
    
    //this.getall();
    event.confirm.resolve();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.servicio.removeProducto(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
