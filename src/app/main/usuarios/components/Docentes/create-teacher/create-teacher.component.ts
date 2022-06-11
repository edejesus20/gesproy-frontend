import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { ScaleI } from 'src/app/models/institution/scale';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { PersonI } from 'src/app/models/user/person';
import { TrainingI } from 'src/app/models/institution/training';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Create_capacitacionComponent } from 'src/app/main/institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { Create_MincienciaCategoryComponent } from 'src/app/main/investigacion/components/MincienciasCategoria/create_MincienciaCategory/create_MincienciaCategory.component';
import { Create_Research_bondingComponent } from 'src/app/main/investigacion/components/VinculacionInvestigacion/create_Research_bonding/create_Research_bonding.component';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
import { Create_Charge_bondingComponent } from '../../Vinculacion Cargo/create_Charge_bonding/create_Charge_bonding.component';
import { Charge_bondingI } from 'src/app/models/user/teacher';
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';
import { Archivo } from 'src/app/layout/private-layout/perfil/perfil.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
  providers: [DialogService]
})
export class CreateTeacherComponent implements OnInit {
  public mostrarDialogo:boolean=false;
  API_URI = environment.API_URI;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=true;
  public mostrar2:boolean=false;
  public mostrar3:boolean=false;
  
  public algo:number[]=[0];
  public algo2:number[]=[0];
  public algo3:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public mincienciaCategorys:MincienciaCategoryI[] =[]

