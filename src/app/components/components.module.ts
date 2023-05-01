import { RouterModule } from '@angular/router';
import { MaterialModule } from './../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DetalhesChamadosComponent } from './detalhes/detalhes-chamados/detalhes-chamados.component';
import { DetalhesClientesComponent } from './detalhes/detalhes-clientes/detalhes-clientes.component';

@NgModule({
  declarations: [
    NavBarComponent,
    DetalhesChamadosComponent,
    DetalhesClientesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class ComponentsModule { }
