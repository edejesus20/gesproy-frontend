import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Create_capacitacionComponent } from './components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Delete_capacitacionComponent } from './components/Capacitacion/delete_capacitacion/delete_capacitacion.component';
import { Edit_capacitacionComponent } from './components/Capacitacion/edit_capacitacion/edit_capacitacion.component';
import { Show_capacitacionComponent } from './components/Capacitacion/show_capacitacion/show_capacitacion.component';
import { Show_one_capacitacionComponent } from './components/Capacitacion/show_one_capacitacion/show_one_capacitacion.component';
import { Create_CategoriaColcienciasComponent } from './components/CategoriaColciencias/create_CategoriaColciencias/create_CategoriaColciencias.component';
import { Delete_CategoriaColcienciasComponent } from './components/CategoriaColciencias/delete_CategoriaColciencias/delete_CategoriaColciencias.component';
import { Edit_CategoriaColcienciasComponent } from './components/CategoriaColciencias/edit_CategoriaColciencias/edit_CategoriaColciencias.component';
import { Show_CategoriaColcienciasComponent } from './components/CategoriaColciencias/show_CategoriaColciencias/show_CategoriaColciencias.component';
import { Show_one_CategoriaColcienciasComponent } from './components/CategoriaColciencias/show_one_CategoriaColciencias/show_one_CategoriaColciencias.component';
import { Create_CategoriaGruposComponent } from './components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Delete_CategoriaGruposComponent } from './components/CategoriaGrupos/delete_CategoriaGrupos/delete_CategoriaGrupos.component';
import { Edit_CategoriaGruposComponent } from './components/CategoriaGrupos/edit_CategoriaGrupos/edit_CategoriaGrupos.component';
import { Show_CategoriaGruposComponent } from './components/CategoriaGrupos/show_CategoriaGrupos/show_CategoriaGrupos.component';
import { Show_one_CategoriaGruposComponent } from './components/CategoriaGrupos/show_one_CategoriaGrupos/show_one_CategoriaGrupos.component';
import { Create_CategoryComponent } from './components/CategoriaProgramas/create_Category/create_Category.component';
import { Delete_CategoryComponent } from './components/CategoriaProgramas/delete_Category/delete_Category.component';
import { Edit_CategoryComponent } from './components/CategoriaProgramas/edit_Category/edit_Category.component';
import { Show_CategoryComponent } from './components/CategoriaProgramas/show_Category/show_Category.component';
import { Show_one_CategoryComponent } from './components/CategoriaProgramas/show_one_Category/show_one_Category.component';
import { Create_EscalafonComponent } from './components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Delete_EscalafonComponent } from './components/Escalafon/delete_Escalafon/delete_Escalafon.component';
import { Edit_EscalafonComponent } from './components/Escalafon/edit_Escalafon/edit_Escalafon.component';
import { Show_EscalafonComponent } from './components/Escalafon/show_Escalafon/show_Escalafon.component';
import { Show_one_EscalafonComponent } from './components/Escalafon/show_one_Escalafon/show_one_Escalafon.component';
import { CreateFacultyComponent } from './components/faculty/create-faculty/create-faculty.component';
import { DeleteFacultiesComponent } from './components/faculty/delete-faculties/delete-faculties.component';
import { EditFacultiesComponent } from './components/faculty/edit-faculties/edit-faculties.component';
import { ShowFacultiesComponent } from './components/faculty/show-faculties/show-faculties.component';
import { ShowOneFacultiesComponent } from './components/faculty/show-one-faculties/show-one-faculties.component';
import { CreateHeadquarterComponent } from './components/headquarter/create-headquarter/create-headquarter.component';
import { DeleteHeadquarterComponent } from './components/headquarter/delete-headquarter/delete-headquarter.component';
import { EditHeadquarterComponent } from './components/headquarter/edit-headquarter/edit-headquarter.component';
import { ShowHeadquarterComponent } from './components/headquarter/show-headquarter/show-headquarter.component';
import { ShowOneHeadquarterComponent } from './components/headquarter/show-one-headquarter/show-one-headquarter.component';
import { CreateProgramComponent } from './components/program/create-program/create-program.component';
import { DeleteProgramsComponent } from './components/program/delete-programs/delete-programs.component';
import { EditProgramsComponent } from './components/program/edit-programs/edit-programs.component';
import { ShowOneProgramsComponent } from './components/program/show-one-programs/show-one-programs.component';
import { ShowProgramsComponent } from './components/program/show-programs/show-programs.component';
import { VincularLineasComponent } from './components/program/vincular-lineas/vincular-lineas.component';
import { Create_RelacionesComponent } from './components/Relaciones/create_Relaciones/create_Relaciones.component';
import { Delete_RelacionesComponent } from './components/Relaciones/delete_Relaciones/delete_Relaciones.component';
import { Edit_RelacionesComponent } from './components/Relaciones/edit_Relaciones/edit_Relaciones.component';
import { Show_one_RelacionesComponent } from './components/Relaciones/show_one_Relaciones/show_one_Relaciones.component';
import { Show_RelacionesComponent } from './components/Relaciones/show_Relaciones/show_Relaciones.component';
import { CreateUniversityComponent } from './components/university/create-university/create-university.component';
import { DeleteUniversityComponent } from './components/university/delete-university/delete-university.component';
import { EditUniversityComponent } from './components/university/edit-university/edit-university.component';
import { ShowOneUniversityComponent } from './components/university/show-one-university/show-one-university.component';
import { ShowUniversityComponent } from './components/university/show-university/show-university.component';
import { CrearRolInvestigationComponent } from './components/user_rol_investigation/crear-rol-investigation/crear-rol-investigation.component';
import { DeleteRolInvestigationComponent } from './components/user_rol_investigation/delete-rol-investigation/delete-rol-investigation.component';
import { EditRolInvestigationComponent } from './components/user_rol_investigation/edit-rol-investigation/edit-rol-investigation.component';
import { ShowOneRolInvestigationComponent } from './components/user_rol_investigation/show-one-rol-investigation/show-one-rol-investigation.component';
import { ShowRolInvestigationComponent } from './components/user_rol_investigation/show-rol-investigation/show-rol-investigation.component';
import { InstitutionComponent } from './institution.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionComponent,
    children:[
      //universidad
          {
            path:'mostrar_universitys',
            component:ShowUniversityComponent
          },
          {
            path:'mostrar_university/:id',
            component:ShowOneUniversityComponent
          },
          {
            path:'create_university',
            component:CreateUniversityComponent
          },
          {
            path:'edit_university/:id',
            component:EditUniversityComponent
          },
          {
            path:'delete_university/:id',
            component:DeleteUniversityComponent
          },
          //sedes
          {
            path:'mostrar_headquarters',
            component:ShowHeadquarterComponent
          },
          {
            path:'mostrar_headquarter/:id',
            component:ShowOneHeadquarterComponent
          },
          {
            path:'create_headquarter',
            component:CreateHeadquarterComponent
          },
          {
            path:'edit_headquarter/:id',
            component:EditHeadquarterComponent
          },
          {
            path:'delete_headquarter/:id',
            component:DeleteHeadquarterComponent
          },
          //faculty
          {
            path:'mostrar_facultys',
            component: ShowFacultiesComponent
            
          },
          {
            path:'mostrar_faculty/:id',
            component: ShowOneFacultiesComponent
          }
          ,
          {
            path:'create_faculty',
            component: CreateFacultyComponent
          }
          ,
          {
            path:'edit_faculty/:id',
            component: EditFacultiesComponent
          }
          ,
          {
            path:'delete_faculty/:id',
            component: DeleteFacultiesComponent
          },
          //programas
          {
            path:'mostrar_programs',
            component:ShowProgramsComponent
          }
          ,
          {
            path:'mostrar_program/:id',
            component: ShowOneProgramsComponent
          },
          {
            path:'create_program',
            component: CreateProgramComponent
          },
          {
            path:'edit_program/:id',
            component: EditProgramsComponent
          },
          {
            path:'delete_program/:id',
            component: DeleteProgramsComponent
          },
       
          //categorias de grupo
          {
            path:'mostrar_categorys',
            component:Show_CategoriaGruposComponent
          },

          {
            path:'mostrar_category/:id',
            component:Show_one_CategoriaGruposComponent
          },
          {
            path:'create_category',
            component:Create_CategoriaGruposComponent
          },
          {
            path:'edit_category/:id',
            component:Edit_CategoriaGruposComponent
          },
          {
            path:'delete_category/:id',
            component:Delete_CategoriaGruposComponent
          },
          
          //categorias de programa
          {
            path:'mostrar_categorysP',
            component:Show_CategoryComponent
          },

          {
            path:'mostrar_categoryP/:id',
            component:Show_one_CategoryComponent
          },
          {
            path:'create_categoryP',
            component:Create_CategoryComponent
          },
          {
            path:'edit_categoryP/:id',
            component:Edit_CategoryComponent
          },
          {
            path:'delete_categoryP/:id',
            component:Delete_CategoryComponent
          },
    

          //categorias colciencias
          {
            path:'mostrar_colcienciaCategorys',
            component:Show_CategoriaColcienciasComponent
          },

          {
            path:'mostrar_colcienciaCategory/:id',
            component:Show_one_CategoriaColcienciasComponent
          },
          {
            path:'create_colcienciaCategory',
            component:Create_CategoriaColcienciasComponent
          },
          {
            path:'edit_colcienciaCategory/:id',
            component:Edit_CategoriaColcienciasComponent
          },
          {
            path:'delete_colcienciaCategory/:id',
            component:Delete_CategoriaColcienciasComponent
          },

          //relaciones
          {
            path:'mostrar_relationships',
            component:Show_RelacionesComponent
          },
          {
            path:'mostrar_relationship/:id',
            component:Show_one_RelacionesComponent
          },
          {
            path:'create_relationship',
            component:Create_RelacionesComponent
          },
          {
            path:'edit_relationship/:id',
            component:Edit_RelacionesComponent
          },
          {
            path:'delete_relationship/:id',
            component:Delete_RelacionesComponent
          },
          //escalafon
          {
            path:'mostrar_scales',
            component:Show_EscalafonComponent
          },
          {
            path:'mostrar_scale/:id',
            component:Show_one_EscalafonComponent
          },
          {
            path:'create_scale',
            component:Create_EscalafonComponent
          },
          {
            path:'edit_scale/:id',
            component:Edit_EscalafonComponent
          },
          {
            path:'delete_scale/:id',
            component:Delete_EscalafonComponent
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
           //rol investigaciones
    {
      path: 'mostrar_RoleInvestigations',
      component: ShowRolInvestigationComponent,
    },
    {
      path: 'mostrar_RoleInvestigation/:id',
      component:ShowOneRolInvestigationComponent ,
    },
    {
      path: 'crear_RoleInvestigation',
      component:CrearRolInvestigationComponent ,
    },   
    {
      path: 'edit_RoleInvestigation/:id',
      component: EditRolInvestigationComponent,
    },
    {
      path: 'delete_RoleInvestigation/:id',
      component:DeleteRolInvestigationComponent ,
    },
    { 
      path: 'create_VincularLineProgram/:id',
      component:VincularLineasComponent
    }
          
        ]
    }
    ,
  {
    path: '**',
    redirectTo: '/landing'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: []
})
export class InstitutionRoutingModule { }
