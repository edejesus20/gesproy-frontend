import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';

@Component({
  selector: 'app-show_one_MincienciaCategory',
  templateUrl: './show_one_MincienciaCategory.component.html',
  styleUrls: ['./show_one_MincienciaCategory.component.css']
})
export class Show_one_MincienciaCategoryComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:MincienciaCategoryI={
    id:0,
    name: '',
    createdAt:'',
    Teachers:[
      {
        id:0,
        UserId: 0,
        ScaleId: 0,
        MincienciaCategoryId: '',
        // hours_of_dedication:'',
        ChargeBondingId:0,
        User:
          {
            username: '',
            email: '',
            fullName: '',
          },
          Group:undefined
      }
    ]
    
  
  }
  constructor(
    private mincienciaCategoryService:MincienciaCategoryService ,
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
  this.mincienciaCategoryService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.mincienciaCategory.Teachers != undefined){
        
      this.form=cnt_groupFromApi.mincienciaCategory
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }


}
