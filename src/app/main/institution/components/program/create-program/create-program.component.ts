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
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  selectedFacultyI: FacultyI={
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
    
};

selectedCategoryI: CategoryI={
  id:0,
  name:'',
};

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private router: Router,
    private messageService:MessageService,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    
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
      name:f.form.value.name,
      FacultyId:f.form.value.FacultyId.id,
      CategoryId:f.form.value.CategoryId.id
    };
    console.log(formValue)

    if(formValue.name != '' && formValue.FacultyId != ( 0) && formValue.FacultyId != undefined && 
    formValue.CategoryId !=  undefined && formValue.CategoryId != 0
    ){

    this.programService.createItem(formValue).subscribe(
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
                detail: 'Registro de Programa Creado con exitoso'});
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
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
}

}
