import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Producto } from '../../../../Classes/Producto';
import { Cliente, Rango } from '../../../../Classes/Cliente';
import { ProductosServices } from '../../../../servicios/productos.service';
import { ClientesServices } from '../../../../servicios/clientes.service';
import { ProveedoresServices } from '../../../../servicios/proveedores.service';

//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { Chipset } from '../../Classes/Chipset';

@Component({
  selector: 'listado-clientes-grafica',
  templateUrl: './listado-clientes-grafica.html',
  styleUrls: ['./listado-clientes-grafica.css']
})
export class ListadoCLientesGraficaComponent {
  modelRango: Rango = new Rango('','');
 
  constructor(private servicio: ProductosServices,private servicio_prov: ProveedoresServices, private servicio_cli: ClientesServices) {

    this.getall();
    
  }


  ConsultaRango(){
    this.servicio_cli.getClienteMesRango(this.modelRango).subscribe(data => {
      this.source.load(data);
      console.log("source ", this.source);
    });
  }
bandera= false;
  verRango()
  {
    
    if(!this.bandera)
    {
      this.bandera=true;
      $('#rango').show();
    }
    else
    {
      this.bandera=false;
      $('#rango').hide();
    }
    
  }
getall(){
    this.servicio_cli.getClienteMes().subscribe(data => {
        this.source.load(data);
        console.log("source ", this.source);
      });

      this.servicio_prov.getProveedor().subscribe(
        data => {
          this.source2 = new LocalDataSource(data);
          data.forEach(category => {
            // Populate the select list
            this.selectListMarca.push({ value: category.id, title: category.nombre });
          });
          // Initiate the settings object
          console.log('list ',this.selectListMarca);
          this.settings = this.loadTableSettings();
        },
        error => error
      );

    
 
}
selectListMarca = [];


loadTableSettings() {
  return {
    actions:false,
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        editable: false,
        addable: false,
      },
      cliente: {
        title: 'Nombre',
        type: 'string',
        valuePrepareFunction: (cliente) => {
          if (cliente != null) {
            return cliente.nombre +' '+ cliente.apellido;
          }          
        },
        filterFunction(cliente?: any, search?: string): boolean {
          let match = cliente.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },       
      },
      empleado: {
        title: 'Agente',
        type: 'string',
        valuePrepareFunction: (empleado) => {
          if (empleado != null) {
            return empleado.nombre +' '+ empleado.apellido;
          }          
        },     
        filterFunction(empleado?: any, search?: string): boolean {
          let match = empleado.nombre.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },  
      },
      
      abono: {
        title: 'Abono',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value === 'Abono'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)
        },
      },
      fecha: {
        title: 'Fecha de Abono',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<font color="red";font-weight:bold">${cell}</font>`;
      }
      },
      
    
        
        
      
    },

  };
}


  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
 
  settings: Object;

  onUserRowSelect(event): void {
console.log('event marca ',event.data.id);
    this.servicio.getFamilia_Select(event.data.id).subscribe(data => {
      console.log('familias ', data);
      this.source3.load(data);

    });
    $('#familias').show();
}

  onCreateConfirm(event): void {
    this.servicio.addMarca(event.newData).subscribe(data => {
        //this.productos.push(data);
    });
    this.getall();
    event.confirm.resolve();
  }

  onSaveConfirm(event): void {
    
    this.servicio.updateMarca(event.newData).subscribe();    
    //this.getall();
    event.confirm.resolve();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.servicio.removeMarca(event.data).subscribe(data => {
        }); 
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
