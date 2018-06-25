import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './Component/about/about.component';
import { DefaultComponent } from './Component/default/default.component';
import { UserComponent } from './Component/user/user.component';
//import { ApplicationComponent } from './Component/application/application.component';
import { LoginComponent } from './Component/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { ProjectComponent } from './Component/Projects/project.component';
import { ClienteComponent } from './Component/Clientes/cliente.component';
import { GraficasClientesComponent } from './Component/Clientes/graficas/graficas_clientes.component';
import { EmpleadoComponent } from './Component/Empleados/empleado.component';
import { GraficasEmpleadosComponent } from './Component/Empleados/graficas/graficas_empleados.component';
import { ProductosComponent } from './Component/Productos/productos.component';
import { MarcasComponent } from './Component/Productos/marcas/marcas.component';
import { GraficasProductosComponent } from './Component/Productos/graficas/graficas_productos.component';
import { InventarioNuevoComponent } from './Component/Inventario/inventario-nuevo/inventario-nuevo.component';
import { ListProdInventarioComponent } from './Component/Inventario/listado-prod-inventario/listado-prod-inventario.component';
import { InventariosComponent } from './Component/Inventario/listado-inventarios/inventarios.component';
import { PdfComponent } from './Component/Inventario/pdf/pdf.component';
import { RouteInventarioComponent } from './Component/Inventario/route-inventario/route-inventario.component';
import { DetalleInventariosComponent } from './Component/Inventario/detalle-inventarios/detalle-inventarios.component';
import { ProveedoresComponent } from './Component/Proveedores/proveedores.component';
import { DetalleProveedorComponent } from './Component/Proveedores/detalle-proveedor/detalle-proveedor.component';
import { GraficasProveedoresComponent} from './Component/Proveedores/graficas/graficas_proveedores.component'
import { RouteProveedorComponent } from './Component/Proveedores/route-proveedor/route-proveedor.component';
import { PedidoNuevoComponent} from './Component/Pedidos/pedido-nuevo/pedido-nuevo.component';
//import { RoutePedidoComponent} from './Component/Pedidos/route-pedido/route-pedido.component';
import { DetallePedidoComponent} from './Component/Pedidos/detalle-pedido/detalle-pedido.component';
import { RoutePedidoComponent} from './Component/Pedidos/route-pedido/route-pedido.component';
import { PedidosComponent } from './Component/Pedidos/listado-pedidos/pedidos.component';
import { ProductoPromoComponent } from './Component/Productos/producto-promo/producto-promo.component';
import {CobranzaNuevaComponent} from './Component/Cobranza/cobranza-nueva/cobranza-nueva.component';
import {CobranzaComponent} from './Component/Cobranza/listado-cobranza/cobranza.component';
import { RouteClienteComponent } from './Component/Clientes/route-cliente/route-cliente.component';
//import { PedidoPdfComponent } from './Component/pedidos/pdf-pedido/pdf-pedido.component'

export const router: Routes = [
 
  {
    path: 'app', 
    component: AppComponent,   
    children: [
      { path: 'about', component: AboutComponent,canActivate: [AuthGuard] },
      { path: 'clientes', component: ClienteComponent, },
      { path: 'inventarios', component: InventariosComponent, },
      { path: 'detalle-inventarios', component: DetalleInventariosComponent, },
      { path: 'inventario-nuevo', component: InventarioNuevoComponent, },
      { path: 'lista-prod-inventario', component: ListProdInventarioComponent, },
      { path: 'pdf', component: PdfComponent, },
      { path: 'route-inventario', component: RouteInventarioComponent, },
      { path: 'clientes', component: ClienteComponent, },
      { path: 'grafica-clientes', component: GraficasClientesComponent, },
      { path: 'productos', component: ProductosComponent, },
      { path: 'productos-promo', component: ProductoPromoComponent, },
      { path: 'grafica-productos', component: GraficasProductosComponent, },
      { path: 'empleados', component: EmpleadoComponent, canActivate: [AuthGuard] },
      { path: 'grafica-empleados', component: GraficasEmpleadosComponent, canActivate: [AuthGuard] },
      { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
      { path: 'grafica-proveedores', component: GraficasProveedoresComponent, },
      { path: 'detalle-proveedor', component: DetalleProveedorComponent, },
      { path: 'route-proveedor', component: RouteProveedorComponent, },
      { path: 'marcas', component: MarcasComponent, },
      { path: 'route-pedido', component: RoutePedidoComponent, },
      { path: 'pedido-nuevo', component: PedidoNuevoComponent, },
      { path: 'detalle-pedido', component: DetallePedidoComponent, },
      { path: 'pedidos', component: PedidosComponent, },
      //{ path: 'pdf-pedidos', component: PedidoPdfComponent, },
      { path: 'route-cliente', component: RouteClienteComponent, },
      { path: 'cobranza', component: CobranzaComponent, },
      { path: 'cobranza-nueva', component: CobranzaNuevaComponent, },
      

      { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserComponent },
      //{ path: 'apps', component: ApplicationComponent },

    ],
  },
  { path: 'about', component: AboutComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'default', component: DefaultComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


