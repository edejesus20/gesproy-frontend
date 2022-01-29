import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { LandingComponent } from './components/landing/landing.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../../modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    FormLoginComponent,
    FormRegisterComponent,
    LandingComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    SharedModule,
    PublicLayoutRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
  ]
})
export class PublicLayoutModule { }
