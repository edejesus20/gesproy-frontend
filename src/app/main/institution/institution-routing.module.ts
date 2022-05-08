import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Create_CategoryComponent } from './components/CategoriaProgramas/create_Category/create_Category.component';
import { Delete_CategoryComponent } from './components/CategoriaProgramas/delete_Category/delete_Category.component';
import { Edit_CategoryComponent } from './components/CategoriaProgramas/edit_Category/edit_Category.component';
import { Show_CategoryComponent } from './components/CategoriaProgramas/show_Category/show_Category.component';
import { Show_one_CategoryComponent } from './components/CategoriaProgramas/show_one_Category/show_one_Category.component';

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
import { CreateUniversityComponent } from './components/university/create-university/create-university.component';
import { DeleteUniversityComponent } from './components/university/delete-university/delete-university.component';
import { EditUniversityComponent } from './components/university/edit-university/edit-university.component';
import { ShowOneUniversityComponent } from './components/university/show-one-university/show-one-university.component';
import { ShowUniversityComponent } from './components/university/show-university/show-university.component';

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
          {
            path:'create_VincularLineProgram/:id',
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
