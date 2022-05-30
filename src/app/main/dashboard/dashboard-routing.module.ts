import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/escritorio/general/general.component';
import { Create_notificationComponent } from './components/Notificaciones/create_notification/create_notification.component';
import { Delete_notificationComponent } from './components/Notificaciones/delete_notification/delete_notification.component';
import { Edit_notificationComponent } from './components/Notificaciones/edit_notification/edit_notification.component';
import { Show_notificationComponent } from './components/Notificaciones/show_notification/show_notification.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      //universidad
      {
        path: '',
        component: GeneralComponent,
      },
          {
            path:'mostrar_Notification',
            component:Show_notificationComponent
          },
          {
            path:'create_Notification',
            component:Create_notificationComponent
          },
          {
            path:'edit_Notification/:id',
            component:Edit_notificationComponent
          },
          {
            path:'delete_Notification/:id',
            component:Delete_notificationComponent
          },
        ]
      }
];

  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
