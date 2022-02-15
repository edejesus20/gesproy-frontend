import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { NgForm } from '@angular/forms';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-delete_Escalafon',
  templateUrl: './delete_Escalafon.component.html',
  styleUrls: ['./delete_Escalafon.component.css']
})
export class Delete_EscalafonComponent implements OnInit {

  public mostrar:number=2;
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

 public onSubmit(f:NgForm) {
  // console.log(f)

  let formValue: ScaleI = {
    id:this.form.id,
    name: this.form.name,
  };
  // console.log(formValue)

  if(formValue.name != ''){
    if(formValue.id)
  this.scaleService.deleteItem(formValue.id).subscribe(
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
              detail: 'Registro de Escalafon Eliminado con exitoso'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.router.navigateByUrl('/institution/mostrar_scales');
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
