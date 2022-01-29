import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { LandingComponent } from './components/landing/landing.component';
import { PublicLayoutComponent } from './public-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent
      },
      // {
      //   path: 'login',
      //   component: FormLoginComponent
      // },
      {
        path: 'register',
        component: FormRegisterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
