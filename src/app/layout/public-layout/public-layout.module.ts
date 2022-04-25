import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';

import { LandingComponent } from '../private-layout/landing/landing.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    FormLoginComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    GalleriaModule,
    HttpClientModule,

    ConfirmPopupModule,
    ToastModule,
    // RouterModule,
    AvatarGroupModule,
    AvatarModule,
    PublicLayoutRoutingModule,
    FormsModule,
    SharedModule

  ],providers: [ConfirmationService,MessageService],
})
export class PublicLayoutModule { }
