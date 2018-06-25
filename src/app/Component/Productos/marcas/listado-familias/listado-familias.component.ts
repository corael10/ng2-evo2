import { Component,Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../../Classes/Producto';
import { ProductosServices } from '../../../../servicios/productos.service';
import { ProveedoresServices } from '../../../../servicios/proveedores.service';

//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { Chipset } from '../../Classes/Chipset';

@Component({
  selector: 'listado-familias',
  templateUrl: './listado-familias.html',
  styleUrls: ['./listado-familias.css']
})
export class ListadoFamiliasComponent {
  
  constructor(private servicio: ProductosServices,private servicio_prov: ProveedoresServices) {

    //this.getall();
  }
  @Input() IDmarca : any;

  ngOnInit() {
    
    this.getall();
  }
getall(){
  console.log('entrando y encontrando valor de marca ',this.IDmarca);
  this.source.load(this.IDmarca);
   /* this.servicio.getMarcas().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });

      this.servicio.getFamilia_Select(this.IDmarca).subscribe(data => {
        console.log('familias ', data);
        this.source.load(data);
      });*/

      
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
      descripcion: {
        title: 'Descripcion',
        type: 'string',
      },
      marca:{
        title:'Marca',
        type:'string',
        valuePrepareFunction: (marca) => {
          if (marca != null) {
            return marca.nombre;
          }
          
        },
        
      },
      promoactiva: {
        title: 'Promocion',
        type: 'string',
      },
        
        
      
    },

  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
 
  settings: Object;

  
  onCreateConfirm(event): void {
    console.log(event.newData);
    this.servicio.addFamilia(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    
    this.servicio.updateFamilia(event.newData).subscribe();    
    //this.getall();
    event.confirm.resolve();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.servicio.removeFamilia(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
