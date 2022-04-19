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
import { StudentInternshipsI } from 'src/app/models/user/student';
import { DialogService } from 'primeng/dynamicdialog';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
@Component({
  selector: 'app-editar-student',
  templateUrl: './editar-student.component.html',
  styleUrls: ['./editar-student.component.css'],
  providers: [DialogService]
})
export class EditarStudentComponent implements OnInit {
  public mostrar:number=1;
  public mostrar2:boolean=false;
  public mostrar3:boolean=false;
  
  public algo:number[]=[0];
  public algo1:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarterProgram: any[]=[]
  public headquarterProgramStudent1:any[]=[]
  public ref:any;
  constructor(
    public dialogService: DialogService,

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
      // experienciaInvestigativa:[''],
      // areasEstudio:[''],
      // publicacionesResientes:[''],
      // practicas:['']
      StudentInternship: this.formBuilder.array([this.formBuilder.group({
        StudentId:0,
        nameP:[''],
        start_date:[''],
        final_date:[''],
        name_institution:[''],
        internship_certificate:[''],
        practice_hours:[''],
        area:[''],
        post:[''],
        functions:[''],
    })]),
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
      // experienciaInvestigativa: this.form.value.experienciaInvestigativa,
      // areasEstudio: this.form.value.areasEstudio,
      // publicacionesResientes: this.form.value.publicacionesResientes,
      // practicas: this.form.value.practicas,
      StudentInternship:this.form.value.StudentInternship,
    };
    if(this.mostrar3==false){
      formValue.StudentInternship=[]
    }
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
 console.log(formValue)
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
          // this.form.controls['experienciaInvestigativa'].setValue(cnt_groupFromApi.student.experienciaInvestigativa)
          // this.form.controls['areasEstudio'].setValue(cnt_groupFromApi.student.areasEstudio)
          // this.form.controls['publicacionesResientes'].setValue(cnt_groupFromApi.student.publicacionesResientes)
          // this.form.controls['practicas'].setValue(cnt_groupFromApi.student.practicas)
       
          }

          if(cnt_groupFromApi.student.User?.Person?.DocumentTypeId != undefined)
          this.documentTypeService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.DocumentTypeId)).subscribe((algo)=>{
            this.form.controls['DocumentTypeId'].setValue(algo.documentType)
          })
  
   

        if(cnt_groupFromApi.student.User?.Person?.GenderId != undefined)
        this.genderService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.GenderId)).subscribe((algo)=>{
          this.form.controls['GenderId'].setValue(algo.gender)
        })

        if(cnt_groupFromApi.student.HeadquarterPrograms != undefined
          && cnt_groupFromApi.student.HeadquarterPrograms.length > 0){
          
          this.agregarDescuentos(cnt_groupFromApi.student.HeadquarterPrograms)
          
        }
        if(cnt_groupFromApi.student.StudentInternships != undefined 
          && cnt_groupFromApi.student.StudentInternships.length > 0){
          
          this.agregarStudentInternships(cnt_groupFromApi.student.StudentInternships)
          
        }
        // console.log(this.form.value)
      
      // this.form.Administrative.User.fullName=cnt_groupFromApi.teacher.Administrative?.User?.fullName
    }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarStudentInternships(StudentInternships:StudentInternshipsI[]) {
    if(StudentInternships.length){
      for (let key of StudentInternships) {
        let control = <FormArray>this.form.controls['StudentInternship']
        control.push(this.formBuilder.group({
          StudentId:0,
          nameP:[key.name],
          start_date:[key.start_date],
          final_date:[key.final_date],
          name_institution:[key.name_institution],
          internship_certificate:[key.internship_certificate],
          practice_hours:[key.practice_hours],
          area:[key.area],
          post:[key.post],
          functions:[key.functions],
        }))
      }
      this.mostrar3= true
      let control = <FormArray>this.form.controls['StudentInternship']
      control.removeAt(0)
    }
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

    get getStudentInternships() {
      return this.form.get('StudentInternship') as FormArray;//obtener todos los formularios
    }

    addStudentInternships(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['StudentInternship']
        if(control.length == 0 && this.mostrar3 == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            nameP:[''],
            start_date:[''],
            final_date:[''],
            name_institution:[''],
            internship_certificate:[''],
            practice_hours:[''],
            area:[''],
            post:[''],
            functions:[''],
          }))
        }
        if(control.length >= 1 && this.mostrar3 == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            nameP:[''],
            start_date:[''],
            final_date:[''],
            name_institution:[''],
            internship_certificate:[''],
            practice_hours:[''],
            area:[''],
            post:[''],
            functions:[''],
          }))
  
        }
        this.mostrar3=true
    }
    removeStudentInternships(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['StudentInternship']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
          console.log('aqui')
        this.mostrar3=false
        }
    }
    
    addTipoDocumento(e:Event){
      e.preventDefault()
  
      this.ref = this.dialogService.open(Create_documentTypeComponent, {
        width: '35%',
        height: '50%',
        contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
        baseZIndex: 10000,
        data: {
          id: '1'
      },
    });
  
    this.ref.onClose.subscribe((person: any) =>{
        if (person) {
            this.messageService.add({severity:'info', summary: 'Tipo de Documento Creado', detail: person.name,life: 2000});
        this.getAlldocumentTypes()
  
          }
    });
    }
    addGenero(e:Event){
      e.preventDefault()
  
      this.ref = this.dialogService.open(Create_genderComponent, {
        width: '35%',
        height: '50%',
        contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
        baseZIndex: 10000,
        data: {
          id: '1'
      },
    });
     
    this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Genero Creado', detail: person.name,life: 2000});
      this.getAllgenders()

        }
  });
  }
}
