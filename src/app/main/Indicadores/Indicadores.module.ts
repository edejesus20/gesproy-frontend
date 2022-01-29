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

@NgModule({
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
   
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
