import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateLayoutModule } from './layout/private-layout/private-layout.module';
import { PublicLayoutModule } from './layout/public-layout/public-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PublicLayoutModule,
    PrivateLayoutModule,  
    BrowserAnimationsModule,
    MatDialogModule,
   
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: { data: {dato:0} } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
