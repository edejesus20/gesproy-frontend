import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
const translate = require('translate');
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { GroupI, Knowledge_areaI, RoleGroupTeacherI } from 'src/app/models/institution/group';
import { InvestigatorCollaboratorI } from 'src/app/models/user/investigator_colabolator';
import { PersonI } from 'src/app/models/user/person';
import { StudentI } from 'src/app/models/user/student';
import { TeacherI } from 'src/app/models/user/teacher';

import {DialogService} from 'primeng/dynamicdialog';
import { CategoryGroupI } from 'src/app/models/institution/category';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { Create_CategoriaGruposComponent } from 'src/app/main/investigacion/components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Knowledge_areaService } from 'src/app/core/services/Procedimientos/Knowledge_area.service';
import { Create_Knowledge_areaComponent } from '../../Areas de conocimiento/create_Knowledge_area/create_Knowledge_area.component';
import { Create_InvestigatorCollaboratorComponent } from 'src/app/main/usuarios/components/Investigador colabolador/create_InvestigatorCollaborator/create_InvestigatorCollaborator.component';
import { CreateTeacherComponent } from 'src/app/main/usuarios/components/Docentes/create-teacher/create-teacher.component';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';
import { Archivo } from 'src/app/layout/private-layout/perfil/perfil.component';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { RoleResearchI } from 'src/app/models/projet/roles_research';
import { RoleResearchService } from 'src/app/core/services/Procedimientos/RoleResearch.service';
import { RoleGroupTeacherService } from 'src/app/core/services/Procedimientos/RoleGroupTeacher.service';

@Component({
  selector: 'app-create_grupodeInvetigacion',
  templateUrl: './create_grupodeInvetigacion.component.html',
  styleUrls: ['./create_grupodeInvetigacion.component.css'],
  providers: [DialogService]
})
export class Create_grupodeInvetigacionComponent implements OnInit {

  items: MenuItem[]=[]
    
  activeIndex: number = 0;
  AnexoAdjuntado:any | null = null
  // public seedbeds: any[] = [];
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public mostrar2:boolean=true;
  public algo2:number[]=[0];
  public mostrar3:boolean=true;
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
    // hours_of_dedication:'',
    MincienciaCategoryId: '',
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
public roles:RoleGroupTeacherI[] = []

public mostrarTeacher:boolean=false

public Dialog:boolean =false
public bandera:boolean=false
public form:FormGroup= this.formBuilder.group({
  name: ['', [Validators.required]],
  // group_code:['', [Validators.required]],
  Facultad: ['', [Validators.required]],
  HeadquarterProgramId: ['', [Validators.required]],
  // ident_colciencias:['', [Validators.required]],
  // CategoryGroupId: ['', [Validators.required]],
  // resolution: ['', [Validators.required]],
  // Link_gruplac: ['', [Validators.required]],
  RoleInvestigador: ['', [Validators.required]],
  ObjetivoGeneral: [''],
  ObjetivosEspecificos: [''],
  Mision: [''],
  Vision: [''],
  Perfil: [''],
  Metas: [''],
  Resultados: [''],
  Sector: [''],
  Anexo: [''],

  TeacherId:['', [Validators.required]],
 
  InvestigatorCollaborators: this.formBuilder.array([this.formBuilder.group(
    {Usuarios:['', [Validators.required]],
    RoleGroupTeacherId:[''],
    }) 
    ]),

  knowledge_areas: this.formBuilder.array([this.formBuilder.group({Knowledge_areaId:['',[Validators.required]]})]),
  lines: this.formBuilder.array([this.formBuilder.group({LineId:['',[Validators.required]]})]),
  // Seedbeds: this.formBuilder.array([this.formBuilder.group({SeedbedId: ['', [Validators.required]]})]),
  Anexos: this.formBuilder.array([this.formBuilder.group({Anexos:['']})]),
});


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
filteredCountries: any[]=[];
public mostrarIntegrantes:boolean=false

public construccion:string='assets/construccion.jpg'
public Valorconstruccion:boolean=false

FilesAnexos:Archivo[] =[]
ArchivosEliminados:any[] =[]
  
