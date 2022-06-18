import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
const translate = require('translate');
@Component({
  selector: 'app-edit_Research_bonding',
  templateUrl: './edit_Research_bonding.component.html',
  styleUrls: ['./edit_Research_bonding.component.css']
})
export class Edit_Research_bondingComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:Research_bondingI={
    id:0,
    name: '',
    createdAt:'',
  }
  public bandera:boolean=false

blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

  constructor(
    private research_bondingService:Research_bondingService ,
     private primengConfig: PrimeNGConfig,
     private router: Router,
     private messageService:MessageService,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

  }
  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: Research_bondingI = {
      id:this.form.id,
      name: f.form.value.name,
    };
    // console.log(formValue)

    if(formValue.name != '' && formValue.id){
   this.bandera=true
    this.research_bondingService.updateItem(formValue.id,formValue).subscribe(
      () => {
              var date = new Date('2020-01-01 00:00:03');
                function padLeft(n:any){ 
                   return n ="00".substring(0, "00".length - n.length) + n;
                }
                var interval = setInterval(() => {
                var minutes = padLeft(date.getMinutes() + "");
                var seconds = padLeft(date.getSeconds() + "");
                // console.log(minutes, seconds);
                if( seconds == '03') {
                this.messageService.add({severity:'success', summary: 'Success', 
                detail: 'Vinculación de investigación Actualizada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  // this.router.navigateByUrl('/Investigation/mostrar_Research_bondings');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
          this.bandera=false

          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
  }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.bandera=false

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
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }
}
