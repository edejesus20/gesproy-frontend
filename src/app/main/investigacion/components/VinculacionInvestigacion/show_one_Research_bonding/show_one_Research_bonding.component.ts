import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
@Component({
  selector: 'app-show_one_Research_bonding',
  templateUrl: './show_one_Research_bonding.component.html',
  styleUrls: ['./show_one_Research_bonding.component.css']
})
export class Show_one_Research_bondingComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:Research_bondingI={
    id:0,
    name: '',
    createdAt:'',
  }
  constructor(
    private research_bondingService:Research_bondingService ,
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
  this.research_bondingService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.research_bonding != undefined){
        
      this.form=cnt_groupFromApi.research_bonding
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }
}
