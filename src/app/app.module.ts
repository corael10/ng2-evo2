import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { AboutComponent } from './Component/about/about.component';
import { DefaultComponent } from './Component/default/default.component';

//******PRODUCTOS COMPONENTS********
import { ProductosComponent } from './Component/Productos/productos.component';
import { FormularioProductoComponent } from './Component/Productos/formulario-producto.component';
import { ListadoProductosComponent } from './Component/Productos/listado-productos/listado-productos.component';
import { GraficasProductosComponent } from './Component/Productos/graficas/graficas_productos.component';
import { GraficaDinamicaProductosComponent } from './Component/Productos/graficas/grafica_dinamica/grafica_dinamica.component';
import { ProductoPromoComponent } from './Component/Productos/producto-promo/producto-promo.component';
import { MarcasComponent } from './Component/Productos/marcas/marcas.component';
import { ListadoMarcasComponent } from './Component/Productos/marcas/listado-marcas/listado-marcas.component';
import { ListadoFamiliasComponent } from './Component/Productos/marcas/listado-familias/listado-familias.component';


//******INVENTARIOS COMPONENTS********
import { ListProdInventarioComponent } from './Component/Inventario/listado-prod-inventario/listado-prod-inventario.component';
import { InventarioNuevoComponent } from './Component/Inventario/inventario-nuevo/inventario-nuevo.component';
import { ListadoInventarioComponent } from './Component/Inventario/listado-prod-inventario/listado-inventario.component';
import { InventariosComponent } from './Component/Inventario/listado-inventarios/inventarios.component';
import { ListadoInventariosComponent } from './Component/Inventario/listado-inventarios/listado-inventarios.component';
import { DetalleInventariosComponent} from './Component/Inventario/detalle-inventarios/detalle-inventarios.component'; 
import { ListadoDetalleInventariosComponent} from './Component/Inventario/detalle-inventarios/listado-detalle-inventarios.component';
import { RouteInventarioComponent} from './Component/Inventario/route-inventario/route-inventario.component'; 




//*******Pedidos****** */
import {PedidoNuevoComponent} from './Component/Pedidos/pedido-nuevo/pedido-nuevo.component';
//import {RoutePedidoComponent} from './Component/Pedidos/route-pedido/route-pedido.component';
import {RoutePedidoComponent} from './Component/Pedidos/route-pedido/route-pedido.component';
//import {RouteClientePedidoComponent} from './Component/Pedidos/route-pedido/route-cliente-pedidos.component';
import {DetallePedidoComponent } from './Component/Pedidos/detalle-pedido/detalle-pedido.component';
import {ListadoDetallePedidoComponent } from './Component/Pedidos/detalle-pedido/listado-detalle-pedido.component';
import {ListadoPedidosComponent } from './Component/Pedidos/listado-pedidos/listado-pedidos.component';
import {PedidosComponent } from './Component/Pedidos/listado-pedidos/pedidos.component';
import {PdfPedidoComponent} from './Component/Pedidos/pdf/pdf.component';


//******USERS COMPONENTS********
import { UserComponent } from './Component/user/user.component';
import { ListadoUsersComponent} from './Component/user/listado-users/listado-users.component';
import { FormularioUserComponent } from './Component/user/formulario-user.component';

//******clientes COMPONENTS********
import { ClienteComponent } from './Component/Clientes/cliente.component';
import { ListadoClientesComponent} from './Component/Clientes/listado-clientes/listado-clientes.component';
import { FormularioClienteComponent } from './Component/Clientes/formulario-cliente.component';
import { GraficaDinamicaClienteComponent} from './Component/Clientes/graficas/grafica_dinamica/grafica_dinamica.component';
import { ListadoCLientesGraficaComponent} from './Component/Clientes/graficas/lista-clientes-grafica/listado-clientes-grafica.component';  
import { GraficasClientesComponent} from './Component/Clientes/graficas/graficas_clientes.component'; 
import { ListaClienteComponent } from './Component/Clientes/lista-cliente/listado-cliente.component';
import { RouteClienteComponent } from './Component/Clientes/route-cliente/route-cliente.component';

//******PROVEEDORES COMPONENTS********
import { ProveedoresComponent } from './Component/Proveedores/proveedores.component';
import { ListadoProveedoresComponent} from './Component/Proveedores/listado-proveedores/listado-proveedores.component';
import { FormularioProveedorComponent } from './Component/Proveedores/formulario-proveedor.component';
import { GraficasProveedoresComponent} from './Component/Proveedores/graficas/graficas_proveedores.component'
import { GraficaDinamicaProveedorComponent} from './Component/Proveedores/graficas/grafica_dinamica/grafica_dinamica.component'
import { RouteProveedorComponent} from './Component/Proveedores/route-proveedor/route-proveedor.component';
import { DetalleProveedorComponent} from './Component/Proveedores/detalle-proveedor/detalle-proveedor.component';
import { ListadoDetalleProveedorComponent} from './Component/Proveedores/detalle-proveedor/listado-detalle-proveedor.component';

//******EMPLEADOS COMPONENTS********
import { EmpleadoComponent } from './Component/Empleados/empleado.component';
import { ListadoEmpleadoComponent} from './Component/Empleados/lista-empleados/listado-empleado.component';
//import { ListadoEmpleadosComponent} from './Component/Empleados/listado-empleados/listado-empleados.component';
import { ListadoEmpleadosPreviewComponent } from './Component/Empleados/listado-empleados/listado-empleados-preview.component';
import { FormularioEmpleadoComponent } from './Component/Empleados/formulario-empleado.component';
import { GraficasEmpleadosComponent } from './Component/Empleados/graficas/graficas_empleados.component';
import { GraficaDinamicaEmpleadoComponent } from './Component/Empleados/graficas/grafica_dinamica/grafica_dinamica.component';


