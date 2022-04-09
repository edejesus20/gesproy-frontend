import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-create_CategoriaColciencias',
  templateUrl: './create_CategoriaColciencias.component.html',
  styleUrls: ['./create_CategoriaColciencias.component.css']
})
export class Create_CategoriaColcienciasComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrarDialogo:boolean=false;
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
   })
  constructor(
    private formBuilder: FormBuilder,

    private colcienciaCategoryService:ColcienciaCategoryService ,
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
  public onSubmit() {
    // console.log(f)
    // console.log(formValue)
    let formValue: ColcienciaCategoryI = this.form.value;
    if(formValue.name != ''){

    this.colcienciaCategoryService.createItem(formValue).subscribe(
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
                detail: 'Registro de Categoria de Colciencias Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_colcienciaCategorys');
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
