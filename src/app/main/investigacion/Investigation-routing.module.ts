import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestigationComponent } from './Investigation.component';
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
import { Show_MincienciaCategoryComponent } from './components/MincienciasCategoria/show_MincienciaCategory/show_MincienciaCategory.component';
import { Show_one_MincienciaCategoryComponent } from './components/MincienciasCategoria/show_one_MincienciaCategory/show_one_MincienciaCategory.component';
import { Create_MincienciaCategoryComponent } from './components/MincienciasCategoria/create_MincienciaCategory/create_MincienciaCategory.component';
import { Edit_MincienciaCategoryComponent } from './components/MincienciasCategoria/edit_MincienciaCategory/edit_MincienciaCategory.component';
import { Delete_MincienciaCategoryComponent } from './components/MincienciasCategoria/delete_MincienciaCategory/delete_MincienciaCategory.component';
import { Show_Research_bondingComponent } from './components/VinculacionInvestigacion/show_Research_bonding/show_Research_bonding.component';
import { Show_one_Research_bondingComponent } from './components/VinculacionInvestigacion/show_one_Research_bonding/show_one_Research_bonding.component';
import { Create_Research_bondingComponent } from './components/VinculacionInvestigacion/create_Research_bonding/create_Research_bonding.component';
import { Edit_Research_bondingComponent } from './components/VinculacionInvestigacion/edit_Research_bonding/edit_Research_bonding.component';
import { Delete_Research_bondingComponent } from './components/VinculacionInvestigacion/delete_Research_bonding/delete_Research_bonding.component';

const routes: Routes = [
    {
        path: '',
        component: InvestigationComponent,
        children:[
            //categorias de grupo
          {
            path:'mostrar_categorys',
            component:Show_CategoriaGruposComponent
          },

          {
            path:'mostrar_category/:id',
            component:Show_one_CategoriaGruposComponent
          },
          {
            path:'create_category',
            component:Create_CategoriaGruposComponent
          },
          {
            path:'edit_category/:id',
            component:Edit_CategoriaGruposComponent
          },
          {
            path:'delete_category/:id',
            component:Delete_CategoriaGruposComponent
          },
           //escalafon
           {
            path:'mostrar_scales',
            component:Show_EscalafonComponent
          },
          {
            path:'mostrar_scale/:id',
            component:Show_one_EscalafonComponent
          },
          {
            path:'create_scale',
            component:Create_EscalafonComponent
          },
          {
            path:'edit_scale/:id',
            component:Edit_EscalafonComponent
          },
          {
            path:'delete_scale/:id',
            component:Delete_EscalafonComponent
          },

           //rol investigaciones
            {
            path: 'mostrar_RoleInvestigations',
            component: ShowRolInvestigationComponent,
            },
            {
            path: 'mostrar_RoleInvestigation/:id',
            component:ShowOneRolInvestigationComponent ,
            },
            {
            path: 'crear_RoleInvestigation',
            component:CrearRolInvestigationComponent ,
            },   
            {
            path: 'edit_RoleInvestigation/:id',
            component: EditRolInvestigationComponent,
            },
            {
            path: 'delete_RoleInvestigation/:id',
            component:DeleteRolInvestigationComponent ,
            },


            // minciencias

            {
            path: 'mostrar_MincienciaCategorys',
            component: Show_MincienciaCategoryComponent,
            },
            {
            path: 'mostrar_MincienciaCategory/:id',
            component:Show_one_MincienciaCategoryComponent ,
            },
            {
            path: 'create_MincienciaCategory',
            component:Create_MincienciaCategoryComponent ,
            },   
            {
            path: 'edit_MincienciaCategory/:id',
            component: Edit_MincienciaCategoryComponent,
            },
            {
            path: 'delete_MincienciaCategory/:id',
            component:Delete_MincienciaCategoryComponent ,
            },

        // viculacion de investigacion
        {
        path: 'mostrar_Research_bondings',
        component: Show_Research_bondingComponent,
        },
        {
        path: 'mostrar_Research_bonding/:id',
        component:Show_one_Research_bondingComponent ,
        },
        {
        path: 'create_Research_bonding',
        component:Create_Research_bondingComponent ,
        },   
        {
        path: 'edit_Research_bonding/:id',
        component: Edit_Research_bondingComponent,
        },
        {
        path: 'delete_Research_bonding/:id',
        component:Delete_Research_bondingComponent ,
        }    
        ]
     } ,
     {
       path: '**',
       redirectTo: '/landing'
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationRoutingModule { }