import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { ProgramI } from 'src/app/models/institution/program';
import { UniversityI } from 'src/app/models/institution/university';
import { AdministrativeI } from 'src/app/models/user/administrative';

const translate = require('translate');
@Component({
  selector: 'app-create-headquarter',
  templateUrl: './create-headquarter.component.html',
  styleUrls: ['./create-headquarter.component.scss']
})
export class CreateHeadquarterComponent implements OnInit {
  public universitys: UniversityI[]=[]
  public mostrar:boolean=false;
  public algo:number[]=[0];

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

public form:FormGroup=this.formBuilder.group({
  name:['', [Validators.required]],
  cordinatorInvestigation:['', [Validators.required]],
  UniversityId:['', [Validators.required]],
});

  constructor( 
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService,
    private universityService:UniversityService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
   
    this.getAlluniversidades()

  }


  public onSubmit() {
    let formValue: HeadquarterI = this.form.value;
    formValue.UniversityId=this.form.value.UniversityId.id

    if(formValue.name != '' && 
    formValue.cordinatorInvestigation != '' &&
    formValue.UniversityId != ( 0 )){

    this.headquarterService.createItem(formValue).subscribe(
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
                detail: 'Registro de Sede Creado con exito'});
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
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
    }
}


  private getAlluniversidades() {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.universitys) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.universitys = AdministrativeFromApi.universitys;
      }, error => console.error(error));
  }



}
