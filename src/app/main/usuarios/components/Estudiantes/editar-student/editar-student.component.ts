import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';

import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import {  HeadquarterProgramI } from 'src/app/models/institution/headquarter';
@Component({
  selector: 'app-editar-student',
  templateUrl: './editar-student.component.html',
  styleUrls: ['./editar-student.component.css']
})
export class EditarStudentComponent implements OnInit {
  public mostrar:number=1;
  public mostrar2:boolean=false;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarterProgram: any[]=[]
  public headquarterProgramStudent1:any[]=[]

  constructor(
    private primengConfig: PrimeNGConfig,
    private studentService:StudentService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.form=this.formBuilder.group({
      id: [''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      DocumentTypeId:['', [Validators.required]],
      identification:['', [Validators.required]],
      GenderId:['', [Validators.required]],
      address:['', [Validators.required]],
      phone:['', [Validators.required]],
      email:['', [Validators.required]],
      nationality:['', [Validators.required]],
      date_of_birth:['', [Validators.required]],
      headquarterProgramStudent: this.formBuilder.array([this.formBuilder.group(
        {
          StudentId:0,
          HeadquarterProgramId:['', [Validators.required]],
      })]),
      // current_semester:['', [Validators.required]],
      // current_average:['', [Validators.required]],
      experienciaInvestigativa:[''],
      areasEstudio:[''],
      publicacionesResientes:[''],
      practicas:['']
    });
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllheadquarters()

  }

  public onSubmit() {
    const formValue={
      id: this.form.value.id,
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId.id,
      identification: this.form.value.identification,
      GenderId: this.form.value.GenderId.id,
      address: this.form.value.address,
      phone: this.form.value.phone,
      username:'',
      fullName:'',
      email:this.form.value.email,
      password:'',
      UserId: 0,
      headquarterProgramStudent: this.form.value.headquarterProgramStudent,
      nationality: this.form.value.nationality,
      date_of_birth: this.form.value.date_of_birth,
      // current_semester: this.form.value.current_semester,
      // current_average: this.form.value.current_average,
      experienciaInvestigativa: this.form.value.experienciaInvestigativa,
      areasEstudio: this.form.value.areasEstudio,
      publicacionesResientes: this.form.value.publicacionesResientes,
      practicas: this.form.value.practicas,
    };

    if(this.headquarterProgramStudent1.length == 0 || this.headquarterProgramStudent1 == []){
      let control = <FormArray>this.form.controls['headquarterProgramStudent']
      for (const key of control.value) {
        key.HeadquarterProgramId=key.HeadquarterProgramId.id 
        this.headquarterProgramStudent1.push({
         StudentId:0,
        HeadquarterProgramId:key.HeadquarterProgramId,
        })
      }
      formValue.headquarterProgramStudent = this.form.value.headquarterProgramStudent
      // console.log('aqui')
    }else{
      formValue.headquarterProgramStudent = this.headquarterProgramStudent1
      // console.log('aqui2')

    }
//  console.log(formValue.headquarterProgramStudent)
  if(
    formValue.name != ""&&
    formValue.surname != ""&&
    formValue.DocumentTypeId != ( 0 || undefined)&&
    formValue.identification != ""&&
    formValue.GenderId != ( 0 || undefined)&&
    formValue.address != ""&&
    formValue.phone != ""&&
    formValue.nationality != ("" || undefined) && 
    formValue. date_of_birth!= ("" || undefined) && 
    formValue.email != ""
    // && 
    // formValue.current_semester  != "" && formValue.current_average  != ""
    ){

      this.studentService.updateItem(formValue.id,formValue).subscribe(
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
                  detail: 'Registro de Estudiante Actualizado con exito'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.router.navigateByUrl('/usuarios/Student');
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

private getAllheadquarters(selectId?: number) {
  this.headquarterService.HeadquarterProgram().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
    }, error => console.error(error));
}

private getAllgenders(selectId?: number) {
  this.genderService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.genders = AdministrativeFromApi.genders;
    }, error => console.error(error));
}

private getAlldocumentTypes(selectId?: number) {
  this.documentTypeService.getList().subscribe(
    (AdministrativeFromApi) => {
      this.documentTypes = AdministrativeFromApi.documentTypes;

    }, error => console.error(error));
}


public volver(event: Event){
  event.preventDefault
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
}

ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.studentService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.student.id != undefined
      ){
      console.log(cnt_groupFromApi.student)
        this.form.controls['id'].setValue(cnt_groupFromApi.student.id)
        if(cnt_groupFromApi.student.User?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.student.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.student.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.student.User.Person.identification)
          this.form.controls['address'].setValue(cnt_groupFromApi.student.User.Person.address)
          this.form.controls['phone'].setValue(cnt_groupFromApi.student.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.student.User.email)
          this.form.controls['nationality'].setValue(cnt_groupFromApi.student.User.Person.nationality)
          this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.student.User.Person.date_of_birth)
          // this.form.controls['current_semester'].setValue(cnt_groupFromApi.student.current_semester)
          // this.form.controls['current_average'].setValue(cnt_groupFromApi.student.current_average)
          this.form.controls['experienciaInvestigativa'].setValue(cnt_groupFromApi.student.experienciaInvestigativa)
          this.form.controls['areasEstudio'].setValue(cnt_groupFromApi.student.areasEstudio)
          this.form.controls['publicacionesResientes'].setValue(cnt_groupFromApi.student.publicacionesResientes)
          this.form.controls['practicas'].setValue(cnt_groupFromApi.student.practicas)
       
          }

          if(cnt_groupFromApi.student.User?.Person?.DocumentTypeId != undefined)
          this.documentTypeService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.DocumentTypeId)).subscribe((algo)=>{
            this.form.controls['DocumentTypeId'].setValue(algo.documentType)
          })
  
   

        if(cnt_groupFromApi.student.User?.Person?.GenderId != undefined)
        this.genderService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.GenderId)).subscribe((algo)=>{
          this.form.controls['GenderId'].setValue(algo.gender)
        })

        if(cnt_groupFromApi.student.HeadquarterPrograms != undefined){
          
          this.agregarDescuentos(cnt_groupFromApi.student.HeadquarterPrograms)
          
        }
        // console.log(this.form.value)
      
      // this.form.Administrative.User.fullName=cnt_groupFromApi.teacher.Administrative?.User?.fullName
    }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(HeadquarterPrograms:HeadquarterProgramI[]) {
    if(HeadquarterPrograms.length){
      for (let key of HeadquarterPrograms) {
        if(key.HeadquarterProgramStudent != undefined) {
          // console.log(DiscountLine)
          let control = <FormArray>this.form.controls['headquarterProgramStudent']
            this.headquarterService.getHeadquarterProgramId(key.HeadquarterProgramStudent.HeadquarterProgramId).subscribe((algo)=>{
              if(algo.headquarterProgram && key.HeadquarterProgramStudent != undefined){
                control.push(this.formBuilder.group({
                  StudentId:0,
                  HeadquarterProgramId:[algo.headquarterProgram[0], [Validators.required]],
                }))
              }
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['headquarterProgramStudent']
      control.removeAt(0)
    }
  }

  get getRoles() {
    return this.form.get('headquarterProgramStudent') as FormArray;//obtener todos los formularios
  }
  
    addRoles(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['headquarterProgramStudent']
        if(control.length == 0 && this.mostrar2 == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar2 == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
  
        }
        this.mostrar2=true
    }

    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['headquarterProgramStudent']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar2=false
        }
    }
  
}
