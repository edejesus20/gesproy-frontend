import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { ChargeService } from 'src/app/core/services/investigacion/Charge.service';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserRoleI } from 'src/app/models/authorization/usr_User';
import { HeadquarterI, HeadquarterProgramStudentI, HeadquarterProgramTeacherI } from 'src/app/models/institution/headquarter';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { ChargeI } from 'src/app/models/user/charge';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';
import { Charge_bondingI, WorkexperienceI } from 'src/app/models/user/teacher';
import { TrainingI, TrainingTeacherI } from 'src/app/models/institution/training';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { MincienciaCategoryService } from 'src/app/core/services/investigacion/MincienciaCategory.service';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { PerfilService } from 'src/app/core/services/usuer/Perfil.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { ChargeAdministrativeI } from 'src/app/models/user/administrative';
import * as moment from 'moment';
import { StudentInternshipsI } from 'src/app/models/user/student';
import { environment } from 'src/environments/environment';
import { isBuffer } from 'util';
const translate = require('translate');
export interface Archivo{
  id:number,
  position:number,
  file?:any | null
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [DialogService]
})
export class PerfilComponent implements OnInit {
  API_URI = environment.API_URI;

  itemsTeacher: MenuItem[]=[]
  activeIndex: number = 0;

  public UserRoles:UserRoleI[] = []
  public estudiante:boolean=false
  public docente:boolean=false
  public administrativo:boolean=false
  public mostrarDatos:boolean=true
  public activeState: boolean[] = [true, false, false,false];

  
  public form:FormGroup=this.formBuilder.group({
    id: [''],
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:[''],
    identification:['', [Validators.required]],
    GenderId:[''],
    address:[''],
    phone:[''],
    email:['', [Validators.required]],
    nationality: ['Colombiano'],
    date_of_birth: [''],
  });
public bandera:boolean=false
public bandera2:boolean=false
public bandera3:boolean=false
public bandera4:boolean=false
public Dialog:boolean=false
  public form2:FormGroup=this.formBuilder.group({
    id: [''],
    headquarterProgramStudent: this.formBuilder.array([this.formBuilder.group({
      StudentId:0,
      HeadquarterProgramId:['', [Validators.required]],
    })]),
  // current_semester:['', [Validators.required]],
  // current_average:['', [Validators.required]],
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
      SeedbedId:[''],
      Horas:[''],
      date_firt:[''],
      date_end:[''],
  });

