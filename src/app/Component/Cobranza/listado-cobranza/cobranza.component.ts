import { Component, OnInit,ViewChild} from '@angular/core';
import { Cliente } from '../../../Classes/Cliente';
import { Cobranza,Cobranzaformulario } from '../../../Classes/Cobranza';
import { ProductosServices } from '../../../servicios/productos.service';
import { ClientesServices } from '../../../servicios/clientes.service';
import { CobranzaServices } from '../../../servicios/cobranza.service';
import { ActivatedRoute } from '@angular/router';
import  { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-cobranza',
  templateUrl: './cobranza.component.html',
  styleUrls: ['./cobranza.component.css']
})
export class CobranzaComponent implements OnInit { 

  //registros: Array<Inventario> = [];
  cobranzas: Array<Cobranza> = [];
  //familias: Array<Familia> = [];
  cliente : Array<Cliente>=[];
  public bandera= true;
  proveedores = new Array();
  cobranza: Cobranza = new Cobranza(0,'','','','','','');
  @ViewChild('modal')
  modal :ModalComponent; 
  
  constructor(private servicio_cob: CobranzaServices,private route: ActivatedRoute,private servicio_cli: ClientesServices) { }

  idCliente: number;
  private sub: any;
  ngOnInit() {
  console.log('entra a cobranzas');
    this.sub = this.route.params.subscribe(params => {
      this.idCliente = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      
      if(Number.isNaN(this.idCliente)){
      this.idCliente=0;
      }
      console.log('id en cliente component ',this.idCliente);
   });

   this.servicio_cob.getCobranza(this.idCliente).subscribe(data => {
    this.cobranzas = data;
    console.log("sourcesadas ", this.cobranzas);
  });
  this.servicio_cli.getClienteSeleccionado(this.idCliente).subscribe(data => {
    this.cliente = data;
    console.log("sourcesadas ", this.cliente);
  });
  
  }
  addCobranza(){    
    this.cobranza = new Cobranza(0,this.cliente['nombre']+' '+this.cliente['apellido'] ,this.cliente['empleado'],'','','','');
    this.modal.open();
  }
  guardar(model: Cobranza) {    
     this.bandera =false;
     model.cliente = this.cliente['id'];
     this.servicio_cob.addCobranza(model).subscribe(data => {
     this.cobranzas.push(data);
     this.bandera =true;

    }); 
  this.modal.dismiss();
  }

/*
  onModificar(model:Empleado){
    this.empleado = model;
    this.modal.open();
  }*/
}


