import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';
const translate = require('translate');
@Component({
  selector: 'app-delete-university',
  templateUrl: './delete-university.component.html',
  styleUrls: ['./delete-university.component.css']
})
export class DeleteUniversityComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:UniversityI={
    id:0,
    name:'',
    nit:'',
    addres:'',
    }
  private id:number=0
  constructor(
    private universityService: UniversityService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.universityService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      this.form=cnt_groupFromApi.university
      if(this.form.id){this.id=this.form.id}
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
    }, error => console.error(error));
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
    console.log(id)
    this.getOneCntAccount(id)
  }

  public onSubmit(f:NgForm) {
    console.log(f)
    if(f.form.value.name != ("" || null) && f.form.value.nit != ("" || null) && f.form.value.addres != ("" || null)){
      const formValue: UniversityI = {
        name:f.form.value.name,
        nit:f.form.value.nit,
        addres:f.form.value.addres
      };
     
    this.universityService.deleteItem(this.id).subscribe(
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
                detail: 'Registro de Universidad Eliminado'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_universitys');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
          const text = await translate(error.error.message, "es");
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
}

}
