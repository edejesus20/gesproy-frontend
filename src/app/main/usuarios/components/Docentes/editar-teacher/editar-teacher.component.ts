import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { LinkTypeService } from 'src/app/core/services/usuer/LinkType.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { HeadquarterProgramI } from 'src/app/models/institution/headquarter';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { ScaleI } from 'src/app/models/institution/scale';
import { TrainingI } from 'src/app/models/institution/training';
import { LineI } from 'src/app/models/projet/line';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { LinkTypeI, WorkexperienceI } from 'src/app/models/user/teacher';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Create_linkTypeComponent } from '../../Tipo Vinculacion/create_linkType/create_linkType.component';
import { Create_EscalafonComponent } from 'src/app/main/institution/components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Create_CategoriaColcienciasComponent } from 'src/app/main/institution/components/CategoriaColciencias/create_CategoriaColciencias/create_CategoriaColciencias.component';
import { Create_RelacionesComponent } from 'src/app/main/institution/components/Relaciones/create_Relaciones/create_Relaciones.component';
import { Create_capacitacionComponent } from 'src/app/main/institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';const translate = require('translate');
import *as moment from 'moment';

@Component({
  selector: 'app-editar-teacher',
  templateUrl: './editar-teacher.component.html',
  styleUrls: ['./editar-teacher.component.css'],
  providers: [DialogService]
})
export class EditarTeacherComponent implements OnInit {
  public mostrar:number=1;
  public mostrar2:boolean=false;
  public mostrar1:boolean=false;
  
