import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-edit_tipo_tareas',
  templateUrl: './edit_tipo_tareas.component.html',
  styleUrls: ['./edit_tipo_tareas.component.css']
})
export class Edit_tipo_tareasComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ProductivityTypeI={
    id:0,
    name: '',
    createdAt:'',
  }
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

  constructor(
    private productivity_typesService:Productivity_typesService,
     private primengConfig: PrimeNGConfig,
     private router: Router,
     private messageService:MessageService,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

  }
  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: ProductivityTypeI = {
      id:this.form.id,
      name: f.form.value.name,
    };
    // console.log(formValue)

    if(formValue.name != ''){
      if(formValue.id)
    this.productivity_typesService.updateItem(formValue.id,formValue).subscribe(
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
                detail: 'Tipo de Tarea Actualizada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/tasksCommitments/mostrar_ProductivityType');
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
  this.getOne(id)
  }

  getOne(id:number) {
  this.productivity_typesService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.productivityType != undefined){
        
      this.form=cnt_groupFromApi.productivityType
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
