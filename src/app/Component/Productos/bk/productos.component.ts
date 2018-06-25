import { Component, OnInit,ViewChild} from '@angular/core';
import { Producto,Marca,Familia } from '../../../Classes/Producto';
//import { ListaProductoApiService } from '../../servicios/listaProductoApi-service/listaProductoApi.service';
import { ProductosServices } from '../../../servicios/productos.service';
import  { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-prod',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit { 

  productos: Array<Producto> = [];
  marcas: Array<Marca> = [];
  familias: Array<Familia> = [];
  bandera= false;

  producto: Producto = new Producto(0,'','','','',0,0,0);
  @ViewChild('modal')
  modal :ModalComponent; 
  constructor(private servicio: ProductosServices) { }

  ngOnInit() {
    
    this.servicio.getProducto().subscribe(data => {
      this.productos = data;
      console.log('entra a productos ', this.productos);
    });
    
  }

  guardar(model: Producto) {
    
    if(model.id === 0){

      

     this.servicio.addProducto(model).subscribe(data => {
     this.productos.push(data);
     this.bandera=true;
     if(this.bandera)(
     this.servicio.getProducto().subscribe(data => {
      this.productos = data;
      //console.log('entra a productos ', this.productos);
    })
  )
    });
    
    
  }
  else{
    console.log('dsadas ', model.familia['id']);
    if(model.familia['id'] =! '' )
      {
        console.log('model.familia ' ,model.familia['id']);
      }
    this.servicio.updateProducto(model).subscribe();
  }
  this.modal.dismiss();


  }
addProducto(){
  this.servicio.getMarcas().subscribe(data => {
    this.marcas = data;          
  }); 
  this.servicio.getFamilia().subscribe(data => {
    this.familias = data;          
  }); 
  

  this.producto = new Producto(0,'','','','',0,0,0);
  this.modal.open();
}
  onBorrar(model:Producto){
    this.productos.splice(this.productos.indexOf(model),1);
  }
  onModificar(model:Producto){
    this.servicio.getMarcas().subscribe(data => {
      this.marcas = data;          
    }); 
    this.servicio.getFamilia().subscribe(data => {
      this.familias = data;          
    }); 
  

    this.producto = model;
    this.modal.open();
  }
}


