import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
@Component({
  selector: 'app-create_MincienciaCategory',
  templateUrl: './create_MincienciaCategory.component.html',
  styleUrls: ['./create_MincienciaCategory.component.css']
})
export class Create_MincienciaCategoryComponent implements OnInit {

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrarDialogo:boolean=false;
 
   public Dialog:boolean =false
   public bandera:boolean=false
  public form:FormGroup=this.formBuilder.group({
   });
  constructor(
    private formBuilder: FormBuilder,

    private mincienciaCategoryService:MincienciaCategoryService ,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }


  ngOnInit() {
    this.form=this.formBuilder.group({
      name:['', [Validators.required]],
     })
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

  
cerrar(){
  this.router.navigateByUrl('/Investigation/mostrar_MincienciaCategorys');
}
private volver(){
  this.bandera=false
  this.ngOnInit()
}
  public onSubmit() {
    // console.log(f)
    // console.log(formValue)
    let formValue: MincienciaCategoryI = this.form.value;
    if(formValue.name != ''){
      this.bandera=true

    this.mincienciaCategoryService.createItem(formValue).subscribe(
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
                detail: 'Categoria de Minciencias Creada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/Investigation/mostrar_MincienciaCategorys');
                  clearInterval(interval); 
                 }
          }, 1000);
        }
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

}
