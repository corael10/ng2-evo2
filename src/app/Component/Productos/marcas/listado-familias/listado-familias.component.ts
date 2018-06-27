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
  private selectPromo = [];
  constructor(private servicio: ProductosServices,private servicio_prov: ProveedoresServices) {

    //this.getall();
  }
  @Input() IDmarca : any;

  ngOnInit() {
    
    this.getall();
  }
getall(){
  console.log('entrando y encontrando valor de marca ',this.IDmarca.id);
 // this.source.load(this.IDmarca);
   /* this.servicio.getMarcas().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });*/

      this.servicio.getFamilia_Select(this.IDmarca.id).subscribe(data => {
        console.log('familias en familia component', data);
        this.source.load(data);
      });
      this.selectPromo.push({ value: 1, title: 'Activa' });
      this.selectPromo.push({ value: 0, title: 'No Activa' });
      
     /* this.servicio_prov.getProveedor().subscribe(
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
      );*/

      this.settings = this.loadTableSettings();
 
}




loadTableSettings() {
  return {
    add: {
      addButtonContent: '<i class="glyphicon glyphicon-plus" ></i>',
      createButtonContent: '<i class="glyphicon glyphicon-ok"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove" ></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i ></i>',
      saveButtonContent: '<i ></i>',
      cancelButtonContent: '<i ></i>',
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
      /*marca:{
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
      },*/
      promoactiva: {
        title: 'Promocion',
        type: 'string',
        filter:false,
        valuePrepareFunction: (promoactiva) => {
          if (promoactiva != null) {
            if(promoactiva == 1 )
            {
              return 'Activa'
            }
            else{
              return 'No Activa';
            }
            
          }          
        },
        
        editor: 
         {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.selectPromo,
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

  
  onCreateConfirm(event): void {
    event.newData['marca']= this.IDmarca.id;
    console.log('crear ', event.newData);
    this.servicio.addFamilia(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    
    this.servicio.updateFamilia(event.newData).subscribe(); 
    
    event.newData['marca']= this.IDmarca.id;
    console.log('new data ',event.newData );
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
