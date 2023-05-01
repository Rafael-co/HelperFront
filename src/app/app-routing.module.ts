import { LimitadorClienteGuard } from './guards/limitador-cliente.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./views/login/login.module").then(m => m.LoginModule),
    data: { titulo: 'Helpr | Login' }
  },
  {
    path: 'login',
    loadChildren: () => import("./views/login/login.module").then(m => m.LoginModule),
    data: { titulo: 'Helpr | Login' }
  },
  {
    path: 'inicio',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: { titulo: 'Helpr | Página Principal' }
  },
  {
    path: 'clientes',
    loadChildren: () => import('./views/clientes/clientes.module').then(m => m.ClientesModule),
    canActivateChild: [LimitadorClienteGuard],
    data: { titulo: 'Helpr | Clientes' }
  },
  {
    path: 'chamados',
    loadChildren: () => import('./views/chamados/chamados.module').then(m => m.ChamadosModule),
    canActivateChild: [LimitadorClienteGuard],
    data: { titulo: 'Helpr | Chamados' }
  },
  {
    path: 'funcionarios',
    loadChildren: () => import('./views/funcionarios/funcionarios.module').then(m => m.FuncionariosModule),
    canActivateChild: [LimitadorClienteGuard],
    data: { titulo: 'Helpr | Funcionários' }
  },
  {
    path: 'faq',
    loadChildren: () => import('./views/faq/faq.module').then(m => m.FaqModule),
    data: { titulo: 'Helpr | FAQ' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
