import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';

import { FacultyI } from 'src/app/models/institution/faculty';
import { ProgramI } from 'src/app/models/institution/program';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
import { MessageService } from 'primeng/api';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  public administratives: AdministrativeI[]=[]
  public headquarters: HeadquarterI[]=[]

  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    FacultyId:['', [Validators.required]],
    CategoryId:['', [Validators.required]],
    Headquarters: this.formBuilder.array([this.formBuilder.group(
      {
        ProgramId:0,
         HeadquarterId:['', [Validators.required]],
        AdministrativeId:['', [Validators.required]]
    })]),
  });


displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  constructor(
    private router: Router,
    private messageService:MessageService,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private administrativeService:AdministrativeService
    
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllFaculty();
    this.getAllcolcienciaCategorys()
    this.getAlladministratives()
    this.getAllheadquarters()
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

  public onSubmit() {
    let formValue: ProgramI = this.form.value;
    formValue.FacultyId=this.form.value.FacultyId.id
    formValue.CategoryId=this.form.value.CategoryId.id

    if(formValue.name != '' &&
    formValue.CategoryId != ( 0 )&&
    formValue.FacultyId != ( 0 )
    ){
    let control = <FormArray>this.form.controls['Headquarters']

    for (const key of control.value) {
      key.HeadquarterId=key.HeadquarterId.id
      key.AdministrativeId=key.AdministrativeId.id
    }

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
  
public datos(position:number){
  const control = <FormArray>this.form.controls['Headquarters']
  let valor = control.controls[position].get('HeadquarterId')
  if(valor != null){
  this.headquarterService.getItem(valor.value.id).subscribe(
    (AdministrativeFromApi) => {
      if(AdministrativeFromApi.headquarter.Administratives)
      this.administratives = AdministrativeFromApi.headquarter.Administratives;
      // console.log(this.administratives)
    }, error => console.error(error));
  }
}

  get getRoles() {
    return this.form.get('Headquarters') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Headquarters']
      if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['', [Validators.required]]
        }))
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['', [Validators.required]]
        }))

      }
      this.mostrar=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Headquarters']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar=false
      }
  }

  private getAlladministratives() {
    this.administrativeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.administratives = AdministrativeFromApi.administratives;
      }, error => console.error(error));
  }

  private getAllheadquarters() {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.headquarters = AdministrativeFromApi.headquarters;
      }, error => console.error(error));
  }

}
