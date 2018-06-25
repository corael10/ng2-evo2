import { Component, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Producto, Marca, Familia, ProductoInventario } from '../../../Classes/Producto';
import { Proveedor } from '../../../Classes/Proveedor';
import { Empleado } from '../../../Classes/Empleado';
import { Inventario, Unidad } from '../../../Classes/Inventario';
import { Pedido, ProductoPedido } from '../../../Classes/Pedido';
import { PedidosServices } from '../../../servicios/pedidos.service';
import { EmpleadosServices } from '../../../servicios/empleados.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProductosServices } from '../../../servicios/productos.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { ClientesServices } from '../../../servicios/clientes.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Cliente } from '../../../Classes/Cliente';
import { ActivatedRoute } from '@angular/router';
import { Popup } from 'ng2-opd-popup';



@Component({
  moduleId: module.id,
  selector: 'app-cobranza-nueva',
  templateUrl: './cobranza-nueva.component.html',
  styleUrls: ['./cobranza-nueva.component.css']
})
export class CobranzaNuevaComponent implements OnInit {
  
  public promoactiva:boolean;
  pedidoResponse: Pedido = new Pedido(0, '', '','', '', 0, []);
  productos: Array<Producto> = [];
  empleados: Array<Empleado> = [];
  clientes: Array<Cliente> = [];
  Datoscliente: Array<Cliente> = [];
  preciosList = [];
  productos_arry: Array<ProductoPedido> = [];
  productos_arry_temp: ProductoPedido = new ProductoPedido(0, '', '', '', '', 0);
  productos_temp: Array<Producto> = [];
  public proveedores: Array<Proveedor> = [];
  idCliente: number;
  private sub: any;
  @ViewChild('popup') popup: Popup;
  @ViewChild('popup2') popup2: Popup;
  public msg;
  verde = '#0AA054';
  rojo = '#BB0505';
  header: string;
  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  PedidoExito =false;
  
  bandera = false;
  