  constructor(
    private groupService:GroupService,
    // private roleResearchService:RoleResearchService,
    private roleGroupTeacherService:RoleGroupTeacherService,
    private knowledge_areaService:Knowledge_areaService,
    private teacherService:TeacherService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private lineService: LineService,
    private messageService:MessageService,
    private userService: UserService,
    public dialogService: DialogService,
    public categoryGroupService:CategoryGroupService,
    ) { }
  ngOnInit(): void {
    this.items = [
      {
      label: 'Datos Basicos',
      command: (event: any) => {
          this.activeIndex = 0;
         }
      },
      {
          label: 'Registrar Mas Detalles',
          command: (event: any) => {
              this.activeIndex = 1;
            }
      },
    ];

    this.Valorconstruccion=false
    // this.buildForm();
    // this.getTeachers();
    this.geFacultad();
    // this.getInvestigatorCollaborators()
    this.getRoles()
    this.getCateghoria()
    this.getKnowledge_area()
    this.getLines()
    this.filteredCountries=[]
    // console.log('aqui')
  }
  getLines() {
    this.lineService.getList().subscribe(categoryGroups=>{
      for (let key of categoryGroups.lines) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.lines=categoryGroups.lines
    });
  }
  getKnowledge_area() {
    this.knowledge_areaService.getList().subscribe(categoryGroups=>{
      for (let key of categoryGroups.knowledge_areas) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.knowledge_areas=categoryGroups.knowledge_areas
}, error => console.error(error))
  }
  getCateghoria() {
    this.categoryGroupService.getList().subscribe(categoryGroups=>{
      for (let key of categoryGroups.categoryGroups) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
        this.categoryGroups=categoryGroups.categoryGroups
  }, error => console.error(error))
  }
  public getRoleInvestigador(event?: Event){
  if(event)event.preventDefault();
    // console.log("AreaSeleccionada")
    if(this.form.value.RoleInvestigador != ''){
      // this.getInvestigatorCollaborators(this.form.value.RoleInvestigador.id)
      let control = <FormArray>this.form.controls['InvestigatorCollaborators']
      if(control.length == 1 &&  this.mostrarI==false){
        
        control.controls[0].get('RoleGroupTeacherId')?.setValue(this.form.value.RoleInvestigador)
        this.mostrarI=true
      }
    // console.log(this.form.value.RoleInvestigador,'this.form.value.RoleInvestigador')
    if(this.form.value.RoleInvestigador.id == 2){
      this.userService.getUserteacherinvestigatorstudent()
      .subscribe(teachersA => {

        if(teachersA.teachers !== undefined && teachersA.teachers.length > 0){
          // for (let key of teachersA.users) {
          //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          // }
          this.users=teachersA.teachers
          }else{
            this.users=[{todo:'No hay registros'}]
          }
          // console.log(this.users)  
          this.mostrarIntegrantes= true
      })
    }

    if(this.form.value.RoleInvestigador.id == 3){
      this.userService.getUserteacherinvestigatorstudent()
      .subscribe(teachersA => {

        if(teachersA.investigator_collaborators !== undefined && teachersA.investigator_collaborators.length > 0){
          // for (let key of teachersA.users) {
          //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          // }
          this.users=teachersA.investigator_collaborators
          }else{
            this.users=[{todo:'No hay registros'}]
          }
          // console.log(this.users)  
          this.mostrarIntegrantes= true
      })
    }

    
    if(this.form.value.RoleInvestigador.id == 4){
      this.userService.getUserteacherinvestigatorstudent()
      .subscribe(teachersA => {

        if(teachersA.estudiantes !== undefined && teachersA.estudiantes.length > 0){
          // for (let key of teachersA.users) {
          //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          // }
          this.users=teachersA.estudiantes
          }else{
            this.users=[{todo:'No hay registros'}]
          }
          // console.log(this.users)  
          this.mostrarIntegrantes= true
      })
    }
      // this.userService.getUserteacherinvestigatorstudent()
      // .subscribe(teachersA => {

      //   if(teachersA.users !== undefined && teachersA.users.length > 0){
      //     // for (let key of teachersA.users) {
      //     //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      //     // }
      //     this.users=teachersA.users
      //     }else{
      //       this.users=[{todo:'No hay registros'}]
      //     }
      //     // console.log(this.users)  
      //     this.mostrarIntegrantes= true
      // })
          
    }
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
          for (let key of teacher.teacher.Seedbeds) {
            key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          }
          this.Seedbeds=teacher.teacher.Seedbeds
          // this.lines=teacher.teacher.Lines
        }
    }, error => console.error(error))
  }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
      for (let key of teachersA.facultys) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.facultys=teachersA.facultys
      // console.log(teachersA.facultys)
    }, error => console.error(error))
  }
  public getHeadquarterProgram(e?:Event){
    if(e)e.preventDefault();

    this.teachers=[]
    if(this.form.value.HeadquarterProgramId != ''){
      // this.teacherService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
      // //  console.log(rolesFromApi.semilleros)
      
      //  this.teachers=[]
      // this.lines=rolesFromApi.lines
      //  this.seedbeds= rolesFromApi.semilleros
      //  for (const key of rolesFromApi.teachers) {
      //    if(key.TeacherId){
      //     this.teacherService.getItem(key.TeacherId).subscribe((algo1)=>{
      //      if(algo1.teacher.User?.Person)
      //       algo1.teacher.User.Person.name=  algo1.teacher.User?.Person?.name.charAt(0).toUpperCase() +  algo1.teacher.User?.Person?.name.slice(1);
      //       this.teachers.push(algo1.teacher)
      //     })
      //    }
         
      //  }
       
       
      //   this.mostrarHeadquarterProgram=true

      // })
      this.teacherService.getDocentesGruposDisponibles().subscribe((rolesFromApi) => {
         console.log(rolesFromApi.teachers)
        
         this.teachers=[]
        // this.lines=rolesFromApi.lines
        //  this.seedbeds= rolesFromApi.semilleros
         for (const key of rolesFromApi.teachers) {
           if(key.TeacherId){
            this.teacherService.getItem(key.TeacherId).subscribe((algo1)=>{
             if(algo1.teacher.User?.Person)
              algo1.teacher.User.Person.name=  algo1.teacher.User?.Person?.name.charAt(0).toUpperCase() +  algo1.teacher.User?.Person?.name.slice(1);
              this.teachers.push(algo1.teacher)
            })
           }
           
         }
         
         
          this.mostrarHeadquarterProgram=true
  
        })
    }
  }

  llenar(position:number,event:Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.filterCountry(event,position,filterValue)

  }
  filterCountry(event:Event,position?:number,filterValue?:string){

    let control = <FormArray>this.form.controls['InvestigatorCollaborators']
    if(position != undefined){
    console.log(control.controls[position].value.RoleGroupTeacherId)  

      if(control.controls[position].value.RoleGroupTeacherId.id != ''){
  
        if(control.controls[position].value.RoleGroupTeacherId.id == 2){
          // console.log('2')
  
          this.userService.getUserteacherinvestigatorstudent()
          .subscribe(teachersA => {
    
            if(teachersA.teachers !== undefined && teachersA.teachers.length > 0){
              // for (let key of teachersA.users) {
              //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
              // }
              this.users=teachersA.teachers
              if(filterValue != undefined){
                let filtered : any[] = [];
                let query = filterValue;
            
                for(let i = 0; i < this.users.length; i++) {
                    let country = this.users[i];
                    if (country.todo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(country);
                    }
                }
                this.filteredCountries = filtered;
              }
              }else{
                this.users=[{todo:'No hay registros'}]
                if(filterValue != undefined){
                  let filtered : any[] = [];
                  let query = filterValue;
              
                  for(let i = 0; i < this.users.length; i++) {
                      let country = this.users[i];
                      if (country.todo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                          filtered.push(country);
                      }
                  }
                  this.filteredCountries = filtered;
                }
              }
              // console.log(this.users)  
              this.mostrarIntegrantes= true
          })
        }
    
        if(control.controls[position].value.RoleGroupTeacherId.id == 3){
          console.log('3')
          this.userService.getUserteacherinvestigatorstudent()
          .subscribe(teachersA => {
    
            if(teachersA.investigator_collaborators !== undefined && teachersA.investigator_collaborators.length > 0){
              // for (let key of teachersA.users) {
              //   key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
              // }
              this.users=teachersA.investigator_collaborators
              if(filterValue != undefined){
                let filtered : any[] = [];
                let query = filterValue;
            
                for(let i = 0; i < this.users.length; i++) {
                    let country = this.users[i];
                    if (country.todo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(country);
                    }
                }
                this.filteredCountries = filtered;
              }
              }else{
                this.users=[{todo:'No hay registros'}]
                if(filterValue != undefined){
                  let filtered : any[] = [];
                  let query = filterValue;
              
                  for(let i = 0; i < this.users.length; i++) {
                      let country = this.users[i];
                      if (country.todo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                          filtered.push(country);
                      }
                  }
                  this.filteredCountries = filtered;
                }
              }
              // console.log(this.users)  
              this.mostrarIntegrantes= true
          })
        }
      
      }
    }else{
    console.log('aja position undefined')  

    }
  
   
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  

    
}


  getRoles() {
    this.roleGroupTeacherService.getList().subscribe(teachersA => {
      for (let key of teachersA.roleGroupTeachers) {
        if(key.name.toLocaleLowerCase() != 'investigador lider'){
        // for (let key of teachersA.facultys) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          this.roles.push(key)
          }
         
        // }
        
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


  cerrar(){
    this.router.navigateByUrl('/Procedimientos/mostrar_groups');
  }
  private volver(){
    this.roles=[]
    this.AnexoAdjuntado=null
    this.bandera=false
    this.filteredCountries=[]

    this.mostrarFacultad = false
    this.mostrarHeadquarterProgram=false
    this.mostrarDirector=false
    this.mostrarLienas=false;
    this.mostrarTeacher= false
    this.form2= {
      id:0,   
       UserId: 0,
      ScaleId: 0,
      // hours_of_dedication:'',
      MincienciaCategoryId: '',
      User:undefined, 
      Scale:undefined, 
      Group:undefined, 
      MincienciaCategory:undefined, 
      TrainingTeacher:undefined, 
      Trainings:undefined, 
      ChargeBondingId:0,
      Charge_bonding:undefined
  }
    this.lines1=[]
    this.knowledge_areas1=[]
    this.InvestigatorCollaborators1=[]
    this.HeadquarterProgramId=0
    this.TeacherId = 0
    this.CategoryGroupId=0
    this.ngOnInit()
   this.FilesAnexos =[]

this.ArchivosEliminados=[]
this.vaciar()
}
private vaciar(){
  this.form.reset()

  this.getlines.reset()
  this.getlines.clear()
  this.getAnexos.reset()
  this.getAnexos.clear()
  this.getInvestigatorCollaborator.reset()
  this.getInvestigatorCollaborator.clear()
  this.getknowledge_areas.reset()
  this.getknowledge_areas.clear()

  this.form.controls['name'].setValue('')
  this.form.controls['Facultad'].setValue('')
  this.form.controls['HeadquarterProgramId'].setValue('')
  this.form.controls['Anexo'].setValue('')

  this.mostrarIntegrantes= false
  this.mostrarI=false
  // for (const key of this.roles) {
  //   if(key.id == 1){
      this.form.controls['RoleInvestigador'].setValue('')
  //   }
  // }
  this.form.controls['Sector'].setValue('')
  this.form.controls['ObjetivoGeneral'].setValue('')
  this.form.controls['ObjetivosEspecificos'].setValue('')
  this.form.controls['Mision'].setValue('')
  this.form.controls['Vision'].setValue('')
  this.form.controls['Metas'].setValue('')
  this.form.controls['Perfil'].setValue('')
  this.form.controls['Resultados'].setValue('')
  this.form.controls['TeacherId'].setValue('')
  // this.form.controls['Resultados'].setValue('')
  let control = <FormArray>this.form.controls['lines']
  control.push(this.formBuilder.group({
    LineId:['', [Validators.required]]
  }))
  let control1 = <FormArray>this.form.controls['Anexos']
  control1.push(this.formBuilder.group({
    Anexos:['', [Validators.required]]
  }))

  let control3 = <FormArray>this.form.controls['InvestigatorCollaborators']
  control3.push(this.formBuilder.group({
    Usuarios:['', [Validators.required]],
    RoleGroupTeacherId:[''],

  }))
  let control4 = <FormArray>this.form.controls['knowledge_areas']
  control4.push(this.formBuilder.group({
    Knowledge_areaId:['', [Validators.required]],
  }))
  
}
  
  public onSubmit(){
    // console.log('aqui1')
    let formValue: any = this.form.value;
    // console.log('aqui2',formValue)
    // formValue.CategoryGroupId=this.form.value.CategoryGroupId.id
    formValue.HeadquarterProgramId=this.form.value.HeadquarterProgramId.id
    formValue.TeacherId=this.form.value.TeacherId.id
    // console.log('aqui3',formValue)

      if(this.HeadquarterProgramId == 0 &&this.TeacherId == 0 
        // &&this.CategoryGroupId == 0
        ){
          this.HeadquarterProgramId= formValue.HeadquarterProgramId
          this.TeacherId= formValue.TeacherId
          // this.CategoryGroupId= formValue.CategoryGroupId
      }else{
        formValue.TeacherId=this.TeacherId
        // formValue.CategoryGroupId=this.CategoryGroupId
        formValue.HeadquarterProgramId=this.HeadquarterProgramId
      }

      // console.log('aqui4',formValue,this.TeacherId,this.CategoryGroupId,)

      if(this.lines1.length == 0 ){
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

      if(this.knowledge_areas1.length == 0 ){
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


      if(this.InvestigatorCollaborators1.length == 0 ){
        let control1 = <FormArray>this.form.controls['InvestigatorCollaborators']
        for (let key of control1.value) {
          // key.RoleId=key.RoleId.id 
          this.InvestigatorCollaborators1.push({
            RoleGroupTeacherId:  key.RoleGroupTeacherId.id,
            Usuarios:key.Usuarios,
          })
        }
        formValue.InvestigatorCollaborators = this.form.value.InvestigatorCollaborators
        // console.log('aqui')
      }else{
        formValue.InvestigatorCollaborators = this.InvestigatorCollaborators1
      }

      if(this.form.value.lines[0].LineId == ''){
        // this.form.value.trainingTeacher=[]
        formValue.lines=[]
      }
      if(this.form.value.knowledge_areas[0].Knowledge_areaId == ''){
        // this.form.value.trainingTeacher=[]
        formValue.knowledge_areas=[]
      }
      if(this.form.value.InvestigatorCollaborators[0].Usuarios == ''){
        // this.form.value.Workexperiences=[]
        formValue.InvestigatorCollaborators=[]
  
      }
      if(formValue.Anexos[0].Anexos ==""){
        formValue.Anexos=[]
      }
      // console.log(formValue,'formValue')
    if(this.mostrarFacultad == true && formValue.name != ""&&
    // formValue.ident_colciencias != "" &&
    // formValue.resolution != "" && 
    // formValue.group_code != "" && 
    // formValue.Sector != "" && 
    // formValue.ObjetivoGeneral != "" && 
    // formValue.ObjetivosEspecificos != "" && 
    // formValue.Mision != "" && 
    // formValue.Vision != "" && 
    // formValue.Resultados != "" && 
    // formValue.Perfil != "" && 
    // formValue.Metas != "" && 
    formValue.TeacherId != ( 0 || undefined)&&
    formValue.HeadquarterProgramId != ( 0 || undefined)
    // &&
    // formValue.CategoryGroupId != ( 0 || undefined)&&
    // formValue.Link_gruplac != ""
    ){
      console.log(formValue,'aqui')
    this.bandera=true

    this.groupService.createItem(formValue).subscribe(
      (algo) => {

        let array1:any[] = []
        let Bandera:boolean = false
        if(algo.group.id != undefined){


          console.log(algo.group,'algo.grupo')
          if(algo.group?.AnexosGroups?.length != undefined
            && algo.group.AnexosGroups.length >0){
              for (const key of algo.group.AnexosGroups) {
                if(key.id){
                  array1.push({
                    GroupId:algo.group.id,
                    AnexoId:key.AnexoId,
                    GroupAnexoId:key.id,
                    file:null
                    })
                }
              }
              console.log(array1,'array')
              for (let index = 0; index < array1.length; index++) {
                const element = array1[index];

                for (const key of algo.group.AnexosGroups) {
                  if(key.id == element.GroupAnexoId){
                    if(key.Anexo?.name != undefined){

                    }else{
                      if(this.FilesAnexos.length > 0){
                        for (const key1 of this.FilesAnexos) {
                          if( key1.id==0 && key1.position == index){
                            console.log(' key1.id==0 && key1.position == index')
                            array1[index].file=key1.file
                          }
                          if(key1.id == parseInt(array1[index].GroupAnexoId)){

                            console.log(' key1.id == array[index].AnexoId')
                            array1[index].file=key1.file
                          }
                        }
                      }
                    }
                    }
                  }
                }
 

          }else{
            if(this.FilesAnexos.length > 0){
              let cont=0
              for (const key of this.FilesAnexos) {
                if(key.file != null){
                  this.groupService.Anexos(algo.group.id.toString(),'','', key.file).subscribe(result=>{
                      cont=cont + 1
                      if(cont == this.FilesAnexos.length){
                        Bandera=true
                        if(Bandera==true){
                    //       var date = new Date('2020-01-01 00:00:03');
                    //       function padLeft(n:any){ 
                    //         return n ="00".substring(0, "00".length - n.length) + n;
                    //       }
                    //       var interval = setInterval(() => {
                    //       var minutes = padLeft(date.getMinutes() + "");
                    //       var seconds = padLeft(date.getSeconds() + "");
                    //       if( seconds == '03') {
                    //       this.messageService.add({severity:'success', summary: 'Success', 
                    //       detail: 'Registro de Grupo Creado con exito'});
                    //       }
                    //       date = new Date(date.getTime() - 1000);
                    //       if( minutes == '00' && seconds == '01' ) {
                    //         this.bandera=false
                    //         this.volver()
                    //         clearInterval(interval); 
                    //       }
                    // }, 1000);
                    this.finalizar()
                        }
                      }
                    
                  },error => console.error(error))
                }else{
                  Bandera=true
                }
              }
             Bandera=true
            }
           
        }

        if(this.AnexoAdjuntado != null){
          let data ={
            GroupId:algo.group.id,
            url:'',
            file:this.AnexoAdjuntado
            }

            this.groupService.Anexo(data.GroupId.toString(),data.url.
            toString(),data.file).subscribe(result=>{
              if(result){
                this.finalizar()
              }
            }, error => console.error(error))
      }else{
        Bandera=true
        this.finalizar()
      }

          if(Bandera==true){
               this.finalizar()
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
  }

  finalizar(){
    var date = new Date('2020-01-01 00:00:03');
    function padLeft(n:any){ 
      return n ="00".substring(0, "00".length - n.length) + n;
    }
    var interval = setInterval(() => {
    var minutes = padLeft(date.getMinutes() + "");
    var seconds = padLeft(date.getSeconds() + "");
    if( seconds == '03') {
    this.messageService.add({severity:'success', summary: 'Success', 
    detail: 'Registro de Grupo Creado con exito'});
    }
    date = new Date(date.getTime() - 1000);
    if( minutes == '00' && seconds == '01' ) {
      this.bandera=false
      this.volver()
      clearInterval(interval); 
    }
}, 1000);
  }
  get getlines() {
    return this.form.get('lines') as FormArray;//obtener todos los formularios
  }
  addlines(event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']
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
     control.push(this.formBuilder.group({LineId:['', [Validators.required]]}))//nuevo input

    }
  }
  get getAnexos() {
    return this.form.get('Anexos') as FormArray;//obtener todos los formularios
  }
  addAnexos(event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Anexos']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({Anexos:['']}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({Anexos:['']}))//nuevo input

    }
      this.mostrar2=true
  }
  removeAnexos(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Anexos']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({Anexos:['']}))//nuevo input

    }
  }
   // files Certificado formaciones
   onFileChange(event:any,pointIndex:number) {
    event.preventDefault();
    let control = <FormArray>this.form.controls['Anexos']
    // console.log(control.value[pointIndex].resolution_convalidation)
    if(control.value[pointIndex].Anexos != ''){
      // console.log('aquii')
      if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];

            
            if( this.FilesAnexos[pointIndex] != undefined){

              this.FilesAnexos[pointIndex]={
                id:control.value[pointIndex].id,
                position:pointIndex,
                file:file
              } 
            }else{
              this.FilesAnexos.push({id:control.value[pointIndex].id,position:pointIndex,
                file:file})

            }
            // console.log(this.FilesFormaciones,'this.FilesFormaciones')
        }
      }
    }

    onFileChange1(event:any) {
      event.preventDefault();
      if(this.form.value.Anexo != ''){
        if(event.target.files && event.target.files.length>0){
          const file=event.target.files[0];
          this.AnexoAdjuntado=file
          }
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
        Usuarios:['', [Validators.required]],
        RoleGroupTeacherId:[this.form.value.RoleInvestigador],
        // RoleId:['', [Validators.required]]
      }))//nuevo input
      // control.removeAt(0)
    }
    if(control.length >= 1 && this.mostrarI == true){
      control.push(this.formBuilder.group({
        Usuarios:['', [Validators.required]],
        RoleGroupTeacherId:[this.form.value.RoleInvestigador],

          // RoleId:['', [Validators.required]]
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
      Usuarios:['', [Validators.required]],
      RoleGroupTeacherId:[this.form.value.RoleInvestigador],

        // RoleId:['', [Validators.required]]
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
          this.getRoleInvestigador()

        }
  });
  }

  addCategoriaGrupos(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_CategoriaGruposComponent, {
      width: '50%',
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
      width: '50%',
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
      this.getRoleInvestigador()

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
          this.getRoleInvestigador()

        }
  });
  }
}
