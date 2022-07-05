import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ValidateGuard } from './core/guards/validate.guard';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { 
    path: 'mantenimiento',
    component:MantenimientoComponent
  }
  // {
  //   path: '**',
  //   redirectTo: '/landing',
   
  // }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
