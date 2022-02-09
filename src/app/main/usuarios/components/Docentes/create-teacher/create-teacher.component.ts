import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { TeacherI } from 'src/app/models/user/teacher';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { GroupI } from 'src/app/models/institution/group';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { HeadquarterI, HeadquarterProgramI } from 'src/app/models/institution/headquarter';
import { ProgramI } from 'src/app/models/institution/program';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public groups:GroupI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:['', [Validators.required]],
    identification:['', [Validators.required]],
    GenderId:['', [Validators.required]],
    address:['', [Validators.required]],
    phone:['', [Validators.required]],
    email:['', [Validators.required]],
    ScaleId:['', [Validators.required]],
    ColcienciaCategoryId:['', [Validators.required]],
    GroupId:['', [Validators.required]],
    headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
      {
        TeacherId:0,
        ProgramId:['', [Validators.required]],
        HeadquarterId:['', [Validators.required]],
        RelationshipId:['', [Validators.required]],
    })]),
   });

   public relationships:RelationshipI[]=[]
   public headquarters: HeadquarterI[]=[]
   public headquarterProgram: HeadquarterProgramI[]=[]
   public programs:ProgramI[]=[];
   public mostrarPrograma:boolean=false;


  constructor(
    private teacherService:TeacherService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private scaleService:ScaleService,
    private groupService:GroupService,
    private formBuilder: FormBuilder,
    private colcienciaCategoryService:ColcienciaCategoryService,
    private headquarterService: HeadquarterService,
    private programService: ProgramService ,
    private relationshipService:RelationshipService,
  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllscales()
    this.getAllgroups()
    this.getAllcolcienciaCategorys()
    this.getAllheadquarters()
    this.getAllprograms()
    this.getAllrelationships()
  }

  public onSubmit() {
    let control = <FormArray>this.form.controls['headquarterProgramTeacher']

    for (const key of control.value) {
      key.HeadquarterId=key.HeadquarterId.id
      key.ProgramId=key.ProgramId.id
      key.RelationshipId=key.RelationshipId.id
    }
    const formValue={
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
      ScaleId: this.form.value.ScaleId.id,
      ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
      GroupId: this.form.value.GroupId.id,
      headquarterProgramTeacher: this.form.value.headquarterProgramTeacher
    };
    console.log(formValue)
    if(
      formValue.name != ""&&
      formValue.surname != ""&&
      formValue.DocumentTypeId != ( 0 || undefined)&&
      formValue.identification != ""&&
      formValue.GenderId != ( 0 || undefined)&&
      formValue.address != ""&&
      formValue.phone != ""&&
      formValue.email != ""&&
     formValue.ScaleId !=("" || undefined)
    &&formValue.ColcienciaCategoryId != ("" || undefined)
    &&formValue.GroupId != ("" || undefined)){


    this.teacherService.createItem(formValue).subscribe(
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
                detail: 'Registro de Docente Creado con exitoso'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/usuarios/Teacher');
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


get getRoles() {
  return this.form.get('headquarterProgramTeacher') as FormArray;//obtener todos los formularios
}

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['headquarterProgramTeacher']
      if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({
          TeacherId:0,
          ProgramId:['', [Validators.required]],
          HeadquarterId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          ProgramId:['', [Validators.required]],
          HeadquarterId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))

      }
      this.mostrar=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['headquarterProgramTeacher']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar=false
      }
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

private getAllscales(selectId?: number) {
  this.scaleService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.scales = AdministrativeFromApi.scales;
    }, error => console.error(error));
}

private getAllgroups(selectId?: number) {
  this.groupService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.groups = AdministrativeFromApi.groups;
    }, error => console.error(error));
}

private getAllcolcienciaCategorys(selectId?: number) {
  this.colcienciaCategoryService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.colcienciaCategorys = AdministrativeFromApi.colcienciaCategorys;
    }, error => console.error(error));
}

private getAllheadquarters(selectId?: number) {
  this.headquarterService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.headquarters = AdministrativeFromApi.headquarters;
    }, error => console.error(error));
}


private getAllprograms(selectId?: number) {
  this.programService.getList().subscribe(
    (AdministrativeFromApi) => {
      this.programs = AdministrativeFromApi.programs;
      console.log(this.programs)

    }, error => console.error(error));
}


private getAllrelationships(selectId?: number) {
  this.relationshipService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.relationships = AdministrativeFromApi.relationships;
    }, error => console.error(error));
}

}
