import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../../../../Classes/Cliente';
import { ClientesServices } from '../../../../servicios/clientes.service';
//import { ProductosServices } from '../../servicios/productos.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  moduleId: module.id,
  selector: 'grafica-dinamica-cliente',
  templateUrl: './grafica_dinamica.component.html'
})
export class GraficaDinamicaClienteComponent  {
  public lineChartData:Array<any> = [
    [91, 59, 80, 81, 56, 55, 40,42,52,69,20,68],
    [28, 48, 40, 19, 86, 27, 90,20,52,65,63,32],
    [8, 8, 50, 69, 6, 77, 20,52,63,63,63,63],
    [8, 8, 50, 69, 6, 77, 20,52,63,63,63,63]
  ];
  public lineChartLabels:Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['No Abonos', 'Abonos', 'Custom'];
  public pieChartData:number[] = [300, 500, 100];
 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}