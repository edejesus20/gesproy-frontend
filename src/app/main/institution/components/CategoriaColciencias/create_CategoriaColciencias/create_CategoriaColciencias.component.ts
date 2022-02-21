import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
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

  constructor(
    private colcienciaCategoryService:ColcienciaCategoryService ,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
  ) { }


  ngOnInit() {
    this.primengConfig.ripple = true;
  
  }
  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: ColcienciaCategoryI = {
      name: f.form.value.name,
    };
    // console.log(formValue)

    if(formValue.name != ''){

    this.colcienciaCategoryService.createItem(formValue).subscribe(
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
                detail: 'Registro de Categoria de Colciencias Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_colcienciaCategorys');
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
