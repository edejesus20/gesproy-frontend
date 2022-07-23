import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { HeadquarterProgramI, HeadquarterProgramTeacherI } from 'src/app/models/institution/headquarter';
import {  Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { ScaleI } from 'src/app/models/institution/scale';
import { TrainingI, TrainingTeacherI } from 'src/app/models/institution/training';
import { LineI } from 'src/app/models/projet/line';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { Charge_bondingI, WorkexperienceI } from 'src/app/models/user/teacher';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Create_EscalafonComponent } from 'src/app/main/investigacion/components/Escalafon/create_Escalafon/create_Escalafon.component';
import { Create_capacitacionComponent } from 'src/app/main/institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';const translate = require('translate');
import *as moment from 'moment';
import { Create_MincienciaCategoryComponent } from 'src/app/main/investigacion/components/MincienciasCategoria/create_MincienciaCategory/create_MincienciaCategory.component';
import { Create_Research_bondingComponent } from 'src/app/main/investigacion/components/VinculacionInvestigacion/create_Research_bonding/create_Research_bonding.component';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
import { Create_Charge_bondingComponent } from '../../Vinculacion Cargo/create_Charge_bonding/create_Charge_bonding.component';
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';
import { Archivo } from 'src/app/layout/private-layout/perfil/perfil.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-teacher',
  templateUrl: './editar-teacher.component.html',
  styleUrls: ['./editar-teacher.component.css'],
  providers: [DialogService]
})
export class EditarTeacherComponent implements OnInit {
  API_URI = environment.API_URI;
  items: MenuItem[]=[]
  activeIndex: number = 0;

  
  public mostrar:number=1;
  public mostrar2:boolean=false;
  public mostrar1:boolean=true;
  public bandera:boolean=false
  
  public mostrar3:boolean=false;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:any[] =[]
  public mincienciaCategorys:MincienciaCategoryI[] =[]
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public algo:number[]=[0];
  public algo2:number[]=[0];
  public lines:LineI[]=[];
  public charge_bondings:Charge_bondingI[] = []
  public trainings: TrainingI[]=[]
  public Workexperiences:any[] =[]
  public trainingTeachers:any[] =[]
  
  public algo3:number[]=[0];
  public ref:any;

  public research_bondings:Research_bondingI[]=[]
   public headquarterProgramStudent1:any[]=[]
   public headquarterProgram:any[]=[]

   public resolution_convalidations:any[]=[
    {value:'Si'},{value:'No'}]
    public validandoCertificado:boolean[]=[]

   FilesFormaciones:Archivo[] =[]
  FilesExperinecia:Archivo[] =[]

