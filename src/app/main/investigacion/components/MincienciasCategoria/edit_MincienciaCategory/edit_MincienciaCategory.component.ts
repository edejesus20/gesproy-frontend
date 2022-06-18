import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';

const translate = require('translate');
@Component({
  selector: 'app-edit_MincienciaCategory',
  templateUrl: './edit_MincienciaCategory.component.html',
  styleUrls: ['./edit_MincienciaCategory.component.css']
})
export class Edit_MincienciaCategoryComponent implements OnInit {
  public bandera:boolean=false

  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:MincienciaCategoryI={
    id:0,
    name: '',
    createdAt:'',
    Teachers:[
      {
        id:0,
        UserId: 0,
        ScaleId: 0,
        MincienciaCategoryId: '',
        // hours_of_dedication:'',
        ChargeBondingId:0,
        User:
          {
            username: '',
            email: '',
            fullName: '',
          },
        Group:undefined
      }
    ]
    
  
  }
  constructor(
    private mincienciaCategoryService:MincienciaCategoryService ,
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
  this.mincienciaCategoryService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.mincienciaCategory.Teachers != undefined){
        
      this.form=cnt_groupFromApi.mincienciaCategory
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: MincienciaCategoryI = {
      id:this.form.id,
      name: f.form.value.name,
    };
    // console.log(formValue)

    if(formValue.name != '' && formValue.id){
   this.bandera=true

    this.mincienciaCategoryService.updateItem(formValue.id,formValue).subscribe(
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
                detail: 'Categoria de Minciencias Actualizada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  // this.router.navigateByUrl('/Investigation/mostrar_MincienciaCategorys');
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
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
  }

}
