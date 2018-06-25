import { Component, Input, Output,ViewChild, EventEmitter, OnInit } from '@angular/core';
import { Inventario } from '../../../Classes/Inventario';
import { Proveedor } from '../../../Classes/Proveedor';
import { Pedido,ProductoPedido } from '../../../Classes/Pedido';
//import { ListaProductoApiService } from '../../../servicios/listaProductoApi-service/listaProductoApi.service'; 
import { ProductosServices } from '../../../servicios/productos.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosServices } from '../../../servicios/pedidos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { Producto, ProductoInventario } from '../../../Classes/Producto';
import { LocalDataSource } from 'ng2-smart-table';
import { element } from 'protractor';
//import {PdfComponent} from '../pdf/pdf.component'
import { Popup } from 'ng2-opd-popup';

@Component({
  moduleId: module.id,
  selector: 'listado-detalle-pedido',
  templateUrl: './listado-detalle-pedido.html',
  styleUrls: ['./listado-detalle-pedido.css']

})

export class ListadoDetallePedidoComponent {
  //public proveedores: Array<Proveedor> = [];
  public productos: Array<ProductoInventario> = [];
  id: number;
  idResult:number;
  private sub: any;
  total: any = 0;
  empleadosustituto: string;
  pedidoResponse: Array<ProductoPedido> = [];
  model: Pedido = new Pedido(0, '', '','', '', 0, []);
  @ViewChild('popup') popup: Popup;
  public msg;
  header: string;
  verde = '#0AA054';
  rojo = '#BB0505';

  constructor(private servicio_ped: PedidosServices,private router: Router, private servicio: ProductosServices, private route: ActivatedRoute, private servicio_inv: InventariosServices, private servicio_prov: ProveedoresServices) {

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


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    console.log('id cliente ', this.id);
    this.servicio_ped.getPedidoSeleccionado(this.id).subscribe(data => {
      this.source.load(data);
      console.log("source iPedido ", this.source);
      this.empleadosustituto =  this.source['data'][0].pedido_entrada.empleadosustituto;
      console.log("empleadosustituto ", this.source['data'][0].pedido_entrada.empleadosustituto);
      this.pedidoResponse = data;
      data.forEach(category => {
        // Populate the select list
        this.total = this.total + category.total;
        //console.log('total ',this.total);
      });
    });
  } 
  
  MarcaEntregado(){
    console.log('marca entregado');
    this.servicio_ped.MarcaPedido(this.id).subscribe(data => { 
      console.log('respuesta ', data);

      
        console.log('respuesta pedidoresponse', data);
        this.msg = 'Pedido ' + data.id + ' Marcado como Entregado';
        this.header = 'Pedido Exitoso';
        this.ShowPupop(this.verde, this.header);
        this.model.id = this.id;
        //this.idResult= data;
     
    });
  }
  YourCancelEvent(){
    console.log('emtra a cancelar ');
    this.router.navigate(['/app/pedidos',  this.model]);
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


              return producto.codigo + " - " + producto.nombre;
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


        precio: {
          title: 'Precio',
          filter: false,
          valuePrepareFunction: (value) => {
            return value === 'Precio'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)
          },

        },
        unidades: {
          title: 'Unidades',
          filter: false,


        },

        total: {
          title: 'Total',
          type: 'number',
          editable: false,
          filter: false,
          valuePrepareFunction: (value) => {
            return value === 'Precio'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)
          },

        },

      },

    };
  }

  selectList = [];

  source: LocalDataSource = new LocalDataSource();
  settings: Object;




  onCreateConfirm(event): void {
    this.servicio_ped.addPedido(event.newData).subscribe(data => {
      //this.productos.push(data);
    });


    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    //console.log('entra a actualizar ',event.newData);
    this.total = 0;
    //this.total =  event.newData.precio_proveedor * event.newData.unidades;
    event.newData.total = event.newData.precio * event.newData.unidades;

    this.servicio_ped.updatedetallePedido(event.newData).subscribe(data => {



      this.servicio_ped.getPedidoSeleccionado(this.id).subscribe(data => {
        //console.log('datass ',data );
        this.source.load(data);
        data.forEach(category => {
          // Populate the select list
          this.total = this.total + category.total;
          // console.log('total ',this.total);
        });

      });
    });
    //this.getall();
    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    this.total = 0;
    if (window.confirm('Are you sure you want to delete?')) {
      this.servicio_ped.removedetallePedido(event.data).subscribe(data => {
        this.servicio_ped.getPedidoSeleccionado(this.id).subscribe(data => {
          //console.log('datass ',data );
          this.source.load(data);
          data.forEach(category => {
            // Populate the select list
            this.total = this.total + category.total;
            // console.log('total ',this.total);
          });

        });
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ShowPupop(color, header) {

    this.popup.options = {
      cancleBtnContent: "Close",
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-mbe-attack",
      color: color,//"#BB0505",
      header: header,// "Error message...",
      widthProsentage: 30,
      animation: "bounceIn"//fadeInLeft , fadeInRight, bounceInDown, fadeInUp
    };
    this.popup.show(this.popup.options);
  }
}
