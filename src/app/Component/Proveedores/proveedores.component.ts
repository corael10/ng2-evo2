import { Component, OnInit,ViewChild} from '@angular/core';
import { Proveedor } from '../../Classes/Proveedor';
import { ProveedoresServices } from '../../servicios/proveedores.service';
//import { ProductosServices } from '../../servicios/productos.service';
import  { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-prov', 
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent implements OnInit {

  proveedores: Array<Proveedor> = [];
  proveedor: Proveedor = new Proveedor(0,'','','','','','');
  @ViewChild('modal')
  modal :ModalComponent; 
  constructor(private servicio: ProveedoresServices) { } 

  ngOnInit() {
    this.servicio.getProveedor().subscribe(data => {
      this.proveedores = data;
    });
  }
 
  guardar(model: Proveedor) {
    if(model.id === 0){

     this.servicio.addProveedor(model).subscribe(data => { 
     this.proveedores.push(data);
    });
  }
  else{
    this.servicio.updateProveedor(model).subscribe();
  }
  this.modal.dismiss();


  }
addProveedor(){
  this.proveedor = new Proveedor(0,'','','','','','');
  this.modal.open();
}
  onBorrar(model:Proveedor){
    this.proveedores.splice(this.proveedores.indexOf(model),1);
  }
  onModificar(model:Proveedor){
    this.proveedor = model;
    this.modal.open();
  }
}


