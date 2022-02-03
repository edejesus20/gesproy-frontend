import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-show_one_Relaciones',
  templateUrl: './show_one_Relaciones.component.html',
  styleUrls: ['./show_one_Relaciones.component.css']
})
export class Show_one_RelacionesComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:RelationshipI={
    id:0,
    name: '',
    createdAt:'',
  }
  constructor(
    private relationshipService:RelationshipService ,
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
  this.relationshipService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.relationship != undefined){
        
      this.form=cnt_groupFromApi.relationship
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
