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
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';

import { LinkTypeI } from 'src/app/models/user/teacher';
import { TrainingI } from 'src/app/models/institution/training';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { LinkTypeService } from 'src/app/core/services/usuer/LinkType.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Create_linkTypeComponent } from '../../Tipo Vinculacion/create_linkType/create_linkType.component';
import { Create_EscalafonComponent } from 'src/app/main/institution/components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Create_CategoriaColcienciasComponent } from 'src/app/main/institution/components/CategoriaColciencias/create_CategoriaColciencias/create_CategoriaColciencias.component';
import { Create_RelacionesComponent } from 'src/app/main/institution/components/Relaciones/create_Relaciones/create_Relaciones.component';
import { Create_capacitacionComponent } from 'src/app/main/institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
  providers: [DialogService]
})
export class CreateTeacherComponent implements OnInit {
  public mostrarDialogo:boolean=false;

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=false;
  public mostrar2:boolean=false;
  public mostrar3:boolean=false;
  
  public algo:number[]=[0];
  public algo2:number[]=[0];
  public algo3:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]

  public mostrarUser:boolean=false;
  public users:PersonI[]=[];
  // public lines:LineI[]=[];
  public linkTypes:LinkTypeI[]=[]
  public trainings: TrainingI[]=[]
 
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
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
    // Lines: this.formBuilder.array([this.formBuilder.group(
    //   {
    //     TeacherId:0,
    //     LineId:['', [Validators.required]],
    // })]),
    trainingTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          TeacherId:0,
          name: [''],
          date_graduation: [''],
          name_institution: [''],
          resolution_convalidation: [''],
          degree_certificate: [''],
          TrainingId:[''],
      })]),
    Workexperiences:this.formBuilder.array([this.formBuilder.group(
      {
        TeacherId:0,
        name_institution: [''],
        position_type: [''],
        functions:[''],
        start_date:[''],
        final_date:[''],
    })]),
    nationality:[''],
    date_of_birth:[''],
    LinkTypeId:['',[Validators.required]]
   });
   public relationships:RelationshipI[]=[]
   public headquarterProgram:any[]=[]
   public headquarterProgramTeacher1:any[] = []
   public trainingTeachers:any[] = []
   public Workexperiences:any[] =[]
   public ref1:any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private linkTypeService:LinkTypeService,
    private teacherService:TeacherService,
    private router: Router,
    public dialogService: DialogService,
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
    private trainingsService:TrainingsService,

  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllscales()
    this.getAllcolcienciaCategorys()
    this.getAllheadquarters()
    this.getAllrelationships()
    this.getAllUser()
    this.getAlltrainings()
    this.getAllLinkTypes()
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
  }
  public cancelar(){
    this.ref.close(undefined);
  }
  getAllLinkTypes() {
    this.linkTypeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.linkTypes = AdministrativeFromApi.linkTypes;
      }, error => console.error(error));
  }
  getAlltrainings() {
    this.trainingsService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.trainings = AdministrativeFromApi.trainings;
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
          password:null,
          UserId:  this.form.value.UserId.UserId,
          hours_of_dedication: this.form.value.hours_of_dedication,
          ScaleId: this.form.value.ScaleId.id,
          ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
          headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
          // Lines: this.form.value.Lines,
          nationality: this.form.value.nationality,
          date_of_birth: this.form.value.date_of_birth,
          LinkTypeId: this.form.value.LinkTypeId.id,
          Workexperiences: this.form.value.Workexperiences,
          trainingTeacher:this.form.value.trainingTeacher
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
        // username:this.form.value.,
        // fullName:this.form.value.,
        email:this.form.value.email,
        password:this.form.value.identification,
        UserId:  undefined,
        hours_of_dedication: this.form.value.hours_of_dedication,
        ScaleId: this.form.value.ScaleId.id,
        ColcienciaCategoryId: this.form.value.ColcienciaCategoryId.id,
        headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
        // Lines: this.form.value.Lines,
        nationality: this.form.value.nationality,
        date_of_birth: this.form.value.date_of_birth,
        LinkTypeId: this.form.value.LinkTypeId.id,
        Workexperiences: this.form.value.Workexperiences,
        trainingTeacher:this.form.value.trainingTeacher
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

    if(this.trainingTeachers.length == 0 || this.trainingTeachers == []){
      let control = <FormArray>this.form.controls['trainingTeacher']
      for (const key of control.value) {

        key.TrainingId=key.TrainingId.id
        this.trainingTeachers.push({
        TeacherId:0,
        name:key.name,
        date_graduation:key.date_graduation,
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
    
              console.log(formValue)

  if(
    (this.mostrarUser == true && formValue.name != ""&& formValue.surname != ""&&
    formValue.DocumentTypeId != ( 0 || undefined)&& formValue.identification != ""&&
    formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
    formValue.phone != ""&& formValue.email != ""&&
    formValue.ScaleId !=("" || undefined) && 
    formValue.nationality != ("" || undefined) && 
    formValue. date_of_birth!= ("" || undefined) && 
    formValue.ColcienciaCategoryId != ("" || undefined) 
    && formValue.hours_of_dedication != ""
    && formValue.LinkTypeId != ("" || undefined))
    ||
    (this.mostrarUser == false && formValue.UserId != ( 0 || undefined) && formValue.hours_of_dedication != ""
    && formValue.ScaleId !=("" || undefined) && formValue.ColcienciaCategoryId != ("" || undefined) &&
    formValue.LinkTypeId != ("" || undefined))){
              // console.log(formValue)

            this.teacherService.createItem(formValue).subscribe(
              (algo) => {
                if(this.mostrarDialogo== true){
                  this.ref.close(algo);
                }else{
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
                }
              },async error => {
                if(error != undefined) {
                  let text = await translate(error.error.message, "es");
                  if(error.error.dataErros){
                    text = await translate(error.error.dataErros[0].message, "es");
                  }
                  this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
                }
              });
            }
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

    this.ref1 = this.dialogService.open(Create_linkTypeComponent, {
      width: '40%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Tipo de Vinculacion Creada', detail: person.name,life: 2000});
      this.getAllLinkTypes()

        }
  });
  }
  addEscalafon(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_EscalafonComponent, {
      width: '40%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Escalafon Creado', detail: person.name,life: 2000});
      this.getAllscales()

        }
  });
  }
  addCategoriaColciencias(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_CategoriaColcienciasComponent, {
      width: '40%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Categoria Colciencias Creada', detail: person.name,life: 2000});
      this.getAllcolcienciaCategorys()

        }
  });
  }
  addRelaciones(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_RelacionesComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Relaciones Creada', detail: person.name,life: 2000});
      this.getAllrelationships()

        }
  });
  }
  addCapacitaciones(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_capacitacionComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Capacitación Creada', detail: person.name,life: 2000});
      this.getAlltrainings()

        }
  });
  }

  addGenero(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_genderComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Genero Creado', detail: person.name,life: 2000});
      this.getAllgenders()

        }
  });
  }


  addTipoDocumento(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_documentTypeComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Tipo de Documento Creado', detail: person.name,life: 2000});
      this.getAlldocumentTypes()

        }
  });
  }
}
