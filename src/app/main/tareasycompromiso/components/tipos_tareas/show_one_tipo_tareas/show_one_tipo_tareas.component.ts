import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';

@Component({
  selector: 'app-show_one_tipo_tareas',
  templateUrl: './show_one_tipo_tareas.component.html',
  styleUrls: ['./show_one_tipo_tareas.component.css']
})
export class Show_one_tipo_tareasComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ProductivityTypeI={
    id:0,
    name: '',
    createdAt:'',
  }
  constructor(
    private productivity_typesService:Productivity_typesService,
     private primengConfig: PrimeNGConfig,
     private router: Router,
     private messageService:MessageService,
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
  this.productivity_typesService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.productivityType != undefined){
        
      this.form=cnt_groupFromApi.productivityType
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