import { CobranzaNuevaComponent } from './Component/Cobranza/cobranza-nueva/cobranza-nueva.component';
import { CobranzaComponent } from './Component/Cobranza/listado-cobranza/cobranza.component';
import { ListadoCobranzaComponent } from './Component/Cobranza/listado-cobranza/listado-cobranza.component';
import { FormularioCobranzaComponent } from './Component/Cobranza/formulario-cobranza/formulario-cobranza.component';

//********PROJECTS COMPONENTS******** */
import { ProjectComponent } from './Component/Projects/project.component';
import { ListadoProjectsComponent} from './Component/Projects/listado-projects/listado-projects.component';
import { FormularioProjectComponent } from './Component/Projects/formulario-project.component';


import { MensajesComponent } from './Component/mensajeria/mensajes.component';

import { PdfComponent} from './Component/Inventario/pdf/pdf.component'; 
 
 

//*******Servicios */
import { AuthServices } from './servicios/Auth.Service'; 
import { UsersServices } from './servicios/users.service'; 
//import { ApplicationsServices } from './servicios/applications.service';
import { EmpleadosServices } from './servicios/empleados.service';
import { ProveedoresServices } from './servicios/proveedores.service'; 
import { PedidosServices } from './servicios/pedidos.service';
import { ProductosServices } from './servicios/productos.service';
import { ConfigServices } from '../config.service'; 
import { ProjectsServices } from './servicios/projects.service'; 
import { ClientesServices } from './servicios/clientes.service'; 
import { InventariosServices } from './servicios/inventarios.service'; 
import { CobranzaServices } from './servicios/cobranza.service'; 
import { MensajesServices } from './servicios/mensajes.service'; 

//import { ListaProductoApiService } from './servicios/listaProductoApi-service/listaProductoApi.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AlertComponent } from './Component/alert/alert.component';
import { PopupModule } from 'ng2-opd-popup';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './Component/login/login.component';
import { CambioPasswordComponent} from './Component/user/cambio-password/cambio-password.component';
import { HeaderComponent } from './Component/header/header.component.';
import { PdfmakeModule } from 'ng-pdf-make';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';
import { RouteConfigLoadStart } from '@angular/router/src/events';






@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    DataTablesModule, 
    routes,
  Ng2Bs3ModalModule,
  ChartsModule,
  PdfmakeModule,
  Ng2SmartTableModule,
  PopupModule.forRoot()
], 

  declarations: [ 
    AppComponent,
    AboutComponent,     
    UserComponent,
    ListadoUsersComponent,
    FormularioUserComponent,
    ProveedoresComponent,
    ListadoProveedoresComponent,
    GraficasProveedoresComponent,
    GraficaDinamicaProveedorComponent,
    FormularioProveedorComponent,
    RouteProveedorComponent,
    DetalleProveedorComponent,
    ListadoDetalleProveedorComponent,
    EmpleadoComponent,
    GraficasEmpleadosComponent,
    GraficaDinamicaEmpleadoComponent,
    ListadoEmpleadoComponent,
    ListadoEmpleadosPreviewComponent,
    FormularioEmpleadoComponent,
    ProductosComponent,  
    FormularioProductoComponent,
    ListadoProductosComponent,
    GraficasProductosComponent,
    GraficaDinamicaProductosComponent,
    ProductoPromoComponent,
    MarcasComponent,
    ListadoMarcasComponent,
    ListadoFamiliasComponent,
    ListProdInventarioComponent,
    InventarioNuevoComponent,
    ListadoInventarioComponent,
    InventariosComponent,
    ListadoInventariosComponent,
    AlertComponent,
    DefaultComponent,
    LoginComponent,
    CambioPasswordComponent,
    HeaderComponent,
    ProjectComponent,
    ListadoProjectsComponent,
    FormularioProjectComponent,
    ClienteComponent,
    ListadoClientesComponent,
    FormularioClienteComponent,
    GraficaDinamicaClienteComponent,
    ListadoCLientesGraficaComponent,
    ListaClienteComponent,
    GraficasClientesComponent,
    RouteClienteComponent,
    PdfComponent,
    RouteInventarioComponent,
    DetalleInventariosComponent,
    ListadoDetalleInventariosComponent, 
    PedidoNuevoComponent,
    RoutePedidoComponent,
    DetallePedidoComponent,
    ListadoDetallePedidoComponent,
    PedidosComponent,
    ListadoPedidosComponent,
    //RouteClientePedidoComponent,
    PdfPedidoComponent,
    CobranzaNuevaComponent,
    CobranzaComponent,
    ListadoCobranzaComponent,
    FormularioCobranzaComponent,
    MensajesComponent
 
   ],

  providers: [
    AuthServices,
    AuthGuard,
    UsersServices,
    ProductosServices,
    ClientesServices,
    EmpleadosServices,
    ProveedoresServices, 
    PedidosServices,
    ConfigServices,
    ProjectsServices,
    InventariosServices,
    CobranzaServices,
    MensajesServices],

  bootstrap: [
    DefaultComponent]
})
export class AppModule { }
