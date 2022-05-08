import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { RoleInvestigationsService } from 'src/app/core/services/institution/roleInvestigations.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { UserI } from 'src/app/models/authorization/usr_User';
import { FacultyI } from 'src/app/models/institution/faculty';
import { GroupI, Knowledge_areaI } from 'src/app/models/institution/group';
import { RoleInvestigationI } from 'src/app/models/institution/roles_investigation';
import { InvestigatorCollaboratorI } from 'src/app/models/user/investigator_colabolator';
import { PersonI } from 'src/app/models/user/person';
import { StudentI } from 'src/app/models/user/student';
import { TeacherI } from 'src/app/models/user/teacher';

import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CrearUserComponent } from 'src/app/main/usuarios/components/usr_User/crear-user/crear-user.component';
import { CategoryGroupI } from 'src/app/models/institution/category';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { Create_CategoriaGruposComponent } from 'src/app/main/investigacion/components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Knowledge_areaService } from 'src/app/core/services/Procedimientos/Knowledge_area.service';
import { Create_Knowledge_areaComponent } from '../../Areas de conocimiento/create_Knowledge_area/create_Knowledge_area.component';
import { Create_InvestigatorCollaboratorComponent } from 'src/app/main/usuarios/components/Investigador colabolador/create_InvestigatorCollaborator/create_InvestigatorCollaborator.component';
import { CreateTeacherComponent } from 'src/app/main/usuarios/components/Docentes/create-teacher/create-teacher.component';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';

@Component({
  selector: 'app-create_grupodeInvetigacion',
  templateUrl: './create_grupodeInvetigacion.component.html',
  styleUrls: ['./create_grupodeInvetigacion.component.css'],
  providers: [DialogService]
})
export class Create_grupodeInvetigacionComponent implements OnInit {
  public seedbeds: any[] = [];
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public mostrar2:boolean=false;
  public algo2:number[]=[0];
  public mostrar3:boolean=false;
  public algo3:number[]=[0];

