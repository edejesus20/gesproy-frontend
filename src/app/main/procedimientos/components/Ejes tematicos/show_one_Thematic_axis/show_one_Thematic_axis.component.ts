import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';
import { Thematic_axisI } from 'src/app/models/projet/line';

@Component({
  selector: 'app-show_one_Thematic_axis',
  templateUrl: './show_one_Thematic_axis.component.html',
  styleUrls: ['./show_one_Thematic_axis.component.css']
})
export class Show_one_Thematic_axisComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:Thematic_axisI={
    id:0,
    name: '',
    // createdAt:'',
  }
  constructor(
    private thematic_axisService:Thematic_axisService,
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
 this.thematic_axisService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.thematic_axis != undefined){
       
     this.form=cnt_groupFromApi.thematic_axis
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }
}
