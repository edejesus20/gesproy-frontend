import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

import { FacultyI } from 'src/app/models/institution/faculty';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';

import { MessageService } from 'primeng/api';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { NgForm } from '@angular/forms';
const translate = require('translate');
@Component({
  selector: 'app-create-facultie',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss']
})
export class CreateFacultyComponent implements OnInit {

  public administratives: AdministrativeI[]=[];
  public Headquarter: HeadquarterI[]=[];
  selectedAdministrativeI: AdministrativeI={
      UserId:0,
      HeadquarterId:'',
      User: { 
        username:'',
        fullName:'',
        email:'',
        Person:{
          name:'',
          identification:''
        }
      },
      OcupationId:''
  };
  selectedHeadquarterI: HeadquarterI={
    name: '',
    cordinatorInvestigation: '',
    UniversityId:0
    // University: { 
    //   name: '',
    //   nit: '',
    //   addres: '',
    // },
};

  // selectedCountry:string=''

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAlladministrative()
    this.getAlluniversidades()
  
  }

  private buildForm() {
    let form = {
      name: '',
      AdministrativeId: '',
      HeadquarterId:'',
    }
  }


  public onSubmit(f:NgForm) {
    console.log(f)

    const formValue: FacultyI = {
      name:f.form.value.name,
      AdministrativeId:f.form.value.AdministrativeId.id,
      HeadquarterId:f.form.value.HeadquarterId.id
    };
    console.log(formValue)

    if(formValue.name != ("" || null || undefined) && 
    formValue.AdministrativeId != ('' || 0 || null || undefined) &&
    formValue.HeadquarterId != ("" || 0 || null || undefined)){

    this.facultyService.createItem(formValue).subscribe(
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
                detail: 'Registro de Facultad Creado con exitoso'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_facultys');
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


  private getAlladministrative(selectId?: number) {
    this.administrativeService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.administratives = AdministrativeFromApi.administratives;
      }, error => console.error(error));
  }

  private getAlluniversidades(selectId?: number) {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.Headquarter = AdministrativeFromApi.headquarters;

      }, error => console.error(error));
  }

}
