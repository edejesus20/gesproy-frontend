import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { PrivateLayoutComponent } from './private-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from 'src/app/main/dashboard/dashboard-routing.module';
import { ProcedimientosRoutingModule } from 'src/app/main/procedimientos/procedimientos-routing.module';
import { UsuariosRoutingModule } from 'src/app/main/usuarios/usuarios-routing.module';
import { VisualizarConvocatoriasRoutingModule } from 'src/app/main/visualizarConvocatorias/visualzarConvocatorias-routing.module';
import { InstitutionRoutingModule } from 'src/app/main/institution/institution-routing.module';
import { IndicadoresRoutingModule } from 'src/app/main/Indicadores/Indicadores-routing.module';
import { TareasycompromisoRoutingModule } from 'src/app/main/tareasycompromiso/tareasycompromiso-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { LandingComponent } from './landing/landing.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuComponent } from './menu/menu.component';
import {BadgeModule} from 'primeng/badge';
import { AvatarComponent } from './avatar/avatar.component';
import {DataViewModule} from 'primeng/dataview';
import { PerfilComponent } from './perfil/perfil.component';
import {AccordionModule} from 'primeng/accordion';
import {MultiSelectModule} from 'primeng/multiselect';
import {StyleClassModule} from 'primeng/styleclass';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AnunciosComponent } from './Anuncios/Anuncios.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {ScrollTopModule} from 'primeng/scrolltop';
@NgModule({
  declarations: [
    PrivateLayoutComponent, 
    LandingComponent,
    MenuComponent,
    AvatarComponent,
    PerfilComponent,
    AnunciosComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataViewModule,
    DashboardRoutingModule,
    PrivateLayoutRoutingModule,
    ProcedimientosRoutingModule,
    UsuariosRoutingModule,
    InstitutionRoutingModule,
    VisualizarConvocatoriasRoutingModule,
    TareasycompromisoRoutingModule,
    IndicadoresRoutingModule,
    AccordionModule,
    HttpClientModule,
    FormsModule,
    TabMenuModule,
    TabViewModule,
    ScrollTopModule,
    BrowserModule,
    BrowserAnimationsModule,
    InstitutionRoutingModule,
    MultiSelectModule,
    StyleClassModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    InputTextModule,
    OverlayPanelModule,
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
    // SharedModule,
    // VirtualScrollerModule,
    TableModule,
    KeyFilterModule,
    DropdownModule,
    CalendarModule,

    PanelModule,
    AutoCompleteModule,
    InputNumberModule,
    CarouselModule,

    SlideMenuModule,

    FieldsetModule,
    FileUploadModule,
    InputTextareaModule,
    ConfirmDialogModule,
    BadgeModule
  ],
  providers: [DynamicDialogRef,DynamicDialogConfig]
})
export class PrivateLayoutModule { }
