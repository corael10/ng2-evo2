import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Inventario } from '../../../Classes/Inventario';
import { Proveedor } from '../../../Classes/Proveedor';
//import { ListaProductoApiService } from '../../../servicios/listaProductoApi-service/listaProductoApi.service'; 
import { ProductosServices } from '../../../servicios/productos.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ActivatedRoute } from '@angular/router';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { Producto, ProductoInventario } from '../../../Classes/Producto';
import { LocalDataSource } from 'ng2-smart-table';
import { element } from 'protractor';
//import {PdfComponent} from '../pdf/pdf.component'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import{RouteProveedorComponent} from '../route-proveedor/route-proveedor.component';

@Component({
  moduleId: module.id,
  selector: 'listado-detalle-proveedor',
  templateUrl: './listado-detalle-proveedor.html',
  styleUrls: ['./listado-detalle-proveedor.css']

})

export class ListadoDetalleProveedorComponent {
  //public proveedores: Array<Proveedor> = [];
  public productos: Array<ProductoInventario> = [];
  id: number;
  private sub: any;
  total:any = 0;



  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
   });
   this.servicio_inv.getInventarioSeleccionado(this.id).subscribe(data => {
    this.source.load(data);
    console.log("source inventarioproducto ", this.source);
    data.forEach(category => {
      // Populate the select list
      this.total= this.total+category.total;
      console.log('total ',this.total);
    });
  });
  }


  proveedores: Array<any> = [];

  loadTableSettings() {
    return {
      
      add: {
        addButtonContent: '',
        createButtonContent: '',
        cancelButtonContent: '',
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
        /*id: {
          title: 'ID',
          type: 'number',
          editable: false,
          addable: false,
          filter: false,
        },*/
        producto: {
          title: 'Producto',
          editable: false,
          filter: false,
          valuePrepareFunction: (producto) => {
            if (producto != null) {
        
              
              return  producto.codigo + " - " + producto.nombre ;
              //return producto.nombre;
            }
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select...',
              //list: this.selectList,
            },

          },
        },

       
        precio_proveedor: {
          title: 'Precio Proveedor',
          filter: false,
          
         
          },  
        unidades: {
          title: 'Unidades',
          filter: false,
          
         
          },        
        
        total: {
          title: 'Total',
          type: 'string',
          editable: false,
          filter: false,
        },      

      },

    };
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
  selectList = [];
 
  source: LocalDataSource = new LocalDataSource();
  settings: Object;
  constructor(private servicio: ProductosServices,private route: ActivatedRoute,private _sanitizer:DomSanitizer, private servicio_inv: InventariosServices, private servicio_prov: ProveedoresServices) {
    this.servicio_prov.getProveedor().subscribe(
      data => {
        this.source = new LocalDataSource(data);
        data.forEach(category => {
          // Populate the select list
          this.selectList.push({ value: category.id, title: category.nombre });
        });
        // Initiate the settings object
        this.settings = this.loadTableSettings();


      },
      error => error
    );
   
  }

 

  onCreateConfirm(event): void {
    this.servicio_inv.addInventario(event.newData).subscribe(data => {
      //this.productos.push(data);
    });
    
    
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    console.log('entra a actualizar ',event.newData);
    this.total=0;
    //this.total =  event.newData.precio_proveedor * event.newData.unidades;
    event.newData.total = event.newData.precio_proveedor * event.newData.unidades;

    this.servicio_inv.updatedetalleInventario(event.newData).subscribe( data =>{

    

    this.servicio_inv.getInventarioSeleccionado(this.id).subscribe(data => {
      console.log('datass ',data );
      this.source.load(data);
      data.forEach(category => {
        // Populate the select list
        this.total= this.total+category.total;
        console.log('total ',this.total);
      });
    
    });
  });
    //this.getall();
    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.servicio_inv.removedetalleInventario(event.data).subscribe(data => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
