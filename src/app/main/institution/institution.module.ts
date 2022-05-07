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
import { ShowUniversityComponent } from './components/university/show-university/show-university.component';
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
import { Show_one_capacitacionComponent } from './components/Capacitacion/show_one_capacitacion/show_one_capacitacion.component';
import { Create_capacitacionComponent } from './components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Edit_capacitacionComponent } from './components/Capacitacion/edit_capacitacion/edit_capacitacion.component';
import { Delete_capacitacionComponent } from './components/Capacitacion/delete_capacitacion/delete_capacitacion.component';
import { InstitutionComponent } from './institution.component';
import { TableModule } from 'primeng/table';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { BrowserModule } from '@angular/platform-browser';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {FieldsetModule} from 'primeng/fieldset';

import { VincularLineasComponent } from './components/program/vincular-lineas/vincular-lineas.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Create_CategoryComponent } from './components/CategoriaProgramas/create_Category/create_Category.component';
import { Delete_CategoryComponent } from './components/CategoriaProgramas/delete_Category/delete_Category.component';
import { Edit_CategoryComponent } from './components/CategoriaProgramas/edit_Category/edit_Category.component';
import { Show_CategoryComponent } from './components/CategoriaProgramas/show_Category/show_Category.component';
import { Show_one_CategoryComponent } from './components/CategoriaProgramas/show_one_Category/show_one_Category.component';

@NgModule({
  declarations: [
    InstitutionComponent,
    VincularLineasComponent,
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
    CreateHeadquarterComponent,
    EditHeadquarterComponent,
    DeleteHeadquarterComponent,

    ShowUniversityComponent,
    ShowOneUniversityComponent,
    CreateUniversityComponent,
    EditUniversityComponent,
    DeleteUniversityComponent,



    Show_capacitacionComponent,
    Show_one_capacitacionComponent,
    Create_capacitacionComponent,
    Edit_capacitacionComponent,
    Delete_capacitacionComponent,

    Create_CategoryComponent,
    Delete_CategoryComponent,
    Edit_CategoryComponent,
    Show_CategoryComponent,
    Show_one_CategoryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    InstitutionRoutingModule,
    HttpClientModule,
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
    TableModule
,KeyFilterModule,
DropdownModule,
CalendarModule,
FieldsetModule,
FileUploadModule

  ],
  entryComponents: [
    
  ],
  
  providers: [DynamicDialogRef,DynamicDialogConfig]
})
export class InstitutionModule { }