  public mostrarUser:boolean=false;
  public users:PersonI[]=[];
  // public lines:LineI[]=[];
  public charge_bondings:Charge_bondingI[]=[]
  public trainings: TrainingI[]=[]
 
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public form:FormGroup=this.formBuilder.group({
    name:[''],
    surname:[''],
    DocumentTypeId:[1],
    identification:[''],
    // GenderId:[''],
    // address:[''],
    // phone:[''],
    email:[''],
    ScaleId:[''],
    UserId:[''],
    MincienciaCategoryId:['', [Validators.required]],
    // hours_of_dedication:['', [Validators.required]],
    headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
      {
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
        TeacherId:0,
        name: [''],
        date_graduation: [''],
        name_institution: [''],
        resolution_convalidation: [''],
        degree_certificate: [''],
        TrainingId:[''],
        resolution_certificate:[''],

    })]),
  Workexperiences:this.formBuilder.array([this.formBuilder.group(
    {
      id:0,
      TeacherId:0,
      name_institution: [''],
      position_type: [''],
      functions:[''],
      start_date:[''],
      final_date:[''],
      constancy:['']
  })]),
    // nationality:[''],
    // date_of_birth:[''],
    ChargeBondingId:['',[Validators.required]]
   });
   public research_bondings:Research_bondingI[]=[]
   public headquarterProgram:any[]=[]
   public headquarterProgramTeacher1:any[] = []
   public trainingTeachers:any[] = []
   public Workexperiences:any[] =[]
   public ref1:any;

   public resolution_convalidations:any[]=[
    {value:'Si'},{value:'No'}]
    public validandoCertificado:boolean[]=[]

   FilesFormaciones:Archivo[] =[]
  FilesExperinecia:Archivo[] =[]
  FilesResolusiones:Archivo[] =[]

  private deletetrainingTeachers:any[]=[]
  private deleteWorkexperiences:any[] = []
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private charge_bondingService:Charge_bondingService,
    private teacherService:TeacherService,
    private router: Router,
    public dialogService: DialogService,
    private messageService:MessageService,
    // private genderService:GenderService,
    // private documentTypeService:DocumentTypeService,
    // private scaleService:ScaleService,
    private formBuilder: FormBuilder,
    private mincienciaCategoryService:MincienciaCategoryService,
    private headquarterService: HeadquarterService,
    private research_bondingsService:Research_bondingService,
    private userService:UserService,
    // private lineService:LineService,
    private trainingsService:TrainingsService,

  ) { }

  ngOnInit() {
    // this.getAllgenders()
    // this.getAlldocumentTypes()
    // this.getAllscales()
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
    this.charge_bondingService.getList().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.charge_bondings) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.charge_bondings = AdministrativeFromApi.charge_bondings;
      }, error => console.error(error));
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

  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.users) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          key.surname =  key.surname.charAt(0).toUpperCase() +  key.surname.slice(1);
        }
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
          // GenderId: '',
          // address: '',
          // phone: '',
          username:'',
          fullName:'',
          email:'',
          password:null,
          UserId:  this.form.value.UserId.UserId,
          // hours_of_dedication: this.form.value.hours_of_dedication,
          ScaleId: null,
          MincienciaCategoryId: this.form.value.MincienciaCategoryId.id,
          headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
          // Lines: this.form.value.Lines,
          // nationality: this.form.value.nationality,
          // date_of_birth: this.form.value.date_of_birth,
          ChargeBondingId: this.form.value.ChargeBondingId.id,
          Workexperiences: this.form.value.Workexperiences,
          trainingTeacher:this.form.value.trainingTeacher
        };
       }

    if(this.mostrarUser == true){
        
      formValue={
        name: this.form.value.name,
        surname: this.form.value.surname,
        DocumentTypeId: this.form.value.DocumentTypeId,
        identification: this.form.value.identification,
        // GenderId: this.form.value.GenderId.id,
        // address: this.form.value.address,
        // phone: this.form.value.phone,
        // username:this.form.value.,
        // fullName:this.form.value.,
        email:this.form.value.email,
        password:this.form.value.identification,
        UserId:  undefined,
        // hours_of_dedication: this.form.value.hours_of_dedication,
        ScaleId: null,
        MincienciaCategoryId: this.form.value.MincienciaCategoryId.id,
        headquarterProgramTeacher: this.form.value.headquarterProgramTeacher,
        // Lines: this.form.value.Lines,
        // nationality: this.form.value.nationality,
        // date_of_birth: this.form.value.date_of_birth,
        ChargeBondingId: this.form.value.ChargeBondingId.id,
        Workexperiences: this.form.value.Workexperiences,
        trainingTeacher:this.form.value.trainingTeacher
      };
     
    }

    let boolean:boolean = false
    for (const clave of formValue.trainingTeacher) {
      // console.log(clave,'clave')
      if(clave.resolution_convalidation.value == 'Si' && clave.degree_certificate == ""){
        boolean=true
      }
      
    }

    if(boolean == false){

        if(this.form.value.ScaleId.id){
          formValue.ScaleId=this.form.value.ScaleId.id
        }

        if(this.scales.length == 0){
          formValue.ScaleId=''
        }

        if(this.headquarterProgramTeacher1.length == 0 ){
          let control = <FormArray>this.form.controls['headquarterProgramTeacher']
          for (const key of control.value) {

            key.HeadquarterProgramId=key.HeadquarterProgramId.id
            key.    ResearchBondingId=key.    ResearchBondingId.id
            this.headquarterProgramTeacher1.push({
            TeacherId:0,
            HeadquarterProgramId:key.HeadquarterProgramId,
                ResearchBondingId:key.    ResearchBondingId,
            })
          }
          formValue.headquarterProgramTeacher = this.form.value.headquarterProgramTeacher
        }else{
          formValue.headquarterProgramTeacher = this.headquarterProgramTeacher1
        }

        if(this.trainingTeachers.length == 0 ){
          let control = <FormArray>this.form.controls['trainingTeacher']
          for (const key of control.value) {

            key.TrainingId=key.TrainingId.id
            // this.trainingTeachers.push({
            // TeacherId:0,
            // name:key.name,
            // date_graduation:key.date_graduation,
            // name_institution:key.name_institution,
            // resolution_convalidation:key.resolution_convalidation,
            // degree_certificate:key.degree_certificate,
            // TrainingId:key.TrainingId,
            // })
          }
          this.trainingTeachers=this.form.value.trainingTeacher
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

          console.log(formValue)

      if(
        (this.mostrarUser == true && formValue.name != ""&& formValue.surname != ""&&
        formValue.DocumentTypeId != ( 0 || undefined)   && 
    //  formValue.identification != ""&&
        // formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
        // formValue.phone != ""&& formValue.email != ""&&
        // formValue.ScaleId !=("" || undefined) && 
        // formValue.nationality != ("" || undefined) && 
        // formValue. date_of_birth!= ("" || undefined) && 
        formValue.MincienciaCategoryId != ("" || undefined) 
        // && formValue.hours_of_dedication != ""
        && formValue.ChargeBondingId != ("" || undefined))
        ||
        (this.mostrarUser == false && 
          formValue.UserId != ( 0 || undefined) 
        // && formValue.hours_of_dedication != ""
        && formValue.ScaleId !=("" || undefined) 
        && formValue.MincienciaCategoryId != ("" || undefined) &&
        formValue.ChargeBondingId != ("" || undefined))){
                  // console.log(formValue)

          this.teacherService.createItem(formValue).subscribe(
            (algo) => {

              let arrayCertificado:any[] = []
          let arrayResolusion:any[] = []
          let array1:any[] = []
          let Bandera:boolean = false
        // console.log(algo.teacherOne,'algo.teacher')
          if(algo.teacherOne.id != undefined){

            console.log(algo.teacherOne,'algo.teacher')
            if(algo.teacherOne?.TrainingTeachers?.length != undefined 
              && algo.teacherOne.TrainingTeachers.length >0){
              // console.log('algo.teacher?.TrainingTeachers')
              for (const key of algo.teacherOne.TrainingTeachers) {
                if(key.id){
                  arrayCertificado.push({
                    UserId:this.form.value.id,
                    TrainingTeacherId:key.id,
                    name:'certificado'+key.Training?.name, 
                    file:null
                    })
                    arrayResolusion.push({
                      UserId:this.form.value.id,
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
              // console.log(arrayCertificado,'array')
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
                      UserId:this.form.value.id,
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
                // console.log('aqui')
                
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
                // var date = new Date('2020-01-01 00:00:03');
                //       function padLeft(n:any){ 
                //         return n ="00".substring(0, "00".length - n.length) + n;
                //       }
                //       var interval = setInterval(() => {
                //       var minutes = padLeft(date.getMinutes() + "");
                //       var seconds = padLeft(date.getSeconds() + "");
                //       if( seconds == '03') {
                //       this.messageService.add({severity:'success', summary: 'Success', 
                //       detail: 'Registro de Docente Actualizado con exito'});
                //       }
                //       date = new Date(date.getTime() - 1000);
                //       if( minutes == '00' && seconds == '01' ) {
                //         this.ref.close(algo);
                //         clearInterval(interval); 
                //       }
                // }, 1000);
                // if(this.mostrarDialogo== true){
                //     this.ref.close(algo);
                //   }else{
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
                  // }
              }
                  // alerta de exito
                  if(Bandera==true){
                    // var date = new Date('2020-01-01 00:00:03');
                    //       function padLeft(n:any){ 
                    //         return n ="00".substring(0, "00".length - n.length) + n;
                    //       }
                    //       var interval = setInterval(() => {
                    //       var minutes = padLeft(date.getMinutes() + "");
                    //       var seconds = padLeft(date.getSeconds() + "");
                    //       if( seconds == '03') {
                    //       this.messageService.add({severity:'success', summary: 'Success', 
                    //       detail: 'Registro de Docente Actualizado con exito'});
                    //       }
                    //       date = new Date(date.getTime() - 1000);
                    //       if( minutes == '00' && seconds == '01' ) {
                    //         this.ref.close(algo);
                    //         clearInterval(interval); 
                    //       }
                    // }, 1000);
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
                  }
                  
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
    
      if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
              ResearchBondingId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
              ResearchBondingId:['', [Validators.required]],
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
      control.push(this.formBuilder.group({
        TeacherId:0,
        HeadquarterProgramId:['', [Validators.required]],
            ResearchBondingId:['', [Validators.required]],
      }))
      }
  }



private getAllheadquarters(selectId?: number) {
  this.headquarterService.HeadquarterProgram().subscribe(
    (AdministrativeFromApi) => {
      // console.log( AdministrativeFromApi.headquarterProgram)
      for (let key of AdministrativeFromApi.headquarterProgram) {
        if(key.Headquarter?.name){
          key.Headquarter.name =  key.Headquarter.name.charAt(0).toUpperCase() +  key.Headquarter.name.slice(1);
        }
        if(key.Program?.name){
          key.Program.name =  key.Program.name.charAt(0).toUpperCase() +  key.Program.name.slice(1);
        }
      }
      this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
      console.log(this.headquarterProgram)
    }, error => console.error(error));
}

public getAllscales(event: Event) {
  event.preventDefault()
  if(this.form.value.ChargeBondingId != ''){
    this.scales=[]
    this.charge_bondingService.getItem(this.form.value.ChargeBondingId.id).subscribe(algo=>{
      if(algo.charge_bonding.ChargebondingScales?.length != undefined
        && algo.charge_bonding.ChargebondingScales.length > 0){
        
          for (let key of algo.charge_bonding.ChargebondingScales) {
            if(key.Scale!= undefined){
              key.Scale.name =  key.Scale.name.charAt(0).toUpperCase() +  key.Scale.name.slice(1);
              this.scales.push(key.Scale)
            }
            
          }
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

private getAllrelationships(selectId?: number) {
  this.research_bondingsService.getList().subscribe(
    (AdministrativeFromApi) => {
      for (let key of AdministrativeFromApi.research_bondings) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.research_bondings = AdministrativeFromApi.research_bondings;
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
          id:0,
      TeacherId:0,
      name_institution: [''],
      position_type: [''],
      functions:[''],
      start_date:[''],
      final_date:[''],
      constancy:['']
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
            constancy:['']
        }))

      }
      this.mostrar3=true
  }
  removeWorkexperiences(index: number,event: Event){
    event.preventDefault();
      let control = <FormArray>this.form.controls['Workexperiences']//aceder al control
      // if(control.value[index].id !== undefined && control.value[index].id != ''){
      //   this.deleteWorkexperiences.push(control.value[index]);

      // }
      control.removeAt(index)
      if( this.FilesExperinecia[index] != undefined){
          // console.log('aquii-actualizado file')

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
          constancy:['']
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
          resolution_convalidation: [''],
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
          resolution_convalidation: [''],
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

      // if(control.value[index].id !== undefined && control.value[index].id != ''){
      //   this.deletetrainingTeachers.push(control.value[index]);

      // }
      control.removeAt(index)
      if( this.FilesFormaciones[index] != undefined){
        // console.log('aquii-actualizado file')

        this.FilesFormaciones.splice(index,1)
        
      }
      if(this.FilesResolusiones[index] != undefined){
        this.FilesResolusiones.splice(index,1)

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
          resolution_convalidation: [''],
          degree_certificate: [''],
          TrainingId:[''],
          resolution_certificate:[''],

        }))
        }
    }

  // ventanas modales

  addVinculacion(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_Charge_bondingComponent, {
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
          this.messageService.add({severity:'info', summary: 'Vinculacion de Cargo Creada', detail: person.name,life: 2000});
      this.getAllLinkTypes()

        }
  });
  }

  addCategoriaColciencias(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_MincienciaCategoryComponent, {
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
          this.messageService.add({severity:'info', summary: 'Categoria Minciencias Creada', detail: person.name,life: 2000});
      this.getAllcolcienciaCategorys()

        }
  });
  }
  addRelaciones(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_Research_bondingComponent, {
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
          this.messageService.add({severity:'info', summary: 'Vinculación Investigativa Creada', detail: person.name,life: 2000});
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
    
      // if(file.type.includes("degree_certificate")){//Evaluar si es una imagen
          // const reader= new FileReader();
          // reader.readAsDataURL(file);
          // reader.onload=function load(){
          //    let images=reader.result; //Asignar al thumbnail
          // }.bind(this);
          // this.file=file;
          // console.log('aquii-actualizado file ==', pointIndex)
          // if(this.FilesFormaciones.length ==0){
          //   console.log('aquii-create file')
          //   this.FilesFormaciones.push({id:control.value[pointIndex].id,position:pointIndex,file:file})

          // }else{
          //   // console.log('aquii-actualizado file')

          //   for (const key of this.FilesFormaciones) {

          //     if(key.position == pointIndex){
          //   console.log('aquii-actualizado file',key.position+' ==', pointIndex)

               
          //     }
          //     // else{
          //     //   this.FilesFormaciones.push({id:control.value[pointIndex].id,position:pointIndex,file:file})
          //     // }
              
          //   }
          // }
          
          
          if( this.FilesFormaciones[pointIndex] != undefined){
            // console.log('aquii-actualizado file')

            this.FilesFormaciones[pointIndex]={
              id:control.value[pointIndex].id,
              position:pointIndex,
              file:file
            }

            
          }else{
            // console.log('aquii-nuevo file')
            this.FilesFormaciones.push({id:control.value[pointIndex].id,position:pointIndex,
              file:file})

          }
          console.log(this.FilesFormaciones,'this.FilesFormaciones')

          // console.log(this.FilesFormaciones[pointIndex],'this.FilesFormaciones[pointIndex].position')
          // console.log(this.file)
          // console.log(reader,'reader')
      // }
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
  // removeArchivo(item:any,event:Event,pointIndex:number){
  
  //   event.preventDefault()

    

  //   this.ArchivosEliminados.push(item)
  //   console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
  //   let control = <FormArray>this.form4.controls['trainingTeacher']
  //   control.controls[pointIndex].get('degree_certificate')?.setValue('')

  //   // if( this.FilesFormaciones[pointIndex] != undefined){
  //   //   // console.log('aquii-actualizado file')

  //   //   this.FilesFormaciones.splice(pointIndex,1)
      
  //   // }
  //   // console.log(this.FilesFormaciones,'this.FilesFormaciones');
  // }
  // removeArchivoC(item:any,event:Event,pointIndex:number){
  
  //   event.preventDefault()

  //   this.ArchivosEliminados.push(item)
  //   console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
  //   let control = <FormArray>this.form4.controls['Workexperiences']
  //   control.controls[pointIndex].get('constancy')?.setValue('')

  //   // if( this.FilesExperinecia[pointIndex] != undefined){
  //   //   // console.log('aquii-actualizado file')

  //   //   this.FilesExperinecia.splice(pointIndex,1)
      
  //   // }
  //   // console.log(this.FilesExperinecia,'this.FilesExperinecia');
  // }


}