  public mostrar3:boolean=false;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]

  public algo:number[]=[0];
  public algo2:number[]=[0];
  public lines:LineI[]=[];
  public linkTypes:LinkTypeI[] = []
  public trainings: TrainingI[]=[]
  public Workexperiences:any[] =[]
  public trainingTeachers:any[] =[]
  
  public algo3:number[]=[0];
  public ref:any;

  public relationships:RelationshipI[]=[]
   public headquarterProgramStudent1:any[]=[]
   public headquarterProgram:any[]=[]

  constructor(
    private primengConfig: PrimeNGConfig,
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
    private lineService:LineService,
    private linkTypeService:LinkTypeService,
    private trainingsService:TrainingsService,
    public dialogService: DialogService,
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
      hours_of_dedication:['', [Validators.required]],
      ColcienciaCategoryId:['', [Validators.required]],
      headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
      })]),
      // Lines: this.formBuilder.array([this.formBuilder.group(
      //   {
      //     TeacherId:0,
      //     LineId:['', [Validators.required]],
      // })]),
      trainingTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          name: [''],
          date_graduation: [''],
          name_institution: [''],
          resolution_convalidation: [''],
          degree_certificate: [''],
          TeacherId:this.form.value.id,
          TrainingId:[''],
      })]),
      Workexperiences:this.formBuilder.array([this.formBuilder.group(
        {
          TeacherId:this.form.value.id,
          name_institution: [''],
          position_type: [''],
          functions:[''],
          start_date:[''],
          final_date:[''],
      })]),
      nationality:['', [Validators.required]],
      date_of_birth:['', [Validators.required]],
      LinkTypeId:['', [Validators.required]]
    });
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllscales()
  
    this.getAllcolcienciaCategorys()
    this.getAllheadquarters()
    this.getAllrelationships()
    this.getAlltrainings()
    this.getAllLinkTypes()
  }
  getAlltrainings() {
    this.trainingsService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.trainings = AdministrativeFromApi.trainings;
      }, error => console.error(error));
  }
  getAllLinkTypes() {
    this.linkTypeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.linkTypes = AdministrativeFromApi.linkTypes;
      }, error => console.error(error));
  }
  // getAllLines() {
  //   this.lineService.getList().subscribe(
  //     (AdministrativeFromApi) => {
  //       this.lines = AdministrativeFromApi.lines;
  //     }, error => console.error(error));
  // }

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
      hours_of_dedication: this.form.value.hours_of_dedication,
      ScaleId: this.form.value.ScaleId.id,
      ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
      headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
      // Lines: this.form.value.Lines
      nationality: this.form.value.nationality,
      // let a = moment(moment(fechanueva).format("DD-MM-YYYY"));
      date_of_birth:moment(this.form.value.date_of_birth).format("YYYY-MM-DD").toString(),
      LinkTypeId: this.form.value.LinkTypeId.id,
      Workexperiences: this.form.value.Workexperiences,
      trainingTeacher:this.form.value.trainingTeacher
    };

    if(this.headquarterProgramStudent1.length == 0 || this.headquarterProgramStudent1 == []){
      let control = <FormArray>this.form.controls['headquarterProgramTeacher']
      for (const key of control.value) {
        key.HeadquarterProgramId=key.HeadquarterProgramId.id
        key.RelationshipId=key.RelationshipId.id
        key.TeacherId=this.form.value.id
        this.headquarterProgramStudent1.push({
          TeacherId:0,
          HeadquarterProgramId:key.HeadquarterProgramId,
          RelationshipId:key.RelationshipId,
        })
      }
      formValue.headquarterProgramTeacher = this.form.value.headquarterProgramTeacher
    }else{
      formValue.headquarterProgramTeacher = this.headquarterProgramStudent1
    }
  
    if(this.trainingTeachers.length == 0 || this.trainingTeachers == []){
      let control = <FormArray>this.form.controls['trainingTeacher']
      for (const key of control.value) {

        key.TrainingId=key.TrainingId.id
        this.trainingTeachers.push({
        TeacherId:0,
        name:key.name,
        date_graduation:moment(key.date_graduation).format("YYYY-MM-DD").toString(),
        name_institution:key.name_institution,
        resolution_convalidation:key.resolution_convalidation,
        degree_certificate:key.degree_certificate,
        TrainingId:key.TrainingId,
        })
      }
      formValue.trainingTeacher = this.form.value.trainingTeacher
    }else{
      formValue.trainingTeacher = this.trainingTeachers
    }

    if(this.Workexperiences.length == 0 || this.Workexperiences == []){
      this.Workexperiences = this.form.value.Workexperiences 
      formValue.Workexperiences = this.form.value.Workexperiences
    }else{
      formValue.Workexperiences = this.Workexperiences
    }

    if(this.form.value.trainingTeacher[0].name == ''){
      // this.form.value.trainingTeacher=[]
      formValue.trainingTeacher=[]
    }
    if(this.form.value.Workexperiences[0].name_institution == ''){
      // this.form.value.Workexperiences=[]
      formValue.Workexperiences=[]

    }
    if(formValue.name != ""&&
      formValue.surname != ""&&
      formValue.DocumentTypeId != ( 0 || undefined)&&
      formValue.identification != ""&&
      formValue.GenderId != ( 0 || undefined)&&
      formValue.address != ""&&
      formValue.phone != ""&&
      formValue.email != ""&&
      formValue.hours_of_dedication != ""&&
      formValue.nationality != ("" || undefined) && 
      formValue. date_of_birth!= ("" || undefined) && 
     formValue.ScaleId !=("" || undefined)
    &&formValue.ColcienciaCategoryId != ("" || undefined) &&
    formValue.LinkTypeId != ("" || undefined)
    ){
      console.log(formValue)

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

get getRoles() {
  return this.form.get('headquarterProgramTeacher') as FormArray;//obtener todos los formularios
}

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['headquarterProgramTeacher']
      if(control.length == 0 && this.mostrar1 == false){
        control.push(this.formBuilder.group({
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar1 == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          RelationshipId:['', [Validators.required]],
        }))

      }
      this.mostrar1=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['headquarterProgramTeacher']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar1=false
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

private getAllcolcienciaCategorys(selectId?: number) {
  this.colcienciaCategoryService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      this.colcienciaCategorys = AdministrativeFromApi.colcienciaCategorys;
    }, error => console.error(error));
}

