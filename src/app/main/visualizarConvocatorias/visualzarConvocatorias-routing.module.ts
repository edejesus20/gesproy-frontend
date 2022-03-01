import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create_convocatoriaComponent } from './components/convocatorias/create_convocatoria/create_convocatoria.component';
import { Delete_convocatoriaComponent } from './components/convocatorias/delete_convocatoria/delete_convocatoria.component';
import { Edit_convocatoriaComponent } from './components/convocatorias/edit_convocatoria/edit_convocatoria.component';
import { Show_convocatoriaComponent } from './components/convocatorias/show_convocatoria/show_convocatoria.component';
import { Show_one_convocatoriaComponent } from './components/convocatorias/show_one_convocatoria/show_one_convocatoria.component';
import { VisualizarConvocatoriasComponent } from './visualizarConvocatorias.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizarConvocatoriasComponent,
    children:[
      //users
          {
            path: 'mostrar_Calls',
            component:Show_convocatoriaComponent,
          },
          {
            path: 'mostrar_Call/:id',
            component: Show_one_convocatoriaComponent,
          },
          {
            path: 'create_Call',
            component: Create_convocatoriaComponent,
          },
          {
            path: 'edit_Call/:id',
            component: Edit_convocatoriaComponent
          },
          {
            path: 'delete_Call/:id',
            component: Delete_convocatoriaComponent
          }
        
    ]
  },
  {
    path: '**',
    redirectTo: '/landing'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarConvocatoriasRoutingModule { }