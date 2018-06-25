import { Component, OnInit,ViewChild} from '@angular/core';
import { Producto,Marca,Familia } from '../../../Classes/Producto';
import { Inventario } from '../../../Classes/Inventario';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit { 

  registros: Array<Inventario> = [];
  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  bandera= false;
  proveedores = new Array();
  producto: Producto = new Producto(0,'','','','',0,0,0);
  
  constructor(private servicio: ProductosServices,private route: ActivatedRoute,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) { }

  idCliente: number;
  private sub: any;
  ngOnInit() {
  
    this.sub = this.route.params.subscribe(params => {
      console.log('pedidos paramas ',params);
      this.idCliente = +params['cliente'];
      if(Number.isNaN(this.idCliente)){
        this.idCliente = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
        }     
      if(Number.isNaN(this.idCliente)){
      this.idCliente=0;
      }
      console.log('id en cliente component ',this.idCliente);
   });
  }

}


