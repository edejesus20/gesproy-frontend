import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';


@NgModule({
  declarations: [
    MenuComponent,
    ProfileCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    MenuComponent,
    ProfileCardComponent
  ]
})
export class SharedModule { }