  public form3:FormGroup=this.formBuilder.group({
    id: [''],
    HeadquarterId:['', [Validators.required]],
    Charges: this.formBuilder.array([this.formBuilder.group({
      id:0,
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]]})]),
      deleteCharges:['']
  });
  private deleteCharges:any[]=[]

  // docentes
  public resolution_convalidations:any[]=[
    {value:'Si'},{value:'No'}]
  public validandoCertificado:boolean[]=[]
    private deletetrainingTeachers:any[]=[]
    private deleteWorkexperiences:any[] = []
  public form4:FormGroup=this.formBuilder.group({
    id: [''],
    ScaleId:[''],
    MincienciaCategoryId:['', [Validators.required]],
    headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
      {
        id:0,
        TeacherId:0,
        HeadquarterProgramId:['', [Validators.required]],
        ResearchBondingId:['', [Validators.required]],
    })]),
    trainingTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          id:0,
          TeacherId:0,
          name: ['',[Validators.required]],
          date_graduation: ['',[Validators.required]],
          name_institution: ['',[Validators.required]],
          resolution_convalidation: ['',[Validators.required]],
          degree_certificate: ['',[Validators.required]],
          resolution_certificate:[''],
          TrainingId:['',[Validators.required]],
      })]),
    Workexperiences:this.formBuilder.array([this.formBuilder.group(
      {
        id:0,
        TeacherId:0,
        name_institution: ['',[Validators.required]],
        position_type: ['',[Validators.required]],
        functions:['',[Validators.required]],
        start_date:['',[Validators.required]],
        final_date:['',[Validators.required]],
        constancy:['',[Validators.required]]
    })]),
    ChargeBondingId:['',[Validators.required]],
    deletetrainingTeachers:[''],
    deleteWorkexperiences:[''],
    deleteheadquarterProgramTeachers:[''],
    Link_cvlac:[''],
    Link_orcid:[''],
  });
  public charge_bondings:Charge_bondingI[]=[]
  public trainings: TrainingI[]=[]

  public deleteheadquarterProgramTeachers:any[]=[]

  public research_bondings:Research_bondingI[]=[]
  public headquarterPrograms:any[]=[]
  public headquarterProgramTeacher1:any[] = []
  public trainingTeachers:any[] = []
  public Workexperiences:any[] =[]


  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public image3:string=''
  public mostrar2:boolean=false;
  public mostrar1:boolean=true;
  public algo1:number[]=[0];
  public algo2:number[]=[0];
  // public mostrar:boolean=true;
  // public algo:number[]=[0];
  public mostrar3:boolean=true;
  public algo3:number[]=[0];
  
  public mostrar4:boolean=true;
  public algo4:number[]=[0];
  public mostrar5:boolean=true;
  public algo5:number[]=[0];
  public mostrar6:boolean=true;
  public algo6:number[]=[0];
  public seedbeds:SeedbedI[] =[]

  public headquarterProgram: any[]=[]
  public headquarterProgramStudent1:any[]=[]
  public scales:ScaleI[] =[]

  public charges:ChargeI[]=[]
  public headquarters: HeadquarterI[]=[]
  public mincienciaCategorys:MincienciaCategoryI[] =[]

  public Charges1:any[] = [];
  // images:any;
  FilesFormaciones:Archivo[] =[]
  FilesExperinecia:Archivo[] =[]
  FilesResolusiones:Archivo[] =[]

  ArchivosEliminados:any[] =[]

  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    public ref: DynamicDialogRef,
    private seedbedService:SeedbedService,
    private headquarterService: HeadquarterService,
    private chargeService:ChargeService,
    private mincienciaCategoryService:MincienciaCategoryService,
    private charge_bondingService:Charge_bondingService,
    private research_bondingsService:Research_bondingService,
    private trainingsService:TrainingsService,
    private perfilService:PerfilService,
    private messageService:MessageService,
    private router: Router,
    private teacherService:TeacherService,

  ) { }

  ngOnInit() {
    this.itemsTeacher = [
      // {
      // label: 'Datos Basicos',
      // command: (event: any) => {
      //     this.activeIndex = 0;
      //    }
      // },
      {
          label: 'Datos Institucionales',
          command: (event: any) => {
              this.activeIndex = 0;
            }
      },
      {
        label: 'Formación Académica',
        command: (event: any) => {
            this.activeIndex = 1;
          }
      },
      {
        label: 'Experiencia Laboral',
        command: (event: any) => {
            this.activeIndex = 2;
          }
      },
    ];
    this.verificar()
     this.getAllgenders()
      this.getAlldocumentTypes()
      this.getSeedbed()
      this.getAllheadquarters()
      this.getheadquarters()
      this.getAllocupations()
      this.getAlltrainings()
      this.getAllLinkTypes()
    this.getAllrelationships()
    this.getAllheadquarters2()
    this.getAllcolcienciaCategorys()


  }
  getSeedbed() {
    this.seedbedService.getList().subscribe(data => {
      for (let key of data.seedbeds) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.seedbeds=data.seedbeds
    }, error => console.error(error));
  }
  getAlldocumentTypes() {
    this.documentTypeService.getList().subscribe((rolesFromApi) => {
      for (let key of rolesFromApi.documentTypes) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
        this.documentTypes = rolesFromApi.documentTypes;
        //console.log(this.roles);
      }, error => console.error(error));
  }
  getAllgenders() {
    this.genderService.getList().subscribe((rolesFromApi) => {
      for (let key of rolesFromApi.genders) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
        this.genders = rolesFromApi.genders;
        //console.log(this.roles);
      }, error => console.error(error));
  }
  private getheadquarters(selectId?: number) {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        for (let key of AdministrativeFromApi.headquarters) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.headquarters = AdministrativeFromApi.headquarters;
      }, error => console.error(error));
  }

  private getAllocupations(selectId?: number) {
    this.chargeService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.charges = AdministrativeFromApi.charges;
      }, error => console.error(error));
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

  // *******************************Codigo de Logica ************************************

  // verificar usuario en sesion
  public verificar(){
    var user :string | null= localStorage.getItem('user');
  
  if( user!=null ){
     
    let userObjeto:any = JSON.parse(user); 
  
  // console.log(menuObjeto)

    this.userService.getOneUser(userObjeto.id).subscribe((data)=>{
    if(data.user.fullName && data.user.avatar != undefined){
      // console.log(data.user)
      if(data.user.id != undefined && data.user.Person != undefined &&
        data.user.UserRoles?.length != undefined && data.user.UserRoles.length > 0){
        this.form.controls['id'].setValue(data.user.id)
       
   
        this.form.controls['name'].setValue(data.user.Person?.name)
        this.form.controls['surname'].setValue(data.user.Person?.surname)
        this.form.controls['identification'].setValue(data.user.Person?.identification)
        this.form.controls['email'].setValue(data.user.email)
        this.form.controls['phone'].setValue(data.user.Person?.phone)
        this.form.controls['address'].setValue(data.user.Person?.address)
        if(data.user.Person?.nationality != undefined){
          this.form.controls['nationality'].setValue(data.user.Person?.nationality)
        }
        else{
          this.form.controls['nationality'].setValue('Colombiano')

        }
        
        this.form.controls['date_of_birth'].setValue(data.user.Person?.date_of_birth)
        var str = data.user.avatar;
        var n = str.search("assets");
        // console.log(n)
        if(n == -1){
          console.log(this.API_URI+data.user.avatar)
          this.image3=this.API_URI+data.user.avatar
        }else{
          this.image3=data.user.avatar
        }
        // this.image3=data.user.avatar
        if(this.docente== false && this.estudiante == false && this.administrativo== false){
          if(data.user.Person?.GenderId != undefined){
            for (const key of this.genders) {
              if(parseInt(data.user.Person.GenderId) == key.id){
                this.form.controls['GenderId'].setValue(key)
              }
              
            }
          }
          if(data.user.Person?.DocumentTypeId != undefined){
            for (const key2 of this.documentTypes) {
              if(parseInt(data.user.Person.DocumentTypeId) == key2.id){
                this.form.controls['DocumentTypeId'].setValue(key2)
                // console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])
  
              }
              
            }
          }
        }
        let bandera=false
        this.UserRoles=data.user.UserRoles
        for (const key of this.UserRoles) {
          if(key.Role != undefined){
            this.verificarRol(key.Role,data.user.id)
            if(key.Role.name.toLocaleLowerCase() === 'estudiante'){
              bandera=true
            }
            if(key.Role.name.toLocaleLowerCase() === 'docente interno' || key.Role.name.toLocaleLowerCase() === 'docente externo nacional' || key.Role.name.toLocaleLowerCase() === 'docente externo internacional'){
              bandera=true
            }
            if(key.Role.name.toLocaleLowerCase() === 'administrativo'){
              bandera=true
            }

          }
          
        }
        if(bandera ==false){
          if(data.user?.Person?.GenderId != undefined){
            for (const key of this.genders) {
              if(parseInt(data.user.Person.GenderId) == key.id){
                this.form.controls['GenderId'].setValue(key)
              }
              
            }
          }
          if(data.user?.Person?.DocumentTypeId != undefined){
            for (const key2 of this.documentTypes) {
              if(parseInt(data.user.Person.DocumentTypeId) == key2.id){
                this.form.controls['DocumentTypeId'].setValue(key2)
                // console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])
  
              }
              
            }
          }
        }

      }
    }     
  })
    }
  }

  // verificar roles y asignar datos filtrados
  verificarRol(Role:RoleI,id:number){
    // console.log(Role)
    if(Role.name.toLocaleLowerCase() === 'estudiante'){
         this.perfilService.getItemStudent(id).subscribe(data1=>{
          if(data1.student.id != undefined){
            this.form2.controls['id'].setValue(data1.student.UserId)

            if(data1.student.User?.Person?.GenderId != undefined){
              for (const key of this.genders) {
                if(parseInt(data1.student.User.Person.GenderId) == key.id){
                  this.form.controls['GenderId'].setValue(key)
                }
              }
            }
            if(data1.student.User?.Person?.DocumentTypeId != undefined){
              for (const key2 of this.documentTypes) {
                if(parseInt(data1.student.User.Person.DocumentTypeId) == key2.id){
                  this.form.controls['DocumentTypeId'].setValue(key2)
                  // console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])
                }
              }
            }
            if(data1.student.SeedbedStudents != undefined && data1.student.SeedbedStudents.length > 0){
              let algo=data1.student?.SeedbedStudents?.[0]
              let nuevo =algo?.hours
              let date_firt=moment(algo?.date_firt,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
              let date_end=moment(algo?.date_end,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
              
              this.form2.controls['Horas'].setValue(nuevo)
              this.form2.controls['date_firt'].setValue(date_firt)
              this.form2.controls['date_end'].setValue(date_end)
  
    
              if(algo?.id != undefined){
                for (const key of this.seedbeds) {
                  if(key.id != undefined && key.id == (algo?.Seedbed?.id)){
                    this.form2.controls['SeedbedId'].setValue(key)
                  }
                }

              }
            }

              if(data1.student.HeadquarterProgramStudents != undefined
                && data1.student.HeadquarterProgramStudents.length > 0){
                this.agregarDescuentosA(data1.student.HeadquarterProgramStudents)
                
              }
              if(data1.student.StudentInternships?.length != undefined 
                && data1.student.StudentInternships.length > 0){
                this.agregarStudentInternships(data1.student.StudentInternships)
                
              }
            
          }})
      this.estudiante=true

    }
    if(Role.name.toLocaleLowerCase() === 'docente interno' || Role.name.toLocaleLowerCase() === 'docente externo nacional' || Role.name.toLocaleLowerCase() === 'docente externo internacional'){
        // docentes
        if(this.docente==false){
         
          this.perfilService.getItemTeacher(id).subscribe(data=>{
            if(data.teacher.id != undefined){
              this.form4.controls['id'].setValue(data.teacher.UserId)
              console.log(data.teacher,'docente')

              this.form4.controls['Link_cvlac'].setValue(data.teacher.Link_cvlac)
              this.form4.controls['Link_orcid'].setValue(data.teacher.Link_orcid)

              if(data.teacher.User?.Person?.GenderId != undefined){
                for (const key of this.genders) {
                  if(parseInt(data.teacher.User.Person.GenderId) == key.id){
                    this.form.controls['GenderId'].setValue(key)
                  }
                  
                }
              }
              if(data.teacher.User?.Person?.DocumentTypeId != undefined){
                for (const key2 of this.documentTypes) {
                  if(parseInt(data.teacher.User.Person.DocumentTypeId) == key2.id){
                    this.form.controls['DocumentTypeId'].setValue(key2)
                    // console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])
      
                  }
                  
                }
              }
              if(data.teacher.MincienciaCategoryId != undefined){
              for (const key1 of this.mincienciaCategorys) {
                if(key1.id != undefined && key1.id == parseInt(data.teacher.MincienciaCategoryId)){
                  this.form4.controls['MincienciaCategoryId'].setValue(key1)
                }
              }
            }
  
              if(data.teacher.ChargeBondingId != undefined){
                for (const key of this.charge_bondings) {
                  if(key.id != undefined && key.id == (data.teacher.ChargeBondingId)){
                    this.form4.controls['ChargeBondingId'].setValue(key)
                  }
                }
              
    
                if(this.form4.value.ChargeBondingId != ''){
                  this.scales=[]
                  this.charge_bondingService.getItem(this.form4.value.ChargeBondingId.id).subscribe(algo=>{
                    if(algo.charge_bonding.ChargebondingScales?.length != undefined
                      && algo.charge_bonding.ChargebondingScales.length > 0){
                        for (const key of algo.charge_bonding.ChargebondingScales) {
                          if(key.Scale != undefined){
                            this.scales.push(key.Scale)
                          }
                        }
                        if(data.teacher.ChargebondingScaleTeachers?.length != undefined
                          && data.teacher.ChargebondingScaleTeachers.length > 0){
                            for (let scalesTeacher of data.teacher.ChargebondingScaleTeachers) {
                              if( scalesTeacher.status == true && scalesTeacher.ChargebondingScale?.Scale != undefined){
                                for (const key of this.scales) {
                                  if(key.id != undefined && key.id == scalesTeacher.ChargebondingScale.Scale.id){
                                  this.form4.controls['ScaleId'].setValue(key)
                                  }
                                }
                              }
                              
                            }
                        }
                      }
                  })
              
                }
              
                if(data.teacher.HeadquarterProgramTeachers?.length != undefined && data.teacher.HeadquarterProgramTeachers?.length > 0){
                  
                  this.agregarHeadquarterPrograms(data.teacher.HeadquarterProgramTeachers)
                  
                }
                if(data.teacher.TrainingTeachers?.length != undefined && data.teacher.TrainingTeachers?.length > 0){
                  this.agregarDescuentos(data.teacher.TrainingTeachers)    
                }
                
                if(data.teacher.Workexperiences?.length != undefined && data.teacher.Workexperiences?.length > 0){
                  this.agregarDescuentos2(data.teacher.Workexperiences)    
                }
              }
            }
          })
          this.docente=true
        }
        
      

    }
    
    if(Role.name.toLocaleLowerCase() === 'administrativo'){
        // administrativos
       
        this.perfilService.getItemAdministrative(id).subscribe(data=>{
          if(data.administrative.id != undefined){
            // console.log(data.administrative)
            this.form3.controls['id'].setValue(data.administrative.UserId)
            if(data.administrative.User?.Person?.GenderId != undefined){
              for (const key of this.genders) {
                if(parseInt(data.administrative.User.Person.GenderId) == key.id){
                  this.form.controls['GenderId'].setValue(key)
                }
                
              }
            }
            if(data.administrative.User?.Person?.DocumentTypeId != undefined){
              for (const key2 of this.documentTypes) {
                if(parseInt(data.administrative.User.Person.DocumentTypeId) == key2.id){
                  this.form.controls['DocumentTypeId'].setValue(key2)
                  // console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])
    
                }
                
              }
            }

            for (const key of this.headquarters) {
              if(key.id != undefined && key.id == parseInt(data.administrative.HeadquarterId)){
                this.form3.controls['HeadquarterId'].setValue(key)
              }
            }
            if(data.administrative.ChargeAdministratives?.length != undefined
              && data.administrative.ChargeAdministratives.length > 0){
                this.agregar(data.administrative.ChargeAdministratives)
            }
          }
        })
      this.administrativo=true
    }
  }

  public cancelar(){
    this.ref.close(undefined);
  }
 

  // ******************************************estudiante*******************
  // datos filtrados de estudiantes
    agregarStudentInternships(StudentInternships:StudentInternshipsI[]) {
      if(StudentInternships.length){
        for (let key of StudentInternships) {
          let control = <FormArray>this.form2.controls['StudentInternship']
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
        this.mostrar2= true
        let control = <FormArray>this.form2.controls['StudentInternship']
        control.removeAt(0)
      }
    }
    agregarDescuentosA(HeadquarterProgramStudents:HeadquarterProgramStudentI[]) {
      if(HeadquarterProgramStudents.length){
        // console.log('aqui1-----')
        for (const key of HeadquarterProgramStudents) {
          if(key.HeadquarterProgram != undefined ) {
            // console.log(DiscountLine)
            let control = <FormArray>this.form2.controls['headquarterProgramStudent']

            let  HeadquarterProgram:any | null=null
    
            if(key.HeadquarterProgram?.HeadquarterId != undefined
              &&  key.HeadquarterProgram?.ProgramId != undefined && key.status == true
              ){

                // console.log('aqui1')
                for (const key2 of this.headquarterPrograms) {
                  if(parseInt(key2.HeadquarterId) == key.HeadquarterProgram.HeadquarterId 
                    && parseInt(key2.ProgramId)== key.HeadquarterProgram.ProgramId 
                    ){
                      // console.log('aqui')
                  HeadquarterProgram=key2
                  }
                }
              }
          

            if(HeadquarterProgram != null){
              control.push(this.formBuilder.group({
                StudentId:0,
                HeadquarterProgramId:[HeadquarterProgram, [Validators.required]],
              }))
            }
            // else{
            //   this.headquarterService.getHeadquarterProgramId(key.HeadquarterProgramId).subscribe((algo)=>{
            //     if(algo.headquarterProgram != undefined && algo.headquarterProgram != null){
            //       console.log(algo.headquarterProgram[0])
            //       control.push(this.formBuilder.group({
            //         StudentId:0,
            //         HeadquarterProgramId:[algo.headquarterProgram[0], [Validators.required]],
            //       }))
            //     }
            //   })
            // }

            
          }
        }
        this.mostrar1= true
        let control = <FormArray>this.form2.controls['headquarterProgramStudent']
        control.removeAt(0)
      }
    }
    private getAllheadquarters(selectId?: number) {
      this.headquarterService.HeadquarterProgram().subscribe(
        (AdministrativeFromApi) => {
          // console.log(AdministrativeFromApi.headquarterProgram)
          this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
        }, error => console.error(error));
    }
  // nuevos datos
  // sede-programa-estudiantes
    get getRoles3() {
      return this.form2.get('headquarterProgramStudent') as FormArray;//obtener todos los formularios
    }
    addRoles3(event: Event){
      event.preventDefault();
  
      const control = <FormArray>this.form2.controls['headquarterProgramStudent']
        if(control.length == 0 && this.mostrar1 == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar1 == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
  
        }
        this.mostrar1=true
    }
    removeRoles3(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form2.controls['headquarterProgramStudent']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar1=false
        control.push(this.formBuilder.group({
          StudentId:0,
          HeadquarterProgramId:['', [Validators.required]],
        }))
        }
    }
    // Practicas de estudantes
    get getStudentInternships() {
      return this.form2.get('StudentInternship') as FormArray;//obtener todos los formularios
    }
    addStudentInternships(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form2.controls['StudentInternship']
        if(control.length == 0 && this.mostrar2 == false){
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
        if(control.length >= 1 && this.mostrar2 == true){
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
        this.mostrar2=true
    }
    removeStudentInternships(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form2.controls['StudentInternship']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
          console.log('aqui')
        this.mostrar2=false
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
    }
  // *************************************administrativos****************************
   // datos filtrados de administrativos
    agregar(ChargeAdministratives:ChargeAdministrativeI[]) {
      if(ChargeAdministratives.length){
        for (let key of ChargeAdministratives) {
          if(key.ChargeId != undefined) {
            // console.log(DiscountLine)
            let control = <FormArray>this.form3.controls['Charges']
            let Charge:any | null=null

            for (const key2 of this.charges) {
              if(key2.id == key.ChargeId && key.status == true) {
                Charge=key2
            }
          }
            if(Charge != null){
              control.push(this.formBuilder.group({
                id:key.id,
                UserId:this.form3.value.id,
                ChargeId:[Charge,[Validators.required]],
              date:[key.date, [Validators.required]]}))

            }
          }
        }
        this.mostrar3= true
        let control = <FormArray>this.form3.controls['Charges']
        control.removeAt(0)
      }
    }
    // nuevos datos
    // cargos 
    get getRoles2() {
      return this.form3.get('Charges') as FormArray;//obtener todos los formularios
    }
    addRoles2(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form3.controls['Charges']
      // console.log(control)      
        //crear los controles del array
      if(control.length == 0 && this.mostrar3 == false){
        control.push(this.formBuilder.group({
          id:0,
          ChargeId:['', [Validators.required]],
          date:['', [Validators.required]],
        }))//nuevo input
      }
      if(control.length >= 1 && this.mostrar3 == true){
        control.push(this.formBuilder.group({
          id:0,
        ChargeId:['', [Validators.required]],
          date:['', [Validators.required]],
      }))
      
      //nuevo input
      }
      this.mostrar3=true
      
    }
    removeRoles2(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form3.controls['Charges']//aceder al control
      this.deleteCharges.push(control.value[index])
      console.log(this.deleteCharges)
      control.removeAt(index)
      if(control.length <= 0){
      this.mostrar3=false
      control.push(this.formBuilder.group({
        id:0,
        ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
      }))//nuevo input

      }
    }

  // **************************Docentes****************************************************
    // datos filtrados docentes

      // datos de docentes 
      agregarHeadquarterPrograms(HeadquarterProgramTeachers: HeadquarterProgramTeacherI[]) {
        console.log(HeadquarterProgramTeachers)
        if(HeadquarterProgramTeachers.length){
          for (let key of HeadquarterProgramTeachers) {
            if(key.HeadquarterProgramId != undefined) {
              let control = <FormArray>this.form4.controls['headquarterProgramTeacher']
              let  HeadquarterId:any | null=null
              if(key.HeadquarterProgram?.HeadquarterId != undefined
                &&  key.HeadquarterProgram?.ProgramId != undefined && key.status==true){
                  for (let key2 of this.headquarterProgram) {
                    if(key2.HeadquarterId == key.HeadquarterProgram.HeadquarterId 
                      && key2.ProgramId== key.HeadquarterProgram.ProgramId
                      && key.HeadquarterProgramId==key2.id){
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
                // console.log('HeadquarterProgramId',HeadquarterId)
              }else{}

            }
          }
          this.mostrar4= true
          let control = <FormArray>this.form4.controls['headquarterProgramTeacher']
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
              let control = <FormArray>this.form4.controls['Workexperiences']
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
          this.mostrar6= true
          let control = <FormArray>this.form4.controls['Workexperiences']
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
              
              let control = <FormArray>this.form4.controls['trainingTeacher']
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
          this.mostrar5= true
          let control = <FormArray>this.form4.controls['trainingTeacher']
          control.removeAt(0)
        }

      }
    // nuevos datos
    // sedes-programa-profesores
    get getRoles1() {
      return this.form4.get('headquarterProgramTeacher') as FormArray;//obtener todos los formularios
    }
    
    addRoles1(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form4.controls['headquarterProgramTeacher']
    
        if(control.length == 0 && this.mostrar4 == false){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            HeadquarterProgramId:['', [Validators.required]],
                ResearchBondingId:['', [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar4 == true){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            HeadquarterProgramId:['', [Validators.required]],
                ResearchBondingId:['', [Validators.required]],
          }))

        }
        this.mostrar4=true
    }
    removeRoles1(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form4.controls['headquarterProgramTeacher']//aceder al control
      this.deleteheadquarterProgramTeachers.push(control.value[index])
      // console.log(this.deleteheadquarterProgramTeachers)
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar4=false
        control.push(this.formBuilder.group({
          id:0,
          TeacherId:0,
          HeadquarterProgramId:['', [Validators.required]],
              ResearchBondingId:['', [Validators.required]],
        }))
        }
    }

    private getAllheadquarters2(selectId?: number) {
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
          // console.log( AdministrativeFromApi.headquarterProgram)
          this.headquarterPrograms = AdministrativeFromApi.headquarterProgram;
          // console.log(this.headquarterPrograms)
        }, error => console.error(error));
    }
    // escalafon
    public getAllscales(event: Event) {
      event.preventDefault()
      if(this.form4.value.ChargeBondingId != ''){
        this.scales=[]
        this.charge_bondingService.getItem(this.form4.value.ChargeBondingId.id).subscribe(algo=>{
          if(algo.charge_bonding.ChargebondingScales?.length != undefined
            && algo.charge_bonding.ChargebondingScales.length > 0){
            
              for (let key of algo.charge_bonding.ChargebondingScales) {
                if(key.Scale!= undefined){
                  // for (let key of AdministrativeFromApi.trainings) {
                    key.Scale.name =  key.Scale.name.charAt(0).toUpperCase() +  key.Scale.name.slice(1);
                  // }
                  this.scales.push(key.Scale)
                }
                
              }
            }
        })
    
      }
    }
    // categoria investigador
    private getAllcolcienciaCategorys(selectId?: number) {
      this.mincienciaCategoryService.getList().subscribe(
        (AdministrativeFromApi) => {
          for (let key of AdministrativeFromApi.mincienciaCategorys) {
            key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          }
          this.mincienciaCategorys = AdministrativeFromApi.mincienciaCategorys;
        }, error => console.error(error));
    }
    // VINCULACION INVESTIGATIVA
    private getAllrelationships(selectId?: number) {
      this.research_bondingsService.getList().subscribe(
        (AdministrativeFromApi) => {
          for (let key of AdministrativeFromApi.research_bondings) {
            key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          }
          this.research_bondings = AdministrativeFromApi.research_bondings;
        }, error => console.error(error));
    }
  // Experiencia laboral docentes
    get getWorkexperiences() {
      return this.form4.get('Workexperiences') as FormArray;//obtener todos los formularios
    }
    addWorkexperiences(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form4.controls['Workexperiences']
        if(control.length == 0 && this.mostrar6 == false){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            name_institution: ['',[Validators.required]],
        position_type: ['',[Validators.required]],
        functions:['',[Validators.required]],
        start_date:['',[Validators.required]],
        final_date:['',[Validators.required]],
        constancy:['',[Validators.required]]
          }))
        }
        if(control.length >= 1 && this.mostrar6 == true){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            name_institution: ['',[Validators.required]],
            position_type: ['',[Validators.required]],
            functions:['',[Validators.required]],
            start_date:['',[Validators.required]],
            final_date:['',[Validators.required]],
            constancy:['',[Validators.required]]
          }))

        }
        this.mostrar6=true
    }
    removeWorkexperiences(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form4.controls['Workexperiences']//aceder al control
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteWorkexperiences.push(control.value[index]);

      }
      control.removeAt(index)
      if( this.FilesExperinecia[index] != undefined){
          // console.log('aquii-actualizado file')

          this.FilesExperinecia.splice(index,1)
          
        }
        if(control.length <= 0){
        this.mostrar6=false
        control.push(this.formBuilder.group({
          id:0,
          TeacherId:0,
          name_institution: ['',[Validators.required]],
          position_type: ['',[Validators.required]],
          functions:['',[Validators.required]],
          start_date:['',[Validators.required]],
          final_date:['',[Validators.required]],
          constancy:['',[Validators.required]]
        }))
        }
    }

    // formaciones academicas docentes
    get gettrainingTeacher() {
    return this.form4.get('trainingTeacher') as FormArray;//obtener todos los formularios
    }
    addtrainingTeacher(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form4.controls['trainingTeacher']
        if(control.length == 0 && this.mostrar5 == false){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            name: ['',[Validators.required]],
            date_graduation: ['',[Validators.required]],
            name_institution: ['',[Validators.required]],
            resolution_convalidation: [{value:'No'},[Validators.required]],
            degree_certificate: ['',[Validators.required]],
            resolution_certificate:[''],
            TrainingId:['',[Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar5 == true){
          control.push(this.formBuilder.group({
            id:0,
            TeacherId:0,
            name: ['',[Validators.required]],
            date_graduation: ['',[Validators.required]],
            name_institution: ['',[Validators.required]],
            resolution_convalidation: [{value:'No'},[Validators.required]],
            degree_certificate: ['',[Validators.required]],
            resolution_certificate:[''],
            TrainingId:['',[Validators.required]],
          }))
  
        }
        this.mostrar5=true
    }
    removetrainingTeacher(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form4.controls['trainingTeacher']//aceder al control

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
        this.mostrar5=false
        control.push(this.formBuilder.group({
          id:0,
          TeacherId:0,
          name: ['',[Validators.required]],
          date_graduation: ['',[Validators.required]],
          name_institution: ['',[Validators.required]],
          resolution_convalidation: [{value:'No'},[Validators.required]],
          degree_certificate: ['',[Validators.required]],
          resolution_certificate:[''],
          TrainingId:['',[Validators.required]],
        }))
        }
    }


    // **********************************************************************************
      // envio de datos
      public onSubmit(event: Event){
        event.preventDefault()
        let formValue:any={
        id:  this.form.value.id,
        name:this.form.value.name,
        surname:this.form.value.surname,
        DocumentTypeId:null,
        identification:this.form.value.identification,
        GenderId:null,
        address:null,
        phone:null,
        email:this.form.value.email,
        nationality: null,
        date_of_birth: null,
        }
        if(this.form.value.DocumentTypeId.id){
          formValue.DocumentTypeId=this.form.value.DocumentTypeId.id
        }
        if(this.form.value.GenderId.id  != undefined){
          formValue.GenderId=this.form.value.GenderId.id
        }
        if(this.form.value.address != ''){
          formValue.address=this.form.value.address
        }
        if(this.form.value.phone != ''){
          formValue.phone=this.form.value.phone
        }
        if(this.form.value.nationality != ''){
          formValue.nationality=this.form.value.nationality
        }
        if(this.form.value.date_of_birth != ''){
          formValue.date_of_birth=this.form.value.date_of_birth
        }

        if(formValue.id != ""&&
        formValue.name != ""&&
        formValue.surname != ""&&
        // formValue.DocumentTypeId != ( 0 || undefined)&&
        formValue.identification != ""&&
        // formValue.GenderId != ( 0 || undefined)&&
        // formValue.address != ""&&
        // formValue.phone != ""&&
        formValue.email != ""
        // && 
        // formValue.nationality != "" && 
        // formValue. date_of_birth!= ""
        ){
          this.bandera=true
      this.perfilService.updatePerfil(formValue.id,formValue).subscribe(
        (algo) => {
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
            detail: 'Registro de Usuario Actualizado con exito'});
            }
            if( seconds == '01') {
              this.bandera=false
              }
        

            date = new Date(date.getTime() - 1000);
            if( minutes == '00' && seconds == '01' ) {
              // this.ref.close(algo);
              this.activeState=[false,false,false,false]
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
            this.bandera=false
          }
        });
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
      this.bandera=false
    }
      }
      // administrativo
      public onSubmit1(event: Event){
        event.preventDefault()
        let formValue:any={
          id:  this.form3.value.id,
          Charges: this.form3.value.Charges,
          HeadquarterId: this.form3.value.HeadquarterId.id,
          deleteCharges:this.deleteCharges
        };
        if(this.Charges1.length == 0 || this.Charges1.length == undefined){
          this.Charges1=[]
          let control = <FormArray>this.form3.controls['Charges']
          for (const key of control.value) {
            key.ChargeId=key.ChargeId.id 
            // this.Charges1.push({
            //   date:key.date,
            // ChargeId:key.ChargeId,
            // })
          }
          this.Charges1=this.form3.value.Charges
          formValue.Charges = this.form3.value.Charges
          // console.log('aqui')
        }else{
          formValue.Charges = this.Charges1
          // console.log('aqui2')
    
        }

        if(this.form3.value.Charges[0].ChargeId == '' ||
        this.form3.value.Charges[0].ChargeId == undefined ||this.Charges1.length == undefined){
          // this.form.value.Workexperiences=[]
          formValue.Charges=[]
    
        }

        if(formValue.HeadquarterId != ( 0 || undefined) && formValue.id
        ){
          this.bandera2=true
        //  console.log(formValue,'admianistrativo')

            this.perfilService.updateAdminsitrativo(formValue.id,formValue).subscribe(
              (algo) => {

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
                        detail: 'Registro de Administrativo Actualizado con exito'});
                        }
                        if( seconds == '01') {
                          this.bandera2=false
                          }
                        
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          // this.ref.close(algo);
                          this.activeState=[false,false,false,false]

                          // this.mostrarDatos=true
             
                          // this.administrativo=false
                          clearInterval(interval); 
                        }
                  }, 1000);
                
              },async error => {
                if(error != undefined) {
                  console.log(error);
                  let text = await translate(error.error.message, "es");
                  if(error.error.dataErros){
                    text = await translate(error.error.dataErros[0].message, "es");
                  }
                  this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
                  this.bandera2=false
                
                }
              });
          }else{
            this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
            this.bandera2=false

          }
      }
      // estudiante
      public onSubmit2(event: Event){
        event.preventDefault()
        let formValue={
          id: this.form2.value.id,
          headquarterProgramStudent: this.form2.value.headquarterProgramStudent,
          SeedbedId:null,
          Horas: this.form2.value.Horas,
          date_firt:this.form2.value.date_firt,
          date_end:this.form2.value.date_end,
          StudentInternship:this.form2.value.StudentInternship,
        };
        if(this.mostrar2==false){
          formValue.StudentInternship=[]
        }
        if(this.form2.value.SeedbedId.id != undefined){
          formValue.SeedbedId=this.form2.value.SeedbedId.id
        }
        if(this.headquarterProgramStudent1.length == 0 ){
          let control = <FormArray>this.form2.controls['headquarterProgramStudent']
          for (const key of control.value) {
            key.HeadquarterProgramId=key.HeadquarterProgramId.id 
            this.headquarterProgramStudent1.push({
             StudentId:0,
            HeadquarterProgramId:key.HeadquarterProgramId,
            })
          }
          formValue.headquarterProgramStudent = this.form2.value.headquarterProgramStudent
          // console.log('aqui')
        }else{
          formValue.headquarterProgramStudent = this.headquarterProgramStudent1
          // console.log('aqui2')
    
        }
        if(formValue.headquarterProgramStudent){
          this.bandera3=true

        this.perfilService.updateEstudiante(formValue.id,formValue).subscribe(
          (algo) => {
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
                    if( seconds == '01') {
                      this.bandera3=false
                      }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      // this.estudiante=false

                      this.activeState=[false,false,false,false]
              
                      // this.ref.close(algo);

                      // this.router.navigateByUrl('/usuarios/Student');
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
              this.bandera3=false
            
            }
          });
        }else{
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
          this.bandera3=false

        } 


      }
      // docentes
      public onSubmit4(event: Event){
        event.preventDefault()

        let formValue:any={
          id:  this.form4.value.id,
          ScaleId: '',
          MincienciaCategoryId: this.form4.value.MincienciaCategoryId.id,
          headquarterProgramTeacher: this.form4.value.headquarterProgramTeacher,
          ChargeBondingId: this.form4.value.ChargeBondingId.id,
          Workexperiences: this.form4.value.Workexperiences,
          trainingTeacher:this.form4.value.trainingTeacher,
          deletetrainingTeachers:this.deletetrainingTeachers,
          deleteWorkexperiences:this.deleteWorkexperiences,
          ArchivosEliminados:this.ArchivosEliminados,
          deleteheadquarterProgramTeachers:this.deleteheadquarterProgramTeachers,
          Link_cvlac:this.form4.value.Link_cvlac,
          Link_orcid:this.form4.value.Link_orcid,
        };
        if(this.form4.value.ScaleId.id){
          formValue.ScaleId=this.form4.value.ScaleId.id
        }
        if(this.scales.length == 0){
          formValue.ScaleId=''
        }

        let boolean:boolean = false
        for (const clave of formValue.trainingTeacher) {
          // console.log(clave,'clave')
          if(clave.resolution_convalidation.value == 'Si' && clave.degree_certificate == ""){
            boolean=true
          }
          
        }
        // console.log(boolean,'boolean')
        if(boolean == false){
          if(this.headquarterProgramTeacher1.length == 0 ){
            let control = <FormArray>this.form4.controls['headquarterProgramTeacher']
            for (const key of control.value) {
      
              key.HeadquarterProgramId=key.HeadquarterProgramId.id
              key.ResearchBondingId=key.ResearchBondingId.id
              // this.headquarterProgramTeacher1.push({
              // TeacherId:0,
              // HeadquarterProgramId:key.HeadquarterProgramId,
              // ResearchBondingId:key.ResearchBondingId,
              // })
            }
            this.headquarterProgramTeacher1=this.form4.value.headquarterProgramTeacher
            formValue.headquarterProgramTeacher = this.form4.value.headquarterProgramTeacher
          }else{
            formValue.headquarterProgramTeacher = this.headquarterProgramTeacher1
          }
      
          if(this.trainingTeachers.length == 0 ){
            let control = <FormArray>this.form4.controls['trainingTeacher']
            for (const key of control.value) {
      
              key.TrainingId=key.TrainingId.id
              // this.trainingTeachers.push({
              //   id:key.id,
              // TeacherId:0,
              // name:key.name,
              // date_graduation:key.date_graduation,
              // name_institution:key.name_institution,
              // resolution_convalidation:key.resolution_convalidation,
              // degree_certificate:key.degree_certificate,
              // TrainingId:key.TrainingId,
              // })
            }
            this.trainingTeachers=this.form4.value.trainingTeacher
            formValue.trainingTeacher = this.form4.value.trainingTeacher
          }else{
            formValue.trainingTeacher = this.trainingTeachers
          }
      
          if(this.Workexperiences.length == 0 ){
            this.Workexperiences = this.form4.value.Workexperiences 
            formValue.Workexperiences = this.form4.value.Workexperiences
          }else{
            formValue.Workexperiences = this.Workexperiences
          }
      
          if(this.form4.value.trainingTeacher[0].name == ''){
            // this.form.value.trainingTeacher=[]
            formValue.trainingTeacher=[]
          }
          if(this.form4.value.Workexperiences[0].name_institution == ''){
            // this.form.value.Workexperiences=[]
            formValue.Workexperiences=[]
      
          }
          
        // console.log(formValue,'docente nuevo')
    if(formValue.MincienciaCategoryId != ("" || undefined) && formValue.ChargeBondingId != ("" || undefined) && 
      formValue.MincienciaCategoryId != ("" || undefined) && formValue.ChargeBondingId != ("" || undefined)){
        this.bandera4=true      
        this.perfilService.updateDocente(formValue.id,formValue).subscribe(
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
                            UserId:this.form4.value.id,
                            TrainingTeacherId:key.id,
                            name:'certificado'+key.Training?.name, 
                            file:null
                            })
                            arrayResolusion.push({
                              UserId:this.form4.value.id,
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
                              UserId:this.form4.value.id,
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
                      if(Bandera==true){
                        var date = new Date('2020-01-01 00:00:03');
                              function padLeft(n:any){ 
                                return n ="00".substring(0, "00".length - n.length) + n;
                              }
                              var interval = setInterval(() => {
                              var minutes = padLeft(date.getMinutes() + "");
                              var seconds = padLeft(date.getSeconds() + "");
                              if( seconds == '03') {
                              this.messageService.add({severity:'success', summary: 'Success', 
                              detail: 'Registro de Docente Actualizado con exito'});
                              }
                              date = new Date(date.getTime() - 1000);
                              if(seconds == '01' ) {
                                this.bandera4=false 
                              }
                             
                              if( minutes == '00' && seconds == '01' ) {
                                this.activeState=[false,false,false,false]
                                console.log(this.activeState,'this.activeState')
                                // this.docente=false
                            
                                // this.ref.close(algo);
                                clearInterval(interval); 
                              }
                        }, 1000);
                      }
                      
                    }

              },async error => {
                  if(error != undefined) {
                    let text = await translate(error.error.message, "es");
                    if(error.error.dataErros){
                      text = await translate(error.error.dataErros[0].message, "es");
                    }
                    this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
                    this.bandera4=false 
                  }
                });
              }
            else{
              this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
              this.bandera4=false 
            }
        
        }else{
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan Certificados por adjuntar'});
          this.bandera4=false 
        }

      }

    // ***************************************Codigo Logica Docente****************************************

      resolucion(e:Event,pointIndex:number) {
        e.preventDefault();
        const control = <FormArray>this.form4.controls['trainingTeacher']
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
      const control = <FormArray>this.form4.controls['trainingTeacher']
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
        const control = <FormArray>this.form4.controls['Workexperiences']
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
        const control = <FormArray>this.form4.controls['trainingTeacher']
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
        let control = <FormArray>this.form4.controls['trainingTeacher']
        control.controls[pointIndex].get('degree_certificate')?.setValue('')
      }
      removeArchivoC(item:any,event:Event,pointIndex:number){
      
        event.preventDefault()

        this.ArchivosEliminados.push(item)
        console.log(this.ArchivosEliminados,'this.ArchivosEliminados');
        let control = <FormArray>this.form4.controls['Workexperiences']
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
        let control = <FormArray>this.form4.controls['trainingTeacher']
        control.controls[pointIndex].get('resolution_certificate')?.setValue('')
      }
      
}
