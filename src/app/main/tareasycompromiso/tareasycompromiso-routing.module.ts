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
import { Show_one_tareaspendientesComponent } from './components/Pendinetes/show_one_tareaspendientes/show_one_tareaspendientes.component';
import { Show_tareaspendientesComponent } from './components/Pendinetes/show_tareaspendientes/show_tareaspendientes.component';
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
