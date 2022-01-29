import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../modules/shared/shared.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { PrivateLayoutComponent } from './private-layout.component';
import { UsuariosRoutingModule } from 'src/app/main/usuarios/usuarios-routing.module';
import { InstitutionRoutingModule } from 'src/app/main/institution/institution-routing.module';
import { DashboardRoutingModule } from 'src/app/main/dashboard/dashboard-routing.module';
import { InstitutionModule } from 'src/app/main/institution/institution.module';
import { ProcedimientosRoutingModule } from 'src/app/main/procedimientos/procedimientos-routing.module';
import { ProcedimientosModule } from 'src/app/main/procedimientos/procedimientos.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { VisualizarConvocatoriasRoutingModule } from 'src/app/main/visualizarConvocatorias/visualzarConvocatorias-routing.module';
import { TareasycompromisoRoutingModule } from 'src/app/main/tareasycompromiso/tareasycompromiso-routing.module';
import { IndicadoresRoutingModule } from 'src/app/main/Indicadores/Indicadores-routing.module';


@NgModule({
  declarations: [
    PrivateLayoutComponent, 
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,

    MatSnackBarModule,
    MatSlideToggleModule,
    ScrollingModule,

    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatRadioModule,
    MatChipsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSortModule,

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
