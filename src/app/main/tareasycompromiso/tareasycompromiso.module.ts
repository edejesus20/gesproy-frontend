import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasycompromisoRoutingModule } from './tareasycompromiso-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TareasycompromisoComponent } from './tareasycompromiso.component';
import { Show_tareaspendientesComponent } from './components/Pendinetes/show_tareaspendientes/show_tareaspendientes.component';
import { Show_one_tareaspendientesComponent } from './components/Pendinetes/show_one_tareaspendientes/show_one_tareaspendientes.component';
import { Create_tareaspendientesComponent } from './components/Pendinetes/create_tareaspendientes/create_tareaspendientes.component';
import { Edit_tareaspendientesComponent } from './components/Pendinetes/edit_tareaspendientes/edit_tareaspendientes.component';
import { Delete_tareaspendientesComponent } from './components/Pendinetes/delete_tareaspendientes/delete_tareaspendientes.component';
import { Show_tareasenprocesoComponent } from './components/En Procesos/show_tareasenproceso/show_tareasenproceso.component';
import { Show_one_tareasenprocesoComponent } from './components/En Procesos/show_one_tareasenproceso/show_one_tareasenproceso.component';
import { Create_tareasenprocesoComponent } from './components/En Procesos/create_tareasenproceso/create_tareasenproceso.component';
import { Edit_tareasenprocesoComponent } from './components/En Procesos/edit_tareasenproceso/edit_tareasenproceso.component';
import { Delete_tareasenprocesoComponent } from './components/En Procesos/delete_tareasenproceso/delete_tareasenproceso.component';
import { Show_tareascompletadasComponent } from './components/Completadas/show_tareascompletadas/show_tareascompletadas.component';
import { Show_one_tareascompletadasComponent } from './components/Completadas/show_one_tareascompletadas/show_one_tareascompletadas.component';
import { Create_tareascompletadasComponent } from './components/Completadas/create_tareascompletadas/create_tareascompletadas.component';
import { Edit_tareascompletadasComponent } from './components/Completadas/edit_tareascompletadas/edit_tareascompletadas.component';
import { Delete_tareascompletadasComponent } from './components/Completadas/delete_tareascompletadas/delete_tareascompletadas.component';


@NgModule({
  imports: [
    CommonModule,
    TareasycompromisoRoutingModule,
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
  ],
  declarations: [	
    TareasycompromisoComponent,
    Show_tareaspendientesComponent,
    Show_one_tareaspendientesComponent,
    Create_tareaspendientesComponent,
    Edit_tareaspendientesComponent,
    Delete_tareaspendientesComponent,
    Show_tareasenprocesoComponent,
    Show_one_tareasenprocesoComponent,
    Create_tareasenprocesoComponent,
    Edit_tareasenprocesoComponent,
    Delete_tareasenprocesoComponent,
    Show_tareascompletadasComponent,
    Show_one_tareascompletadasComponent,
    Create_tareascompletadasComponent,
    Edit_tareascompletadasComponent,
    Delete_tareascompletadasComponent
   ]
})
export class TareasycompromisoModule { }
