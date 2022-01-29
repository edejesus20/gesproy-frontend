import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateFacultyComponent } from './components/faculty/create-faculty/create-faculty.component';
import { ShowFacultiesComponent } from './components/faculty/show-faculties/show-faculties.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { ShowProgramsComponent } from './components/program/show-programs/show-programs.component';
import { CreateProgramComponent } from './components/program/create-program/create-program.component';
import { ShowHeadquarterComponent } from './components/headquarter/show-headquarter/show-headquarter.component';
import { HeadquarterProgramsComponent } from './components/headquarter/headquarter-programs/headquarter-programs.component';
import { ShowUniversityComponent } from './components/university/show-university/show-university.component';
import { Show_EscalafonComponent } from './components/Escalafon/show_Escalafon/show_Escalafon.component';
import { Show_CategoriaGruposComponent } from './components/CategoriaGrupos/show_CategoriaGrupos/show_CategoriaGrupos.component';
import { Show_CategoriaColcienciasComponent } from './components/CategoriaColciencias/show_CategoriaColciencias/show_CategoriaColciencias.component';
import { Show_RelacionesComponent } from './components/Relaciones/show_Relaciones/show_Relaciones.component';
import { Show_capacitacionComponent } from './components/Capacitacion/show_capacitacion/show_capacitacion.component';

import { ShowOneUniversityComponent } from './components/university/show-one-university/show-one-university.component';
import { CreateUniversityComponent } from './components/university/create-university/create-university.component';
import { EditUniversityComponent } from './components/university/edit-university/edit-university.component';
import { DeleteUniversityComponent } from './components/university/delete-university/delete-university.component';
import { ShowOneHeadquarterComponent } from './components/headquarter/show-one-headquarter/show-one-headquarter.component';
import { CreateHeadquarterComponent } from './components/headquarter/create-headquarter/create-headquarter.component';
import { EditHeadquarterComponent } from './components/headquarter/edit-headquarter/edit-headquarter.component';
import { DeleteHeadquarterComponent } from './components/headquarter/delete-headquarter/delete-headquarter.component';
import { ShowOneFacultiesComponent } from './components/faculty/show-one-faculties/show-one-faculties.component';
import { EditFacultiesComponent } from './components/faculty/edit-faculties/edit-faculties.component';
import { DeleteFacultiesComponent } from './components/faculty/delete-faculties/delete-faculties.component';
import { ShowOneProgramsComponent } from './components/program/show-one-programs/show-one-programs.component';
import { EditProgramsComponent } from './components/program/edit-programs/edit-programs.component';
import { DeleteProgramsComponent } from './components/program/delete-programs/delete-programs.component';
import { Show_one_CategoriaGruposComponent } from './components/CategoriaGrupos/show_one_CategoriaGrupos/show_one_CategoriaGrupos.component';
import { Create_CategoriaGruposComponent } from './components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Edit_CategoriaGruposComponent } from './components/CategoriaGrupos/edit_CategoriaGrupos/edit_CategoriaGrupos.component';
import { Delete_CategoriaGruposComponent } from './components/CategoriaGrupos/delete_CategoriaGrupos/delete_CategoriaGrupos.component';
import { Show_one_CategoriaColcienciasComponent } from './components/CategoriaColciencias/show_one_CategoriaColciencias/show_one_CategoriaColciencias.component';
import { Create_CategoriaColcienciasComponent } from './components/CategoriaColciencias/create_CategoriaColciencias/create_CategoriaColciencias.component';
import { Edit_CategoriaColcienciasComponent } from './components/CategoriaColciencias/edit_CategoriaColciencias/edit_CategoriaColciencias.component';
import { Delete_CategoriaColcienciasComponent } from './components/CategoriaColciencias/delete_CategoriaColciencias/delete_CategoriaColciencias.component';
import { Show_one_RelacionesComponent } from './components/Relaciones/show_one_Relaciones/show_one_Relaciones.component';
import { Create_RelacionesComponent } from './components/Relaciones/create_Relaciones/create_Relaciones.component';
import { Edit_RelacionesComponent } from './components/Relaciones/edit_Relaciones/edit_Relaciones.component';
import { Delete_RelacionesComponent } from './components/Relaciones/delete_Relaciones/delete_Relaciones.component';
import { Show_one_EscalafonComponent } from './components/Escalafon/show_one_Escalafon/show_one_Escalafon.component';
import { Create_EscalafonComponent } from './components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Edit_EscalafonComponent } from './components/Escalafon/edit_Escalafon/edit_Escalafon.component';
import { Delete_EscalafonComponent } from './components/Escalafon/delete_Escalafon/delete_Escalafon.component';
import { Show_one_capacitacionComponent } from './components/Capacitacion/show_one_capacitacion/show_one_capacitacion.component';
import { Create_capacitacionComponent } from './components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Edit_capacitacionComponent } from './components/Capacitacion/edit_capacitacion/edit_capacitacion.component';
import { Delete_capacitacionComponent } from './components/Capacitacion/delete_capacitacion/delete_capacitacion.component';
import { InstitutionComponent } from './institution.component';


@NgModule({
  declarations: [
    InstitutionComponent,

    CreateFacultyComponent,
    ShowFacultiesComponent,
    ShowOneFacultiesComponent,
    EditFacultiesComponent,
    DeleteFacultiesComponent,

    ShowProgramsComponent,
    ShowOneProgramsComponent,
    CreateProgramComponent,
    EditProgramsComponent,
    DeleteProgramsComponent,

    ShowHeadquarterComponent,
    ShowOneHeadquarterComponent,
    HeadquarterProgramsComponent,
    CreateHeadquarterComponent,
    EditHeadquarterComponent,
    DeleteHeadquarterComponent,

    ShowUniversityComponent,
    ShowOneUniversityComponent,
    CreateUniversityComponent,
    EditUniversityComponent,
    DeleteUniversityComponent,

    Show_EscalafonComponent,
    Show_one_EscalafonComponent,
    Create_EscalafonComponent,
    Edit_EscalafonComponent,
    Delete_EscalafonComponent,

    Show_CategoriaGruposComponent,
    Show_one_CategoriaGruposComponent,
    Create_CategoriaGruposComponent,
    Edit_CategoriaGruposComponent,
    Delete_CategoriaGruposComponent,

    Show_CategoriaColcienciasComponent,
    Show_one_CategoriaColcienciasComponent,
    Create_CategoriaColcienciasComponent,
    Edit_CategoriaColcienciasComponent,
    Delete_CategoriaColcienciasComponent,

    Show_RelacionesComponent,
    Show_one_RelacionesComponent,
    Create_RelacionesComponent,
    Edit_RelacionesComponent,
    Delete_RelacionesComponent,

    Show_capacitacionComponent,
    Show_one_capacitacionComponent,
    Create_capacitacionComponent,
    Edit_capacitacionComponent,
    Delete_capacitacionComponent,
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  entryComponents: [
    
  ]
})
export class InstitutionModule { }
