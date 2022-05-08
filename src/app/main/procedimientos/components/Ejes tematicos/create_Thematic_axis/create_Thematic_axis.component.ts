import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { Thematic_axisI } from 'src/app/models/projet/line';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';
const translate = require('translate');
@Component({
  selector: 'app-create_Thematic_axis',
  templateUrl: './create_Thematic_axis.component.html',
  styleUrls: ['./create_Thematic_axis.component.css']
})
export class Create_Thematic_axisComponent implements OnInit {

  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrarDialogo:boolean=false;
  displayMaximizable2:boolean=true
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
   })
  constructor(
    private formBuilder: FormBuilder,
    private thematic_axisService:Thematic_axisService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
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

  let formValue: Thematic_axisI = this.form.value;
  if(formValue.name != ''){
  this.thematic_axisService.createItem(formValue).subscribe(
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
              detail: 'Eje tematico Creado con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.router.navigateByUrl('/Procedimientos/Thematic_axis');
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
