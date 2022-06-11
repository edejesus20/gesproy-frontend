import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { TrainingI } from 'src/app/models/institution/training';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-create_capacitacion',
  templateUrl: './create_capacitacion.component.html',
  styleUrls: ['./create_capacitacion.component.css']
})
export class Create_capacitacionComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrarDialogo:boolean=false;
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
   })
  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private trainingsService:TrainingsService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
 ) { }

 ngOnInit() {
   this.primengConfig.ripple = true;
   if(this.config.data){
    if(this.config.data.id == '1'){
      this.mostrarDialogo= true
    }
  }else{
    this.mostrarDialogo= false
  }

 }
 public cancelar(){
  this.ref.close(undefined);
}
 public onSubmit() {
  let formValue: TrainingI = this.form.value;
  if(formValue.name != ''){
  this.trainingsService.createItem(formValue).subscribe(
    (algo) => {
      if(this.mostrarDialogo== true){
        this.ref.close(algo);
      }else{
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
              detail: 'Registro de Formación Creado con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.router.navigateByUrl('/usuarios/mostrar_trainings');
                clearInterval(interval); 
               }
        }, 1000);
      }
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