private getAllheadquarters(selectId?: number) {
  this.headquarterService.HeadquarterProgram().subscribe(
    (AdministrativeFromApi) => {
      this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
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
  this.mostrar2= false
  this.mostrar3= false
}

ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.mostrar2= false
  this.mostrar3= false
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.teacher.id != undefined
      ){
          // console.log(cnt_groupFromApi.teacher)
      
        this.form.controls['id'].setValue(cnt_groupFromApi.teacher.id)
        if(cnt_groupFromApi.teacher.User?.Person != undefined &&
          cnt_groupFromApi.teacher.User?.Person?.Gender != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.teacher.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.teacher.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.teacher.User.Person.identification)
          this.form.controls['address'].setValue(cnt_groupFromApi.teacher.User.Person.address)
          this.form.controls['phone'].setValue(cnt_groupFromApi.teacher.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.teacher.User.email)
          this.form.controls['hours_of_dedication'].setValue(cnt_groupFromApi.teacher.hours_of_dedication)
            if(cnt_groupFromApi.teacher.LinkTypeId != undefined){
            // console.log(cnt_groupFromApi.teacher.LinkType)
        this.linkTypeService.getItem(cnt_groupFromApi.teacher.LinkTypeId).subscribe(
          (algo1)=>{
            this.form.controls['LinkTypeId'].setValue(algo1.linkType)

          })


            }
              
          this.form.controls['nationality'].setValue(cnt_groupFromApi.teacher.User.Person.nationality)
            this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.teacher.User.Person.date_of_birth)
          if(cnt_groupFromApi.teacher.User.Person.GenderId != undefined)
        this.genderService.getItem(parseInt(cnt_groupFromApi.teacher.User.Person.GenderId)).subscribe((algo1)=>{
           if(cnt_groupFromApi.teacher.User?.Person?.DocumentTypeId != undefined)
        this.documentTypeService.getItem(parseInt(cnt_groupFromApi.teacher.User.Person.DocumentTypeId)).subscribe((algo)=>{
          this.form.controls['DocumentTypeId'].setValue(algo.documentType)
          this.form.controls['GenderId'].setValue(algo1.gender)
          }) 
        })

        }

        if(cnt_groupFromApi.teacher.ScaleId != undefined)
        this.scaleService.getItem((cnt_groupFromApi.teacher.ScaleId)).subscribe((algo)=>{
          this.form.controls['ScaleId'].setValue(algo.scale)
        })

        if(cnt_groupFromApi.teacher.ColcienciaCategoryId != undefined)
        this.colcienciaCategoryService.getItem((cnt_groupFromApi.teacher.ColcienciaCategoryId)).subscribe((algo)=>{
          this.form.controls['ColcienciaCategoryId'].setValue(algo.colcienciaCategory)
        })

        if(cnt_groupFromApi.teacher.HeadquarterPrograms != undefined && cnt_groupFromApi.teacher.HeadquarterPrograms?.length > 0){
          
          this.agregarHeadquarterPrograms(cnt_groupFromApi.teacher.HeadquarterPrograms)
          
        }
        if(cnt_groupFromApi.teacher.Trainings?.length != undefined && cnt_groupFromApi.teacher.Trainings?.length > 0){
          // console.log(cnt_groupFromApi.teacher.Trainings)
          this.agregarDescuentos(cnt_groupFromApi.teacher.Trainings)    
        }
        
        if(cnt_groupFromApi.teacher.Workexperiences?.length != undefined && cnt_groupFromApi.teacher.Workexperiences?.length > 0){
          // console.log(cnt_groupFromApi.teacher.Trainings)
          this.agregarDescuentos2(cnt_groupFromApi.teacher.Workexperiences)    
        }
     }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarLines(Lines: LineI[]) {
    if(Lines.length){
      for (let key of Lines) {
        if(key.id != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['Lines']
            this.lineService.getItem(key.id).subscribe((algo)=>{
              if(algo.line && key.id != undefined){
                  control.push(this.formBuilder.group({
                    TeacherId:0,
                      LineId:[algo.line, [Validators.required]]
                  }))
                }
            })
        }
      }
      this.mostrar3= true
      let control = <FormArray>this.form.controls['Lines']
      control.removeAt(0)
      // console.log(control)
    }
  }
  agregarHeadquarterPrograms(HeadquarterPrograms: HeadquarterProgramI[]) {
    if(HeadquarterPrograms.length){
      for (let key of HeadquarterPrograms) {
        if(key.HeadquarterProgramTeacher?.HeadquarterProgramId != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['headquarterProgramTeacher']
            this.headquarterService.getHeadquarterProgramId(key.HeadquarterProgramTeacher.HeadquarterProgramId).subscribe((algo)=>{
              if(algo.headquarterProgram && key.HeadquarterProgramTeacher != undefined){
                    this.relationshipService.getItem(key.HeadquarterProgramTeacher.RelationshipId).subscribe
                    ((algo2)=>{
                      if(algo2.relationship && key.HeadquarterProgramTeacher != undefined){
                        control.push(this.formBuilder.group({
                          TeacherId:0,
                            HeadquarterProgramId:[algo.headquarterProgram[0], [Validators.required]],
                            RelationshipId:[algo2.relationship, [Validators.required]],
                        }))
                      }
                  })
              }
            })
        }
      }
      this.mostrar1= true
      let control = <FormArray>this.form.controls['headquarterProgramTeacher']
      control.removeAt(0)
      // console.log(control)
    }
  }

  agregarDescuentos2(Workexperiences: WorkexperienceI[]) {
    if(Workexperiences.length){
      for (let key of Workexperiences) {
        if(key.TeacherId != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['Workexperiences']
                    control.push(this.formBuilder.group({
                      final_date: key.final_date,
                      functions: key.functions,
                      name_institution:key.name_institution,
                      position_type:key.position_type,
                      start_date:key.start_date
                    }))
      }
    }
      this.mostrar3= true
      let control = <FormArray>this.form.controls['Workexperiences']
      control.removeAt(0)
    }
  }
  agregarDescuentos(Trainings: TrainingI[]) {
    if(Trainings.length){
      for (let key of Trainings) {
        if(key.TrainingTeacher != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['trainingTeacher']
            this.teacherService.getItem(key.TrainingTeacher.TeacherId).subscribe((algo1)=>{
              if(algo1.teacher.id != undefined && key.TrainingTeacher != undefined) {
                this.trainingsService.getItem(key.TrainingTeacher.TrainingId).subscribe((algo)=>{
                  if(algo.training.id != undefined){
                    let any :any=algo.training
                    // console.log(algo.training)
                    control.push(this.formBuilder.group({
                      name: [key.TrainingTeacher?.name, [Validators.required]],
                      date_graduation: [key.TrainingTeacher?.date_graduation, [Validators.required]],
                      name_institution: [key.TrainingTeacher?.name_institution, [Validators.required]],
                      resolution_convalidation: [key.TrainingTeacher?.resolution_convalidation, [Validators.required]],
                      degree_certificate: [key.TrainingTeacher?.degree_certificate, [Validators.required]],
                      TeacherId:algo1.teacher.id,
                      TrainingId:[any, [Validators.required]],
                    }))
                  }
      
                })
              }
              
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['trainingTeacher']
      control.removeAt(0)
    }

  }


  get getWorkexperiences() {
    return this.form.get('Workexperiences') as FormArray;//obtener todos los formularios
  }
  
    addWorkexperiences(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Workexperiences']
        if(control.length == 0 && this.mostrar3 == false){
          control.push(this.formBuilder.group({
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
          }))
        }
        if(control.length >= 1 && this.mostrar3 == true){
          control.push(this.formBuilder.group({
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
          }))
  
        }
        this.mostrar3=true
    }
    removeWorkexperiences(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Workexperiences']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar3=false
        }
    }

    get gettrainingTeacher() {
      return this.form.get('trainingTeacher') as FormArray;//obtener todos los formularios
    }
    
      addtrainingTeacher(event: Event){
        event.preventDefault();
        const control = <FormArray>this.form.controls['trainingTeacher']
          if(control.length == 0 && this.mostrar2 == false){
            control.push(this.formBuilder.group({
              TeacherId:0,
              name: [''],
              date_graduation: [''],
              name_institution: [''],
              resolution_convalidation: [''],
              degree_certificate: [''],
              TrainingId:[''],
            }))
          }
          if(control.length >= 1 && this.mostrar2 == true){
            control.push(this.formBuilder.group({
              TeacherId:0,
              name: [''],
              date_graduation: [''],
              name_institution: [''],
              resolution_convalidation: [''],
              degree_certificate: [''],
              TrainingId:[''],
            }))
    
          }
          this.mostrar2=true
      }
      removetrainingTeacher(index: number,event: Event){
        event.preventDefault();
        let control = <FormArray>this.form.controls['trainingTeacher']//aceder al control
        control.removeAt(index)
          if(control.length <= 0){
          this.mostrar2=false
          }
      }

      // ventanas modales

  addVinculacion(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_linkTypeComponent, {
      width: '40%',
      height: '50%',showHeader:false,
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Tipo de Vinculacion Creada', detail: person.name,life: 2000});
      this.getAllLinkTypes()

        }
  });
  }
  addEscalafon(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_EscalafonComponent, {
      width: '40%',
      height: '50%',showHeader:false,
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Escalafon Creado', detail: person.name,life: 2000});
      this.getAllscales()

        }
  });
  }
  addCategoriaColciencias(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_CategoriaColcienciasComponent, {
      width: '40%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,showHeader:false,
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Categoria Colciencias Creada', detail: person.name,life: 2000});
      this.getAllcolcienciaCategorys()

        }
  });
  }
  addRelaciones(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_RelacionesComponent, {
      width: '35%',
      height: '50%',showHeader:false,
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Relaciones Creada', detail: person.name,life: 2000});
      this.getAllrelationships()

        }
  });
  }
  addCapacitaciones(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_capacitacionComponent, {
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
          this.messageService.add({severity:'info', summary: 'Capacitación Creada', detail: person.name,life: 2000});
      this.getAlltrainings()

        }
  });
  }

  addGenero(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_genderComponent, {
      width: '40%',
      height: '52%',showHeader:false,
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,
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


  addTipoDocumento(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_documentTypeComponent, {
      width: '40%',
      height: '50%',showHeader:false,
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,
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

}
