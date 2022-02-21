import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
const translate = require('translate');
@Component({
  selector: 'app-edit_CategoriaColciencias',
  templateUrl: './edit_CategoriaColciencias.component.html',
  styleUrls: ['./edit_CategoriaColciencias.component.css']
})
export class Edit_CategoriaColcienciasComponent implements OnInit {
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ColcienciaCategoryI={
    id:0,
    name: '',
    createdAt:'',
    Teachers:[
      {
        id:0,
        UserId: 0,
        ScaleId: 0,
        ColcienciaCategoryId: 0,
        hours_of_dedication:'',

        User:
          {
            username: '',
            email: '',
            fullName: '',
          },
        Group:{
          id:0,
          name: '',
          ident_colciencias:''
        }
      }
    ]
    
  
  }
  constructor(
    private colcienciaCategoryService:ColcienciaCategoryService ,
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
  this.colcienciaCategoryService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.colcienciaCategory.Teachers != undefined){
        
      this.form=cnt_groupFromApi.colcienciaCategory
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: ColcienciaCategoryI = {
      id:this.form.id,
      name: f.form.value.name,
    };
    // console.log(formValue)

    if(formValue.name != ''){
      if(formValue.id)
    this.colcienciaCategoryService.updateItem(formValue.id,formValue).subscribe(
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
                detail: 'Registro de Categoria de Colciencias Actualizado con exito'});
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
