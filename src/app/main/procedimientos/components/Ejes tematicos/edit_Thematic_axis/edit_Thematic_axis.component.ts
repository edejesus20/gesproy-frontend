import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Thematic_axisI } from 'src/app/models/projet/line';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';

const translate = require('translate');

@Component({
  selector: 'app-edit_Thematic_axis',
  templateUrl: './edit_Thematic_axis.component.html',
  styleUrls: ['./edit_Thematic_axis.component.css']
})
export class Edit_Thematic_axisComponent implements OnInit {

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:Thematic_axisI={
    id:0,
    name: '',
  }
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

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

 public onSubmit(f:NgForm) {
  // console.log(f)

  let formValue: Thematic_axisI = {
    id:this.form.id,
    name: f.form.value.name,
  };
  // console.log(formValue)

  if(formValue.name != ''){
    if(formValue.id)
  this.thematic_axisService.updateItem(formValue.id,formValue).subscribe(
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
              detail: 'Eje tem??tico Actualizado con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.router.navigateByUrl('/Procedimientos/Thematic_axis');
                clearInterval(interval); 
               }
        }, 1000);
    },async error => {
      if(error != undefined) {
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
}
