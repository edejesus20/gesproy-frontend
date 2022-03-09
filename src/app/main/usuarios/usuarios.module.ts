import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { AsignarRolUserComponent } from './components/usr_rol/asignar-rol-user/asignar-rol-user.component';
import { AsignarRolResourceComponent } from './components/usr_rol/asignar-rol-resource/asignar-rol-resource.component';
import { CreateStudentComponent } from './components/Estudiantes/create-student/create-student.component';
import { DeleteStudentComponent } from './components/Estudiantes/delete-student/delete-student.component';
import { EditarStudentComponent } from './components/Estudiantes/editar-student/editar-student.component';
import { ShowOneStudentComponent } from './components/Estudiantes/show-one-student/show-one-student.component';
import { ShowStudentComponent } from './components/Estudiantes/show-student/show-student.component';
import { CreateTeacherComponent } from './components/Docentes/create-teacher/create-teacher.component';
import { DeleteTeacherComponent } from './components/Docentes/delete-teacher/delete-teacher.component';
import { EditarTeacherComponent } from './components/Docentes/editar-teacher/editar-teacher.component';
import { ShowOneTeacherComponent } from './components/Docentes/show-one-teacher/show-one-teacher.component';
import { ShowTeacherComponent } from './components/Docentes/show-teacher/show-teacher.component';
import { CreateAdministrativeComponent } from './components/Administrativos/create-administrative/create-administrative.component';
import { DeleteAdministrativeComponent } from './components/Administrativos/delete-administrative/delete-administrative.component';
import { EditarAdministrativeComponent } from './components/Administrativos/editar-administrative/editar-administrative.component';
import { ShowAdministrativeComponent } from './components/Administrativos/show-administrative/show-administrative.component';
import { ShowOneAdministrativeComponent } from './components/Administrativos/show-one-administrative/show-one-administrative.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {FieldsetModule} from 'primeng/fieldset';

import { AsignarTeacherComponent } from './components/Docentes/AsignarTeacher/AsignarTeacher.component';
import { Show_genderComponent } from './components/Genero/show_gender/show_gender.component';
import { Show_one_genderComponent } from './components/Genero/show_one_gender/show_one_gender.component';
import { Create_genderComponent } from './components/Genero/create_gender/create_gender.component';
import { Edit_genderComponent } from './components/Genero/edit_gender/edit_gender.component';
import { Delete_genderComponent } from './components/Genero/delete_gender/delete_gender.component';
import { Delete_documentTypeComponent } from './components/TipoDocumento/delete_documentType/delete_documentType.component';
import { Create_documentTypeComponent } from './components/TipoDocumento/create_documentType/create_documentType.component';
import { Edit_documentTypeComponent } from './components/TipoDocumento/edit_documentType/edit_documentType.component';
import { Show_documentTypeComponent } from './components/TipoDocumento/show_documentType/show_documentType.component';
import { Show_one_documentTypeComponent } from './components/TipoDocumento/show_one_documentType/show_one_documentType.component';
import { Create_ocupationComponent } from './components/Ocupacion/create_ocupation/create_ocupation.component';
import { Delete_OcupationComponent } from './components/Ocupacion/delete_Ocupation/delete_Ocupation.component';
import { Edit_OcupationComponent } from './components/Ocupacion/edit_Ocupation/edit_Ocupation.component';
import { Show_OcupationComponent } from './components/Ocupacion/show_Ocupation/show_Ocupation.component';
import { Show_One_OcupationComponent } from './components/Ocupacion/Show_One_Ocupation/Show_One_Ocupation.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
    AsignarRolResourceComponent,
    //estudiantes
    CreateStudentComponent,
    DeleteStudentComponent,
    EditarStudentComponent,
    ShowOneStudentComponent,
    ShowStudentComponent,
    //docentes
    CreateTeacherComponent,
    DeleteTeacherComponent,
    EditarTeacherComponent,
    ShowOneTeacherComponent,
    ShowTeacherComponent,
    AsignarTeacherComponent,
    //administrativos
    CreateAdministrativeComponent,
    DeleteAdministrativeComponent,
    EditarAdministrativeComponent,
    ShowAdministrativeComponent,
    ShowOneAdministrativeComponent,
    //generos
    Show_genderComponent,
    Show_one_genderComponent,
    Create_genderComponent,
    Edit_genderComponent,
    Delete_genderComponent,
    //documentType
    Delete_documentTypeComponent,
    Create_documentTypeComponent,
    Edit_documentTypeComponent,
    Show_documentTypeComponent,
    Show_one_documentTypeComponent,
    //ocupation
    Create_ocupationComponent,
    Delete_OcupationComponent,
    Edit_OcupationComponent,
    Show_OcupationComponent,
    Show_One_OcupationComponent,


  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    DividerModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    InputTextModule,
  
    CardModule,
    MenuModule,
    MessagesModule,
    MessageModule,

    SplitterModule,
    MenubarModule,
    AvatarGroupModule,
    AvatarModule,
    SidebarModule,
    PanelMenuModule,
    ChartModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    TreeModule,
    SharedModule,
    // VirtualScrollerModule,
    TableModule,
    KeyFilterModule,
    DropdownModule,
    CalendarModule,
    FieldsetModule,
    FileUploadModule,
    InputTextareaModule

  ],
  
  providers: [DynamicDialogRef,DynamicDialogConfig]
})
export class UsuariosModule { }
