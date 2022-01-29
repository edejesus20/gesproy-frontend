import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { CrearUserComponent } from './components/usr_User/crear-user/crear-user.component';
import { MostrarUsersComponent } from './components/usr_User/mostrar-users/mostrar-users.component';
import { MostrarUnUserComponent } from './components/usr_User/mostrar-un-user/mostrar-un-user.component';
import { ModificarUserComponent } from './components/usr_User/modificar-user/modificar-user.component';
import { EliminarUserComponent } from './components/usr_User/eliminar-user/eliminar-user.component';
import { MostrarRolsComponent } from './components/usr_rol/mostrar-rols/mostrar-rols.component';
import { MostrarUnRolComponent } from './components/usr_rol/mostrar-un-rol/mostrar-un-rol.component';
import { CrearRolComponent } from './components/usr_rol/crear-rol/crear-rol.component';
import { ModificarRolComponent } from './components/usr_rol/modificar-rol/modificar-rol.component';
import { EliminarRolComponent } from './components/usr_rol/eliminar-rol/eliminar-rol.component';
import { MostrarResourcesComponent } from './components/usr_resources/mostrar-resources/mostrar-resources.component';
import { MostrarUnResourceComponent } from './components/usr_resources/mostrar-un-resource/mostrar-un-resource.component';
import { CrearResourceComponent } from './components/usr_resources/crear-resource/crear-resource.component';
import { ModificarResourceComponent } from './components/usr_resources/modificar-resource/modificar-resource.component';
import { EliminarResourceComponent } from './components/usr_resources/eliminar-resource/eliminar-resource.component';
import { CambicarPasswordUserComponent } from './components/usr_User/cambicar-password-user/cambicar-password-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsignarRolUserComponent } from './components/usr_rol/asignar-rol-user/asignar-rol-user.component';
import { AsignarRolResourceComponent } from './components/usr_rol/asignar-rol-resource/asignar-rol-resource.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUserComponent,
    MostrarUsersComponent,
    MostrarUnUserComponent,
    ModificarUserComponent,
    EliminarUserComponent,
    MostrarRolsComponent,
    MostrarUnRolComponent,
    CrearRolComponent,
    ModificarRolComponent,
    EliminarRolComponent,
    MostrarResourcesComponent,
    MostrarUnResourceComponent,
    CrearResourceComponent,
    ModificarResourceComponent,
    EliminarResourceComponent,
    CambicarPasswordUserComponent,
    AsignarRolUserComponent,
    AsignarRolResourceComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class UsuariosModule { }
