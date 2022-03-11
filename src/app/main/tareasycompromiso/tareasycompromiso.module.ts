import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasycompromisoRoutingModule } from './tareasycompromiso-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { TareasycompromisoComponent } from './tareasycompromiso.component';
import { Show_tareaspendientesComponent } from './components/Pendinetes/show_tareaspendientes/show_tareaspendientes.component';
import { Show_one_tareaspendientesComponent } from './components/Pendinetes/show_one_tareaspendientes/show_one_tareaspendientes.component';
import { Create_tareaspendientesComponent } from './components/Pendinetes/create_tareaspendientes/create_tareaspendientes.component';
import { Edit_tareaspendientesComponent } from './components/Pendinetes/edit_tareaspendientes/edit_tareaspendientes.component';
import { Delete_tareaspendientesComponent } from './components/Pendinetes/delete_tareaspendientes/delete_tareaspendientes.component';
import { Show_tareasenprocesoComponent } from './components/En Procesos/show_tareasenproceso/show_tareasenproceso.component';
import { Show_one_tareasenprocesoComponent } from './components/En Procesos/show_one_tareasenproceso/show_one_tareasenproceso.component';
import { Create_tareasenprocesoComponent } from './components/En Procesos/create_tareasenproceso/create_tareasenproceso.component';
import { Edit_tareasenprocesoComponent } from './components/En Procesos/edit_tareasenproceso/edit_tareasenproceso.component';
import { Delete_tareasenprocesoComponent } from './components/En Procesos/delete_tareasenproceso/delete_tareasenproceso.component';
import { Show_tareascompletadasComponent } from './components/Completadas/show_tareascompletadas/show_tareascompletadas.component';
import { Show_one_tareascompletadasComponent } from './components/Completadas/show_one_tareascompletadas/show_one_tareascompletadas.component';
import { Create_tareascompletadasComponent } from './components/Completadas/create_tareascompletadas/create_tareascompletadas.component';
import { Edit_tareascompletadasComponent } from './components/Completadas/edit_tareascompletadas/edit_tareascompletadas.component';
import { Delete_tareascompletadasComponent } from './components/Completadas/delete_tareascompletadas/delete_tareascompletadas.component';
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
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { Create_tipo_tareasComponent } from './components/tipos_tareas/create_tipo_tareas/create_tipo_tareas.component';
import { Delete_tipo_tareasComponent } from './components/tipos_tareas/delete_tipo_tareas/delete_tipo_tareas.component';
import { Edit_tipo_tareasComponent } from './components/tipos_tareas/edit_tipo_tareas/edit_tipo_tareas.component';
import { Show_one_tipo_tareasComponent } from './components/tipos_tareas/show_one_tipo_tareas/show_one_tipo_tareas.component';
import { Show_tipo_tareasComponent } from './components/tipos_tareas/show_tipo_tareas/show_tipo_tareas.component';
import { Create_pasos_tareasComponent } from './components/pasos_tareas/create_pasos_tareas/create_pasos_tareas.component';
import { Delete_pasos_tareasComponent } from './components/pasos_tareas/delete_pasos_tareas/delete_pasos_tareas.component';
import { Edit_pasos_tareasComponent } from './components/pasos_tareas/edit_pasos_tareas/edit_pasos_tareas.component';
import { Show_one_pasos_tareasComponent } from './components/pasos_tareas/show_one_pasos_tareas/show_one_pasos_tareas.component';
import { Show_pasos_tareasComponent } from './components/pasos_tareas/show_pasos_tareas/show_pasos_tareas.component';

@NgModule({
  imports: [
    CommonModule,
    TareasycompromisoRoutingModule,
    SharedModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
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
    FileUploadModule
  ],
  declarations: [	
    TareasycompromisoComponent,
    Show_tareaspendientesComponent,
    Show_one_tareaspendientesComponent,
    Create_tareaspendientesComponent,
    Edit_tareaspendientesComponent,
    Delete_tareaspendientesComponent,
    Show_tareasenprocesoComponent,
    Show_one_tareasenprocesoComponent,
    Create_tareasenprocesoComponent,
    Edit_tareasenprocesoComponent,
    Delete_tareasenprocesoComponent,
    Show_tareascompletadasComponent,
    Show_one_tareascompletadasComponent,
    Create_tareascompletadasComponent,
    Edit_tareascompletadasComponent,
    Delete_tareascompletadasComponent,

    Create_tipo_tareasComponent,
    Delete_tipo_tareasComponent,
    Edit_tipo_tareasComponent,
    Show_one_tipo_tareasComponent,
    Show_tipo_tareasComponent,

    Create_pasos_tareasComponent,
    Delete_pasos_tareasComponent,
    Edit_pasos_tareasComponent,
    Show_one_pasos_tareasComponent,
    Show_pasos_tareasComponent,
   ]
})
export class TareasycompromisoModule { }
