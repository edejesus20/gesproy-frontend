import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AsignarRolUserComponent } from './components/usr_rol/asignar-rol-user/asignar-rol-user.component';
import { AsignarRolResourceComponent } from './components/usr_rol/asignar-rol-resource/asignar-rol-resource.component';
import { ShowAdministrativeComponent } from './components/Administrativos/show-administrative/show-administrative.component';
import { ShowOneAdministrativeComponent } from './components/Administrativos/show-one-administrative/show-one-administrative.component';
import { CreateAdministrativeComponent } from './components/Administrativos/create-administrative/create-administrative.component';
import { EditarAdministrativeComponent } from './components/Administrativos/editar-administrative/editar-administrative.component';
import { DeleteAdministrativeComponent } from './components/Administrativos/delete-administrative/delete-administrative.component';
import { ShowTeacherComponent } from './components/Docentes/show-teacher/show-teacher.component';
import { ShowOneTeacherComponent } from './components/Docentes/show-one-teacher/show-one-teacher.component';
import { CreateTeacherComponent } from './components/Docentes/create-teacher/create-teacher.component';
import { EditarTeacherComponent } from './components/Docentes/editar-teacher/editar-teacher.component';
import { DeleteTeacherComponent } from './components/Docentes/delete-teacher/delete-teacher.component';
import { ShowStudentComponent } from './components/Estudiantes/show-student/show-student.component';
import { ShowOneStudentComponent } from './components/Estudiantes/show-one-student/show-one-student.component';
import { CreateStudentComponent } from './components/Estudiantes/create-student/create-student.component';
import { EditarStudentComponent } from './components/Estudiantes/editar-student/editar-student.component';
import { DeleteStudentComponent } from './components/Estudiantes/delete-student/delete-student.component';
import { AsignarTeacherComponent } from './components/Docentes/AsignarTeacher/AsignarTeacher.component';
import { Create_genderComponent } from './components/Genero/create_gender/create_gender.component';
import { Delete_genderComponent } from './components/Genero/delete_gender/delete_gender.component';
import { Edit_genderComponent } from './components/Genero/edit_gender/edit_gender.component';
import { Show_genderComponent } from './components/Genero/show_gender/show_gender.component';
import { Show_one_genderComponent } from './components/Genero/show_one_gender/show_one_gender.component';
import { Show_documentTypeComponent } from './components/TipoDocumento/show_documentType/show_documentType.component';
import { Show_one_documentTypeComponent } from './components/TipoDocumento/show_one_documentType/show_one_documentType.component';
import { Create_documentTypeComponent } from './components/TipoDocumento/create_documentType/create_documentType.component';
import { Edit_documentTypeComponent } from './components/TipoDocumento/edit_documentType/edit_documentType.component';
import { Delete_documentTypeComponent } from './components/TipoDocumento/delete_documentType/delete_documentType.component';

