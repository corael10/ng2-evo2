import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Proveedor } from '../../../Classes/Proveedor'; 
import { ProveedoresServices } from '../../../servicios/proveedores.service'; 
import { DataTablesModule } from 'angular-datatables';

@Component({
  moduleId: module.id,
  selector: 'listado-proveedores',
  templateUrl: './listado-proveedores.html'
  
})

export class ListadoProveedores2Component{
    @Input() proveedores:Array<Proveedor>;
    @Output() borrado: EventEmitter<Proveedor>= new EventEmitter<Proveedor>();
    @Output() modificado:EventEmitter<Proveedor> = new EventEmitter<Proveedor>();

    displayProveedor(proveedor:Proveedor){
        console.log(proveedor);
    }

    constructor(private servicio:ProveedoresServices){

    }

removeProveedor(model:Proveedor){
    this.servicio.removeProveedor(model).subscribe(o => {
        this.borrado.emit(model);
    })
}
modificarProveedor(model:Proveedor){    
        this.modificado.emit(model);    
}

}