import { Component, OnInit } from '@angular/core';
import {  NgForm  } from '@angular/forms';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';

import { FacultyI } from 'src/app/models/institution/faculty';
import { ProgramI } from 'src/app/models/institution/program';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
import { MessageService } from 'primeng/api';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-delete-programs',
  templateUrl: './delete-programs.component.html',
  styleUrls: ['./delete-programs.component.css']
})
export class DeleteProgramsComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:ProgramI={
    id: 0,
    name: '',
    FacultyId:0,
    CategoryId:0,
    Faculty:{ 
      id:0,
      name:'',
      AdministrativeId: 0,
      HeadquarterId: 0,
      Headquarter:{
        id:0,
        name:'',
        cordinatorInvestigation:'',
        UniversityId:0,
        University:
        {
          id: 0,
          name: '',
          nit: '',
          addres: '',
        } 
      }
    },
    Category:{ 
      id:0,
      name:'',
    }
  
  }
    constructor(
      private messageService:MessageService,
      private programService: ProgramService,
      private facultyService: FacultyService,
      private categoryService:CategoryService,
      private router: Router,
      // private snackBar: MatSnackBar,
    ) { }
  
    ngOnInit(): void {
      this.getAllFaculty();
      this.getAllcolcienciaCategorys()
    }
  
    private getAllFaculty(selectId?: number) {
      this.facultyService.getList().subscribe(
        (facultiesFromApi) => {
          this.faculties = facultiesFromApi.facultys;
        }, error => console.error(error));
    }
    private getAllcolcienciaCategorys(selectId?: number) {
      this.categoryService.getList().subscribe(
        (facultiesFromApi) => {
          this.categorys = facultiesFromApi.categorys;
        }, error => console.error(error));
    }
  
    public onSubmit(f:NgForm) {
      // console.log(f)
  
      let formValue: ProgramI = {
        id: this.form.id,
        name:this.form.name,
        FacultyId:this.form.FacultyId,
        CategoryId:this.form.CategoryId
      };
      // console.log(formValue)

      if(formValue.id)
      this.programService.deleteItem(formValue.id).subscribe(
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
                  detail: 'Registro de Programa Eliminado con exitoso'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.router.navigateByUrl('/institution/mostrar_programs');
                    clearInterval(interval); 
                   }
            }, 1000);
        },async error => {
          if(error != undefined) {
            const text = await translate(error.error.message, "es");
            this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
          }
        });
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
    this.programService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.program.Faculty?.Administrative?.User != undefined
        ){
        this.form=cnt_groupFromApi.program
        // this.selectedUniversit=cnt_groupFromApi.headquarter.University
        // console.log(this.selectedUniversit)
            }
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
