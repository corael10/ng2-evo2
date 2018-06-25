import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Producto } from '../../../Classes/Producto'; 
//import { ListaProductoApiService } from '../../../servicios/listaProductoApi-service/listaProductoApi.service'; 
import { ProductosServices } from '../../../servicios/productos.service';

@Component({
  moduleId: module.id,
  selector: 'listado-productos',
  templateUrl: './listado-productos.html'
  
})

export class ListadoProductosComponent{
    @Input() productos:Array<Producto>;
    @Output() borrado: EventEmitter<Producto>= new EventEmitter<Producto>();
    @Output() modificado:EventEmitter<Producto> = new EventEmitter<Producto>();

    displayProducto(producto:Producto){
        console.log(producto);
    }

    constructor(private servicio: ProductosServices){

    }

removeProducto(model:Producto){
    this.servicio.removeProducto(model).subscribe(o => {
        this.borrado.emit(model);
    })
}
modificarProducto(model:Producto){  
    console.log('producto a actualizar ', model)  
        this.modificado.emit(model);    
}

}