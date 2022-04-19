import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcupationService } from 'src/app/core/services/usuer/Ocupation.service';
import { OcupationI } from 'src/app/models/user/ocupation';
const translate = require('translate');
@Component({
  selector: 'app-create_ocupation',
  templateUrl: './create_ocupation.component.html',
  styleUrls: ['./create_ocupation.component.css']
})
export class Create_ocupationComponent implements OnInit {
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
   });
   public mostrarDialogo:boolean=false;

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private ocupationService:OcupationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,

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
    let formValue: OcupationI = this.form.value;
    if(formValue.name != ''){
    this.ocupationService.createItem(formValue).subscribe(
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
                detail: 'Registro de Ocupación Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/usuarios/Ocupation');
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
