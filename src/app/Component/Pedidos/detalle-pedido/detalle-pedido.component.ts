import { Component, OnInit,ViewChild} from '@angular/core';
import { Producto,Marca,Familia } from '../../../Classes/Producto';
import { Inventario } from '../../../Classes/Inventario';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { ProveedoresServices } from '../../../servicios/proveedores.service';

@Component({
  moduleId: module.id,
  selector: 'app-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit { 

  registros: Array<Inventario> = [];
  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  bandera= false;
  proveedores = new Array();
  producto: Producto = new Producto(0,'','','','',0,0,0);
  
  constructor(private servicio: ProductosServices,private servicio_inv: InventariosServices,private servicio_prov: ProveedoresServices) { }

  ngOnInit() {
    //console.log('entra');
    this.servicio_inv.getInventario(0).subscribe(data => {
      this.registros = data;
      //console.log('entra a productos ', this.registros);
    });

    
    
    
  }

}


