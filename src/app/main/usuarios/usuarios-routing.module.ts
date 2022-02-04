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
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
