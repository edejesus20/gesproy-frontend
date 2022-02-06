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
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-edit-programs',
  templateUrl: './edit-programs.component.html',
  styleUrls: ['./edit-programs.component.css']
})
export class EditProgramsComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  public administratives: AdministrativeI[]=[]
  public headquarters: HeadquarterI[]=[]
  public algo:number[]=[0];
  public mostrar2:boolean=false;
  
  public form:FormGroup=this.formBuilder.group({});
  
  selectedFacultyI: FacultyI={
    id:0,
    name:'',
    AdministrativeId: 0,
      University:
      {
        id: 0,
        name: '',
        nit: '',
        addres: '',
       
    }
    
};

selectedCategoryI: CategoryI={
  id:0,
  name:'',
};

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!]+$/ 

private id:number=0
public edit:boolean=false;
public edit2:boolean=false;
public form2:ProgramI={
  id: 0,
  name: '',
  FacultyId:0,
  CategoryId:0,
  Faculty:undefined,
  Category:undefined,
  createdAt:'',
  Headquarters:undefined,
  HeadquarterProgram:undefined,
}
  constructor(
    private messageService:MessageService,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private administrativeService:AdministrativeService
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.form=this.formBuilder.group({
      id:[''],
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

    this.getAllFaculty();
    this.getAllcolcienciaCategorys();
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
    this.programService.updateItem(this.id,formValue).subscribe(
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
                detail: 'Registro de Programa Actualizado con exitoso'});
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

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.id =0
    this.mostrar2=false
    //console.log(event)
  }

ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.mostrar2=false
  this.ngOnInit()
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.programService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.program.id != undefined && cnt_groupFromApi.program.CategoryId != undefined
      && cnt_groupFromApi.program.FacultyId != undefined
      ){
      this.id=cnt_groupFromApi.program.id
      this.form.controls['id'].setValue(cnt_groupFromApi.program.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.program.name)
      this.form.controls['FacultyId'].setValue(cnt_groupFromApi.program.FacultyId)
      this.facultyService.getItem(cnt_groupFromApi.program.FacultyId).subscribe((algo)=>{
        this.form.controls['FacultyId'].setValue(algo.faculty)
      })
      this.categoryService.getItem(cnt_groupFromApi.program.CategoryId).subscribe((algo)=>{
      this.form.controls['CategoryId'].setValue(algo.category)
    })
      this.form2=cnt_groupFromApi.program
      }

      if(cnt_groupFromApi.program.Headquarters != undefined){
        console.log(cnt_groupFromApi.program.Headquarters)
        this.agregarDescuentos(cnt_groupFromApi.program.Headquarters)
        
      }
   
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(Headquarters: HeadquarterI[]) {

    for (let key of Headquarters) {
      if(key.HeadquarterProgram != undefined) {
        // console.log(DiscountLine)
        
        let control = <FormArray>this.form.controls['Headquarters']
          this.headquarterService.getItem(key.HeadquarterProgram.HeadquarterId).subscribe((algo1)=>{
            if(algo1.headquarter && key.HeadquarterProgram != undefined){
              this.administrativeService.getItem(key.HeadquarterProgram.AdministrativeId).subscribe((algo)=>{
                if(algo.administrative && key.HeadquarterProgram != undefined){
                  control.push(this.formBuilder.group({
                    ProgramId:[key.HeadquarterProgram.ProgramId, [Validators.required]],
                    HeadquarterId:[algo1.headquarter, [Validators.required]],
                    AdministrativeId:[algo.administrative, [Validators.required]],
                  }))
                }
    
              })
            }
            
          })
      }
    }
    this.mostrar2= true
    let control = <FormArray>this.form.controls['Headquarters']
    control.removeAt(0)
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
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['', [Validators.required]]
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['', [Validators.required]]
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Headquarters']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
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