import { Show_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/show_InvestigatorCollaborator/show_InvestigatorCollaborator.component';
import { Show_one_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/show_one_InvestigatorCollaborator/show_one_InvestigatorCollaborator.component';
import { Create_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/create_InvestigatorCollaborator/create_InvestigatorCollaborator.component';
import { Edit_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/edit_InvestigatorCollaborator/edit_InvestigatorCollaborator.component';
import { Delete_InvestigatorCollaboratorComponent } from './components/Investigador colabolador/delete_InvestigatorCollaborator/delete_InvestigatorCollaborator.component';
import { Show_capacitacionComponent } from '../institution/components/Capacitacion/show_capacitacion/show_capacitacion.component';
import { Show_one_capacitacionComponent } from '../institution/components/Capacitacion/show_one_capacitacion/show_one_capacitacion.component';
import { Create_capacitacionComponent } from '../institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Edit_capacitacionComponent } from '../institution/components/Capacitacion/edit_capacitacion/edit_capacitacion.component';
import { Delete_capacitacionComponent } from '../institution/components/Capacitacion/delete_capacitacion/delete_capacitacion.component';
import { Create_Charge_bondingComponent } from './components/Vinculacion Cargo/create_Charge_bonding/create_Charge_bonding.component';
import { Show_one_Charge_bondingComponent } from './components/Vinculacion Cargo/show_one_Charge_bonding/show_one_Charge_bonding.component';
import { Show_Charge_bondingComponent } from './components/Vinculacion Cargo/show_Charge_bonding/show_Charge_bonding.component';
import { Edit_Charge_bondingComponent } from './components/Vinculacion Cargo/edit_Charge_bonding/edit_Charge_bonding.component';
import { Delete_Charge_bondingComponent } from './components/Vinculacion Cargo/delete_Charge_bonding/delete_Charge_bonding.component';
import { Show_ChargeComponent } from './components/Cargo/show_Charge/show_Charge.component';
import { Show_one_ChargeComponent } from './components/Cargo/show_one_Charge/show_one_Charge.component';
import { Create_ChargeComponent } from './components/Cargo/create_Charge/create_Charge.component';
import { Edit_ChargeComponent } from './components/Cargo/edit_Charge/edit_Charge.component';
import { Delete_ChargeComponent } from './components/Cargo/delete_Charge/delete_Charge.component';
import { MantenimientoComponent } from './components/Maintenance/mantenimiento/mantenimiento.component';
import { Create_mantenimientoComponent } from './components/Maintenance/create_mantenimiento/create_mantenimiento.component';
import { Delete_mantenimientoComponent } from './components/Maintenance/delete_mantenimiento/delete_mantenimiento.component';
import { Edit_mantenimientoComponent } from './components/Maintenance/edit_mantenimiento/edit_mantenimiento.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children:[
      //users
          {
            path: 'users',
            component: MostrarUsersComponent,
          },
          {
            path: 'user/:id',
            component:MostrarUnUserComponent ,
          },
          {
            path: 'user_create',
            component:CrearUserComponent ,
          },   
          {
            path: 'user_modificar/:id',
            component: ModificarUserComponent,
          },
          {
            path: 'user_eliminar/:id',
            component:EliminarUserComponent ,
          },
          //cambiar contraseña
          {
            path: 'user_contraseña/:id',
            component:CambicarPasswordUserComponent ,
          },
          ///roles
          {
            path: 'roles',
            component: MostrarRolsComponent,
          },
          {
            path: 'role/:id',
            component:MostrarUnRolComponent ,
          },
          {
            path: 'role_create',
            component:CrearRolComponent ,
          },   
          {
            path: 'role_modificar/:id',
            component: ModificarRolComponent,
          },
          {
            path: 'role_eliminar/:id',
            component:EliminarRolComponent ,
          },
          {
            path: 'role_asignar_user',
            component:AsignarRolUserComponent ,
          },
    
          {
            path: 'role_asignar_resourse',
            component:AsignarRolResourceComponent ,
          },
        //resources
        {
          path: 'resources',
          component: MostrarResourcesComponent,
        },
        {
          path: 'resource/:id',
          component:MostrarUnResourceComponent ,
        },
        {
          path: 'resource_create',
          component:CrearResourceComponent ,
        },   
        {
          path: 'resource_modificar/:id',
          component: ModificarResourceComponent,
        },
        {
          path: 'resource_eliminar/:id',
          component:EliminarResourceComponent ,
        }, 
        //administrativos
        {
          path: 'Administrative',
          component: ShowAdministrativeComponent,
        },
        {
          path: 'Administrative/:id',
          component:ShowOneAdministrativeComponent ,
        },
        {
          path: 'administrative_create',
          component:CreateAdministrativeComponent ,
        },   
        {
          path: 'administrative_modificar/:id',
          component: EditarAdministrativeComponent,
        },
        {
          path: 'administrative_eliminar/:id',
          component:DeleteAdministrativeComponent ,
        }, 

        //Docentes
        {
          path: 'Teacher',
          component: ShowTeacherComponent,
        },
        {
          path: 'Teacher/:id',
          component:ShowOneTeacherComponent ,
        },
        {
          path: 'teacher_create',
          component:CreateTeacherComponent ,
        },   
        {
          path: 'teacher_modificar/:id',
          component: EditarTeacherComponent,
        },
        {
          path: 'teacher_eliminar/:id',
          component:DeleteTeacherComponent ,
        },
        //estudiantes
        {
          path: 'Student',
          component: ShowStudentComponent,
        },
        {
          path: 'Student/:id',
          component:ShowOneStudentComponent ,
        },
        {
          path: 'student_create',
          component:CreateStudentComponent ,
        },   
        {
          path: 'student_modificar/:id',
          component: EditarStudentComponent,
        },
        {
          path: 'student_eliminar/:id',
          component:DeleteStudentComponent ,
        }
        ,
        {
          path: 'AsignarTeacher/:id',
          component:AsignarTeacherComponent ,
        },
        //genero
        {
          path: 'gender',
          component: Show_genderComponent,
        },
        {
          path: 'gender/:id',
          component:Show_one_genderComponent ,
        },
        {
          path: 'gender_create',
          component:Create_genderComponent ,
        },   
        {
          path: 'gender_modificar/:id',
          component: Edit_genderComponent,
        },
        {
          path: 'gender_eliminar/:id',
          component:Delete_genderComponent ,
        },
        //documentType
        {
          path: 'documentType',
          component: Show_documentTypeComponent,
        },
        {
          path: 'documentType/:id',
          component:Show_one_documentTypeComponent ,
        },
        {
          path: 'documentType_create',
          component:Create_documentTypeComponent ,
        },   
        {
          path: 'documentType_modificar/:id',
          component: Edit_documentTypeComponent,
        },
        {
          path: 'documentType_eliminar/:id',
          component:Delete_documentTypeComponent ,
        },

          //investigador colabolador
          {
            path: 'InvestigatorCollaborator',
            component: Show_InvestigatorCollaboratorComponent,
          },
          {
            path: 'InvestigatorCollaborator/:id',
            component:Show_one_InvestigatorCollaboratorComponent ,
          },
          {
            path: 'InvestigatorCollaborator_create',
            component:Create_InvestigatorCollaboratorComponent ,
          },   
          {
            path: 'InvestigatorCollaborator_modificar/:id',
            component: Edit_InvestigatorCollaboratorComponent,
          },
          {
            path: 'InvestigatorCollaborator_eliminar/:id',
            component:Delete_InvestigatorCollaboratorComponent ,
          },
          //capacitaciones
          {
            path:'mostrar_trainings',
            component:Show_capacitacionComponent
          },
          {
            path:'mostrar_training/:id',
            component:Show_one_capacitacionComponent
          },
          {
            path:'crear_training',
            component:Create_capacitacionComponent
          },
          {
            path:'edit_training/:id',
            component:Edit_capacitacionComponent
          },
          {
            path:'delete_training/:id',
            component:Delete_capacitacionComponent
          },
          //cargo
          {
            path:'Charge_bonding',
            component:Show_Charge_bondingComponent
          },
          {
            path:'Charge_bonding/:id',
            component:Show_one_Charge_bondingComponent
          },
          {
            path:'Charge_bonding_create',
            component:Create_Charge_bondingComponent
          },
          {
            path:'Charge_bonding_modificar/:id',
            component:Edit_Charge_bondingComponent
          },
          {
            path:'Charge_bonding_eliminar/:id',
            component:Delete_Charge_bondingComponent
          },
         //cargo
         {
          path:'Charge',
          component:Show_ChargeComponent
        },
        {
          path:'Charge/:id',
          component:Show_one_ChargeComponent
        },
        {
          path:'Charge_create',
          component:Create_ChargeComponent
        },
        {
          path:'Charge_modificar/:id',
          component:Edit_ChargeComponent
        },
        {
          path:'Charge_eliminar/:id',
          component:Delete_ChargeComponent
        },
        {
          path:'mantenimiento',
          component:MantenimientoComponent
        },
        {
          path:'edit_mantenimiento/:id',
          component:Edit_mantenimientoComponent
        },
        {
          path:'delete_mantenimiento/:id',
          component:Delete_mantenimientoComponent
        },
        {
          path:'create_mantenimiento',
          component:Create_mantenimientoComponent
        },
        
    ]
  },
  {
    path: '**',
    redirectTo: '/landing'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
