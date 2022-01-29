import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarConvocatoriasComponent } from './visualizarConvocatorias.component';
import { VisualizarConvocatoriasRoutingModule } from './visualzarConvocatorias-routing.module';
import { Show_convocatoriaComponent } from './components/convocatorias/show_convocatoria/show_convocatoria.component';
import { Create_convocatoriaComponent } from './components/convocatorias/create_convocatoria/create_convocatoria.component';
import { Show_one_convocatoriaComponent } from './components/convocatorias/show_one_convocatoria/show_one_convocatoria.component';
import { Edit_convocatoriaComponent } from './components/convocatorias/edit_convocatoria/edit_convocatoria.component';
import { Delete_convocatoriaComponent } from './components/convocatorias/delete_convocatoria/delete_convocatoria.component';

@NgModule({
  imports: [
    CommonModule,
    VisualizarConvocatoriasRoutingModule
  ],
  declarations: [
    VisualizarConvocatoriasComponent,
    Show_convocatoriaComponent,
    Create_convocatoriaComponent,
    Show_one_convocatoriaComponent,
    Edit_convocatoriaComponent,
    Delete_convocatoriaComponent
  ]
})
export class VisualizarConvocatoriasModule { }