  model: Pedido = new Pedido(0, '', '','', '', 0, []);
  unidad: Unidad = new Unidad(0);
  @Output() onsubmit = new EventEmitter<any>();
  constructor(private servicio_ped: PedidosServices,
    private servicio: ProductosServices,
    private servicio_prov: ProveedoresServices,
    private servicio_inv: InventariosServices,
    private servicio_emp: EmpleadosServices,
    private servicio_cli: ClientesServices,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idCliente = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
//this.ShowPupop2(this.rojo, this.header);
      if (Number.isNaN(this.idCliente)) {
        this.idCliente = 0;
      }
      else {
        this.servicio_cli.getClienteSeleccionado(this.idCliente).subscribe(data => {
          this.Datoscliente = data;
          this.model.empleado = this.Datoscliente['empleado']['id'];
          this.model.cliente = this.Datoscliente['id'];
          console.log('id cliente en nuevo pedido ', this.Datoscliente);
        });

      }
    });
    this.servicio_emp.getEmpleado().subscribe(data => {
      this.empleados = data;
      // console.log("datos ",this.empleados);
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

    if (this.model.cliente == '') {
      this.msg = ' Seleccione un cliente ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }

    else if (this.model.productos.length == 0) {
      this.msg = ' Seleccione al menos un Producto ';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }
    else {
      this.servicio_ped.addPedido(this.model).subscribe(data => {
        console.log('respuesta ', data);
        this.PedidoExito =true;
        this.pedidoResponse =data ;
        console.log('respuesta pedidoresponse', this.pedidoResponse);
        this.msg = ' Nuevo Pedido Generado con FOLIO ' + data.id;
        this.header = 'Pedido Exitoso';
        this.ShowPupop2(this.verde, this.header);
      });

      this.productos_arry = [];
      this.model = new Pedido(0, '', '','', '', 0, []);
    }
  }
  onFecha() {
    $('#empleado').show();
  }
  onFechaConCliente() {
    $('#proveedores').show();
  }
  onEmpleado($event) {
    //console.log(this.model.proveedor);
    this.servicio_cli.getEmpleadoSeleccionado(this.model.empleado).subscribe(data => {
      this.clientes = data;
      $('#cliente').show();
      this.productos_temp = [];
    });
  }

  onCliente($event) {
    //console.log(this.model.proveedor);
    this.servicio_prov.getProveedor().subscribe(data => {
      this.proveedores = data;
      $('#proveedores').show();
      this.productos_temp = [];
      //console.log('entra a proveedores ', this.proveedores);
    });


  }

  onProveedor($event) {
    //console.log(this.model.proveedor);
    this.servicio.getProv_Select($event).subscribe(data => {
      this.marcas = data;
      $('#marcas').show();
      $('#familias').hide();
      $('#producto').hide();
      $('#promoactiva').hide();
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
      $('#promoactiva').hide();
    });
  }

  onFamilia($event) {
    //console.log($event);
    $('#promoactiva').hide();
    this.servicio.getMarca_Select($event).subscribe(data => {
      this.productos = data;
      console.log('entra a productos ', this.productos);
      if(this.productos[0]['familia']['promoactiva'])
      {
        $('#promoactiva').show();
      }
      $('#producto').show();
    
    });
  }


  onProducto(event: Producto) {
    this.preciosList = [];
    this.servicio.getProducto_Select(event).subscribe(data => {
      this.productos_temp = data;
      console.log('procd en pedo ' , this.productos_temp);
      this.preciosList.push({ value: this.productos_temp['precio_1'], title: 'Estetica' });
      this.preciosList.push({ value: this.productos_temp['precio_2'], title: 'Publico' });
      this.preciosList.push({ value: this.productos_temp['precio_3'], title: 'Taller' });
      if(this.productos_temp['familia']['promoactiva'] == true)
      {
      this.preciosList.push({ value: this.productos_temp['precio_promo'], title: 'PROMOCION' });
      }
      console.log('precios list ', this.preciosList);
      $('#producto_temp').show();
    });
  }

  agregar_temp() {
    if (this.unidad.unidades == 0 || this.unidad.unidades < 0) {
      this.msg = 'Unidades menor de "0"';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
      console.log(this.model.productos['precio']);
    }
    else if (typeof this.model.productos['precio'] === "undefined") {
      this.msg = 'Seleccione un precio';
      this.header = 'Aviso';
      this.ShowPupop(this.rojo, this.header);
    }
    else {
      this.onsubmit.emit(this.unidad);
      // console.log('unidades ', this.unidad.unidades)
      this.productos_arry_temp = new ProductoPedido(0, '', '', '', '', 0);
      this.productos_arry_temp['id'] = this.productos_temp['id'];
      this.productos_arry_temp['codigo'] = this.productos_temp['codigo'];
      this.productos_arry_temp['nombre'] = this.productos_temp['nombre'];
      this.productos_arry_temp['familia'] = this.productos_temp['familia'];
      this.productos_arry_temp['precio'] = this.model.productos['precio'];
      this.productos_arry_temp['unidades'] = this.unidad.unidades;
      this.productos_arry_temp['total'] = this.unidad.unidades * this.model.productos['precio'];
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





  onBorrar(model: ProductoPedido) {
    var index = this.productos_arry.indexOf(model, 0);
    // console.log('*/*/*/*/*/total: ',this.productos_arry[index].total);
    this.model['total'] = this.model['total'] - this.productos_arry[index].total;

    //console.log('indeeexxxx: ',index)
    if (index > -1) {
      this.productos_arry.splice(index, 1);

    }
    //this.productos.splice(this.productos.indexOf(model), 1);
  }
  onModificar(model: ProductoPedido) {
    this.bandera = true;
  }

  Modificar(model: ProductoPedido) {
    //console.log('unidades ', this.unidad.unidades)    
    var index = this.productos_arry.indexOf(model, 0);
    this.productos_arry[index]['unidades'] = this.unidad.unidades;
    // console.log('index ',this.productos_arry[index]);
  }

  YourConfirmEvent(){
   console.log('si entra ');
    this.popup.hide();
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

  ShowPupop2(color, header) {
    this.popup2.options = {
      cancleBtnContent: "Close",
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-mbe-attack",
      color: color,//"#BB0505",
      header: header,// "Error message...",
      widthProsentage: 30,
      animation: "bounceIn"//fadeInLeft , fadeInRight, bounceInDown, fadeInUp
    };
    this.popup2.show(this.popup2.options);
  }




}


