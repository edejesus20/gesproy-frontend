import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
const translate = require('translate');
@Component({
  selector: 'app-create_Research_bonding',
  templateUrl: './create_Research_bonding.component.html',
  styleUrls: ['./create_Research_bonding.component.css']
})
export class Create_Research_bondingComponent implements OnInit {
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
    private research_bondingService:Research_bondingService ,
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
    let formValue: Research_bondingI = this.form.value;
    if(formValue.name != ''){
    this.research_bondingService.createItem(formValue).subscribe(
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
                detail: 'Vinculación de investigación Creada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/Investigation/mostrar_Research_bondings');
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
