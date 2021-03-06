import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';
const translate = require('translate');
@Component({
  selector: 'app-create_tipo_tareas',
  templateUrl: './create_tipo_tareas.component.html',
  styleUrls: ['./create_tipo_tareas.component.css']
})
export class Create_tipo_tareasComponent implements OnInit {
  displayMaximizable2:boolean=true
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
    let formValue: ProductivityTypeI = {
      name: f.form.value.name,
    };
    if(formValue.name != ''){
    this.productivity_typesService.createItem(formValue).subscribe(
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
                detail: 'Tipo de Tarea Creada con exito'});
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
}
