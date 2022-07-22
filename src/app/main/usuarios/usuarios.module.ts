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

import {InputTextareaModule} from 'primeng/inputtextarea';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Create_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/create_InvestigatorCollaborator/create_InvestigatorCollaborator.component';
import { Delete_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/delete_InvestigatorCollaborator/delete_InvestigatorCollaborator.component';
import { Edit_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/edit_InvestigatorCollaborator/edit_InvestigatorCollaborator.component';
import { Show_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/show_InvestigatorCollaborator/show_InvestigatorCollaborator.component';
import { Show_one_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/show_one_InvestigatorCollaborator/show_one_InvestigatorCollaborator.component';
import { Show_Charge_bondingComponent } from './components/Vinculacion Cargo/show_Charge_bonding/show_Charge_bonding.component';
import { Show_one_Charge_bondingComponent } from './components/Vinculacion Cargo/show_one_Charge_bonding/show_one_Charge_bonding.component';
import { Create_Charge_bondingComponent } from './components/Vinculacion Cargo/create_Charge_bonding/create_Charge_bonding.component';
import { Edit_Charge_bondingComponent } from './components/Vinculacion Cargo/edit_Charge_bonding/edit_Charge_bonding.component';
import { Delete_Charge_bondingComponent } from './components/Vinculacion Cargo/delete_Charge_bonding/delete_Charge_bonding.component';
import { Show_ChargeComponent } from './components/Cargo/show_Charge/show_Charge.component';
import { Show_one_ChargeComponent } from './components/Cargo/show_one_Charge/show_one_Charge.component';
import { Create_ChargeComponent } from './components/Cargo/create_Charge/create_Charge.component';
import { Edit_ChargeComponent } from './components/Cargo/edit_Charge/edit_Charge.component';
import { Delete_ChargeComponent } from './components/Cargo/delete_Charge/delete_Charge.component';
import { MantenimientoComponent } from './components/Maintenance/mantenimiento/mantenimiento.component';
import { Create_mantenimientoComponent } from './components/Maintenance/create_mantenimiento/create_mantenimiento.component';
import { Create_RoleGroupTeacherComponent } from './components/Rol Grupo Docente/create_RoleGroupTeacher/create_RoleGroupTeacher.component';
import { Delete_RoleGroupTeacherComponent } from './components/Rol Grupo Docente/delete_RoleGroupTeacher/delete_RoleGroupTeacher.component';
import { Edit_RoleGroupTeacherComponent } from './components/Rol Grupo Docente/edit_RoleGroupTeacher/edit_RoleGroupTeacher.component';
import { Show_RoleGroupTeacherComponent } from './components/Rol Grupo Docente/show_RoleGroupTeacher/show_RoleGroupTeacher.component';
import { Create_TypeMemberComponent } from './components/Tipo miembro/create_TypeMember/create_TypeMember.component';
import { Delete_TypeMemberComponent } from './components/Tipo miembro/delete_TypeMember/delete_TypeMember.component';
import { Edit_TypeMemberComponent } from './components/Tipo miembro/edit_TypeMember/edit_TypeMember.component';
import { Show_one_TypeMemberComponent } from './components/Tipo miembro/show_one_TypeMember/show_one_TypeMember.component';
import { Show_TypeMemberComponent } from './components/Tipo miembro/show_TypeMember/show_TypeMember.component';
import {StepsModule} from 'primeng/steps';

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

    //investigador colabolador
    Create_InvestigatorCollaboratorComponent,
    Delete_InvestigatorCollaboratorComponent,
    Edit_InvestigatorCollaboratorComponent,
    Show_InvestigatorCollaboratorComponent,
    Show_one_InvestigatorCollaboratorComponent,
    // vinculacion de cargo
     //cargo
Show_Charge_bondingComponent,
Show_one_Charge_bondingComponent,
    Create_Charge_bondingComponent,
    Edit_Charge_bondingComponent,
   Delete_Charge_bondingComponent,

   Show_ChargeComponent,
Show_one_ChargeComponent,
    Create_ChargeComponent,
    Edit_ChargeComponent,
   Delete_ChargeComponent,
   Create_mantenimientoComponent,

   Create_RoleGroupTeacherComponent,
   Delete_RoleGroupTeacherComponent,
   Edit_RoleGroupTeacherComponent,
   Show_RoleGroupTeacherComponent,


   Create_TypeMemberComponent,
   Delete_TypeMemberComponent,
   Edit_TypeMemberComponent,
   Show_one_TypeMemberComponent,
   Show_TypeMemberComponent
   
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
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
    ConfirmPopupModule,
    ToastModule,
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
