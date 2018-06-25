
import { Component, OnInit,Input } from '@angular/core';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ActivatedRoute } from '@angular/router';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { PedidosServices } from '../../../servicios/pedidos.service';
import { Producto, ProductoInventario } from '../../../Classes/Producto';
import { Pedido,ProductoPedido } from '../../../Classes/Pedido';

@Component({
  selector: 'ng-pdf-pedido',
  templateUrl: './pdf-pedido.component.html',
  styleUrls: ['./pdf-pedido.component.css']
})
export class PedidoPdfComponent implements OnInit {
  public productos: Array<ProductoPedido> = [];
  productos_arry: Array<ProductoInventario> = [];
  // Inject pdfmake service
  constructor(private pdfmake: PdfmakeService, private route: ActivatedRoute,private servicio_ped: PedidosServices, private servicio_inv: InventariosServices) { }
  list = [];
  rows = [];
  id: number;
  private sub: any;
  @Input() pedidoResponse : any;
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log('dsasdadasdas0',this.pedidoResponse);
      // In a real app: dispatch action to load the details here.
   });

    this.servicio_ped.getPedidoSeleccionado(this.pedidoResponse.id).subscribe(data => {
      this.productos = data;
      console.log("productos xx ", this.productos); // mostrar versiones al levantar historial
      this.ArmaPdf();

    });
  }
  ArmaPdf() {
    
    this.pdfmake.addImage('assets/images/Final _SQA_logo.png', 300, 150);
    // Configure text styles  
    this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
    // Add a text with style
    /*this.pdfmake.addText('Registro de Inventario ', 'header');
    // Add simple text
    this.pdfmake.addText('This is an sample PDF printed with pdfMake');
    // Add large text
    this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');
*/
    // Array with colums
    const columns = [
      //'Folio: '+this.productos[0]['folio'],
      'Folio: '+this.pedidoResponse.id,
      'Fecha: '+this.pedidoResponse.Fecha
      ];

    // Add columns
    this.pdfmake.addColumns(columns);



    // Create Headers cells
    const header1 = new Cell('Codigo');
    const header2 = new Cell('Nombre');
    const header3 = new Cell('Marca');    
    const header4 = new Cell('Precio');
    const header5 = new Cell('Unidades');
    const header6 = new Cell('total');



    // Create headers row
    const headerRows = new Row([header1, header2, header3, header4, header5,header6]);

    // Create a content row
    for (let i in this.productos) { 
      

      this.rows.push(new Row([
        new Cell(this.productos[i]['producto']['codigo'].toString()),
        new Cell(this.productos[i]['producto']['nombre']),
        new Cell(this.productos[i]['producto']['marca']['nombre']),
        new Cell(this.productos[i]['precio']),
        new Cell(this.productos[i]['unidades'].toString()),
        new Cell(this.productos[i]['total'].toString()),
        ]));

    }
    console.log(this.rows);
    // Custom  column widths
    const widths = ['*', '*', '*', '*', '*','*'];

    // Create table object
    const table = new Table(headerRows, this.rows, widths);

    // Add table to document
    this.pdfmake.addTable(table);
/*
    // List to add
    const list1 = ['item 1', 'item 2', 'item 3'];
    const list2 = ['item 1', 'item 2', 'item 3'];
    const list3 = ['item 1', 'item 2', 'item 3'];
    const list4 = ['item 1', 'item 2', 'item 3'];

    // Adding unordered list
    this.pdfmake.addUnorderedlist(list1);

    // Adding ordered list
    this.pdfmake.addOrderedList(list2);

    // Adding reversed oredered list
    this.pdfmake.addOrderedList(list3, true);

    // Adding ordered list starting at 50
    this.pdfmake.addOrderedList(list4, false, 50);

    // Add image from url
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');

    // Add image from url using custom width and height.
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);

    // Add image from localhost and using width
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 200);
    */
  }

}