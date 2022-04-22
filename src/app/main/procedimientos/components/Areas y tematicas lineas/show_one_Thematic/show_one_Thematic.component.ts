import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { ThematicI } from 'src/app/models/projet/line';

@Component({
  selector: 'app-show_one_Thematic',
  templateUrl: './show_one_Thematic.component.html',
  styleUrls: ['./show_one_Thematic.component.css']
})
export class Show_one_ThematicComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ThematicI={
    id:0,
    name: '',
    // createdAt:'',
  }
  constructor(
    private thematicService:ThematicService,
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
 this.thematicService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.thematic != undefined){
       
     this.form=cnt_groupFromApi.thematic
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }
}
