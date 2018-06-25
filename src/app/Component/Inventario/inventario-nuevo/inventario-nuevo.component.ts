import { Component, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Producto, Marca, Familia, ProductoInventario } from '../../../Classes/Producto';
import { Proveedor } from '../../../Classes/Proveedor';
import { Inventario, Unidad } from '../../../Classes/Inventario';

//import { ListaProductoApiService } from '../../servicios/listaProductoApi-service/listaProductoApi.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProductosServices } from '../../../servicios/productos.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Popup } from 'ng2-opd-popup';

@Component({
  moduleId: module.id,
  selector: 'app-inentario-nuevo',
  templateUrl: './inventario-nuevo.component.html',
  styleUrls: ['./inventario-nuevo.component.css']
})
export class InventarioNuevoComponent implements OnInit {

  productos: Array<Producto> = [];
  productos_arry: Array<ProductoInventario> = [];
  productos_arry_temp: ProductoInventario = new ProductoInventario(0, '', '', '', '', 0);
  productos_temp: Array<Producto> = [];
  public proveedores: Array<Proveedor> = [];

  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  bandera = false;

  model: Inventario = new Inventario(0, '', '', '', '', 0, []);
  unidad: Unidad = new Unidad(0);
  @Output() onsubmit = new EventEmitter<any>();
  @ViewChild('popup') popup: Popup;
  public msg;
  verde = '#0AA054';
  rojo = '#BB0505';
  header: string;

  public submit() {
    this.onsubmit.emit(this.model);
    //console.log(this.model);   
    this.model['productos'] = this.productos_arry;
    if (this.model.folio == '') {
      this.msg = ' Ingrese Folio de Proveedor ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }

    else if (this.model.proveedor == '') {
      this.msg = ' Seleccione un Proveedor ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }
    else if (this.model.fecha == '') {
      this.msg = ' Seleccione Fecha de registro ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }
    else if (this.model.fecha_proveedor == '') {
      this.msg = ' Seleccione Fecha de Proveedor';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }

    else if (this.model.productos.length == 0) {
      this.msg = ' Seleccione al menos un Producto ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }
    
    else {

    this.servicio_inv.addInventario(this.model).subscribe(data => {
      this.msg = 'Se agrego FOLIO: '+data.folio +'\n'+' y con un   ID INTERNO: ' + data.id;
      this.header = 'Nueva Entrada';
      this.ShowPupop(this.verde, this.header);
      $('#marcas').hide();
      $('#familias').hide();
      $('#producto').hide();
    });
    this.productos_arry = [];
    this.model = new Inventario(0, '', '', '', '', 0, []);
  }
  }

  onProveedor($event) {
    //console.log(this.model.proveedor);
    this.servicio.getProv_Select(this.model.proveedor).subscribe(data => {
      this.marcas = data;
      $('#marcas').show();
      $('#familias').hide();
      $('#producto').hide();
      this.productos_temp = [];
    });
  }

  onMarca($event) {
    //console.log($event);
    this.servicio.getFamilia_Select($event).subscribe(data => {
      this.familias = data;
      // console.log('entra a Familias ', this.familias);
      $('#familias').show();
      $('#producto').hide();
    });
  }

  onFamilia($event) {
    //console.log($event);
    this.servicio.getMarca_Select($event).subscribe(data => {
      this.productos = data;
      //console.log('entra a productos ', this.productos);
      $('#producto').show();
    });
  }


  onProducto(event: Producto) {

    this.servicio.getProducto_Select(event).subscribe(data => {
      this.productos_temp = data;
      //console.log('entra a productos ', this.productos);
      $('#producto_temp').show();
    });
  }

  agregar_temp() {

    if (this.unidad.unidades == 0 || this.unidad.unidades < 0) {
      this.msg = 'Unidades menor de "0"';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
      
    }
        else {

    this.onsubmit.emit(this.unidad);
    // console.log('unidades ', this.unidad.unidades)
    this.productos_arry_temp = new ProductoInventario(0, '', '', '', '', 0);
    this.productos_arry_temp['id'] = this.productos_temp['id'];
    this.productos_arry_temp['codigo'] = this.productos_temp['codigo'];
    this.productos_arry_temp['nombre'] = this.productos_temp['nombre'];
    this.productos_arry_temp['familia'] = this.productos_temp['familia'];
    this.productos_arry_temp['precio_proveedor'] = this.productos_temp['precio_proveedor'];
    this.productos_arry_temp['unidades'] = this.unidad.unidades;
    this.productos_arry_temp['total'] = this.unidad.unidades * this.productos_temp['precio_proveedor'];
    this.unidad.unidades = 0;
    //console.log(this.productos_temp);
    this.productos_temp = [];
    this.productos_arry.push(this.productos_arry_temp);
    this.model['total'] = this.model['total'] + this.productos_arry_temp['total'];
    //this.total = this.total + this.productos_arry_temp['total'];

    //console.log(this.productos_arry);
    $('#producto_temp').hide();



  }
}


  producto: Producto = new Producto(0, '', '', '', '', 0, 0, 0);
  @ViewChild('modal')
  modal: ModalComponent;
  constructor(private servicio: ProductosServices, private servicio_prov: ProveedoresServices, private servicio_inv: InventariosServices) { }

  ngOnInit() {

    this.servicio_prov.getProveedor().subscribe(data => {
      this.proveedores = data;
      //console.log('entra a proveedores ', this.proveedores);
    });

  }


  onBorrar(model: ProductoInventario) {
    var index = this.productos_arry.indexOf(model, 0);
    // console.log('*/*/*/*/*/total: ',this.productos_arry[index].total);
    this.model['total'] = this.model['total'] - this.productos_arry[index].total;

    //console.log('indeeexxxx: ',index)
    if (index > -1) {
      this.productos_arry.splice(index, 1);

    }
    //this.productos.splice(this.productos.indexOf(model), 1);
  }
  onModificar(model: ProductoInventario) {
    this.bandera = true;
  }

  Modificar(model: ProductoInventario) {
    //console.log('unidades ', this.unidad.unidades)    
    var index = this.productos_arry.indexOf(model, 0);
    this.productos_arry[index]['unidades'] = this.unidad.unidades;
    // console.log('index ',this.productos_arry[index]);
  }


  ShowPupop(color, header) {

    this.popup.options = {
      cancleBtnContent: "Close",
      cancleBtnClass: "btn btn-default",
      color: color,//"#BB0505",
      header: header,// "Error message...",
      widthProsentage: 30,
      animation: "bounceIn"//fadeInLeft , fadeInRight, bounceInDown, fadeInUp

    };


    this.popup.show(this.popup.options);
  }

}


