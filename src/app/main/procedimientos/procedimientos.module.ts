import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedimientosComponent } from './procedimientos.component';
import { ProcedimientosRoutingModule } from './procedimientos-routing.module';
import { Show_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_grupodeInvetigacion/show_grupodeInvetigacion.component';
import { Show_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_proyectosdeinvestigacion/show_proyectosdeinvestigacion.component';
import { Show_semillerosComponent } from './components/Semilleros/show_semilleros/show_semilleros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Create_semillerosComponent } from './components/Semilleros/create_semilleros/create_semilleros.component';
import { Create_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/create_proyectosdeinvestigacion/create_proyectosdeinvestigacion.component';
import { Create_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/create_grupodeInvetigacion/create_grupodeInvetigacion.component';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { Show_one_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/show_one_grupodeInvetigacion/show_one_grupodeInvetigacion.component';
import { Edit_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/edit_grupodeInvetigacion/edit_grupodeInvetigacion.component';
import { Delete_grupodeInvetigacionComponent } from './components/Grupos de Investigacion/delete_grupodeInvetigacion/delete_grupodeInvetigacion.component';
import { Show_one_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/show_one_proyectosdeinvestigacion/show_one_proyectosdeinvestigacion.component';
import { Edit_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/edit_proyectosdeinvestigacion/edit_proyectosdeinvestigacion.component';
import { Delete_proyectosdeinvestigacionComponent } from './components/ProyectosdeInvestigacion/delete_proyectosdeinvestigacion/delete_proyectosdeinvestigacion.component';
import { Show_one_semillerosComponent } from './components/Semilleros/show_one_semilleros/show_one_semilleros.component';
import { Edit_semillerosComponent } from './components/Semilleros/edit_semilleros/edit_semilleros.component';
import { Delete_semillerosComponent } from './components/Semilleros/delete_semilleros/delete_semilleros.component';
import { Show_librosComponent } from './components/libros/show_libros/show_libros.component';
import { Show_one_librosComponent } from './components/libros/show_one_libros/show_one_libros.component';
import { Create_librosComponent } from './components/libros/create_libros/create_libros.component';
import { Edit_librosComponent } from './components/libros/edit_libros/edit_libros.component';
import { Delete_librosComponent } from './components/libros/delete_libros/delete_libros.component';
import { Show_ponenciasComponent } from './components/Ponencias/show_ponencias/show_ponencias.component';
import { Show_one_ponenciasComponent } from './components/Ponencias/show_one_ponencias/show_one_ponencias.component';
import { Create_ponenciasComponent } from './components/Ponencias/create_ponencias/create_ponencias.component';
import { Edit_ponenciasComponent } from './components/Ponencias/edit_ponencias/edit_ponencias.component';
import { Delete_ponenciasComponent } from './components/Ponencias/delete_ponencias/delete_ponencias.component';
import { Show_eventosacademicosComponent } from './components/Eventos Academicos/show_eventosacademicos/show_eventosacademicos.component';
import { Show_one_eventosacademicosComponent } from './components/Eventos Academicos/show_one_eventosacademicos/show_one_eventosacademicos.component';
import { Create_eventosacademicosComponent } from './components/Eventos Academicos/create_eventosacademicos/create_eventosacademicos.component';
import { Edit_eventosacademicosComponent } from './components/Eventos Academicos/edit_eventosacademicos/edit_eventosacademicos.component';
import { Delete_eventosacademicosComponent } from './components/Eventos Academicos/delete_eventosacademicos/delete_eventosacademicos.component';
import { Show_educacioncontinuadaComponent } from './components/Educacion Continuada/show_educacioncontinuada/show_educacioncontinuada.component';
import { Show_one_educacioncontinuadaComponent } from './components/Educacion Continuada/show_one_educacioncontinuada/show_one_educacioncontinuada.component';
import { Create_educacioncontinuadaComponent } from './components/Educacion Continuada/create_educacioncontinuada/create_educacioncontinuada.component';
import { Edit_educacioncontinuadaComponent } from './components/Educacion Continuada/edit_educacioncontinuada/edit_educacioncontinuada.component';
import { Delete_educacioncontinuadaComponent } from './components/Educacion Continuada/delete_educacioncontinuada/delete_educacioncontinuada.component';
import { Show_proyectodeextensionComponent } from './components/Proyecto de Extension/show_proyectodeextension/show_proyectodeextension.component';
import { Show_one_proyectodeextensionComponent } from './components/Proyecto de Extension/show_one_proyectodeextension/show_one_proyectodeextension.component';
import { Create_proyectodeextensionComponent } from './components/Proyecto de Extension/create_proyectodeextension/create_proyectodeextension.component';
import { Edit_proyectodeextensionComponent } from './components/Proyecto de Extension/edit_proyectodeextension/edit_proyectodeextension.component';
import { Delete_proyectodeextensionComponent } from './components/Proyecto de Extension/delete_proyectodeextension/delete_proyectodeextension.component';
import { Show_consultoriasComponent } from './components/Consultorias/show_consultorias/show_consultorias.component';
import { Show_one_consultoriasComponent } from './components/Consultorias/show_one_consultorias/show_one_consultorias.component';
import { Create_consultoriasComponent } from './components/Consultorias/create_consultorias/create_consultorias.component';
import { Edit_consultoriasComponent } from './components/Consultorias/edit_consultorias/edit_consultorias.component';
import { Delete_consultoriasComponent } from './components/Consultorias/delete_consultorias/delete_consultorias.component';
import { Show_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_convenioscooperacion/show_convenioscooperacion.component';
import { Show_one_convenioscooperacionComponent } from './components/Convenios de Cooperacion/show_one_convenioscooperacion/show_one_convenioscooperacion.component';
import { Create_convenioscooperacionComponent } from './components/Convenios de Cooperacion/create_convenioscooperacion/create_convenioscooperacion.component';
import { Edit_convenioscooperacionComponent } from './components/Convenios de Cooperacion/edit_convenioscooperacion/edit_convenioscooperacion.component';
import { Delet_convenioscooperacionComponent } from './components/Convenios de Cooperacion/delet_convenioscooperacion/delet_convenioscooperacion.component';
import { Show_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_asistenciaComites/show_asistenciaComites.component';
import { Show_one_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/show_one_asistenciaComites/show_one_asistenciaComites.component';
import { Create_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/create_asistenciaComites/create_asistenciaComites.component';
import { Edit_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/edit_asistenciaComites/edit_asistenciaComites.component';
import { Delete_asistenciaComitesComponent } from './components/Asistencia y Participacion Comites/delete_asistenciaComites/delete_asistenciaComites.component';
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
import {InputTextareaModule} from 'primeng/inputtextarea';
import { Create_linesComponent } from './components/Lineas/create_lines/create_lines.component';
import { Delete_linesComponent } from './components/Lineas/delete_lines/delete_lines.component';
import { Edit_linesComponent } from './components/Lineas/edit_lines/edit_lines.component';
import { Show_one_linesComponent } from './components/Lineas/show_one_lines/show_one_lines.component';
import { Show_linesComponent } from './components/Lineas/show_lines/show_lines.component';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Show_ThematicComponent } from './components/Areas y tematicas lineas/show_Thematic/show_Thematic.component';
import { Show_one_ThematicComponent } from './components/Areas y tematicas lineas/show_one_Thematic/show_one_Thematic.component';
import { Edit_ThematicComponent } from './components/Areas y tematicas lineas/edit_Thematic/edit_Thematic.component';
import { Delete_ThematicComponent } from './components/Areas y tematicas lineas/delete_Thematic/delete_Thematic.component';
import { Create_ThematicComponent } from './components/Areas y tematicas lineas/create_Thematic/create_Thematic.component';
import { Create_Knowledge_areaComponent } from './components/Areas de conocimiento/create_Knowledge_area/create_Knowledge_area.component';
import { Delete_Knowledge_areaComponent } from './components/Areas de conocimiento/delete_Knowledge_area/delete_Knowledge_area.component';
import { Edit_Knowledge_areaComponent } from './components/Areas de conocimiento/edit_Knowledge_area/edit_Knowledge_area.component';
import { Show_Knowledge_areaComponent } from './components/Areas de conocimiento/show_Knowledge_area/show_Knowledge_area.component';
import { Show_one_Knowledge_areaComponent } from './components/Areas de conocimiento/show_one_Knowledge_area/show_one_Knowledge_area.component';
import { Show_Thematic_axisComponent } from './components/Ejes tematicos/show_Thematic_axis/show_Thematic_axis.component';
import { Show_one_Thematic_axisComponent } from './components/Ejes tematicos/show_one_Thematic_axis/show_one_Thematic_axis.component';
import { Edit_Thematic_axisComponent } from './components/Ejes tematicos/edit_Thematic_axis/edit_Thematic_axis.component';
import { Delete_Thematic_axisComponent } from './components/Ejes tematicos/delete_Thematic_axis/delete_Thematic_axis.component';
import { Create_Thematic_axisComponent } from './components/Ejes tematicos/create_Thematic_axis/create_Thematic_axis.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [
    ProcedimientosComponent,
    Show_grupodeInvetigacionComponent,
    Show_one_grupodeInvetigacionComponent,
    Edit_grupodeInvetigacionComponent,
    Create_grupodeInvetigacionComponent,
    Delete_grupodeInvetigacionComponent,
    
    Show_proyectosdeinvestigacionComponent,
    Show_one_proyectosdeinvestigacionComponent,
    Create_proyectosdeinvestigacionComponent,
    Delete_proyectosdeinvestigacionComponent,
    Edit_proyectosdeinvestigacionComponent,

    Show_semillerosComponent,
    Show_one_semillerosComponent,
    Create_semillerosComponent,
    Edit_semillerosComponent,
    Delete_semillerosComponent,
    
    Show_librosComponent,
    Show_one_librosComponent,
    Create_librosComponent,
    Edit_librosComponent,
    Delete_librosComponent,

    Show_ponenciasComponent,
    Show_one_ponenciasComponent,
    Create_ponenciasComponent,
    Edit_ponenciasComponent,
    Delete_ponenciasComponent,

    Show_eventosacademicosComponent,
    Show_one_eventosacademicosComponent,
    Create_eventosacademicosComponent,
    Edit_eventosacademicosComponent,
    Delete_eventosacademicosComponent,

    Show_educacioncontinuadaComponent,
    Show_one_educacioncontinuadaComponent,
    Create_educacioncontinuadaComponent,
    Edit_educacioncontinuadaComponent,
    Delete_educacioncontinuadaComponent,

    Show_proyectodeextensionComponent,
    Show_one_proyectodeextensionComponent,
    Create_proyectodeextensionComponent,
    Edit_proyectodeextensionComponent,
    Delete_proyectodeextensionComponent,

    Show_consultoriasComponent,
    Show_one_consultoriasComponent,
    Create_consultoriasComponent,
    Edit_consultoriasComponent,
    Delete_consultoriasComponent,

    Show_convenioscooperacionComponent,
    Show_one_convenioscooperacionComponent,
    Create_convenioscooperacionComponent,
    Edit_convenioscooperacionComponent,
    Delet_convenioscooperacionComponent,

    Show_asistenciaComitesComponent,
    Show_one_asistenciaComitesComponent,
    Create_asistenciaComitesComponent,
    Edit_asistenciaComitesComponent,
    Delete_asistenciaComitesComponent,


    Create_linesComponent,
    Delete_linesComponent,
    Edit_linesComponent,
    Show_linesComponent,
    Show_one_linesComponent,
    Show_ThematicComponent,
    Show_one_ThematicComponent,
    Edit_ThematicComponent,
    Delete_ThematicComponent,
    Create_ThematicComponent,

    Create_Knowledge_areaComponent,
    Delete_Knowledge_areaComponent,
    Edit_Knowledge_areaComponent,
    Show_Knowledge_areaComponent,
    Show_one_Knowledge_areaComponent,

    Create_Thematic_axisComponent,
    Delete_Thematic_axisComponent,
    Edit_Thematic_axisComponent,
    Show_one_Thematic_axisComponent,
    Show_Thematic_axisComponent

    
  ],
  imports: [
    StepsModule,
    CommonModule,
    ProcedimientosRoutingModule,
    InputTextareaModule,
    SharedModule,
    AutoCompleteModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ScrollingModule,

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
    FileUploadModule,
    DynamicDialogModule,
    PanelModule
 
  ],
  
  providers: [DynamicDialogRef,DynamicDialogConfig]

})
export class ProcedimientosModule { }
