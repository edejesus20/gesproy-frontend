import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { TrainingI } from 'src/app/models/institution/training';

@Component({
  selector: 'app-show_one_capacitacion',
  templateUrl: './show_one_capacitacion.component.html',
  styleUrls: ['./show_one_capacitacion.component.css']
})
export class Show_one_capacitacionComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:TrainingI={
    id:0,
    name: '',
    createdAt:'',
  }
  constructor(
    private trainingsService:TrainingsService,
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
 this.trainingsService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.training != undefined){
       
     this.form=cnt_groupFromApi.training
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }

}
