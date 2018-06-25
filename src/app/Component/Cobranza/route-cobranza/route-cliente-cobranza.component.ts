
import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ActivatedRoute } from '@angular/router';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { Producto, ProductoInventario } from '../../../Classes/Producto';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-examples',
  templateUrl: './route-cliente-cobranza.component.html'})
export class RouteClienteCobranzaComponent implements OnInit {
  public productos: Array<ProductoInventario> = [];
  productos_arry: Array<ProductoInventario> = [];
  // Inject pdfmake service
  constructor(private pdfmake: PdfmakeService,private router: Router, private route: ActivatedRoute, private servicio_inv: InventariosServices) { }
  list = [];
  rows = [];
  id: number;
  private sub: any;
  public value: string;
 
  reedireccionaCobranza(){
    console.log('Loan:', this.value);
    this.router.navigate(['/app/pedidos',this.value]);
  }
  reedireccionaPedido(){
    console.log('Loan:', this.value);
    this.router.navigate(['/app/pedido-nuevo',this.value]);
  }
 
 
  ngOnInit() { 
        
      
    

  }

}