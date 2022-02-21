import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { PersonI } from 'src/app/models/user/person';
import { LineI } from 'src/app/models/projet/line';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=false;
  public mostrar2:boolean=false;
  
  public algo:number[]=[0];
  public algo2:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]

  public mostrarUser:boolean=false;
  public users:PersonI[]=[];
  public lines:LineI[]=[];


  public form:FormGroup=this.formBuilder.group({
    name:[''],
    surname:[''],
    DocumentTypeId:[''],
    identification:[''],
    GenderId:[''],
    address:[''],
    phone:[''],
    email:[''],
    ScaleId:['', [Validators.required]],
    UserId:[''],
    ColcienciaCategoryId:['', [Validators.required]],
    hours_of_dedication:['', [Validators.required]],

    headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
      {
        TeacherId:0,
        HeadquarterProgramId:['', [Validators.required]],
        RelationshipId:['', [Validators.required]],
    })]),
    Lines: this.formBuilder.array([this.formBuilder.group(
      {
        TeacherId:0,
        LineId:['', [Validators.required]],
    })]),
   });
   public relationships:RelationshipI[]=[]
   public headquarterProgram:any[]=[]
   public headquarterProgramTeacher1:any[] = []
   public Lines:any[] = []
 
   
  constructor(
    private teacherService:TeacherService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private scaleService:ScaleService,
    private formBuilder: FormBuilder,
    private colcienciaCategoryService:ColcienciaCategoryService,
    private headquarterService: HeadquarterService,
    private relationshipService:RelationshipService,
    private userService:UserService,
    private lineService:LineService,
  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllscales()
    this.getAllcolcienciaCategorys()
    this.getAllheadquarters()
    this.getAllrelationships()
    this.getAllUser()
    this.getAllLines()
  }
  getAllLines() {
    this.lineService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.lines = AdministrativeFromApi.lines;
      }, error => console.error(error));
  }

  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        this.users = AdministrativeFromApi.users;
      }, error => console.error(error));
  }

  public onSubmit(e: Event) {
    e.preventDefault()
    let formValue:any={}
    if(this.mostrarUser == false){
      formValue={
        name: '',
        surname: '',
        DocumentTypeId: '',
        identification: '',
        GenderId: '',
        address: '',
        phone: '',
        username:'',
        fullName:'',
        email:'',
        password:'',
        UserId:  this.form.value.UserId.UserId,
        hours_of_dedication: this.form.value.hours_of_dedication,
        ScaleId: this.form.value.ScaleId.id,
        ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
        headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
        Lines: this.form.value.Lines
      };
    }

    if(this.mostrarUser == true){
      formValue={
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
        UserId: undefined,
        hours_of_dedication: this.form.value.hours_of_dedication,
        ScaleId: this.form.value.ScaleId.id,
        ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
        headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
        Lines: this.form.value.Lines
      };

    }

    if(this.headquarterProgramTeacher1.length == 0 || this.headquarterProgramTeacher1 == []){
      let control = <FormArray>this.form.controls['headquarterProgramTeacher']
      for (const key of control.value) {

        key.HeadquarterProgramId=key.HeadquarterProgramId.id
        key.RelationshipId=key.RelationshipId.id
        this.headquarterProgramTeacher1.push({
        TeacherId:0,
        HeadquarterProgramId:key.HeadquarterProgramId,
        RelationshipId:key.RelationshipId,
        })
      }
      formValue.headquarterProgramTeacher = this.form.value.headquarterProgramTeacher
    }else{
      formValue.headquarterProgramTeacher = this.headquarterProgramTeacher1
    }

    if(this.Lines.length == 0 || this.Lines == []){
      let control = <FormArray>this.form.controls['Lines']
      for (const key of control.value) {

        key.LineId=key.LineId.id

        this.Lines.push({
        TeacherId:0,
        LineId:key.LineId,
        })
      }
      formValue.Lines = this.form.value.Lines
    }else{
      formValue.Lines = this.Lines
    }

  if((this.mostrarUser == true && formValue.name != ""&& formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&& formValue.identification != ""&&
              formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
              formValue.phone != ""&& formValue.email != ""&&
              formValue.ScaleId !=("" || undefined) && formValue.ColcienciaCategoryId != ("" || undefined))
      ||(this.mostrarUser == false && formValue.UserId != ( 0 || undefined) && formValue.hours_of_dedication != ""
      && formValue.ScaleId !=("" || undefined) && formValue.ColcienciaCategoryId != ("" || undefined))
            ){
              // console.log(formValue)

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
                        detail: 'Registro de Docente Creado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.router.navigateByUrl('/usuarios/Teacher');
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
              });}
          else{
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
          HeadquarterProgramId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
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

private getAllheadquarters(selectId?: number) {
  this.headquarterService.HeadquarterProgram().subscribe(
    (AdministrativeFromApi) => {
      this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
    }, error => console.error(error));
}

private getAllscales(selectId?: number) {
  this.scaleService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.scales = AdministrativeFromApi.scales;
    }, error => console.error(error));
}

private getAllcolcienciaCategorys(selectId?: number) {
  this.colcienciaCategoryService.getList().subscribe(
    (AdministrativeFromApi) => {
      this.colcienciaCategorys = AdministrativeFromApi.colcienciaCategorys;
    }, error => console.error(error));
}

private getAllrelationships(selectId?: number) {
  this.relationshipService.getList().subscribe(
    (AdministrativeFromApi) => {
      this.relationships = AdministrativeFromApi.relationships;
    }, error => console.error(error));
}


get getLines() {
  return this.form.get('Lines') as FormArray;//obtener todos los formularios
}

  addLines(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Lines']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          TeacherId:0,
          LineId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          LineId:['', [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeLines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Lines']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      }
  }
}
