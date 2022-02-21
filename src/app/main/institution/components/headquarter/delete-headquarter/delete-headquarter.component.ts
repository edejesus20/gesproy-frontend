import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { UniversityI } from 'src/app/models/institution/university';
const translate = require('translate');
@Component({
  selector: 'app-delete-headquarter',
  templateUrl: './delete-headquarter.component.html',
  styleUrls: ['./delete-headquarter.component.css']
})
export class DeleteHeadquarterComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public universitys: UniversityI[]=[]
  public form:HeadquarterI={
    id:0,
     name:'',
     cordinatorInvestigation:'',
     UniversityId:0,
     University:{
       id:0,
       name:'',
       nit:'',
       addres:''
     }
 }
  constructor(
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService,
    private universityService:UniversityService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.getAlluniversidades()
    this.primengConfig.ripple = true;
  }

  private getAlluniversidades() {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;
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
    // console.log(id)
    this.getOneCntAccount(id)
  }
  
  getOneCntAccount(id:number) {
    this.headquarterService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.headquarter.University != undefined
        ){
        this.form=cnt_groupFromApi.headquarter
            }
     
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }

  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: HeadquarterI = {
      id: this.form.id,
      name:this.form.name,
      cordinatorInvestigation:this.form.cordinatorInvestigation,
      UniversityId:this.form.UniversityId
    };
    if(formValue.id)
    // console.log(formValue)
    this.headquarterService.deleteItem(formValue.id).subscribe(
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
                detail: 'Registro de Sede Eliminado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_headquarters');
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
}
}