  public FacultadHeadquarterProgram:any[]=[]
  public teachers: TeacherI[] =[]
  public lines: any[] =[]
  public Seedbeds:any[]=[]
  public facultys: FacultyI[] =[]
  public mostrarFacultad:boolean=false;
  public mostrarDirector:boolean=false;
  public mostrarLienas:boolean=false;

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form2:TeacherI= {
    id:0,   
     UserId: 0,
    ScaleId: 0,
    hours_of_dedication:'',
    MincienciaCategoryId: 0,
    User:undefined, 
    Scale:undefined, 
    Group:undefined, 
    MincienciaCategory:undefined, 
    TrainingTeacher:undefined, 
    Trainings:undefined, 
    ChargeBondingId:0,
    Charge_bonding:undefined
}
public investigatorCollaborators:InvestigatorCollaboratorI[] =[]
public algoI:number[]=[0];
public mostrarI:boolean=false;

public students:StudentI[] =[]
public algoS:number[]=[0];
public mostrarS:boolean=false;

public users:any[]=[]
public roles:RoleInvestigationI[] = []

public mostrarTeacher:boolean=false
  public form: FormGroup = this.formBuilder.group({});
 public ref:any;
 public mostrarHeadquarterProgram:boolean=false;
  public categoryGroups:CategoryGroupI[] = []
  public knowledge_areas: Knowledge_areaI[]=[];
  private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private CategoryGroupId:number = 0

public lines1:any[] =[]
public InvestigatorCollaborators1:any[] =[]
public knowledge_areas1:any[] =[]
public Seedbeds1:any[] =[]
public image:string='assets/images/images.jpg'
public image2:string='assets/images/uniguajira_iso.jpg'
  constructor(
    private groupService:GroupService,
    private roleInvestigationsService:RoleInvestigationsService,
    private knowledge_areaService:Knowledge_areaService,
    private teacherService:TeacherService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService:MessageService,
    private userService: UserService,
    public dialogService: DialogService,
    public categoryGroupService:CategoryGroupService,
    ) { }
  ngOnInit(): void {
    this.buildForm();
    // this.getTeachers();
    this.geFacultad();
    this.getInvestigatorCollaborators()
    this.getRoles()
    this.getCateghoria()
    this.getKnowledge_area()
    // console.log('aqui')
  }
  getKnowledge_area() {
    this.knowledge_areaService.getList().subscribe(categoryGroups=>{
      this.knowledge_areas=categoryGroups.knowledge_areas
}, error => console.error(error))
  }
  getCateghoria() {
    this.categoryGroupService.getList().subscribe(categoryGroups=>{
        this.categoryGroups=categoryGroups.categoryGroups
  }, error => console.error(error))
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      // group_code:['', [Validators.required]],
      Facultad: ['', [Validators.required]],
      HeadquarterProgramId: ['', [Validators.required]],
      // ident_colciencias:['', [Validators.required]],
      // CategoryGroupId: ['', [Validators.required]],
      // resolution: ['', [Validators.required]],
      // Link_gruplac: ['', [Validators.required]],
      ObjetivoGeneral: ['', [Validators.required]],
      ObjetivosEspecificos: ['', [Validators.required]],
      Mision: ['', [Validators.required]],
      Vision: ['', [Validators.required]],
      Perfil: ['', [Validators.required]],
      Metas: ['', [Validators.required]],
      Resultados: ['', [Validators.required]],
      Sector: ['', [Validators.required]],

      TeacherId:['', [Validators.required]],
     
      InvestigatorCollaborators: this.formBuilder.array([this.formBuilder.group({UserId:['', [Validators.required]],
          RoleId:['', [Validators.required]]}) ]),

      knowledge_areas: this.formBuilder.array([this.formBuilder.group({Knowledge_areaId:['',[Validators.required]]})]),
      lines: this.formBuilder.array([this.formBuilder.group({LineId:['',[Validators.required]]})]),
      // Seedbeds: this.formBuilder.array([this.formBuilder.group({SeedbedId: ['', [Validators.required]]})]),
      Anexos: this.formBuilder.array([this.formBuilder.group({Anexos:['', [Validators.required]]})]),
    });
  }  
 public SelectFacultad(e:Event){
  e.preventDefault();
    if(this.form.value.Facultad != ''){
      this.getFacultadHeadquarterProgram(this.form.value.Facultad.id)
      this.mostrarFacultad=true
    }
  }

  public SelectTeacher(e:Event){
    e.preventDefault();
    if(this.form.value.TeacherId != ''){
      // this.getLineTeacherId(this.form.value.TeacherId.id)
      this.getOneTeachers(this.form.value.TeacherId.id)
      this.mostrarTeacher=true
      this.mostrarLienas=true
    }
  }
  getLineTeacherId(id: any) {
      this.teacherService.getItem(id).subscribe(teacher=>{
        // console.log(teacher.teacher)
        if(teacher.teacher.Seedbeds && teacher.teacher.Lines){
          this.Seedbeds=teacher.teacher.Seedbeds
          // this.lines=teacher.teacher.Lines
        }
    }, error => console.error(error))
  }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
      this.facultys=teachersA.facultys
      // console.log(teachersA.facultys)
    }, error => console.error(error))
  }
  public getHeadquarterProgram(e?:Event){
    if(e)e.preventDefault();

    this.teachers=[]
    if(this.form.value.HeadquarterProgramId != ''){
      this.teacherService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
      //  console.log(rolesFromApi.semilleros)
       this.teachers=[]
      this.lines=rolesFromApi.lines
       this.seedbeds= rolesFromApi.semilleros
       for (const key of rolesFromApi.teachers) {
         if(key.TeacherId){
          this.teacherService.getItem(key.TeacherId).subscribe((algo1)=>{
            this.teachers.push(algo1.teacher)
          })
         }
         
       }
       
       
        this.mostrarHeadquarterProgram=true

      })
    }
  }
  // getTeachers() {
  //   this.teacherService.getList().subscribe(teachersA => {
  //     this.teachers=teachersA.teachers
  //   }, error => console.error(error))
  // }  

 async getInvestigatorCollaborators() {

   
   this.userService.getUserteacherinvestigatorstudent().subscribe(teachersA => {
     this.users=[]
      for (let key of teachersA.users) {
        if(key.rol == "teacher"){
          key.rol=  "Docente";
        }
        if(key.rol == "student"){
          key.rol=  "Estudiante";
        }
        if(key.rol == "investigator"){
          key.rol=  "Investigador";
        }
        
        // console.log(key.rol.__zone_symbol__value)
        this.users.push(key)
      }
      // this.users=teachersA.users
    }, error => console.error(error))
  } 

  getRoles() {
    this.roleInvestigationsService.getList().subscribe(teachersA => {
      for (const key of teachersA.roleInvestigations) {
        if(key.id != 1)
        this.roles.push(key)
      }
    }, error => console.error(error))
  } 
  getOneTeachers(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
      if(cnt_groupFromApi.teacher.id != undefined){
          this.form2=cnt_groupFromApi.teacher
      }
    }, error => console.error(error));
  }

  getFacultadHeadquarterProgram(id:number) {
    this.facultyService.getItem(id).subscribe((rolesFromApi) => {
      if( rolesFromApi.faculty.Programs != undefined){
        this.FacultadHeadquarterProgram = rolesFromApi.faculty.Programs;
        // console.log(this.FacultadHeadquarterProgram)
      }
   
    }, error => console.error(error));
  }


  
  public onSubmit(){
    // console.log('aqui1')
    let formValue: GroupI = this.form.value;
    // console.log('aqui2',formValue)
    // formValue.CategoryGroupId=this.form.value.CategoryGroupId.id
    formValue.HeadquarterProgramId=this.form.value.HeadquarterProgramId.id
    formValue.TeacherId=this.form.value.TeacherId.id
    // console.log('aqui3',formValue)

      if(this.HeadquarterProgramId == 0 &&this.TeacherId == 0 &&this.CategoryGroupId == 0){
          this.HeadquarterProgramId= formValue.HeadquarterProgramId
          this.TeacherId= formValue.TeacherId
          this.CategoryGroupId= formValue.CategoryGroupId
      }else{
        formValue.TeacherId=this.TeacherId
        formValue.CategoryGroupId=this.CategoryGroupId
        formValue.HeadquarterProgramId=this.HeadquarterProgramId
      }

      // console.log('aqui4',formValue,this.TeacherId,this.CategoryGroupId,)

      if(this.lines1.length == 0 || this.lines1 == []){
        let control = <FormArray>this.form.controls['lines']
        for (const key of control.value) {
          key.LineId=key.LineId.id 
          this.lines1.push({
            LineId:key.LineId,
          })
        }
        formValue.lines = this.form.value.lines
        // console.log('aqui')
      }else{
        formValue.lines = this.lines1
      }

      

      // if(this.Seedbeds1.length == 0 || this.Seedbeds1 == []){
      //   let control = <FormArray>this.form.controls['Seedbeds']
      //   for (const key of control.value) {
      //     key.SeedbedId=key.SeedbedId.id 
      //     this.Seedbeds1.push({
      //       SeedbedId:key.SeedbedId,
      //     })
      //   }
      //   formValue.Seedbeds = this.form.value.Seedbeds
      //   // console.log('aqui')
      // }else{
      //   formValue.Seedbeds = this.Seedbeds1
      // }

      if(this.knowledge_areas1.length == 0 || this.knowledge_areas1 == []){
        let control = <FormArray>this.form.controls['knowledge_areas']
        for (const key of control.value) {
          key.Knowledge_areaId=key.Knowledge_areaId.id 
          this.knowledge_areas1.push({
            Knowledge_areaId:key.Knowledge_areaId,
          })
        }
        formValue.knowledge_areas = this.form.value.knowledge_areas
        // console.log('aqui')
      }else{
        formValue.knowledge_areas = this.knowledge_areas1
      }
      // console.log('aqui5',formValue)


      if(this.InvestigatorCollaborators1.length == 0 || this.InvestigatorCollaborators1 == []){
        let control1 = <FormArray>this.form.controls['InvestigatorCollaborators']
        for (const key of control1.value) {
          key.RoleId=key.RoleId.id 
          key.UserId=key.UserId.UserId 
          this.InvestigatorCollaborators1.push({
            RoleId:key.RoleId,
            UserId:key.UserId,
          })
        }
        formValue.InvestigatorCollaborators = this.form.value.InvestigatorCollaborators
        // console.log('aqui')
      }else{
        formValue.InvestigatorCollaborators = this.InvestigatorCollaborators1
      }


      // console.log(formValue)
    if(this.mostrarFacultad == true && formValue.name != ""&&
    // formValue.ident_colciencias != "" &&
    // formValue.resolution != "" && 
    // formValue.group_code != "" && 
    formValue.Sector != "" && 
    formValue.ObjetivoGeneral != "" && 
    formValue.ObjetivosEspecificos != "" && 
    formValue.Mision != "" && 
    formValue.Vision != "" && 
    formValue.Resultados != "" && 
    formValue.Perfil != "" && 
    formValue.Metas != "" && 
    formValue.TeacherId != ( 0 || undefined)&&
    formValue.HeadquarterProgramId != ( 0 || undefined)
    // &&
    // formValue.CategoryGroupId != ( 0 || undefined)&&
    // formValue.Link_gruplac != ""
    ){
      console.log(formValue,'aqui')
      https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000003518 
    this.groupService.createItem(formValue).subscribe(
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
          detail: 'Registro de Grupo Creado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            this.router.navigateByUrl('/Procedimientos/mostrar_groups');
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


  get getlines() {
    return this.form.get('lines') as FormArray;//obtener todos los formularios
  }

  addlines(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['lines']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({LineId:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({LineId:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar=true
  }
  removelines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
    }
  }

  get getAnexos() {
    return this.form.get('Anexos') as FormArray;//obtener todos los formularios
  }

  addAnexos(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Anexos']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar2=true
  }
  removeAnexos(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Anexos']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input

    }
  }

  get getSeedbed() {
    return this.form.get('Seedbeds') as FormArray;//obtener todos los formularios
  }

  addSeedbed(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Seedbeds']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrarS == false){
      control.push(this.formBuilder.group({SeedbedId: ['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrarS == true){
      control.push(this.formBuilder.group({SeedbedId: ['', [Validators.required]]}))//nuevo input

    }
      this.mostrarS=true
  }
  removeSeedbed(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Seedbeds']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrarS=false
     control.push(this.formBuilder.group({SeedbedId: ['', [Validators.required]]}))//nuevo input

    }
  }

  get getInvestigatorCollaborator() {
    return this.form.get('InvestigatorCollaborators') as FormArray;//obtener todos los formularios
  }

  addInvestigatorCollaborators(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['InvestigatorCollaborators']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrarI == false){
      control.push(this.formBuilder.group({
        UserId:['', [Validators.required]],
          RoleId:['', [Validators.required]]
      }))//nuevo input
    }
    if(control.length >= 1 && this.mostrarI == true){
      control.push(this.formBuilder.group({
        UserId:['', [Validators.required]],
          RoleId:['', [Validators.required]]
      }))//nuevo input

    }
      this.mostrarI=true
  }
  removeInvestigatorCollaborators(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['InvestigatorCollaborators']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrarI=false
     control.push(this.formBuilder.group({
      UserId:['', [Validators.required]],
        RoleId:['', [Validators.required]]
    }))//nuevo input
    }
  }

  get getknowledge_areas() {
    return this.form.get('knowledge_areas') as FormArray;//obtener todos los formularios
  }

  addknowledge_areas(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['knowledge_areas']
      if(control.length == 0 && this.mostrar3 == false){
        control.push(this.formBuilder.group({
          Knowledge_areaId:['', [Validators.required]],
          //  LineId:[0, [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar3 == true){
        control.push(this.formBuilder.group({
          Knowledge_areaId:['', [Validators.required]],
          //  LineId:[0, [Validators.required]],
        }))

      }
      this.mostrar3=true
  }
  removeknowledge_areas(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['knowledge_areas']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar3=false
      control.push(this.formBuilder.group({
        Knowledge_areaId:['', [Validators.required]],
        // LineId:[0, [Validators.required]],
      }))
      }
      // console.log(control)
  }
  // modales
  addInvestigator(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_InvestigatorCollaboratorComponent, {
      width: '70vw',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 

      // baseZIndex: 10000,
      data: {
        id: '1',
        Tipo:'I'
    },
  });

  this.ref.onClose.subscribe((person: PersonI) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Usuario Creado', detail: person.User?.fullName});
      this.getInvestigatorCollaborators()

        }
  });
  }

  addCategoriaGrupos(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_CategoriaGruposComponent, {
      width: '35%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 

      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Categoria Creada', detail: person.name,life: 2000});
      this.getCateghoria()

        }
  });
  }
  addMknowledge_areas(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_Knowledge_areaComponent, {
      width: '35%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Area de Conocimiento Creada', detail: person.name,life: 2000});
      this.getKnowledge_area()

        }
  });
  }

  addTeacher(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(CreateTeacherComponent, {
      width: '70%',
      // height: '50%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Docente Creado', detail: person.name,life: 2000});
      this.getHeadquarterProgram()
      this.getInvestigatorCollaborators()

        }
  });
  }

  addStudent(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(CreateStudentComponent, {
      width: '70%',
      // height: '50%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Estudiante Creado', detail: person.name,life: 2000});
          this.getInvestigatorCollaborators()

        }
  });
  }
}