  private deletetrainingTeachers:any[]=[]
  private deleteWorkexperiences:any[] = []
  public Avatar:string=''
  ArchivosEliminados:any[] =[]
  public deleteheadquarterProgramTeachers:any[]=[]
  FilesResolusiones:Archivo[] =[]
  private user:number=0
  constructor(
    private primengConfig: PrimeNGConfig,
    private teacherService:TeacherService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private scaleService:ScaleService,
    private formBuilder: FormBuilder,
    private mincienciaCategoryService:MincienciaCategoryService,
    private headquarterService: HeadquarterService,
    private research_bondingService:Research_bondingService,
    private lineService:LineService,
    private charge_bondingService:Charge_bondingService,
    private trainingsService:TrainingsService,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.items = [
      {
      label: 'Datos Basicos',
      command: (event: any) => {
          this.activeIndex = 0;
         }
      },
      {
          label: 'Datos Institucionales',
          command: (event: any) => {
              this.activeIndex = 1;
            }
      },
      {
        label: 'Formación Académica',
        command: (event: any) => {
            this.activeIndex = 2;
          }
      },
      {
        label: 'Experiencia Laboral',
        command: (event: any) => {
            this.activeIndex = 3;
          }
      },
    ];
    this.primengConfig.ripple = true;
    this.form=this.formBuilder.group({
      id: [''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      DocumentTypeId:['', [Validators.required]],
      identification:['', [Validators.required]],
      // GenderId:['', [Validators.required]],
      // address:['', [Validators.required]],
      // phone:['', [Validators.required]],
      email:['', [Validators.required]],
      ScaleId:[''],
      // hours_of_dedication:['', [Validators.required]],
      MincienciaCategoryId:['', [Validators.required]],
      headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          id:0,
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          ResearchBondingId:['', [Validators.required]],
      })]),
      // Lines: this.formBuilder.array([this.formBuilder.group(
      //   {
      //     TeacherId:0,
      //     LineId:['', [Validators.required]],
      // })]),
      trainingTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          id:0,
          name: [''],
          date_graduation: [''],
          name_institution: [''],
          resolution_convalidation: [{value:'No'}],
          degree_certificate: [''],
          TeacherId:this.form.value.id,
          TrainingId:[''],
          resolution_certificate:[''],

      })]),
      Workexperiences:this.formBuilder.array([this.formBuilder.group(
        {
          id:0,
          TeacherId:this.form.value.id,
          name_institution: [''],
          position_type: [''],
          functions:[''],
          start_date:[''],
          final_date:[''],
          constancy:['']
      })]),
      // nationality:['', [Validators.required]],
      // date_of_birth:['', [Validators.required]],
      ChargeBondingId:['', [Validators.required]],
      deletetrainingTeachers:[''],
    deleteWorkexperiences:[''],
    ArchivosEliminados:[''],
    deleteheadquarterProgramTeachers:[''],
    Link_cvlac:[''],
    Link_orcid:[''],

    });
    // this.getAllgenders()
    // this.getAlldocumentTypes()
    // this.getAllscales()
  
    this.getAllcolcienciaCategorys()
    this.getAllheadquarters()
    this.getAllrelationships()
    this.getAlltrainings()
    this.getAllLinkTypes()
  }
  
  getAlltrainings() {
    this.trainingsService.getList().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.trainings) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.trainings = AdministrativeFromApi.trainings;
      }, error => console.error(error));
  }
  getAllLinkTypes() {
    this.charge_bondingService.getList().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.charge_bondings) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.charge_bondings = AdministrativeFromApi.charge_bondings;
        // console.log(this.linkTypes)
      }, error => console.error(error));
  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.activeIndex = 0;
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.activeIndex = 0;
    this.mostrar2= false
    this.mostrar3= false
    this.bandera=false
    this.Workexperiences=[]
    this. headquarterProgramStudent1=[]
    this. headquarterProgram=[]
    this.trainingTeachers=[]
    this.validandoCertificado=[]
    this.FilesFormaciones =[]
    this.FilesExperinecia =[]
    this.deletetrainingTeachers=[]
    this.deleteWorkexperiences = []
    this.ArchivosEliminados =[]
    this.deleteheadquarterProgramTeachers=[]
    this.FilesResolusiones =[]
    this.form.controls['Link_cvlac'].setValue('')
    this.form.controls['Link_orcid'].setValue('')
    // this.vaciar()
  }

  public onSubmit() {

    let formValue={
      id: this.form.value.id,
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId.id,
      identification: this.form.value.identification,
      // GenderId: this.form.value.GenderId.id,
      // address: this.form.value.address,
      // phone: this.form.value.phone,
      username:'',
      fullName:'',
      email:this.form.value.email,
      password:'',
      UserId: 0,
      // hours_of_dedication: this.form.value.hours_of_dedication,
      ScaleId: this.form.value.ScaleId.id,
      MincienciaCategoryId: this.form.value.MincienciaCategoryId.id,
      headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
      // Lines: this.form.value.Lines
      // nationality: this.form.value.nationality,
      // let a = moment(moment(fechanueva).format("DD-MM-YYYY"));
      // date_of_birth:moment(this.form.value.date_of_birth).format("YYYY-MM-DD").toString(),
      ChargeBondingId: this.form.value.ChargeBondingId.id,
      Workexperiences: this.form.value.Workexperiences,
      trainingTeacher:this.form.value.trainingTeacher,
      deletetrainingTeachers:this.deletetrainingTeachers,
      deleteWorkexperiences:this.deleteWorkexperiences,
      ArchivosEliminados:this.ArchivosEliminados,
      deleteheadquarterProgramTeachers:this.deleteheadquarterProgramTeachers,
      Link_cvlac:this.form.value.Link_cvlac,
        Link_orcid:this.form.value.Link_orcid,

    };
    let boolean:boolean = false
    for (const clave of formValue.trainingTeacher) {
      // console.log(clave,'clave')
      if(clave.resolution_convalidation.value == 'Si' && clave.degree_certificate == ""){
        boolean=true
      }
      
    }

  if(boolean == false){
      if(this.scales.length == 0){
        formValue.ScaleId=''
      }

      if(this.headquarterProgramStudent1.length == 0 ){
        let control = <FormArray>this.form.controls['headquarterProgramTeacher']
        for (const key of control.value) {
          key.HeadquarterProgramId=key.HeadquarterProgramId.id
          key.ResearchBondingId=key.ResearchBondingId.id
          key.TeacherId=this.form.value.id
          // this.headquarterProgramStudent1.push({
          //   TeacherId:0,
          //   HeadquarterProgramId:key.HeadquarterProgramId,
          //   ResearchBondingId:key.ResearchBondingId,
          // })
        }
        this.headquarterProgramStudent1= this.form.value.headquarterProgramTeacher
        formValue.headquarterProgramTeacher = this.form.value.headquarterProgramTeacher
      }else{
        formValue.headquarterProgramTeacher = this.headquarterProgramStudent1
      }
    
      if(this.trainingTeachers.length == 0 ){
        let control = <FormArray>this.form.controls['trainingTeacher']
        for (const key of control.value) {

          key.TrainingId=key.TrainingId.id
          // this.trainingTeachers.push({
          // TeacherId:0,
          // name:key.name,
          // date_graduation:moment(key.date_graduation).format("YYYY-MM-DD").toString(),
          // name_institution:key.name_institution,
          // resolution_convalidation:key.resolution_convalidation,
          // degree_certificate:key.degree_certificate,
          // TrainingId:key.TrainingId,
          // })
        }
        this.trainingTeachers= this.form.value.trainingTeacher
        formValue.trainingTeacher = this.form.value.trainingTeacher
      }else{
        formValue.trainingTeacher = this.trainingTeachers
      }

      if(this.Workexperiences.length == 0 ){
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
      // console.log(formValue)
      if(formValue.name != ""&&
        formValue.surname != ""&&
        formValue.DocumentTypeId != ( 0 || undefined)&&
        formValue.identification != ""&&
        // formValue.GenderId != ( 0 || undefined)&&
        // formValue.address != ""&&
        // formValue.phone != ""&&
        formValue.email != ""&&
        // formValue.hours_of_dedication != ""&&
        // formValue.nationality != ("" || undefined) && 
        // formValue. date_of_birth!= ("" || undefined) && 
      //  formValue.ScaleId !=("" || undefined)  &&
    formValue.MincienciaCategoryId != ("" || undefined) &&
      formValue.ChargeBondingId != ("" || undefined)
      ){
        
        this.bandera=true

      this.teacherService.updateItem(formValue.id,formValue).subscribe(
        (algo) => {

          let arrayCertificado:any[] = []
          let arrayResolusion:any[] = []
          let array1:any[] = []
          let Bandera:boolean = false
        // console.log(algo.teacherOne,'algo.teacher')
          if(algo.teacherOne.id != undefined){

            // console.log(algo.teacherOne,'algo.teacher')
            if(algo.teacherOne?.TrainingTeachers?.length != undefined 
              && algo.teacherOne.TrainingTeachers.length >0){
              // console.log('algo.teacher?.TrainingTeachers')
              for (const key of algo.teacherOne.TrainingTeachers) {
                if(key.id){
                  arrayCertificado.push({
                    UserId: this.user,
                    TrainingTeacherId:key.id,
                    name:'certificado'+key.Training?.name, 
                    file:null
                    })
                    arrayResolusion.push({
                      UserId: this.user,
                      TrainingTeacherId:key.id,
                      name:'certificadoResolucion', 
                      file:null
                      })
                }
              }
              // console.log(array,'array')
              // array de resolucion
               for (let index = 0; index < arrayResolusion.length; index++) {
                 const element = arrayResolusion[index];

                  for (const key of algo.teacherOne.TrainingTeachers) {
                    if(key.id == element.TrainingTeacherId){
                      if(key.AnexosTrainingTeachers?.length != undefined &&  key.AnexosTrainingTeachers?.length > 0){

                      }else{
                        if(this.FilesResolusiones.length > 0){
                          for (const key1 of this.FilesResolusiones) {
                            // cont=cont + 1
                            // console.log(key1.position + '=='+index,'position y index')
                            if( key1.id==0 && key1.position == index){
                              console.log(' key1.id==0 && key1.position == index')
                              arrayResolusion[index].file=key1.file
                            }
                            // console.log(key1.id + '=='+array[index].TrainingTeacherId,'id y TrainingTeacherId')
                            if(key1.id == parseInt(arrayResolusion[index].TrainingTeacherId)){

                              console.log(' key1.id == array[index].TrainingTeacherId')
                              arrayResolusion[index].file=key1.file
                            }
                          
                        }
                        }
                      }
                    }
                }
              }
              for (let index = 0; index < arrayCertificado.length; index++) {
                const element = arrayCertificado[index];

                for (const key of algo.teacherOne.TrainingTeachers) {
                    if(key.id == element.TrainingTeacherId){
                      if(key.AnexosTrainingTeachers?.length != undefined &&  key.AnexosTrainingTeachers?.length > 0){

                      }else{

                        if(this.FilesFormaciones.length > 0){
                          for (const key2 of this.FilesFormaciones) {
                            // cont=cont + 1
                            // console.log(key2.position + '=='+index,'position y index')
                            if( key2.id==0 && key2.position == index){
                              console.log(' key2.id==0 && key2.position == index')
                              arrayCertificado[index].file=key2.file
                            }
                            // console.log(key2.id + '=='+array[index].TrainingTeacherId,'id y TrainingTeacherId')
                            if(key2.id == parseInt(arrayCertificado[index].TrainingTeacherId)){

                              console.log(' key2.id == array[index].TrainingTeacherId')
                              arrayCertificado[index].file=key2.file
                            }
                          
                        }
                      }
                    }
                  }
                }
            }
              }
              // enviar archivos de resolusion
              if(this.FilesResolusiones.length > 0 && arrayResolusion.length > 0){
                console.log(arrayResolusion,'arrayResolusion')
                let cont=0
                for (let key1 of arrayResolusion) {
                      if(key1.file != null){

                      this.teacherService.ResolusionDocente(key1.UserId.toString(),key1.TrainingTeacherId.toString(),key1.name.toString(),key1.file).subscribe(result=>{
                          cont=cont + 1
                          if(cont == this.FilesResolusiones.length){
                            Bandera=true
                    
                          }
                        
                      },error => console.error(error))
                    }else{
                      Bandera=true
                    }
                  }
                Bandera=true
                // aqui enviar datos
              }else{
                Bandera=true
              } 
          // array de certificado de grado
            if(this.FilesFormaciones.length > 0 && arrayCertificado.length > 0){
              console.log(arrayCertificado,'array')
              let cont=0
              for (let key1 of arrayCertificado) {
                    if(key1.file != null){

                    this.teacherService.FormacionDocente(key1.UserId.toString(),key1.TrainingTeacherId.toString(),key1.name.toString(),key1.file).subscribe(result=>{
                        cont=cont + 1
                        if(cont == this.FilesFormaciones.length){
                          Bandera=true
                  
                        }
                      
                    },error => console.error(error))
                  }else{
                    Bandera=true
                  }
                }
              Bandera=true
              // aqui enviar datos
            }else{
              Bandera=true
            }      
            

            if(algo.teacherOne?.Workexperiences?.length != undefined  
              && algo.teacherOne?.Workexperiences?.length > 0){
                for (const key of algo.teacherOne.Workexperiences) {
                  if(key.id){
                    array1.push({
                      UserId:this.user,
                      WorkexperienceId:key.id,
                      name:'constancia'+key.name_institution, 
                      file:null
                      }
                      )
                  }
                }

                for (let index = 0; index < array1.length; index++) {
                  const element = array1[index];

                  for (const key of algo.teacherOne.Workexperiences) {
                    if(key.id == element.WorkexperienceId){
                      if(key.AnexosWorkexperiences?.length != undefined 
                        &&  key.AnexosWorkexperiences?.length > 0){
                    //  console.log('jaja')
                      }else{
                        if(this.FilesExperinecia.length > 0){
                          for (const key3 of this.FilesExperinecia) {
                            // cont=cont + 1
                            // console.log(key3.position + '=='+index,'position y index')
                            if( key3.id==0 && key3.position == index){
                              // console.log(' key3.id==0 && key3.position == index')
                              array1[index].file=key3.file
                            }
                            // console.log(key3.id + '=='+array[index].TrainingTeacherId,'id y TrainingTeacherId')
                            if(key3.id == 
                            parseInt(array1[index].WorkexperienceId)){

                              console.log(' key3.id == array[index].WorkexperienceId')
                              array1[index].file=key3.file
                            }
                          
                        }
                      }
                    }
                  }
                }
              }
              }
              // console.log(array1,'array1')
              if(this.FilesExperinecia.length > 0 && array1.length > 0){
              let cont1=0
                for (let clave1 of array1) {
                  if(clave1.file != null){
                                                // console.log(clave1.UserId.toString(),clave1.TrainingTeacherId.toString(),
                  // clave1.name.toString(),clave1.file,'datos enviados')
                    this.teacherService.ExperienciaLaboralDocente(clave1.UserId.toString(),
                    clave1.WorkexperienceId.toString(),clave1.name.toString(),clave1.file).subscribe(result=>{
                        cont1=cont1 + 1
                        console.log('aqui se eviaron datos')
                        if(cont1 == this.FilesExperinecia.length){
                          Bandera=true
                    
                        }
                        
                    },error => console.error(error))
                  }else{
                    Bandera=true
                  }

                
                }
              Bandera=true
              }else{
                Bandera=true
              }
              // alerta de exito
              if(Bandera==true){
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
                            this.ngOnInit()
                            this.volver(new Event(''))
                            this.activeIndex = 0;
                            this.bandera=false
                            clearInterval(interval); 
                          }
                    }, 1000);
              }
              
            }
            
        },async error => {
          if(error != undefined) {
           this.bandera=false

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
}else{
  this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan Certificados por adjuntar'});

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
          id:0,
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          ResearchBondingId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar1 == true){
        control.push(this.formBuilder.group({
          id:0,
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
          ResearchBondingId:['', [Validators.required]],
        }))

      }
      this.mostrar1=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['headquarterProgramTeacher']//aceder al control
    this.deleteheadquarterProgramTeachers.push(control.value[index])
    
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar1=false
      control.push(this.formBuilder.group({
        id:0,
        TeacherId:0,
        HeadquarterProgramId:['', [Validators.required]],
        ResearchBondingId:['', [Validators.required]],
      }))
      }
  }
 

public getAllscales(event?: Event) {
  if(event)event.preventDefault()
  if(this.form.value.ChargeBondingId != ''){
    this.scales=[]
    this.charge_bondingService.getItem(this.form.value.ChargeBondingId.id).subscribe(algo=>{
      if(algo.charge_bonding.ChargebondingScales?.length != undefined
        && algo.charge_bonding.ChargebondingScales.length > 0){
        
          for (let key of algo.charge_bonding.ChargebondingScales) {
            if(key.Scale!= undefined){
              // for (let key of AdministrativeFromApi.charge_bondings) {
                key.Scale.name =  key.Scale.name.charAt(0).toUpperCase() +  key.Scale.name.slice(1);
              // }
              this.scales.push(key.Scale)
            }
            
          }
      // console.log(this.scales)

        }
    })

  }
  // this.scaleService.getList().subscribe(
  //   (AdministrativeFromApi) => {
  //     // console.log(AdministrativeFromApi.administratives)
  //     this.scales = AdministrativeFromApi.scales;
  //   }, error => console.error(error));
}


private getAllcolcienciaCategorys(selectId?: number) {
  this.mincienciaCategoryService.getList().subscribe(
    (AdministrativeFromApi) => {
      for (let key of AdministrativeFromApi.mincienciaCategorys) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.mincienciaCategorys = AdministrativeFromApi.mincienciaCategorys;
    }, error => console.error(error));
}

private getAllheadquarters(selectId?: number) {
  this.headquarterService.HeadquarterProgram().subscribe(
    (AdministrativeFromApi) => {
      for (let key of AdministrativeFromApi.headquarterProgram) {
        if(key.Headquarter?.name){
          key.Headquarter.name =  key.Headquarter.name.charAt(0).toUpperCase() +  key.Headquarter.name.slice(1);

        }
        if(key.Program?.name){
          key.Program.name =  key.Program.name.charAt(0).toUpperCase() +  key.Program.name.slice(1);

        }
      }
      this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
    }, error => console.error(error));
}

private getAllrelationships(selectId?: number) {
  this.research_bondingService.getList().subscribe(
    (AdministrativeFromApi) => {
      // console.log(AdministrativeFromApi.administratives)
      for (let key of AdministrativeFromApi.research_bondings) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.research_bondings = AdministrativeFromApi.research_bondings;
    }, error => console.error(error));
}


ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.mostrar2= false
  this.mostrar3= false
  this.scales=[]
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
    console.log(cnt_groupFromApi.teacher)
    if(cnt_groupFromApi.teacher.id != undefined
      ){
         
      
        this.form.controls['id'].setValue(cnt_groupFromApi.teacher.id)
        if(cnt_groupFromApi.teacher.User?.avatar != undefined){
          var avatar =cnt_groupFromApi.teacher.User.avatar ;
          var n = avatar.search("assets");
          if(n == -1){
            cnt_groupFromApi.teacher.User.avatar =this.API_URI+cnt_groupFromApi.teacher.User.avatar
            // console.log("avatar",key.avatar)
          }else{
            cnt_groupFromApi.teacher.User.avatar =cnt_groupFromApi.teacher.User.avatar 
          }
          this.Avatar=cnt_groupFromApi.teacher.User.avatar
        } 
       

        this.user=cnt_groupFromApi.teacher.UserId
        if(cnt_groupFromApi.teacher.User?.Person != undefined 
          // cnt_groupFromApi.teacher.User?.Person?.Gender != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.teacher.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.teacher.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.teacher.User.Person.identification)
          // this.form.controls['address'].setValue(cnt_groupFromApi.teacher.User.Person.address)
          // this.form.controls['phone'].setValue(cnt_groupFromApi.teacher.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.teacher.User.email)
          this.form.controls['Link_cvlac'].setValue(cnt_groupFromApi.teacher.Link_cvlac)
          this.form.controls['Link_orcid'].setValue(cnt_groupFromApi.teacher.Link_orcid)
          // this.form.controls['hours_of_dedication'].setValue(cnt_groupFromApi.teacher.hours_of_dedication)
            if(cnt_groupFromApi.teacher.ChargeBondingId != undefined){
            for (const key of this.charge_bondings) {
              if(key.id != undefined && key.id == (cnt_groupFromApi.teacher.ChargeBondingId)){
                this.form.controls['ChargeBondingId'].setValue(key)
              }
            }
          


            if(this.form.value.ChargeBondingId != ''){
              this.scales=[]
              this.charge_bondingService.getItem(this.form.value.ChargeBondingId.id).subscribe(algo=>{
                if(algo.charge_bonding.ChargebondingScales?.length != undefined
                  && algo.charge_bonding.ChargebondingScales.length > 0){
                    for (let key of algo.charge_bonding.ChargebondingScales) {
                      if(key.Scale != undefined){
                key.Scale.name =  key.Scale.name.charAt(0).toUpperCase() +  key.Scale.name.slice(1);

                        this.scales.push(key.Scale)
                      }
                    }
                    if(cnt_groupFromApi.teacher.ChargebondingScaleTeachers?.length != undefined
                      && cnt_groupFromApi.teacher.ChargebondingScaleTeachers.length > 0){
                        for (let scalesTeacher of cnt_groupFromApi.teacher.ChargebondingScaleTeachers) {
                          if( scalesTeacher.status == true && scalesTeacher.ChargebondingScale?.Scale != undefined){
                            for (const key of this.scales) {
                              if(key.id != undefined && key.id == scalesTeacher.ChargebondingScale.Scale.id){
                              this.form.controls['ScaleId'].setValue(key)
                              }
                            }
                          }
                          
                        }
                    }
                  }
              })
          
            }



        // this.charge_bondingService.getItem(cnt_groupFromApi.teacher.ChargeBondingId).subscribe(
        //   (algo1)=>{this.form.controls['ChargeBondingId'].setValue(algo1.charge_bonding)})
        }
              
          // this.form.controls['nationality'].setValue(cnt_groupFromApi.teacher.User.Person.nationality)
            // this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.teacher.User.Person.date_of_birth)
          // if(cnt_groupFromApi.teacher.User.Person.GenderId != undefined)
        // this.genderService.getItem(parseInt(cnt_groupFromApi.teacher.User.Person.GenderId)).subscribe((algo1)=>{
          //  if(cnt_groupFromApi.teacher.User?.Person?.DocumentTypeId != undefined)
        // this.documentTypeService.getItem(parseInt(cnt_groupFromApi.teacher.User.Person.DocumentTypeId)).subscribe((algo)=>{
          this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.teacher.User.Person.DocumentType)
          // this.form.controls['GenderId'].setValue(algo1.gender)
          // }) 
        // })

        }
        // for (const key of this.scales) {
        //   if(key.id != undefined && key.id == (cnt_groupFromApi.teacher.ScaleId)){
        //     this.form.controls['ScaleId'].setValue(key)
        //   }
        // }
        // if(cnt_groupFromApi.teacher.ScaleId != undefined)
        // this.scaleService.getItem((cnt_groupFromApi.teacher.ScaleId)).subscribe((algo)=>{
        //   this.form.controls['ScaleId'].setValue(algo.scale)
        // })

        for (const key of this.mincienciaCategorys) {
          if(key.id != undefined && key.id == parseInt(cnt_groupFromApi.teacher.MincienciaCategoryId)){
            this.form.controls['MincienciaCategoryId'].setValue(key)
          }
        }

        if(cnt_groupFromApi.teacher.HeadquarterProgramTeachers != undefined && cnt_groupFromApi.teacher.HeadquarterProgramTeachers?.length > 0){
          
          this.agregarHeadquarterPrograms(cnt_groupFromApi.teacher.HeadquarterProgramTeachers)
          
        }
        if(cnt_groupFromApi.teacher.TrainingTeachers?.length != undefined && cnt_groupFromApi.teacher.TrainingTeachers?.length > 0){
          this.agregarDescuentos(cnt_groupFromApi.teacher.TrainingTeachers)    
        }
        
        if(cnt_groupFromApi.teacher.Workexperiences?.length != undefined && cnt_groupFromApi.teacher.Workexperiences?.length > 0){
          this.agregarDescuentos2(cnt_groupFromApi.teacher.Workexperiences)    
        }
     }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  // agregarLines(Lines: LineI[]) {
  //   if(Lines.length){
  //     for (let key of Lines) {
  //       if(key.id != undefined) {
  //         // console.log(DiscountLine)
          
  //         let control = <FormArray>this.form.controls['Lines']
  //           this.lineService.getItem(key.id).subscribe((algo)=>{
  //             if(algo.line && key.id != undefined){
  //                 control.push(this.formBuilder.group({
  //                   TeacherId:0,
  //                     LineId:[algo.line, [Validators.required]]
  //                 }))
  //               }
  //           })
  //       }
  //     }
  //     this.mostrar3= true
  //     let control = <FormArray>this.form.controls['Lines']
  //     control.removeAt(0)
  //     // console.log(control)
  //   }
  // }
  // **************************Docentes****************************************************
    // datos filtrados docentes

      // datos de docentes 
      agregarHeadquarterPrograms(HeadquarterProgramTeachers: HeadquarterProgramTeacherI[]) {
        if(HeadquarterProgramTeachers.length){
          for (let key of HeadquarterProgramTeachers) {
            if(key.HeadquarterProgramId != undefined) {
              let control = <FormArray>this.form.controls['headquarterProgramTeacher']
              let  HeadquarterId:any | null=null
              if(key.HeadquarterProgram?.HeadquarterId != undefined
                &&  key.HeadquarterProgram?.ProgramId != undefined && key.status==true){
                  for (let key2 of this.headquarterProgram) {
                    if(key2.HeadquarterId == key.HeadquarterProgram.HeadquarterId 
                      && key2.ProgramId== key.HeadquarterProgram.ProgramId){
                        HeadquarterId=key2
                    }
                  }
                }
                let  ResearchBondingId:any | null=null
                for (const key2 of this.research_bondings) {
                  if(key2.id == key.ResearchBondingId){
                    ResearchBondingId=key2
                  }
                } 

              if(HeadquarterId != null && ResearchBondingId != null){
                control.push(this.formBuilder.group({
                  id:key.id,
                  TeacherId:0,
                    HeadquarterProgramId:[HeadquarterId, [Validators.required]],
                    ResearchBondingId:[ResearchBondingId, [Validators.required]],
                }))
              }else{}

            }
          }
          this.mostrar1= true
          let control = <FormArray>this.form.controls['headquarterProgramTeacher']
          control.removeAt(0)
        }
      }

      agregarDescuentos2(Workexperiences: WorkexperienceI[]) {
        if(Workexperiences.length){
          for (let key of Workexperiences) {
            if(key.id != undefined) {
              // console.log(DiscountLine)
              let AnexoId:any | string = ''
              if(key.AnexosWorkexperiences?.length != undefined 
                && key.AnexosWorkexperiences?.length >0){
                AnexoId=key.AnexosWorkexperiences[0].Anexo
              }
              let cont=0
              let control = <FormArray>this.form.controls['Workexperiences']
                        control.push(this.formBuilder.group({
                          id:key.id,
                          final_date: [key.final_date,[Validators.required]],
                          functions: [key.functions,[Validators.required]],
                          name_institution:[key.name_institution,[Validators.required]],
                          position_type:[key.position_type,[Validators.required]],
                          start_date:[key.start_date,[Validators.required]],
                          constancy:[AnexoId,[Validators.required]]
                        }))
                        this.FilesExperinecia.push({
                          id:key.id,position:cont
                        })
                        cont =cont + 1
          }
        }
          this.mostrar3= true
          let control = <FormArray>this.form.controls['Workexperiences']
          control.removeAt(0)
        }
      }
      agregarDescuentos(TrainingTeachers: TrainingTeacherI[]) {
        if(TrainingTeachers.length){
          for (let index = 0; index < TrainingTeachers.length; index++) {
            const key = TrainingTeachers[index];
          // for (let key of TrainingTeachers) {
            if(key.TrainingId != undefined) {
              // console.log(DiscountLine)
              
              let control = <FormArray>this.form.controls['trainingTeacher']
              let AnexoId:any | string = ''
              let AnexoId1:any | string = ''
              if( key.AnexosTrainingTeachers?.length != undefined && key.AnexosTrainingTeachers?.length >0){
                  for (const ok of key.AnexosTrainingTeachers) {
                    if(ok.Anexo?.name == key.resolution_certificate && key.resolution_convalidation == 'Si'){
                      AnexoId1=ok.Anexo
                    }
                    if( ok.Anexo?.name == key.degree_certificate){
                      AnexoId=ok.Anexo

                    }
                  }
                 
                }
               
              let cont=0
                this.teacherService.getItem(key.TeacherId).subscribe((algo1)=>{
                  if(algo1.teacher.id != undefined && key.TrainingId != undefined) {
                    this.trainingsService.getItem(key.TrainingId).subscribe((algo)=>{
                      if(algo.training.id != undefined && key.id){
                        // let any :any=algo.training
                      
                        control.push(this.formBuilder.group({
                          id:key.id,
                          name: [key?.name,[Validators.required]],
                          date_graduation: [key?.date_graduation,[Validators.required]],
                          name_institution: [key?.name_institution,[Validators.required]],
                          resolution_convalidation: [{value:key?.resolution_convalidation},[Validators.required]],
                          degree_certificate: [AnexoId,[Validators.required]],
                          resolution_certificate:AnexoId1,
                          TeacherId:algo1.teacher.id,
                          TrainingId:[algo.training,[Validators.required]],
                        }))
                        
                        this.FilesFormaciones.push({
                          id:key.id,position:cont
                        })
                        this.FilesResolusiones.push({
                          id:key.id,position:cont
                        })
                        cont =cont + 1

                        // console.log(control,'control')
                        this.resolucion(new Event(''),index)
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
          id:0,
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
             constancy:[''],
          }))
        }
        if(control.length >= 1 && this.mostrar3 == true){
          control.push(this.formBuilder.group({
          id:0,
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
             constancy:[''],
          }))
  
        }
        this.mostrar3=true
    }
    removeWorkexperiences(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Workexperiences']//aceder al control
       if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteWorkexperiences.push(control.value[index]);
      }
      control.removeAt(index)
      if( this.FilesExperinecia[index] != undefined){
          this.FilesExperinecia.splice(index,1) 
        }
        if(control.length <= 0){
        this.mostrar3=false
        control.push(this.formBuilder.group({
          id:0,

          TeacherId:0,
          name_institution: [''],
          position_type: [''],
          functions:[''],
          start_date:[''],
          final_date:[''],
           constancy:[''],
        }))
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
          id:0,

              TeacherId:0,
              name: [''],
              date_graduation: [''],
              name_institution: [''],
              resolution_convalidation: [{value:'No'}],
              degree_certificate: [''],
              TrainingId:[''],
              resolution_certificate:[''],
            }))
          }
          if(control.length >= 1 && this.mostrar2 == true){
            control.push(this.formBuilder.group({
          id:0,

              TeacherId:0,
              name: [''],
              date_graduation: [''],
              name_institution: [''],
              resolution_convalidation: [{value:'No'}],
              degree_certificate: [''],
              TrainingId:[''],
              resolution_certificate:[''],
            }))
    
          }
          this.mostrar2=true
      }
      removetrainingTeacher(index: number,event: Event){
        event.preventDefault();
        let control = <FormArray>this.form.controls['trainingTeacher']//aceder al control
        
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deletetrainingTeachers.push(control.value[index]);
      }
      control.removeAt(index)
      if( this.FilesFormaciones[index] != undefined){
        // console.log('aquii-actualizado file')

        this.FilesFormaciones.splice(index,1)
        
      }
      if(this.FilesResolusiones[index] != undefined){
        this.FilesResolusiones.splice(index,1)
        this.validandoCertificado.splice(index,1)

      }
        // console.log(this.FilesFormaciones,'this.FilesFormaciones');
      // al eliminar un registro, se debe quitar el file del array
      // this.FilesFormaciones.(index)
          if(control.length <= 0){
          this.mostrar2=false
          control.push(this.formBuilder.group({
          id:0,

            TeacherId:0,
            name: [''],
            date_graduation: [''],
            name_institution: [''],
            resolution_convalidation: [{value:'No'}],
            degree_certificate: [''],
            resolution_certificate:[''],
            TrainingId:[''],
          }))
          }
      }

      // ventanas modales

  addVinculacion(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_Charge_bondingComponent, {
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
          this.messageService.add({severity:'info', summary: 'Vinculacion de Cargo Creada', detail: person.name,life: 2000});
      this.getAllLinkTypes()

        }
  });
  }

  addCategoriaColciencias(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_MincienciaCategoryComponent, {
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
          this.messageService.add({severity:'info', summary: 'Categoria Minciencias Creada', detail: person.name,life: 2000});
      this.getAllcolcienciaCategorys()

        }
  });
  }
  addRelaciones(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_Research_bondingComponent, {
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
          this.messageService.add({severity:'info', summary: 'Vinculacion Investigativa Creada', detail: person.name,life: 2000});
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
          this.messageService.add({severity:'info', summary: 'Formación Creada', detail: person.name,life: 2000});
      this.getAlltrainings()

        }
  });
  }

   // ***************************************Codigo Logica Docente****************************************

   resolucion(e:Event,pointIndex:number) {
    e.preventDefault();
    const control = <FormArray>this.form.controls['trainingTeacher']
    // console.log(control.value[pointIndex].resolution_convalidation)
    if(control.value[pointIndex].resolution_convalidation.value == 'Si'){
      if(this.validandoCertificado.length == 0){
        this.validandoCertificado.push(true)
      }else{
        this.validandoCertificado[pointIndex]=true
      }
      // control.value[pointIndex].degree_certificate
    
    }
    if(control.value[pointIndex].resolution_convalidation.value == 'No'){
      if(this.validandoCertificado.length == 0){
        this.validandoCertificado.push(false)
      }else{
        this.validandoCertificado[pointIndex]=false
      }
    }
    // console.log('aja')
    // console.log(this.validandoCertificado)
    // console.log(control.value[pointIndex].degree_certificate)
  }
  // files Certificado formaciones
  onFileChange(event:any,pointIndex:number) {
  event.preventDefault();
  const control = <FormArray>this.form.controls['trainingTeacher']
  // console.log(control.value[pointIndex].resolution_convalidation)
  if(control.value[pointIndex].degree_certificate != ''){
    // console.log('aquii')
    if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
      const file=event.target.files[0];

          
          if( this.FilesFormaciones[pointIndex] != undefined){

            this.FilesFormaciones[pointIndex]={
              id:control.value[pointIndex].id,
              position:pointIndex,
              file:file
            }

            
          }else{
            this.FilesFormaciones.push({id:control.value[pointIndex].id,position:pointIndex,
              file:file})

          }
          // console.log(this.FilesFormaciones,'this.FilesFormaciones')
  }
  }



  }
  // files constancia experiencia laboral
  onFileChange1(event:any,pointIndex:number) {
    event.preventDefault();
    const control = <FormArray>this.form.controls['Workexperiences']
    // console.log(control.value[pointIndex].resolution_convalidation)
    if(control.value[pointIndex].constancy != ''){
      // console.log('aquii')
      if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];
      
        // if(file.type.includes("constancy")){//Evaluar si es una imagen
            // const reader= new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload=function load(){
            //    let images=reader.result; //Asignar al thumbnail
            // }.bind(this);
            // this.file=file;
            
            if( this.FilesExperinecia[pointIndex] != undefined){
              // console.log('aquii-actualizado file')

              this.FilesExperinecia[pointIndex]={
                id:control.value[pointIndex].id,
                position:pointIndex,
                file:file}

            }else{
              // console.log('aquii-nuevo file')
              this.FilesExperinecia.push({id:control.value[pointIndex].id,position:pointIndex,file:file})

            }
            console.log(this.FilesExperinecia,'this.FilesExperinecia')
            // console.log(this.file)
            // console.log(reader,'reader')
        // }
    }
    }
  

  
  }
  // files para certificado de resolucion dos
  onFileChange2(event:any,pointIndex:number) {
    event.preventDefault();
    const control = <FormArray>this.form.controls['trainingTeacher']
    if(control.value[pointIndex].resolution_certificate != ''){
      if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];

            if( this.FilesResolusiones[pointIndex] != undefined){
              // console.log('aquii-actualizado file')

              this.FilesResolusiones[pointIndex]={
                id:control.value[pointIndex].id,
                position:pointIndex,
                file:file
              }

              
            }else{
              // console.log('aquii-nuevo file')
              this.FilesResolusiones.push({id:control.value[pointIndex].id,position:pointIndex,
                file:file})

            }
            console.log(this.FilesResolusiones,'this.FilesResolusiones')
    }
    }
  

  
    }

  // archivos eliminados
  removeArchivo(item:any,event:Event,pointIndex:number){
  
    event.preventDefault()

    this.ArchivosEliminados.push(item)
    console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
    let control = <FormArray>this.form.controls['trainingTeacher']
    control.controls[pointIndex].get('degree_certificate')?.setValue('')
  }
  removeArchivoC(item:any,event:Event,pointIndex:number){
  
    event.preventDefault()

    this.ArchivosEliminados.push(item)
    console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
    let control = <FormArray>this.form.controls['Workexperiences']
    control.controls[pointIndex].get('constancy')?.setValue('')

    // if( this.FilesExperinecia[pointIndex] != undefined){
    //   // console.log('aquii-actualizado file')

    //   this.FilesExperinecia.splice(pointIndex,1)
      
    // }
    // console.log(this.FilesExperinecia,'this.FilesExperinecia');
  }

  removeArchivo2(item:any,event:Event,pointIndex:number){
    event.preventDefault()
    this.ArchivosEliminados.push(item)
    // console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
    let control = <FormArray>this.form.controls['trainingTeacher']
    control.controls[pointIndex].get('resolution_certificate')?.setValue('')
  }

}
