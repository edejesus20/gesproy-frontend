import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';

@Component({
  selector: 'app-show_one_CategoriaColciencias',
  templateUrl: './show_one_CategoriaColciencias.component.html',
  styleUrls: ['./show_one_CategoriaColciencias.component.css']
})
export class Show_one_CategoriaColcienciasComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ColcienciaCategoryI={
    id:0,
    name: '',
    createdAt:'',
    Teachers:[
      {
        id:0,
        UserId: 0,
        ScaleId: 0,
        ColcienciaCategoryId: 0,
        hours_of_dedication:'',
        User:
          {
            username: '',
            email: '',
            fullName: '',
          },
        Group:{
          id:0,
          name: '',
          ident_colciencias:''
        }
      }
    ]
    
  
  }
  constructor(
    private colcienciaCategoryService:ColcienciaCategoryService ,
    private primengConfig: PrimeNGConfig,

  ) { }


  ngOnInit() {
    this.primengConfig.ripple = true;
  
  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    //console.log(event)
  }

  ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  }
  actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
  this.colcienciaCategoryService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.colcienciaCategory.Teachers != undefined){
        
      this.form=cnt_groupFromApi.colcienciaCategory
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  
}
