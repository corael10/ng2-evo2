import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Producto,Marca,Familia } from '../../Classes/Producto'; 
import { ProductosServices } from '../../servicios/productos.service';

@Component({
  moduleId: module.id,
  selector: 'formulario-producto',
  templateUrl: './formulario-producto.html'
  
})

export class FormularioProductoComponent{
    @Input() model: Producto;
    @Input() marcas: Marca;
    @Input() familias: Familia;
    @Output() onsubmit = new EventEmitter<any>();


    familiaMarca: Array<Familia> = [];


    constructor(
        private servicio: ProductosServices
       ) { }
    

    public submit(){
        this.onsubmit.emit(this.model);       
    }
    onMarca($event) {
        
        //console.log($event);
        this.servicio.getFamilia_Select($event).subscribe(data => {
          this.familiaMarca = data;
          // console.log('entra a Familias ', this.familias);
          $('#familias').show();          
        });
      }

}