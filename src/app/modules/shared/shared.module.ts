import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MenuComponent } from './components/menu/menu.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MenuComponent,
    ProfileCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  exports: [
    MenuComponent,
    ProfileCardComponent
  ]
})
export class SharedModule { }
