import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create_indicador_externoComponent } from './components/Indicadores externos/create_indicador_externo/create_indicador_externo.component';
import { Delete_indicador_externoComponent } from './components/Indicadores externos/delete_indicador_externo/delete_indicador_externo.component';
import { Edit_indicador_externoComponent } from './components/Indicadores externos/edit_indicador_externo/edit_indicador_externo.component';
import { Show_indicador_externoComponent } from './components/Indicadores externos/show_indicador_externo/show_indicador_externo.component';
import { Show_one_indicador_externoComponent } from './components/Indicadores externos/show_one_indicador_externo/show_one_indicador_externo.component';
import { Create_indicador_internoComponent } from './components/Indicadores internos/create_indicador_interno/create_indicador_interno.component';
import { Delete_indicador_internoComponent } from './components/Indicadores internos/delete_indicador_interno/delete_indicador_interno.component';
import { Edit_indicador_internoComponent } from './components/Indicadores internos/edit_indicador_interno/edit_indicador_interno.component';
import { Show_indicador_internoComponent } from './components/Indicadores internos/show_indicador_interno/show_indicador_interno.component';
import { Show_one_indicador_internoComponent } from './components/Indicadores internos/show_one_indicador_interno/show_one_indicador_interno.component';
import { IndicadoresComponent } from './Indicadores.component';

const routes: Routes = [
  {
    path: '',
    component: IndicadoresComponent,
    children:[
      //users
          {
            path: 'mostrar_internals',
            component: Show_indicador_internoComponent,
          },
          {
            path: 'mostrar_internal/:id',
            component: Show_one_indicador_internoComponent,
          },
          {
            path: 'create_internal',
            component: Create_indicador_internoComponent,
          }
          ,
          {
            path: 'edit_internal/:id',
            component: Edit_indicador_internoComponent,
          }
          ,
          {
            path: 'delete_internal/:id',
            component: Delete_indicador_internoComponent,
          },
          {
            path: 'mostrar_externals',
            component: Show_indicador_externoComponent,
          },
          {
            path: 'mostrar_external/:id',
            component: Show_one_indicador_externoComponent,
          },
          {
            path: 'create_external',
            component: Create_indicador_externoComponent,
          }
          ,
          {
            path: 'edit_external/:id',
            component: Edit_indicador_externoComponent,
          }
          ,
          {
            path: 'delete_external/:id',
            component: Delete_indicador_externoComponent,
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicadoresRoutingModule { }