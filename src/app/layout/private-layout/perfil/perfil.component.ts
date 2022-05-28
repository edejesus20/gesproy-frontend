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
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { ChargeI } from 'src/app/models/user/charge';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [DialogService]
})
export class PerfilComponent implements OnInit {
  public UserRoles:UserRoleI[] = []
  public estudiante:boolean=false
  public docente:boolean=false
  public administrativo:boolean=false
  public form:FormGroup=this.formBuilder.group({
    id: [''],
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:['', [Validators.required]],
    identification:['', [Validators.required]],
    GenderId:['', [Validators.required]],
    address:['', [Validators.required]],
    phone:['', [Validators.required]],
    email:['', [Validators.required]],
    nationality: ['', [Validators.required]],
    date_of_birth: ['', [Validators.required]],
  });
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
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]]})]),
  });

  public form4:FormGroup=this.formBuilder.group({
    id: [''],
    MincienciaCategoryId:['', [Validators.required]],
    headquarterProgramTeacher: this.formBuilder.array([this.formBuilder.group(
      {
        TeacherId:0,
        HeadquarterProgramId:['', [Validators.required]],
        ResearchBondingId:['', [Validators.required]],
    })]),
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
    ChargeBondingId:['',[Validators.required]]
  });

  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public image3:string=''
  public mostrar2:boolean=false;
  public algo1:number[]=[0];
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public mostrar3:boolean=true;
  public algo3:number[]=[0];
  public seedbeds:SeedbedI[] =[]

  public headquarterProgram: any[]=[]
  public headquarterProgramStudent1:any[]=[]

  public charges:ChargeI[]=[]
  public headquarters: HeadquarterI[]=[]
  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    public ref: DynamicDialogRef,
    private seedbedService:SeedbedService,
    private headquarterService: HeadquarterService,
    private chargeService:ChargeService,

  ) { }

  ngOnInit() {
    this.verificar()
     this.getAllgenders()
      this.getAlldocumentTypes()
      this.getSeedbed()
      this.getAllheadquarters()
      this.getheadquarters()
      this.getAllocupations()
  }
  getSeedbed() {
    this.seedbedService.getList().subscribe(data => {
      this.seedbeds=data.seedbeds
    }, error => console.error(error));
  }
  getAlldocumentTypes() {
    this.documentTypeService.getList().subscribe((rolesFromApi) => {
        this.documentTypes = rolesFromApi.documentTypes;
        //console.log(this.roles);
      }, error => console.error(error));
  }
  getAllgenders() {
    this.genderService.getList().subscribe((rolesFromApi) => {
        this.genders = rolesFromApi.genders;
        //console.log(this.roles);
      }, error => console.error(error));
  }
  private getheadquarters(selectId?: number) {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
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

  public verificar(){
    var user :string | null= localStorage.getItem('user');
  
  if( user!=null ){
     
    let userObjeto:any = JSON.parse(user); 
  
  // console.log(menuObjeto)

    this.userService.getOneUser(userObjeto.id).subscribe((data)=>{
    if(data.user.fullName && data.user.avatar != undefined){
      console.log(data.user)
      if(data.user.id != undefined && data.user.Person != undefined &&
        data.user.UserRoles?.length != undefined && data.user.UserRoles.length > 0){
        this.form.controls['id'].setValue(data.user.id)
        this.form2.controls['id'].setValue(data.user.id)
        this.form.controls['name'].setValue(data.user.Person?.name)
        this.form.controls['surname'].setValue(data.user.Person?.surname)
        this.form.controls['identification'].setValue(data.user.Person?.identification)
        this.form.controls['email'].setValue(data.user.email)
        this.form.controls['phone'].setValue(data.user.Person?.phone)
        this.form.controls['address'].setValue(data.user.Person?.address)
        this.form.controls['nationality'].setValue(data.user.Person?.nationality)
        this.form.controls['date_of_birth'].setValue(data.user.Person?.date_of_birth)
        this.image3=data.user.avatar
        if(data.user.Person?.GenderId != undefined){
          for (const key of this.genders) {
            if(parseInt(data.user.Person.GenderId) == key.id){
              this.form.controls['GenderId'].setValue(key)
              console.log('this.form.controls[GenderId]',this.form.controls['GenderId'])

            }
            
          }
        }
        if(data.user.Person?.DocumentTypeId != undefined){
          for (const key2 of this.documentTypes) {
            if(parseInt(data.user.Person.DocumentTypeId) == key2.id){
              this.form.controls['DocumentTypeId'].setValue(key2)
              console.log('this.form.controls[DocumentTypeId]',this.form.controls['DocumentTypeId'])

            }
            
          }
        }
        this.UserRoles=data.user.UserRoles
        for (const key of this.UserRoles) {
          if(key.Role != undefined){
            this.verificarRol(key.Role)
          }
          
        }
      }
    }     
  })
    }
  }
  verificarRol(Role:RoleI){
    console.log(Role)
    if(Role.name.toLocaleLowerCase() === 'estudiante'){
      this.estudiante=true

    }
    if(Role.name.toLocaleLowerCase() === 'docente'){
      this.docente=true

    }
    if(Role.name.toLocaleLowerCase() === 'administrativo'){
      this.administrativo=true
    }
  }
  public onSubmit1(event: Event){
    event.preventDefault()
  }
  public cancelar(){
    this.ref.close(undefined);
  }

  // estudiante

  private getAllheadquarters(selectId?: number) {
    this.headquarterService.HeadquarterProgram().subscribe(
      (AdministrativeFromApi) => {
        console.log(AdministrativeFromApi.headquarterProgram)
        this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
      }, error => console.error(error));
  }
  
  get getRoles() {
    return this.form2.get('headquarterProgramStudent') as FormArray;//obtener todos los formularios
  }
  
    addRoles(event: Event){
      event.preventDefault();
  
      const control = <FormArray>this.form2.controls['headquarterProgramStudent']
        if(control.length == 0 && this.mostrar == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
  
        }
        this.mostrar=true
    }
    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form2.controls['headquarterProgramStudent']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar=false
        control.push(this.formBuilder.group({
          StudentId:0,
          HeadquarterProgramId:['', [Validators.required]],
        }))
        }
    }
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
  //  administrativos

  get getRoles2() {
    return this.form3.get('Charges') as FormArray;//obtener todos los formularios
  }

  addRoles2(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form3.controls['Charges']
    
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({
        ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
      }))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
    }))
    this.mostrar=true
    //nuevo input
    }
     
  }
  removeRoles2(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form3.controls['Charges']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
     control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]],
     }))//nuevo input

    }
  }
}
