import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { ScaleI } from 'src/app/models/institution/scale';

@Component({
  selector: 'app-show_one_Escalafon',
  templateUrl: './show_one_Escalafon.component.html',
  styleUrls: ['./show_one_Escalafon.component.css']
})
export class Show_one_EscalafonComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ScaleI={
    id:0,
    name: '',
    createdAt:'',
  }
  constructor(
    private scaleService:ScaleService,
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
 this.scaleService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.scale != undefined){
       
     this.form=cnt_groupFromApi.scale
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }
}
