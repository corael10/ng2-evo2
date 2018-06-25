import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Inventario } from '../../../Classes/Inventario';
//import { ListaProductoApiService } from '../../../servicios/listaProductoApi-service/listaProductoApi.service'; 
import { ProductosServices } from '../../../servicios/productos.service';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ActivatedRoute } from '@angular/router';
import { InventariosServices } from '../../../servicios/inventarios.service';
import { Producto, ProductoInventario } from '../../../Classes/Producto';


@Component({
    moduleId: module.id,
    selector: 'listado-inventarios',
    templateUrl: './listado-inventarios.html'

})

export class ListadoInventariosComponent {
    @Input() registros: Array<Inventario>;
    @Output() borrado: EventEmitter<Inventario> = new EventEmitter<Inventario>();
    @Output() modificado: EventEmitter<Inventario> = new EventEmitter<Inventario>();

    displayProducto(producto: Inventario) {
        console.log(producto);
    }
    public productos: Array<ProductoInventario> = [];

    constructor(private servicio: ProductosServices, private pdfmake: PdfmakeService, private route: ActivatedRoute, private servicio_inv: InventariosServices) {

    }
    list = [];
    rows = [];
    nombre_archivo:string;
    // id: number;
    private sub: any;
    ngOnInit() {
        /*
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          // In a real app: dispatch action to load the details here.
       });
    */

    }
    EjecutaPDF(id, accion) {
        console.log('llega el id ', id);
        this.servicio_inv.getInventarioSeleccionado(id).subscribe(data => {
            this.productos = data;
            console.log("productos xx ", this.productos); // mostrar versiones al levantar historial
            
            if (accion == 1) {
                this.ArmaPdf();
                this.pdfmake.open()
            }
            if (accion == 2) {
                this.ArmaPdf();
                this.pdfmake.print()
            }
            if (accion == 3) {
                this.ArmaPdf();
                this.nombre_archivo='Reporte'+this.productos[0]['folio'];
                this.downloadPdfWithName(this.nombre_archivo);
            }

        });

    }
    downloadPdfWithName(customName: string){
        this.pdfmake.download(customName);
    }
    ArmaPdf() {

        this.pdfmake.addImage('assets/images/Final _SQA_logo.png', 300, 150);
        // Configure text styles  
        this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
        // Add a text with style
        this.pdfmake.addText('Registro con Folio: '+ this.productos[0]['folio'], 'header');
        // Add simple text
        this.pdfmake.addText('Proveedor: Evoluxion');
        // Add large text
        this.pdfmake.addText('Fecha: 1 de Febrero de 2017');

        // Array with colums
        const columns = [
            'Folio: ' + this.productos[0]['folio'],
            'Proveedor: Evoluxion',
            'Fecha: 1 de Febrero de 2017'
        ];

        
        // Add columns
        //this.pdfmake.addColumns(columns);



        // Create Headers cells
        const header1 = new Cell('ID');
        const header2 = new Cell('Nombre');
        const header3 = new Cell('Familia');
        const header4 = new Cell('Precio Proveedor');
        const header5 = new Cell('Unidades');



        // Create headers row
        const headerRows = new Row([header1, header2, header3, header4, header5]);

        // Create a content row
        for (let i in this.productos) {


            this.rows.push(new Row([
                new Cell(this.productos[i]['id'].toString()),
                new Cell(this.productos[i]['producto']['nombre']),
                new Cell(this.productos[i]['producto']['familia']['nombre']),
                new Cell(this.productos[i]['precio_proveedor']),
                new Cell(this.productos[i]['unidades'].toString()),
            ]));

        }
       
        // Custom  column widths
        const widths = ['*', '*', '*', '*', '*'];

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


    removeProducto(model: Inventario) {
        /* this.servicio.removeProducto(model).subscribe(o => {
             this.borrado.emit(model);
         })*/
    }
    modificarProducto(model: Inventario) {
        console.log('producto a actualizar ', model)
        this.modificado.emit(model);
    }

}