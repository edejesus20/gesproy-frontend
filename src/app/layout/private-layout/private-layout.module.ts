import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { PrivateLayoutComponent } from './private-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/main/dashboard/dashboard-routing.module';
import { ProcedimientosRoutingModule } from 'src/app/main/procedimientos/procedimientos-routing.module';
import { UsuariosRoutingModule } from 'src/app/main/usuarios/usuarios-routing.module';
import { VisualizarConvocatoriasRoutingModule } from 'src/app/main/visualizarConvocatorias/visualzarConvocatorias-routing.module';
import { InstitutionRoutingModule } from 'src/app/main/institution/institution-routing.module';
import { IndicadoresRoutingModule } from 'src/app/main/Indicadores/Indicadores-routing.module';
import { TareasycompromisoRoutingModule } from 'src/app/main/tareasycompromiso/tareasycompromiso-routing.module';

@NgModule({
  declarations: [
    PrivateLayoutComponent, 
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HttpClientModule,
    FormsModule,
   
    DashboardRoutingModule,
    PrivateLayoutRoutingModule,
    ProcedimientosRoutingModule,
    UsuariosRoutingModule,
    InstitutionRoutingModule,
    VisualizarConvocatoriasRoutingModule,
    TareasycompromisoRoutingModule,
    IndicadoresRoutingModule
  ]
})
export class PrivateLayoutModule { }
