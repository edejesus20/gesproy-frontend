import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateGuard } from 'src/app/core/guards/validate.guard';
import { PrivateLayoutComponent } from './private-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [ValidateGuard],
    canLoad:[ValidateGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../main/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'tasksCommitments',
        loadChildren: () => import('../../main/tareasycompromiso/tareasycompromiso.module').then(m => m.TareasycompromisoModule),

      },
      {
        path: 'Procedimientos',
        loadChildren: () => import('../../main/procedimientos/procedimientos.module').then(m => m.ProcedimientosModule),
      },
      
      {
        path: 'institution',
        loadChildren: () => import('../../main/institution/institution.module').then(m => m.InstitutionModule),

      },
      {
        path: 'Calls',
        loadChildren: () => import('../../main/visualizarConvocatorias/visualizarConvocatorias.module').then(m => m.VisualizarConvocatoriasModule),
      },
      {
        path: 'Indicators',
        loadChildren: () => import('../../main/Indicadores/Indicadores.module').then(m => m.IndicadoresModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../../main/usuarios/usuarios.module').then(m => m.UsuariosModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateLayoutRoutingModule { }
