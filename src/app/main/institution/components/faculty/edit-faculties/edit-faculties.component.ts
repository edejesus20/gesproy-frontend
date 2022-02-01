import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

import { FacultyI } from 'src/app/models/institution/faculty';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { NgForm } from '@angular/forms';
const translate = require('translate');

@Component({
  selector: 'app-edit-faculties',
  templateUrl: './edit-faculties.component.html',
  styleUrls: ['./edit-faculties.component.css']
})
export class EditFacultiesComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
 public edit:boolean=false;
 public edit2:boolean=false;
  
  private id:number=0
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

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
};

public form:FacultyI={
  id:0,
  name:'',
  AdministrativeId:0,
  Administrative:{
    id:0,
    UserId:0,
    HeadquarterId:'',
    OcupationId:'',
    User:{
      id:0,
      username:'',
      fullName:'',
      email:'',
      Person:{ 
        name:'',
        identification:''
      }
    }
  },
  HeadquarterId:0,
  Headquarter:{
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
}

  constructor(
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService,
    private primengConfig: PrimeNGConfig,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAlladministrative()
    this.getAlluniversidades()
    this.primengConfig.ripple = true;
  
  }


  public onSubmit(f:NgForm) {
    // console.log(f)
    let formValue: FacultyI = {
      name:f.form.value.name,
      AdministrativeId:0,
      HeadquarterId:0
    };

    if(this.edit2 ==  false){
      formValue.HeadquarterId=this.form.HeadquarterId
    }else{

      formValue.HeadquarterId=f.form.value.HeadquarterId.id
    }

    if(this.edit ==  false){
      formValue.AdministrativeId=this.form.AdministrativeId
    }else{
      formValue.AdministrativeId=f.form.value.AdministrativeId.id

    }
    // console.log(formValue)
    if(formValue.name != ("" || null || undefined) && 
    formValue.AdministrativeId != ('' || 0 || null || undefined) &&
    formValue.HeadquarterId != ("" || 0 || null || undefined)){

    this.facultyService.updateItem(this.id,formValue).subscribe(
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
                detail: 'Registro de Facultad Actualizado con exitoso'});
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
    this.facultyService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.faculty.Administrative?.User?.fullName != undefined
        ){
        this.form=cnt_groupFromApi.faculty
        
        // this.form.Administrative.User.fullName=cnt_groupFromApi.faculty.Administrative?.User?.fullName
      }

      if(this.form.id){this.id=this.form.id}
      
     
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
