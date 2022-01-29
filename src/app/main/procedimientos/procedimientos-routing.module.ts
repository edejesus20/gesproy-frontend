import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/create_asistenciaComites/create_asistenciaComites.component';
import { Delete_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/delete_asistenciaComites/delete_asistenciaComites.component';
import { Edit_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/edit_asistenciaComites/edit_asistenciaComites.component';
import { Show_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_asistenciaComites/show_asistenciaComites.component';
import { Show_one_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_one_asistenciaComites/show_one_asistenciaComites.component';
import { Create_consultoriasComponent } from './components/Consultorias/create_consultorias/create_consultorias.component';
import { Delete_consultoriasComponent } from './components/Consultorias/delete_consultorias/delete_consultorias.component';
import { Edit_consultoriasComponent } from './components/Consultorias/edit_consultorias/edit_consultorias.component';
import { Show_consultoriasComponent } from './components/Consultorias/show_consultorias/show_consultorias.component';
import { Show_one_consultoriasComponent } from './components/Consultorias/show_one_consultorias/show_one_consultorias.component';
import { Create_convenioscooperacionComponent } from './components/Convenios de Cooperacion/create_convenioscooperacion/create_convenioscooperacion.component';
import { Delet_convenioscooperacionComponent } from './components/Convenios de Cooperacion/delet_convenioscooperacion/delet_convenioscooperacion.component';
import { Edit_convenioscooperacionComponent } from './components/Convenios de Cooperacion/edit_convenioscooperacion/edit_convenioscooperacion.component';
import { Show_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_convenioscooperacion/show_convenioscooperacion.component';
import { Show_one_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_one_convenioscooperacion/show_one_convenioscooperacion.component';
import { Create_educacioncontinuadaComponent } from './components/Educacion Continuada/create_educacioncontinuada/create_educacioncontinuada.component';
import { Delete_educacioncontinuadaComponent } from './components/Educacion Continuada/delete_educacioncontinuada/delete_educacioncontinuada.component';
import { Edit_educacioncontinuadaComponent } from './components/Educacion Continuada/edit_educacioncontinuada/edit_educacioncontinuada.component';
import { Show_educacioncontinuadaComponent } from './components/Educacion Continuada/show_educacioncontinuada/show_educacioncontinuada.component';
import { Show_one_educacioncontinuadaComponent } from './components/Educacion Continuada/show_one_educacioncontinuada/show_one_educacioncontinuada.component';
import { Create_eventosacademicosComponent } from './components/Eventos Academicos/create_eventosacademicos/create_eventosacademicos.component';
import { Delete_eventosacademicosComponent } from './components/Eventos Academicos/delete_eventosacademicos/delete_eventosacademicos.component';
import { Edit_eventosacademicosComponent } from './components/Eventos Academicos/edit_eventosacademicos/edit_eventosacademicos.component';
import { Show_eventosacademicosComponent } from './components/Eventos Academicos/show_eventosacademicos/show_eventosacademicos.component';
import { Show_one_eventosacademicosComponent } from './components/Eventos Academicos/show_one_eventosacademicos/show_one_eventosacademicos.component';
import { Create_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/create_grupodeInvetigacion/create_grupodeInvetigacion.component';
import { Delete_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/delete_grupodeInvetigacion/delete_grupodeInvetigacion.component';
import { Edit_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/edit_grupodeInvetigacion/edit_grupodeInvetigacion.component';
import { Show_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_grupodeInvetigacion/show_grupodeInvetigacion.component';
import { Show_one_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_one_grupodeInvetigacion/show_one_grupodeInvetigacion.component';
import { Create_librosComponent } from './components/libros/create_libros/create_libros.component';
import { Delete_librosComponent } from './components/libros/delete_libros/delete_libros.component';
import { Edit_librosComponent } from './components/libros/edit_libros/edit_libros.component';
import { Show_librosComponent } from './components/libros/show_libros/show_libros.component';
import { Show_one_librosComponent } from './components/libros/show_one_libros/show_one_libros.component';
import { Create_ponenciasComponent } from './components/Ponencias/create_ponencias/create_ponencias.component';
import { Delete_ponenciasComponent } from './components/Ponencias/delete_ponencias/delete_ponencias.component';
import { Edit_ponenciasComponent } from './components/Ponencias/edit_ponencias/edit_ponencias.component';
import { Show_one_ponenciasComponent } from './components/Ponencias/show_one_ponencias/show_one_ponencias.component';
import { Show_ponenciasComponent } from './components/Ponencias/show_ponencias/show_ponencias.component';
import { Create_proyectodeextensionComponent } from './components/Proyecto de Extension/create_proyectodeextension/create_proyectodeextension.component';
import { Delete_proyectodeextensionComponent } from './components/Proyecto de Extension/delete_proyectodeextension/delete_proyectodeextension.component';
import { Edit_proyectodeextensionComponent } from './components/Proyecto de Extension/edit_proyectodeextension/edit_proyectodeextension.component';
import { Show_one_proyectodeextensionComponent } from './components/Proyecto de Extension/show_one_proyectodeextension/show_one_proyectodeextension.component';
import { Show_proyectodeextensionComponent } from './components/Proyecto de Extension/show_proyectodeextension/show_proyectodeextension.component';
import { Create_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/create_proyectosdeinvestigacion/create_proyectosdeinvestigacion.component';
import { Delete_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/delete_proyectosdeinvestigacion/delete_proyectosdeinvestigacion.component';
import { Edit_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/edit_proyectosdeinvestigacion/edit_proyectosdeinvestigacion.component';
import { Show_one_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_one_proyectosdeinvestigacion/show_one_proyectosdeinvestigacion.component';
import { Show_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_proyectosdeinvestigacion/show_proyectosdeinvestigacion.component';
import { Create_semillerosComponent } from './components/Semilleros/create_semilleros/create_semilleros.component';
import { Delete_semillerosComponent } from './components/Semilleros/delete_semilleros/delete_semilleros.component';
import { Edit_semillerosComponent } from './components/Semilleros/edit_semilleros/edit_semilleros.component';
import { Show_one_semillerosComponent } from './components/Semilleros/show_one_semilleros/show_one_semilleros.component';
import { Show_semillerosComponent } from './components/Semilleros/show_semilleros/show_semilleros.component';
import { ProcedimientosComponent } from './procedimientos.component';

const routes: Routes = [
  {
    path: '',
    component: ProcedimientosComponent,
    children:[
          {
            path: 'mostrar_groups',
            component: Show_grupodeInvetigacionComponent,
          },
          {
            path: 'mostrar_group/:id',
            component: Show_one_grupodeInvetigacionComponent,
          },
          {
            path: 'create_group',
            component: Create_grupodeInvetigacionComponent,
          },
          {
            path: 'edit_group/:id',
            component: Edit_grupodeInvetigacionComponent,
          },
          {
            path: 'delete_group/:id',
            component: Delete_grupodeInvetigacionComponent,
          },
           //proyectos de investigacion
          {
            path: 'mostrar_projets',
            component: Show_proyectosdeinvestigacionComponent,
          },
          {
            path: 'mostrar_projet/:id',
            component: Show_one_proyectosdeinvestigacionComponent,
          },
          {
            path: 'create_projet',
            component: Create_proyectosdeinvestigacionComponent,
          },
          {
            path: 'edit_projet/:id',
            component: Edit_proyectosdeinvestigacionComponent,
          },
          {
            path: 'delete_projet/:id',
            component: Delete_proyectosdeinvestigacionComponent,
          },

        //semilleros
          {
            path: 'mostrar_seedbeds',
            component: Show_semillerosComponent,
          },
          {
            path: 'mostrar_seedbed/:id',
            component: Show_one_semillerosComponent,
          },
          {
            path: 'create_seedbed',
            component: Create_semillerosComponent,
          },
          {
            path: 'edit_seedbed/:id',
            component: Edit_semillerosComponent,
          },
          {
            path: 'delete_seedbed/:id',
            component: Delete_semillerosComponent,
          },
          //libros
          {
            path: 'mostrar_books',
            component: Show_librosComponent,
          },
          {
            path: 'mostrar_book/:id',
            component: Show_one_librosComponent,
          },
          {
            path: 'create_book',
            component: Create_librosComponent,
          },
          {
            path: 'edit_book/:id',
            component: Edit_librosComponent,
          },
          {
            path: 'delete_book/:id',
            component: Delete_librosComponent,
          },
          //ponencias
          {
            path: 'mostrar_presentations',
            component: Show_ponenciasComponent,
          },
          {
            path: 'mostrar_presentation/:id',
            component: Show_one_ponenciasComponent,
          },
          {
            path: 'crearte_presentation',
            component: Create_ponenciasComponent,
          },
          {
            path: 'edit_presentation/:id',
            component: Edit_ponenciasComponent,
          },
          {
            path: 'delete_presentation/:id',
            component: Delete_ponenciasComponent,
          },
          //eventos academicos
          {
            path: 'mostrar_academics',
            component: Show_eventosacademicosComponent,
          },
          {
            path: 'mostrar_academic/:id',
            component: Show_one_eventosacademicosComponent,
          },
          {
            path: 'create_academic',
            component: Create_eventosacademicosComponent,
          },
          {
            path: 'edit_academic/:id',
            component: Edit_eventosacademicosComponent,
          },
          {
            path: 'delete_academic/:id',
            component: Delete_eventosacademicosComponent,
          },

           //educacion continuada
           {
            path: 'mostrar_educations',
            component: Show_educacioncontinuadaComponent,
          },
          {
            path: 'mostrar_education/:id',
            component: Show_one_educacioncontinuadaComponent,
          },
          {
            path: 'create_education',
            component: Create_educacioncontinuadaComponent,
          },
          {
            path: 'edit_education/:id',
            component: Edit_educacioncontinuadaComponent,
          },
          {
            path: 'delete_education/:id',
            component: Delete_educacioncontinuadaComponent,
          },

          //proyecto de extension
          {
            path: 'mostrar_extensions',
            component: Show_proyectodeextensionComponent,
          },
          {
            path: 'mostrar_extension/:id',
            component: Show_one_proyectodeextensionComponent,
          },
          {
            path: 'create_extension',
            component: Create_proyectodeextensionComponent,
          },
          {
            path: 'edit_extension/:id',
            component: Edit_proyectodeextensionComponent,
          },
          {
            path: 'delete_extension/:id',
            component: Delete_proyectodeextensionComponent,
          },

           //consultorias
           {
            path: 'mostrar_consultings',
            component: Show_consultoriasComponent,
          },
          {
            path: 'mostrar_consulting/:id',
            component: Show_one_consultoriasComponent,
          },
          {
            path: 'create_consulting',
            component: Create_consultoriasComponent,
          },
          {
            path: 'edit_consulting/:id',
            component: Edit_consultoriasComponent,
          },
          {
            path: 'delete_consulting/:id',
            component: Delete_consultoriasComponent,
          },

          //convenios
          {
            path: 'mostrar_convenios',
            component: Show_convenioscooperacionComponent,
          },
          {
            path: 'mostrar_convenio/:id',
            component: Show_one_convenioscooperacionComponent,
          },
          {
            path: 'create_convenio',
            component: Create_convenioscooperacionComponent,
          },
          {
            path: 'edit_convenio/:id',
            component: Edit_convenioscooperacionComponent,
          },
          {
            path: 'delete_convenio/:id',
            component: Delet_convenioscooperacionComponent,
          },

           //asistencia comites
           {
            path: 'mostrar_committees',
            component: Show_asistenciaComitesComponent,
          },
          {
            path: 'mostrar_committees/:id',
            component: Show_one_asistenciaComitesComponent,
          },
          {
            path: 'create_committees',
            component: Create_asistenciaComitesComponent,
          },
          {
            path: 'edit_committees/:id',
            component: Edit_asistenciaComitesComponent,
          },
          {
            path: 'delete_committees/:id',
            component: Delete_asistenciaComitesComponent,
          },
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: []
})
export class ProcedimientosRoutingModule { }
