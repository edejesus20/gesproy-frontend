import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { UniversityI } from 'src/app/models/institution/university';
import { REGEXP_ALPHANUMERIC } from '../headquarter-programs/headquarter-programs.component';
const translate = require('translate');
@Component({
  selector: 'app-create-headquarter',
  templateUrl: './create-headquarter.component.html',
  styleUrls: ['./create-headquarter.component.scss']
})
export class CreateHeadquarterComponent implements OnInit {
  public universitys: UniversityI[]=[]

  selectedUniversit: UniversityI={
    id:0,
    name: '',
    nit: '',
    addres: '',
};
displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor( 
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService,
    // private snackBar: MatSnackBar,
    private universityService:UniversityService
    ) { }

  ngOnInit(): void {
   
    this.getAlluniversidades()
  }


  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: HeadquarterI = {
      name:f.form.value.name,
      cordinatorInvestigation:f.form.value.cordinatorInvestigation,
      UniversityId:f.form.value.UniversityId.id
    };
    // console.log(formValue)

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
                detail: 'Registro de Sede Creado con exitoso'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_headquarters');
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
  private getAlluniversidades() {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;
      }, error => console.error(error));
  }
}
