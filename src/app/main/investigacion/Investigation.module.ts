import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigationComponent } from './Investigation.component';
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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestigationRoutingModule } from './Investigation-routing.module';
import { CrearRolInvestigationComponent } from './components/user_rol_investigation/crear-rol-investigation/crear-rol-investigation.component';
import { DeleteRolInvestigationComponent } from './components/user_rol_investigation/delete-rol-investigation/delete-rol-investigation.component';
import { EditRolInvestigationComponent } from './components/user_rol_investigation/edit-rol-investigation/edit-rol-investigation.component';
import { ShowOneRolInvestigationComponent } from './components/user_rol_investigation/show-one-rol-investigation/show-one-rol-investigation.component';
import { ShowRolInvestigationComponent } from './components/user_rol_investigation/show-rol-investigation/show-rol-investigation.component';
import { Show_EscalafonComponent } from './components/Escalafon/show_Escalafon/show_Escalafon.component';
import { Show_one_EscalafonComponent } from './components/Escalafon/show_one_Escalafon/show_one_Escalafon.component';
import { Create_EscalafonComponent } from './components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Edit_EscalafonComponent } from './components/Escalafon/edit_Escalafon/edit_Escalafon.component';
import { Delete_EscalafonComponent } from './components/Escalafon/delete_Escalafon/delete_Escalafon.component';
import { Show_CategoriaGruposComponent } from './components/CategoriaGrupos/show_CategoriaGrupos/show_CategoriaGrupos.component';
import { Show_one_CategoriaGruposComponent } from './components/CategoriaGrupos/show_one_CategoriaGrupos/show_one_CategoriaGrupos.component';
import { Create_CategoriaGruposComponent } from './components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Edit_CategoriaGruposComponent } from './components/CategoriaGrupos/edit_CategoriaGrupos/edit_CategoriaGrupos.component';
import { Delete_CategoriaGruposComponent } from './components/CategoriaGrupos/delete_CategoriaGrupos/delete_CategoriaGrupos.component';
import { Create_MincienciaCategoryComponent } from './components/MincienciasCategoria/create_MincienciaCategory/create_MincienciaCategory.component';
import { Delete_MincienciaCategoryComponent } from './components/MincienciasCategoria/delete_MincienciaCategory/delete_MincienciaCategory.component';
import { Edit_MincienciaCategoryComponent } from './components/MincienciasCategoria/edit_MincienciaCategory/edit_MincienciaCategory.component';
import { Show_MincienciaCategoryComponent } from './components/MincienciasCategoria/show_MincienciaCategory/show_MincienciaCategory.component';
import { Show_one_MincienciaCategoryComponent } from './components/MincienciasCategoria/show_one_MincienciaCategory/show_one_MincienciaCategory.component';
import { Create_Research_bondingComponent } from './components/VinculacionInvestigacion/create_Research_bonding/create_Research_bonding.component';
import { Delete_Research_bondingComponent } from './components/VinculacionInvestigacion/delete_Research_bonding/delete_Research_bonding.component';
import { Edit_Research_bondingComponent } from './components/VinculacionInvestigacion/edit_Research_bonding/edit_Research_bonding.component';
import { Show_one_Research_bondingComponent } from './components/VinculacionInvestigacion/show_one_Research_bonding/show_one_Research_bonding.component';
import { Show_Research_bondingComponent } from './components/VinculacionInvestigacion/show_Research_bonding/show_Research_bonding.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InvestigationRoutingModule,
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
    TableModule
,KeyFilterModule,
DropdownModule,
CalendarModule,
FieldsetModule,
FileUploadModule

  ],
  entryComponents: [
    
  ],
  
  providers: [DynamicDialogRef,DynamicDialogConfig],
  declarations: [
    InvestigationComponent,
        //roles investigacion
        CrearRolInvestigationComponent,
        DeleteRolInvestigationComponent,
        EditRolInvestigationComponent,
        ShowOneRolInvestigationComponent,
        ShowRolInvestigationComponent,
    // escalafon
        Show_EscalafonComponent,
        Show_one_EscalafonComponent,
        Create_EscalafonComponent,
        Edit_EscalafonComponent,
        Delete_EscalafonComponent,
    // Categoria grupos
        Show_CategoriaGruposComponent,
        Show_one_CategoriaGruposComponent,
        Create_CategoriaGruposComponent,
        Edit_CategoriaGruposComponent,
        Delete_CategoriaGruposComponent,
        // minciencias
        Create_MincienciaCategoryComponent,
        Delete_MincienciaCategoryComponent,
        Edit_MincienciaCategoryComponent,
        Show_MincienciaCategoryComponent,
        Show_one_MincienciaCategoryComponent,
        // viculacion de investigacion
        Create_Research_bondingComponent,
        Delete_Research_bondingComponent,
        Edit_Research_bondingComponent,
        Show_one_Research_bondingComponent,
        Show_Research_bondingComponent
  ]
})
export class InvestigationModule { }
