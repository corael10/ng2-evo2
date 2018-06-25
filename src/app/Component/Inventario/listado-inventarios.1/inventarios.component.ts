import { Component, OnInit,ViewChild} from '@angular/core';
import { Producto,Marca,Familia } from '../../../Classes/Producto';
import { Inventario } from '../../../Classes/Inventario';
import { ProductosServices } from '../../../servicios/productos.service';
import { InventariosServices } from '../../../servicios/inventarios.service';


@Component({
  moduleId: module.id,
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit { 

  registros: Array<Inventario> = [];
  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  bandera= false;

  producto: Producto = new Producto(0,'','','','',0,0,0);
  
  constructor(private servicio: ProductosServices,private servicio_inv: InventariosServices) { }

  ngOnInit() {
    console.log('entra');
    this.servicio_inv.getInventario(0).subscribe(data => {
      this.registros = data;
      console.log('entra a productos ', this.registros);
    });
    
  }

}


