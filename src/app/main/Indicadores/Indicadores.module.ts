import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresComponent } from './Indicadores.component';
import { IndicadoresRoutingModule } from './Indicadores-routing.module';
import { Show_indicador_internoComponent } from './components/Indicadores internos/show_indicador_interno/show_indicador_interno.component';
import { Show_one_indicador_internoComponent } from './components/Indicadores internos/show_one_indicador_interno/show_one_indicador_interno.component';
import { Create_indicador_internoComponent } from './components/Indicadores internos/create_indicador_interno/create_indicador_interno.component';
import { Edit_indicador_internoComponent } from './components/Indicadores internos/edit_indicador_interno/edit_indicador_interno.component';
import { Delete_indicador_internoComponent } from './components/Indicadores internos/delete_indicador_interno/delete_indicador_interno.component';
import { Show_indicador_externoComponent } from './components/Indicadores externos/show_indicador_externo/show_indicador_externo.component';
import { Show_one_indicador_externoComponent } from './components/Indicadores externos/show_one_indicador_externo/show_one_indicador_externo.component';
import { Create_indicador_externoComponent } from './components/Indicadores externos/create_indicador_externo/create_indicador_externo.component';
import { Edit_indicador_externoComponent } from './components/Indicadores externos/edit_indicador_externo/edit_indicador_externo.component';
import { Delete_indicador_externoComponent } from './components/Indicadores externos/delete_indicador_externo/delete_indicador_externo.component';
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
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
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
    IndicadoresComponent,
    Show_indicador_internoComponent,
    Show_one_indicador_internoComponent,
    Create_indicador_internoComponent,
    Edit_indicador_internoComponent,
    Delete_indicador_internoComponent,
    Show_indicador_externoComponent,
    Show_one_indicador_externoComponent,
    Create_indicador_externoComponent,
    Edit_indicador_externoComponent,
    Delete_indicador_externoComponent]
})
export class IndicadoresModule { }
