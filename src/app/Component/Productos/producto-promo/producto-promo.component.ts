import { Component, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Producto, Marca, Familia, ProductoInventario, PrecioPromo } from '../../../Classes/Producto';
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
  selector: 'app-producto-promo',
  templateUrl: './producto-promo.component.html',
  styleUrls: ['./producto-promo.component.css']
})
export class ProductoPromoComponent implements OnInit {


  UpdatePromo: PrecioPromo = new PrecioPromo(0, 0);
  precio_promo: any;
  productos: Array<Producto> = [];
  productos_arry: Array<ProductoInventario> = [];
  productos_arry_temp: ProductoInventario = new ProductoInventario(0, '', '', '', '', 0);
  productos_temp: Array<Producto> = [];
  public proveedores: Array<Proveedor> = [];
  public familiasConpromo: Array<Familia> = [];
  //public familiasConpromo: Familia= new Familia(0,'','','') ;
  public nuevapromo =false;
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
  public familia: string;


  constructor(private servicio: ProductosServices, private servicio_prov: ProveedoresServices, private servicio_inv: InventariosServices) { }

  ngOnInit() {
    this.servicio.GetFamilia_Promocion().subscribe(data => {
      this.familiasConpromo = data;
    });

    this.servicio_prov.getProveedor().subscribe(data => {
      this.proveedores = data;
      //console.log('entra a proveedores ', this.proveedores);
    });
  }


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
        this.msg = 'FOLIO: ' + data.folio + '\n' + ' ID INTERNO: ' + data.id;
        this.header = 'Nueva Entrada';
        this.ShowPupop(this.verde, this.header);
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
      $('#productos_lista').hide();
      this.productos_temp = [];
    });
  }

  onMarca($event) {
    //console.log($event);
    this.servicio.getFamilia_Select($event).subscribe(data => {
      this.familias = data;
      // console.log('entra a Familias ', this.familias);
      $('#familias').show();
      $('#btnquitarpromo2').hide();
      $('#productos_lista').hide();
    });
  }

  onFamilia($event) {
    //console.log($event);

    this.servicio.getMarca_Select($event).subscribe(data => {
      this.productos = data;
      this.familia = this.productos[0].familia['nombre'];
      console.log('entra a productos ', this.productos);
      $('#productos_lista').show();
      $('#btnquitarpromo').show();
      $('#btnAgregarpromo').show();
      if(this.productos[0].familia['promoactiva'] == true)
      {
      $('#btnquitarpromo2').show();
      }
    });
  }

  AgregarPrecioPromo(producto, index) {
    console.log('eventtt ', producto.id);
    console.log('index ', index);
    this.precio_promo = $('#precioPromo' + index).val();
    this.UpdatePromo.id = parseInt(producto['id']);
    this.UpdatePromo.precio = parseInt(this.precio_promo);
    this.UpdatePromo.activa = true;
    this.UpdatePromo.quitar = false;
    this.servicio.UpdatePromo(this.UpdatePromo).subscribe(data => {
      this.msg = 'Se agrego promocion a '+ producto['nombre']+' de la familia ' + this.familia;
      this.header = 'Exito';
      this.ShowPupop(this.verde, this.header);
      $('#btnquitarpromo2').show();
      //$('#btnAgregarpromo2').show();
      //$('#btnVerpromos').show();
      this.servicio.GetFamilia_Promocion().subscribe(data => {
        this.familiasConpromo = data;
      });
    });
  }
  VerPromos(){
    this.nuevapromo = false;
    $('#productos_lista').hide();
  }

  QuitarPromo(familia) {
    console.log('familia ', familia);
    this.UpdatePromo.id = parseInt(familia['id']);
    this.UpdatePromo.quitar = true;
    this.servicio.UpdatePromo(this.UpdatePromo).subscribe(data => {
      this.msg = 'Se quito la promocion de la familia ' + familia['nombre'];
      this.header = 'Exito';
      this.ShowPupop(this.verde, this.header);
      $('#productos_lista').hide();
      this.servicio.GetFamilia_Promocion().subscribe(data => {
        this.familiasConpromo = data;
        this.nuevapromo = false;
      });
    });
  }
  AgregarPromo(){
  this.nuevapromo = true;
  $('#productos_lista').hide();
  $('#btnquitarpromo2').hide();
  $('#btnAgregarpromo2').hide();
  $('#familias').hide();
  $('#marcas').hide();
  }



  producto: Producto = new Producto(0, '', '', '', '', 0, 0, 0);
  @ViewChild('modal')
  modal: ModalComponent;


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


