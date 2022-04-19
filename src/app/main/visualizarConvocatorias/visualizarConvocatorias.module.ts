import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarConvocatoriasComponent } from './visualizarConvocatorias.component';
import { VisualizarConvocatoriasRoutingModule } from './visualzarConvocatorias-routing.module';
import { Show_convocatoriaComponent } from './components/convocatorias/show_convocatoria/show_convocatoria.component';
import { Create_convocatoriaComponent } from './components/convocatorias/create_convocatoria/create_convocatoria.component';
import { Show_one_convocatoriaComponent } from './components/convocatorias/show_one_convocatoria/show_one_convocatoria.component';
import { Edit_convocatoriaComponent } from './components/convocatorias/edit_convocatoria/edit_convocatoria.component';
import { Delete_convocatoriaComponent } from './components/convocatorias/delete_convocatoria/delete_convocatoria.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@NgModule({
  imports: [
    CommonModule,
    VisualizarConvocatoriasRoutingModule,
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
    FileUploadModule
  ],
  declarations: [
    VisualizarConvocatoriasComponent,
    Show_convocatoriaComponent,
    Create_convocatoriaComponent,
    Show_one_convocatoriaComponent,
    Edit_convocatoriaComponent,
    Delete_convocatoriaComponent
  ],
  
  providers: [DynamicDialogRef,DynamicDialogConfig]
})
export class VisualizarConvocatoriasModule { }
