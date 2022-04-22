import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Knowledge_areaService } from 'src/app/core/services/Procedimientos/Knowledge_area.service';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { Knowledge_areaI } from 'src/app/models/institution/group';
import { ThematicI } from 'src/app/models/projet/line';
@Component({
  selector: 'app-show_one_Knowledge_area',
  templateUrl: './show_one_Knowledge_area.component.html',
  styleUrls: ['./show_one_Knowledge_area.component.css']
})
export class Show_one_Knowledge_areaComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:Knowledge_areaI={
    id:0,
    name: '',
    // createdAt:'',
  }
  constructor(
    private knowledge_areaService:Knowledge_areaService,
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
 this.knowledge_areaService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.knowledge_area != undefined){
       
     this.form=cnt_groupFromApi.knowledge_area
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }

}
