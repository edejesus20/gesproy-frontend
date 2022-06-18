import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { TrainingI } from 'src/app/models/institution/training';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-delete_capacitacion',
  templateUrl: './delete_capacitacion.component.html',
  styleUrls: ['./delete_capacitacion.component.css']
})
export class Delete_capacitacionComponent implements OnInit {


  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:TrainingI={
    id:0,
    name: '',
    createdAt:'',
  }
  public bandera:boolean=false

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
 this.trainingsService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.training != undefined){
       
     this.form=cnt_groupFromApi.training
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }
 public onSubmit(f:NgForm) {
  // console.log(f)

  let formValue: TrainingI = {
    id:this.form.id,
    name:this.form.name,
  };
  // console.log(formValue)
    if(formValue.id){
      this.bandera=true
      this.trainingsService.deleteItem(formValue.id).subscribe(
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
                  detail: 'Registro de Formación Eliminado con exito'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.ngOnInit()
                    this.volver(new Event(''))
                   this.bandera=false
                    // this.router.navigateByUrl('/usuarios/mostrar_trainings');
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
    }

  

  }
}
