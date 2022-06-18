import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ThematicI } from 'src/app/models/projet/line';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
const translate = require('translate');

@Component({
  selector: 'app-delete_Thematic',
  templateUrl: './delete_Thematic.component.html',
  styleUrls: ['./delete_Thematic.component.css']
})
export class Delete_ThematicComponent implements OnInit {
  public bandera:boolean=false

  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:ThematicI={
    id:0,
    name: '',
  }
  constructor(
    private thematicService:ThematicService,
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
 this.thematicService.getItem(id).subscribe((cnt_groupFromApi) => {
 
   if(cnt_groupFromApi.thematic != undefined){
       
     this.form=cnt_groupFromApi.thematic
     // console.log(this.form)
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }

 public onSubmit(f:NgForm) {
  // console.log(f)

  let formValue: ThematicI = {
    id:this.form.id,
    name: this.form.name,
  };
  // console.log(formValue)

  if(formValue.name != '' && formValue.id){
    this.bandera=true

  this.thematicService.deleteItem(formValue.id).subscribe(
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
              detail: 'Area Tematica Eliminada con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                // this.router.navigateByUrl('/Procedimientos/Thematic');
                this.ngOnInit()
                this.volver(new Event(''))
               this.bandera=false
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
