import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  public form:FormGroup=this.formBuilder.group({})

  private id:number=0
  constructor(
    private universityService: UniversityService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    ) { }
  
    ngOnInit() {
      this.form=this.formBuilder.group({
        id:[''],
        name:['', [Validators.required]],
        nit:['', [Validators.required]],
        addres:['', [Validators.required]],
      });
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.universityService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      if(cnt_groupFromApi.university.id != undefined){
        this.id=cnt_groupFromApi.university.id
        this.form.controls['id'].setValue(cnt_groupFromApi.university.id)
        this.form.controls['name'].setValue(cnt_groupFromApi.university.name)
        this.form.controls['nit'].setValue(cnt_groupFromApi.university.nit)
        this.form.controls['addres'].setValue(cnt_groupFromApi.university.addres)
        }
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
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

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.ngOnInit()
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

  public onSubmit() {
    let formValue: UniversityI = this.form.value;
    if(formValue.name != "" && formValue.nit != "" && formValue.addres != ""){
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
