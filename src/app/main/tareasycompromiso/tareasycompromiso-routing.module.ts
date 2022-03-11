import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create_tareascompletadasComponent } from './components/Completadas/create_tareascompletadas/create_tareascompletadas.component';
import { Delete_tareascompletadasComponent } from './components/Completadas/delete_tareascompletadas/delete_tareascompletadas.component';
import { Edit_tareascompletadasComponent } from './components/Completadas/edit_tareascompletadas/edit_tareascompletadas.component';
import { Show_one_tareascompletadasComponent } from './components/Completadas/show_one_tareascompletadas/show_one_tareascompletadas.component';
import { Show_tareascompletadasComponent } from './components/Completadas/show_tareascompletadas/show_tareascompletadas.component';
import { Create_tareasenprocesoComponent } from './components/En Procesos/create_tareasenproceso/create_tareasenproceso.component';
import { Delete_tareasenprocesoComponent } from './components/En Procesos/delete_tareasenproceso/delete_tareasenproceso.component';
import { Edit_tareasenprocesoComponent } from './components/En Procesos/edit_tareasenproceso/edit_tareasenproceso.component';
import { Show_one_tareasenprocesoComponent } from './components/En Procesos/show_one_tareasenproceso/show_one_tareasenproceso.component';
import { Show_tareasenprocesoComponent } from './components/En Procesos/show_tareasenproceso/show_tareasenproceso.component';
import { Create_tareaspendientesComponent } from './components/Pendinetes/create_tareaspendientes/create_tareaspendientes.component';
import { Delete_tareaspendientesComponent } from './components/Pendinetes/delete_tareaspendientes/delete_tareaspendientes.component';
import { Edit_tareaspendientesComponent } from './components/Pendinetes/edit_tareaspendientes/edit_tareaspendientes.component';
import { Create_pasos_tareasComponent } from './components/pasos_tareas/create_pasos_tareas/create_pasos_tareas.component';
import { Delete_pasos_tareasComponent } from './components/pasos_tareas/delete_pasos_tareas/delete_pasos_tareas.component';
import { Edit_pasos_tareasComponent } from './components/pasos_tareas/edit_pasos_tareas/edit_pasos_tareas.component';
import { Show_one_pasos_tareasComponent } from './components/pasos_tareas/show_one_pasos_tareas/show_one_pasos_tareas.component';
import { Show_pasos_tareasComponent } from './components/pasos_tareas/show_pasos_tareas/show_pasos_tareas.component';
import { Show_one_tareaspendientesComponent } from './components/Pendinetes/show_one_tareaspendientes/show_one_tareaspendientes.component';
import { Show_tareaspendientesComponent } from './components/Pendinetes/show_tareaspendientes/show_tareaspendientes.component';
import { Create_tipo_tareasComponent } from './components/tipos_tareas/create_tipo_tareas/create_tipo_tareas.component';
import { Delete_tipo_tareasComponent } from './components/tipos_tareas/delete_tipo_tareas/delete_tipo_tareas.component';
import { Edit_tipo_tareasComponent } from './components/tipos_tareas/edit_tipo_tareas/edit_tipo_tareas.component';
import { Show_one_tipo_tareasComponent } from './components/tipos_tareas/show_one_tipo_tareas/show_one_tipo_tareas.component';
import { Show_tipo_tareasComponent } from './components/tipos_tareas/show_tipo_tareas/show_tipo_tareas.component';
import { TareasycompromisoComponent } from './tareasycompromiso.component';

const routes: Routes = [
  {
    path: '',
    component: TareasycompromisoComponent,
    children:[
      //users
          {
            path: 'mostrar_pendings',
            component: Show_tareaspendientesComponent,
          },
          {
            path: 'mostrar_pending/:id',
            component: Show_one_tareaspendientesComponent,
          },
          {
            path: 'create_pending',
            component: Create_tareaspendientesComponent,
          },
          {
            path: 'edit_pending/:id',
            component: Edit_tareaspendientesComponent,
          },
          {
            path: 'delete_pending/:id',
            component: Delete_tareaspendientesComponent,
          },
          {
            path: 'mostrar_process',
            component: Show_tareasenprocesoComponent,
          },
          {
            path: 'mostrar_proces/:id',
            component: Show_one_tareasenprocesoComponent,
          },
          {
            path: 'create_proces',
            component: Create_tareasenprocesoComponent,
          },
          {
            path: 'edit_proces/:id',
            component: Edit_tareasenprocesoComponent,
          },
          {
            path: 'delete_proces/:id',
            component: Delete_tareasenprocesoComponent,
          },

          {
            path: 'mostrar_completes',
            component: Show_tareascompletadasComponent,
          },
          
          {
            path: 'mostrar_complete/:id',
            component: Show_one_tareascompletadasComponent,
          },
          
          {
            path: 'create_complete',
            component: Create_tareascompletadasComponent,
          },
          
          {
            path: 'edit_complete/:id',
            component: Edit_tareascompletadasComponent,
          },
          
          {
            path: 'delete_complete/:id',
            component: Delete_tareascompletadasComponent,
          },

          //tipos de tareas
          {
            path: 'mostrar_ProductivityType',
            component: Show_tipo_tareasComponent,
          },
          
          {
            path: 'mostrar_ProductivityType/:id',
            component: Show_one_tipo_tareasComponent,
          },
          
          {
            path: 'create_ProductivityType',
            component: Create_tipo_tareasComponent,
          },
          
          {
            path: 'edit_ProductivityType/:id',
            component: Edit_tipo_tareasComponent,
          },
          
          {
            path: 'delete_ProductivityType/:id',
            component: Delete_tipo_tareasComponent,
          },
          //pasos de tareas
          {
            path: 'mostrar_ProductivityStep',
            component: Show_pasos_tareasComponent,
          },
          
          {
            path: 'mostrar_ProductivityStep/:id',
            component: Show_one_pasos_tareasComponent,
          },
          
          {
            path: 'create_ProductivityStep',
            component: Create_pasos_tareasComponent,
          },
          
          {
            path: 'edit_ProductivityStep/:id',
            component: Edit_pasos_tareasComponent,
          },
          
          {
            path: 'delete_ProductivityStep/:id',
            component: Delete_pasos_tareasComponent,
          },
    ]
  }
  ,
  {
    path: '**',
    redirectTo: '/landing'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasycompromisoRoutingModule { }
