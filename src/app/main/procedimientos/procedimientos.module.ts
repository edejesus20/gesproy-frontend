import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedimientosComponent } from './procedimientos.component';
import { ProcedimientosRoutingModule } from './procedimientos-routing.module';
import { Show_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_grupodeInvetigacion/show_grupodeInvetigacion.component';
import { Show_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_proyectosdeinvestigacion/show_proyectosdeinvestigacion.component';
import { Show_semillerosComponent } from './components/Semilleros/show_semilleros/show_semilleros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { Create_semillerosComponent } from './components/Semilleros/create_semilleros/create_semilleros.component';
import { Create_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/create_proyectosdeinvestigacion/create_proyectosdeinvestigacion.component';
import { Create_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/create_grupodeInvetigacion/create_grupodeInvetigacion.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Show_one_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_one_grupodeInvetigacion/show_one_grupodeInvetigacion.component';
import { Edit_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/edit_grupodeInvetigacion/edit_grupodeInvetigacion.component';
import { Delete_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/delete_grupodeInvetigacion/delete_grupodeInvetigacion.component';
import { Show_one_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_one_proyectosdeinvestigacion/show_one_proyectosdeinvestigacion.component';
import { Edit_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/edit_proyectosdeinvestigacion/edit_proyectosdeinvestigacion.component';
import { Delete_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/delete_proyectosdeinvestigacion/delete_proyectosdeinvestigacion.component';
import { Show_one_semillerosComponent } from './components/Semilleros/show_one_semilleros/show_one_semilleros.component';
import { Edit_semillerosComponent } from './components/Semilleros/edit_semilleros/edit_semilleros.component';
import { Delete_semillerosComponent } from './components/Semilleros/delete_semilleros/delete_semilleros.component';
import { Show_librosComponent } from './components/libros/show_libros/show_libros.component';
import { Show_one_librosComponent } from './components/libros/show_one_libros/show_one_libros.component';
import { Create_librosComponent } from './components/libros/create_libros/create_libros.component';
import { Edit_librosComponent } from './components/libros/edit_libros/edit_libros.component';
import { Delete_librosComponent } from './components/libros/delete_libros/delete_libros.component';
import { Show_ponenciasComponent } from './components/Ponencias/show_ponencias/show_ponencias.component';
import { Show_one_ponenciasComponent } from './components/Ponencias/show_one_ponencias/show_one_ponencias.component';
import { Create_ponenciasComponent } from './components/Ponencias/create_ponencias/create_ponencias.component';
import { Edit_ponenciasComponent } from './components/Ponencias/edit_ponencias/edit_ponencias.component';
import { Delete_ponenciasComponent } from './components/Ponencias/delete_ponencias/delete_ponencias.component';
import { Show_eventosacademicosComponent } from './components/Eventos Academicos/show_eventosacademicos/show_eventosacademicos.component';
import { Show_one_eventosacademicosComponent } from './components/Eventos Academicos/show_one_eventosacademicos/show_one_eventosacademicos.component';
import { Create_eventosacademicosComponent } from './components/Eventos Academicos/create_eventosacademicos/create_eventosacademicos.component';
import { Edit_eventosacademicosComponent } from './components/Eventos Academicos/edit_eventosacademicos/edit_eventosacademicos.component';
import { Delete_eventosacademicosComponent } from './components/Eventos Academicos/delete_eventosacademicos/delete_eventosacademicos.component';
import { Show_educacioncontinuadaComponent } from './components/Educacion Continuada/show_educacioncontinuada/show_educacioncontinuada.component';
import { Show_one_educacioncontinuadaComponent } from './components/Educacion Continuada/show_one_educacioncontinuada/show_one_educacioncontinuada.component';
import { Create_educacioncontinuadaComponent } from './components/Educacion Continuada/create_educacioncontinuada/create_educacioncontinuada.component';
import { Edit_educacioncontinuadaComponent } from './components/Educacion Continuada/edit_educacioncontinuada/edit_educacioncontinuada.component';
import { Delete_educacioncontinuadaComponent } from './components/Educacion Continuada/delete_educacioncontinuada/delete_educacioncontinuada.component';
import { Show_proyectodeextensionComponent } from './components/Proyecto de Extension/show_proyectodeextension/show_proyectodeextension.component';
import { Show_one_proyectodeextensionComponent } from './components/Proyecto de Extension/show_one_proyectodeextension/show_one_proyectodeextension.component';
import { Create_proyectodeextensionComponent } from './components/Proyecto de Extension/create_proyectodeextension/create_proyectodeextension.component';
import { Edit_proyectodeextensionComponent } from './components/Proyecto de Extension/edit_proyectodeextension/edit_proyectodeextension.component';
import { Delete_proyectodeextensionComponent } from './components/Proyecto de Extension/delete_proyectodeextension/delete_proyectodeextension.component';
import { Show_consultoriasComponent } from './components/Consultorias/show_consultorias/show_consultorias.component';
import { Show_one_consultoriasComponent } from './components/Consultorias/show_one_consultorias/show_one_consultorias.component';
import { Create_consultoriasComponent } from './components/Consultorias/create_consultorias/create_consultorias.component';
import { Edit_consultoriasComponent } from './components/Consultorias/edit_consultorias/edit_consultorias.component';
import { Delete_consultoriasComponent } from './components/Consultorias/delete_consultorias/delete_consultorias.component';
import { Show_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_convenioscooperacion/show_convenioscooperacion.component';
import { Show_one_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_one_convenioscooperacion/show_one_convenioscooperacion.component';
import { Create_convenioscooperacionComponent } from './components/Convenios de Cooperacion/create_convenioscooperacion/create_convenioscooperacion.component';
import { Edit_convenioscooperacionComponent } from './components/Convenios de Cooperacion/edit_convenioscooperacion/edit_convenioscooperacion.component';
import { Delet_convenioscooperacionComponent } from './components/Convenios de Cooperacion/delet_convenioscooperacion/delet_convenioscooperacion.component';
import { Show_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_asistenciaComites/show_asistenciaComites.component';
import { Show_one_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_one_asistenciaComites/show_one_asistenciaComites.component';
import { Create_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/create_asistenciaComites/create_asistenciaComites.component';
import { Edit_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/edit_asistenciaComites/edit_asistenciaComites.component';
import { Delete_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/delete_asistenciaComites/delete_asistenciaComites.component';

@NgModule({
  declarations: [
    ProcedimientosComponent,
    Show_grupodeInvetigacionComponent,
    Show_one_grupodeInvetigacionComponent,
    Edit_grupodeInvetigacionComponent,
    Create_grupodeInvetigacionComponent,
    Delete_grupodeInvetigacionComponent,
    
    Show_proyectosdeinvestigacionComponent,
    Show_one_proyectosdeinvestigacionComponent,
    Create_proyectosdeinvestigacionComponent,
    Delete_proyectosdeinvestigacionComponent,
    Edit_proyectosdeinvestigacionComponent,

    Show_semillerosComponent,
    Show_one_semillerosComponent,
    Create_semillerosComponent,
    Edit_semillerosComponent,
    Delete_semillerosComponent,
    
    Show_librosComponent,
    Show_one_librosComponent,
    Create_librosComponent,
    Edit_librosComponent,
    Delete_librosComponent,

    Show_ponenciasComponent,
    Show_one_ponenciasComponent,
    Create_ponenciasComponent,
    Edit_ponenciasComponent,
    Delete_ponenciasComponent,

    Show_eventosacademicosComponent,
    Show_one_eventosacademicosComponent,
    Create_eventosacademicosComponent,
    Edit_eventosacademicosComponent,
    Delete_eventosacademicosComponent,

    Show_educacioncontinuadaComponent,
    Show_one_educacioncontinuadaComponent,
    Create_educacioncontinuadaComponent,
    Edit_educacioncontinuadaComponent,
    Delete_educacioncontinuadaComponent,

    Show_proyectodeextensionComponent,
    Show_one_proyectodeextensionComponent,
    Create_proyectodeextensionComponent,
    Edit_proyectodeextensionComponent,
    Delete_proyectodeextensionComponent,

    Show_consultoriasComponent,
    Show_one_consultoriasComponent,
    Create_consultoriasComponent,
    Edit_consultoriasComponent,
    Delete_consultoriasComponent,

    Show_convenioscooperacionComponent,
    Show_one_convenioscooperacionComponent,
    Create_convenioscooperacionComponent,
    Edit_convenioscooperacionComponent,
    Delet_convenioscooperacionComponent,

    Show_asistenciaComitesComponent,
    Show_one_asistenciaComitesComponent,
    Create_asistenciaComitesComponent,
    Edit_asistenciaComitesComponent,
    Delete_asistenciaComitesComponent

    
  ],
  imports: [
    CommonModule,
    ProcedimientosRoutingModule,
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
  ]

})
export class ProcedimientosModule { }
