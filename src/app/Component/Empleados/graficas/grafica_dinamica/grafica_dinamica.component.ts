import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../../../../Classes/Cliente';
import { ClientesServices } from '../../../../servicios/clientes.service';
//import { ProductosServices } from '../../servicios/productos.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  moduleId: module.id,
  selector: 'grafica-dinamica-empleados',
  templateUrl: './grafica_dinamica.component.html'
})
export class GraficaDinamicaEmpleadoComponent  {
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
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