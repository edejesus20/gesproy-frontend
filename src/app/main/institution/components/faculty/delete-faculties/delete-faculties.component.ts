import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { NgForm } from '@angular/forms';
const translate = require('translate');
@Component({
  selector: 'app-delete-faculties',
  templateUrl: './delete-faculties.component.html',
  styleUrls: ['./delete-faculties.component.css']
})
export class DeleteFacultiesComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  private id:number=0
  public administratives: AdministrativeI[]=[];
  public Headquarter: HeadquarterI[]=[];

public form:FacultyI={
  id:0,
  name:'',
  AdministrativeId:0,
  Administrative:{
    id:0,
    UserId:0,
    HeadquarterId:'',
    ChargeId:'',
    User:{
      id:0,
      username:'',
      fullName:'',
      email:'',
      Person:undefined
    }
  },

    University:{
      id:0,
      name:'',
      nit:'',
      addres:''
    
  }
}

  constructor(
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private router: Router,
    private messageService:MessageService,
    private headquarterService: HeadquarterService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.getAlladministrative()
    this.getAlluniversidades()
    this.primengConfig.ripple = true;
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

  public onSubmit(f:NgForm) {
    // console.log(f)
    let formValue: FacultyI = {
      id: this.form.id,
      name:f.form.value.name,
      AdministrativeId:this.form.AdministrativeId,
      UniversityId:this.form.UniversityId
    };
    if(formValue.id)
    this.facultyService.deleteItem(formValue.id).subscribe(
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
                detail: 'Registro de Facultad Eliminado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_facultys');
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
