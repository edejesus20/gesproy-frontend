import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';

import { LandingComponent } from './components/landing/landing.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormLoginComponent } from './components/form-login/form-login.component';


@NgModule({
  declarations: [
    PublicLayoutComponent,
  
    LandingComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
   
    PublicLayoutRoutingModule,
    FormsModule,

  ]
})
export class PublicLayoutModule { }
