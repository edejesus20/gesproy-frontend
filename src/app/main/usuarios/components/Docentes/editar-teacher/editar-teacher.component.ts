import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { GroupI } from 'src/app/models/institution/group';
import { HeadquarterI, HeadquarterProgramI } from 'src/app/models/institution/headquarter';
import { ProgramI } from 'src/app/models/institution/program';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { ScaleI } from 'src/app/models/institution/scale';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');

@Component({
  selector: 'app-editar-teacher',
  templateUrl: './editar-teacher.component.html',
  styleUrls: ['./editar-teacher.component.css']
})
export class EditarTeacherComponent implements OnInit {
  public mostrar:number=1;
  public mostrar2:boolean=false;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public groups:GroupI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]
  public algo:number[]=[0];
  public relationships:RelationshipI[]=[]
   public headquarters: HeadquarterI[]=[]
   public programs:ProgramI[]=[];
  constructor(
    private primengConfig: PrimeNGConfig,
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
      key.TeacherId=this.form.value.id
    }
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
      ScaleId: this.form.value.ScaleId.id,
      ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
      GroupId: this.form.value.GroupId.id,
      headquarterProgramTeacher: this.form.value.headquarterProgramTeacher
    };
    // console.log(formValue)
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

    this.teacherService.updateItem(formValue.id,formValue).subscribe(
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
                detail: 'Registro de Docente Actualizado con exito'});
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
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          TeacherId:0,
          ProgramId:['', [Validators.required]],
          HeadquarterId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          ProgramId:['', [Validators.required]],
          HeadquarterId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['headquarterProgramTeacher']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
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
      // console.log(this.programs)

    }, error => console.error(error));
}

private getAllrelationships(selectId?: number) {
  this.relationshipService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.relationships = AdministrativeFromApi.relationships;
    }, error => console.error(error));
}
public volver(event: Event){
  event.preventDefault
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.mostrar2 = false

}

ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.mostrar2 = false
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.teacher.id != undefined
      ){
      
        this.form.controls['id'].setValue(cnt_groupFromApi.teacher.id)
        if(cnt_groupFromApi.teacher.User?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.teacher.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.teacher.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.teacher.User.Person.identification)
          this.form.controls['address'].setValue(cnt_groupFromApi.teacher.User.Person.address)
          this.form.controls['phone'].setValue(cnt_groupFromApi.teacher.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.teacher.User.email)
          // console.log('aqui')
        }


        if(cnt_groupFromApi.teacher.User?.Person?.DocumentTypeId != undefined)
        this.documentTypeService.getItem(parseInt(cnt_groupFromApi.teacher.User?.Person?.DocumentTypeId)).subscribe((algo)=>{
          this.form.controls['DocumentTypeId'].setValue(algo.documentType)
        })


        if(cnt_groupFromApi.teacher.User?.Person?.GenderId != undefined)
        this.genderService.getItem(parseInt(cnt_groupFromApi.teacher.User?.Person?.GenderId)).subscribe((algo)=>{
          this.form.controls['GenderId'].setValue(algo.gender)
        })

  

        if(cnt_groupFromApi.teacher.ScaleId != undefined)
        this.scaleService.getItem((cnt_groupFromApi.teacher.ScaleId)).subscribe((algo)=>{
          this.form.controls['ScaleId'].setValue(algo.scale)
        })

        if(cnt_groupFromApi.teacher.ColcienciaCategoryId != undefined)
        this.colcienciaCategoryService.getItem((cnt_groupFromApi.teacher.ColcienciaCategoryId)).subscribe((algo)=>{
          this.form.controls['ColcienciaCategoryId'].setValue(algo.colcienciaCategory)
        })
        if(cnt_groupFromApi.teacher.GroupId != undefined)
        this.groupService.getItem((cnt_groupFromApi.teacher.GroupId)).subscribe((algo)=>{
          this.form.controls['GroupId'].setValue(algo.group)
        })
// console.log(cnt_groupFromApi.teacher.HeadquarterPrograms)
        if(cnt_groupFromApi.teacher.HeadquarterPrograms != undefined){
          
          this.agregarDescuentos(cnt_groupFromApi.teacher.HeadquarterPrograms)
          
        }
     }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(HeadquarterPrograms: HeadquarterProgramI[]) {
    if(HeadquarterPrograms.length){
      for (let key of HeadquarterPrograms) {
        if(key.HeadquarterProgramTeacher != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['headquarterProgramTeacher']
            this.headquarterService.getItem(key.HeadquarterId).subscribe((algo)=>{
              if(algo.headquarter && key.HeadquarterProgramTeacher != undefined){
                this.programService.getItem(key.ProgramId).subscribe((algo1)=>{
                  if(algo1.program && key.HeadquarterProgramTeacher != undefined){
                    this.relationshipService.getItem(key.HeadquarterProgramTeacher.RelationshipId).subscribe
                    ((algo2)=>{

                      if(algo2.relationship && key.HeadquarterProgramTeacher != undefined){
                        control.push(this.formBuilder.group({
                          TeacherId:0,
                            ProgramId:[algo1.program, [Validators.required]],
                            HeadquarterId:[algo.headquarter, [Validators.required]],
                            RelationshipId:[algo2.relationship, [Validators.required]],
                        }))
                      }
                    })
                  }
      
                })
              }
              
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['headquarterProgramTeacher']
      control.removeAt(0)
    }
  }

}
