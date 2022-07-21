import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/core/services/Procedimientos/projet.service';
import { Kind_of_InvestigationI, ProjectModalityI, ProjetI, TypeMemberI } from 'src/app/models/projet/projet';
import {Location} from '@angular/common';
import { ProjetTypeService } from 'src/app/core/services/Procedimientos/projetType.service';
import { ProjetTypeI } from 'src/app/models/projet/projet_type';
import { TeacherI } from 'src/app/models/user/teacher';
import { FacultyI } from 'src/app/models/institution/faculty';
import { GroupI } from 'src/app/models/institution/group';
import { LineI, ThematicI, Thematic_axisI } from 'src/app/models/projet/line';
import { DialogService } from 'primeng/dynamicdialog';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { MenuItem, MessageService } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { TypeMemberService } from 'src/app/core/services/Procedimientos/TypeMember.service';
import { ProjectModalityService } from 'src/app/core/services/Procedimientos/ProjectModality.service';
import { Kind_of_InvestigationService } from 'src/app/core/services/Procedimientos/Kind_of_Investigation.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleResearchService } from 'src/app/core/services/Procedimientos/RoleResearch.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create_proyectosdeinvestigacion',
  templateUrl: './create_proyectosdeinvestigacion.component.html',
  styleUrls: ['./create_proyectosdeinvestigacion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Create_proyectosdeinvestigacionComponent implements OnInit {
  API_URI = environment.API_URI;

  items: MenuItem[]=[]
    
    activeIndex: number = 0;

  public seedbeds: any;
  public mostrarDialogo:boolean=false;
  public mostrarFacultad:boolean=false;
  public mostrarHeadquarterProgram:boolean=false;
  public mostrarlineasProgram:boolean=false;
  mostrarSemilleros:boolean=false;
  public FacultadHeadquarterProgram:any[]=[]
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public mostrar1:boolean=true;
  public mostrar2:boolean=true;
  public algo1:number[]=[0];
  public algo2:number[]=[0];
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public Dialog:boolean =false
  public bandera:boolean=false


 public form:FormGroup= this.formBuilder.group({
});
  
  public teachers: TeacherI[] =[]
  public facultys: FacultyI[] =[]
  public groups: GroupI[]=[]
  public lines: any[] =[]
  public form2:any
public Grupo:any | null=null
public mostrarTeacher:boolean=false
public students:any[] =[]
public lines1:any[] =[]
public Students:any[] =[]
private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private GroupId:number = 0
public ref1:any;

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false

  // public thematics: ThematicI[]=[];
  public projetTypes:ProjetTypeI[] =[]
  public lineValue:boolean=false
  filteredCountries2:any[] =[]
thematics:any[] =[]
Seedbeds:SeedbedI[] =[]
projectModalitys:ProjectModalityI[]=[]
typeMembers:TypeMemberI[]=[]
kind_of_Investigations:Kind_of_InvestigationI[]=[]

// miembros
public algoI:number[]=[0];
public mostrarI:boolean=false;
public users:any[]=[]
public roleResearchs:any[] = []
mostrarIntegrantes:boolean=false;

filteredCountries:any[] =[]

  constructor(
    private projetService:ProjetService,
    private projetTypeService:ProjetTypeService,
    private formBuilder: FormBuilder,
    private typeMemberService: TypeMemberService,
    private roleResearchService:RoleResearchService,

    public dialogService: DialogService,
    private seedbedService:SeedbedService,
    private teacherService:TeacherService,
    private messageService:MessageService,
    private headquarterService:HeadquarterService,
    private facultyService: FacultyService,
    private groupService:GroupService,
    private router: Router,
    private lineService: LineService,
    private projectModalityService:ProjectModalityService,
    private kind_of_InvestigationService:Kind_of_InvestigationService,
    private userService: UserService,
    ) { }
  ngOnInit(): void {
    this.gettipoInvestigacion()
    this.getModalidadProyecto()
    this.gettipoMiembro()
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

    this.Valorconstruccion=true

    this.buildForm();
    this.getAllProjetTypeId()
    this.getAllteachers()
    this.geFacultad() 
    this.getRolesInvestigacion()
    this.getGrupos()
  }
  getRolesInvestigacion() {
    this.roleResearchService.getList().subscribe((rolesFromApi) => {
      this.roleResearchs= rolesFromApi.roleResearchs
     })
    }
  getModalidadProyecto() {
    this.projectModalityService.getList().subscribe((rolesFromApi) => {
      this.projectModalitys= rolesFromApi.projectModalitys
     })
  }
  gettipoMiembro() {
    this.typeMemberService.getList().subscribe((rolesFromApi) => {
      this.typeMembers= rolesFromApi.typeMembers
     })
  }
  gettipoInvestigacion() {
    this.kind_of_InvestigationService.getList().subscribe((rolesFromApi) => {
      this.kind_of_Investigations= rolesFromApi.kind_of_Investigations
     })
  }

  AreaSeleccionada(pointIndex:number,event:Event){
    event.preventDefault();
    // console.log("AreaSeleccionada")
    let control = <FormArray>this.form.controls['lines']
    this.thematics=[]
    if(control.controls[pointIndex].value.LineId != undefined && control.controls[pointIndex].value.LineId != ''){
      this.groupService.getAreasLineasGrupos(this.Grupo.id,control.controls[pointIndex].value.LineId.id).subscribe(data=>{
        if(data.groupLine !== undefined && data.groupLine.length > 0){
          // console.log(data.groupLine,'data.groupLine')
          for (const item of data.groupLine) {
            if(item.GroupLineThematics.length > 0){
              for (const areas of item.GroupLineThematics) {
                  if(areas.Thematic != undefined && item.status == true){
                    //   // for (let key of categoryGroups.categoryGroups) {
                    //     key.Thematic.name =  key.Thematic.name.charAt(0).toUpperCase() +  key.Thematic.name.slice(1);
                    //   // }
                  this.thematics.push(areas.Thematic)
                }
              }
  
            }else{
          this.thematics=[{name:'No hay registros'}]
  
            }
          }
        }else{
          this.thematics=[{name:'No hay registros'}]
        }
      })
  
    }
  }
  
  llenar2(position:number,event:Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.filterCountry2(event,position,filterValue)
  
  }
  filterCountry2(event:Event,position?:number,filterValue?:string){
    this.thematics=[]
    let control = <FormArray>this.form.controls['lines']
    if(position != undefined){
    // console.log(control.controls[position].value.LineId)  
  
      if(control.controls[position].value.LineId.id != ''){
        this.groupService.getAreasLineasGrupos(this.Grupo.id,control.controls[position].value.LineId.id).subscribe(data=>{
          if(data.groupLine !== undefined && data.groupLine.length > 0){
            // console.log(data.groupLine,'data.groupLine')
            for (const item of data.groupLine) {
              if(item.GroupLineThematics.length > 0){
                for (const areas of item.GroupLineThematics) {
                    if(areas.Thematic != undefined && item.status == true){
                      //   // for (let key of categoryGroups.categoryGroups) {
                      //     key.Thematic.name =  key.Thematic.name.charAt(0).toUpperCase() +  key.Thematic.name.slice(1);
                      //   // }
                    this.thematics.push(areas.Thematic)
                  }
                }
                if(filterValue != undefined){
                  let filtered : any[] = [];
                  // let query = filterValue;
              
                  for(let i = 0; i < this.thematics.length; i++) {
                      let country = this.thematics[i];
                      if (country.name.toLowerCase().indexOf(filterValue.toLowerCase()) == 0) {
                          filtered.push(country);
                      }
                  }
                  this.filteredCountries2 = filtered;
                }
              }else{
            this.thematics=[{name:'No hay registros'}]
            if(filterValue != undefined){
              let filtered : any[] = [];
              // let query = filterValue;
          
              for(let i = 0; i < this.thematics.length; i++) {
                  let country = this.thematics[i];
                  if (country.name.toLowerCase().indexOf(filterValue.toLowerCase()) == 0) {
                      filtered.push(country);
                  }
              }
              this.filteredCountries2 = filtered;
            }
              }
            }
          }else{
            this.thematics=[{name:'No hay registros'}]
            if(filterValue != undefined){
              let filtered : any[] = [];
              // let query = filterValue;
          
              for(let i = 0; i < this.thematics.length; i++) {
                  let country = this.thematics[i];
                  if (country.name.toLowerCase().indexOf(filterValue.toLowerCase()) == 0) {
                      filtered.push(country);
                  }
              }
              this.filteredCountries2 = filtered;
            }
          }
        })

      }
    }
   
  }

  public getTypeMemberId(event?: Event){
    if(event)event.preventDefault();
    
      if(this.form.value.TypeMemberId != ''){
        console.log("TypeMemberId")
      
        // this.getInvestigatorCollaborators(this.form.value.TypeMemberId.id)
        let control = <FormArray>this.form.controls['InvestigatorCollaborators']
        if(control.length == 1 &&  this.mostrarI==false){
        
          control.controls[0].get('TypeMemberId')?.setValue(this.form.value.TypeMemberId)
          for (const key of this.roleResearchs) {

          if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'docente'){
            
              if(key.name.toLocaleLowerCase() === 'co-investigador'){
                control.controls[0].get('RoleResearchId')?.setValue(key)
              }
            }

            if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'investigador Colabolador'){
            
              if(key.name.toLocaleLowerCase() === 'co-investigador externo'){
                control.controls[0].get('RoleResearchId')?.setValue(key)
              }
            }

            
            if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'estudiante'){
            
              if(key.name.toLocaleLowerCase() === 'estudiante'){
                control.controls[0].get('RoleResearchId')?.setValue(key)
              }
            }
          }
          console.log(control.controls[0].get('RoleResearchId'),'control.controls[0]')
          this.mostrarI=true
        }else{
          console.log("aqioooooooooo- else")
          // this.addInvestigatorCollaborators(new Event(''))
        }



        console.log("getTypeMemberId")
      // console.log(this.form.value.RoleInvestigador,'this.form.value.RoleInvestigador')
      if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'docente'){
        let form = {
          GroupId:this.Grupo.id,
          SeedbedId:this.form.value.SeedbedId.id,
        }
        console.log("form",form)
        
        this.userService.UsersInvestigatorStudentTeacherProyecto(form)
        .subscribe(teachersA => {
  
          if(teachersA.teachers !== undefined && teachersA.teachers.length > 0){
            for (let key of teachersA.teachers) {
              key.todo =  key.todo.charAt(0).toUpperCase() +  key.todo.slice(1);

              if(key.avatar != undefined){
                var avatar = key.avatar;
                var n = avatar.search("assets");
                if(n == -1){
                  key.avatar=this.API_URI+key.avatar
                  // console.log("avatar",key.avatar)
                }else{
                  key.avatar= key.avatar
                }
      
              } 
            }
       
            console.log("teachersA",teachersA)

            this.users=teachersA.teachers
            }else{
              this.users=[{todo:'No hay registros'}]
            }
            // console.log(this.users)  
            this.mostrarIntegrantes= true
        })
      }
  
      if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'investigador Colabolador'){
        let form = {
          GroupId:this.Grupo.id,
          SeedbedId:this.form.value.SeedbedId.id,
        }
        this.userService.UsersInvestigatorStudentTeacherProyecto(form)
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
  
      
      if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'estudiante'){
        let form = {
          GroupId:this.Grupo.id,
          SeedbedId:this.form.value.SeedbedId.id,
        }
        this.userService.UsersInvestigatorStudentTeacherProyecto(form)
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
      }
    }

    llenar(position:number,event:Event){
      let filterValue = (event.target as HTMLInputElement).value;
      this.filterCountry(event,position,filterValue)
  
    }
    filterCountry(event:Event,position?:number,filterValue?:string){
  
      let control = <FormArray>this.form.controls['InvestigatorCollaborators']
      if(position != undefined){  
        if(control.controls[position].value.TypeMemberId.id != ''){
    
          if(control.controls[position].value.TypeMemberId.name.toLocaleLowerCase() === 'docente'){
            // console.log('2')
            let form = {
              GroupId:this.Grupo.id,
              SeedbedId:this.form.value.SeedbedId.id,
            }
            this.userService.UsersInvestigatorStudentTeacherProyecto(form)
            .subscribe(teachersA => {
      
              if(teachersA.teachers !== undefined && teachersA.teachers.length > 0){
               for (const key of teachersA.teachers) {
                if(key.avatar != undefined){
                  var avatar = key.avatar;
                  var n = avatar.search("assets");
                  if(n == -1){
                    key.avatar=this.API_URI+key.avatar
                    // console.log("avatar",key.avatar)
                  }else{
                    key.avatar= key.avatar
                  }
        
                } 
               }
            
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

          if(control.controls[position].value.TypeMemberId.name.toLocaleLowerCase() === 'investigador Colabolador'){
            // console.log('2')
            let form = {
              GroupId:this.Grupo.id,
              SeedbedId:this.form.value.SeedbedId.id,
            }
            this.userService.UsersInvestigatorStudentTeacherProyecto(form)
            .subscribe(teachersA => {
      
              if(teachersA.investigator_collaborators !== undefined && teachersA.investigator_collaborators.length > 0){
                for (const key of teachersA.investigator_collaborators) {
                  if(key.avatar != undefined){
                    var avatar = key.avatar;
                    var n = avatar.search("assets");
                    if(n == -1){
                      key.avatar=this.API_URI+key.avatar
                      // console.log("avatar",key.avatar)
                    }else{
                      key.avatar= key.avatar
                    }
          
                  } 
                 }
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

          if(control.controls[position].value.TypeMemberId.name.toLocaleLowerCase() === 'estudiante'){
            // console.log('2')
            let form = {
              GroupId:this.Grupo.id,
              SeedbedId:this.form.value.SeedbedId.id,
            }
            this.userService.UsersInvestigatorStudentTeacherProyecto(form)
            .subscribe(teachersA => {
      
              if(teachersA.estudiantes !== undefined && teachersA.estudiantes.length > 0){
                for (const key of teachersA.estudiantes) {
                  if(key.avatar != undefined){
                    var avatar = key.avatar;
                    var n = avatar.search("assets");
                    if(n == -1){
                      key.avatar=this.API_URI+key.avatar
                      // console.log("avatar",key.avatar)
                    }else{
                      key.avatar= key.avatar
                    }
          
                  } 
                 }
                this.users=teachersA.estudiantes
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
                this.mostrarIntegrantes= true
            })
          }
        }
      }else{
      console.log('aja position undefined')  
  
      }
  }


  
  getGrupos() {
    this.groupService.getList().subscribe((rolesFromApi) => {
      this.groups= rolesFromApi.groups
      //  this.mostrarHeadquarterProgram=true
       // this.getAllteachers(this.form.value.HeadquarterProgramId.id)

     })
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      TeacherId: ['', [Validators.required]],
      hours_dedicated: ['', [Validators.required]],
      Facultad: [''],
      HeadquarterProgramId: ['', [Validators.required]],
      GroupId:[''],
      title: ['', [Validators.required]],
      SeedbedId: [''],
      TypeMemberId:['', [Validators.required]],
      
      duration:['', [Validators.required]],
      place_of_execution:['', [Validators.required]],
      // tipo investigacion
      kind_of_investigation:['', [Validators.required]],
      // modalidad_de_proyecto
      project_modality:['', [Validators.required]],
      // Resumen del proyecto
      Project_summary:['', [Validators.required]],
      // palabras clave
      keywords:['', [Validators.required]],
      // planteamiento del problema
      problem_statement:['', [Validators.required]],
      // formulación del problema
      problem_formulation:['', [Validators.required]],
      // objetivo_general
      general_objetive:['', [Validators.required]],
      // objetivos específicos
      specific_objectives:['', [Validators.required]],
      // justificación
      justification:['', [Validators.required]],
      // delimitación
      delimitation:['', [Validators.required]],
      // Marco teórico
      theoretical_framework:['', [Validators.required]],
      // investigación_antecedentes
      investigation_background:['', [Validators.required]],
      // Fundamento teórico
      theoretical_foundation:['', [Validators.required]],
      // metodología
      methodology:['', [Validators.required]],
      // impacto_esperado
      expected_impact:['', [Validators.required]],
      // estrategia de comunicación
      communication_strategy:['', [Validators.required]],
      // cronograma_de_actividades
      timeline_of_activities:['', [Validators.required]],
      // presupuesto
      budget:['', [Validators.required]],
      // referencias_bibliograficas
      bibliographical_references:['', [Validators.required]],
      // identificación_de_las_variables
      identification_of_the_variables:['', [Validators.required]],
      lines: this.formBuilder.array([this.formBuilder.group({
        LineId:['', [Validators.required]], 
        ThematicId:['', [Validators.required]],
      })]),
      // lines: this.formBuilder.array([this.formBuilder.group({LineId:['', [Validators.required]]})]),
      Students: this.formBuilder.array([this.formBuilder.group({
        StudentId:['',[Validators.required]],
        Horas:['',[Validators.required]]
      })]),
      InvestigatorCollaborators: this.formBuilder.array([this.formBuilder.group(
        {
          Usuarios:['', [Validators.required]],
          TypeMemberId:[''],
          RoleResearchId:[''],
          hours:['', [Validators.required]],
          ProjetId:[''],
        }) 
        ])
  });
  } 
  
  
  cerrar(){
    this.router.navigateByUrl('/Procedimientos/mostrar_seedbeds');
  }
  thematic(e:Event) {
    e.preventDefault();
    this.thematics=[]
    if(this.form.value.LineId != ''){
      this.lineService.getItem(this.form.value.LineId.id).subscribe(list => {
        console.log(list.line,'list.line')
        if(list.line?.LineThematics?.length != undefined && list.line.LineThematics.length > 0){
          for (let key of list.line?.LineThematics) {
            if(key.Thematic !== undefined ){
              // for (let key of categoryGroups.categoryGroups) {
                key.Thematic.name =  key.Thematic.name.charAt(0).toUpperCase() +  key.Thematic.name.slice(1);
              // }
            this.thematics.push(key.Thematic);
          }
          }
          this.lineValue=true
        } 
        
        // this.thematics=list.thematics
      })
    }else{
      this.lineValue=false

    }
    
  }

  get getStudents() {
    return this.form.get('Students') as FormArray;//obtener todos los formularios
  }

  addStudents(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Students']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar1 == false){
      control.push(this.formBuilder.group({
        StudentId:['', [Validators.required]],
        Horas:['',[Validators.required]]
    }))
    }
    if(control.length >= 1 && this.mostrar1 == true){
      control.push(this.formBuilder.group({ 
      StudentId:['', [Validators.required]],
      Horas:['',[Validators.required]]
    }))
    }
      this.mostrar1=true
  }
  removeStudents(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Students']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar1=false
     control.push(this.formBuilder.group({  
      StudentId:['', [Validators.required]],
      Horas:['',[Validators.required]]
    }))
    }
  }

  public onSubmit(): void {
    const formValue: ProjetI = this.form.value;
    this.projetService.createItem(formValue).subscribe(
      (newFaculty) => {

          // this.snackBar.open('Proyecto de Investigacion creado exitosamente', 'Ok', {
          //   duration: 5000,
          // });
          this.router.navigateByUrl('/Procedimientos/mostrar_projets');
        
      }, () => {

          // this.snackBar.open('Error. El Proyecto de Investigacion no pudo ser creado', 'Ok', {
          //   duration: 5000,
          // });
      }
    );
  }
  private getAllProjetTypeId(selectId?: number) {
    this.projetTypeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.projetTypes = AdministrativeFromApi.projetTypes;
        if (selectId !== undefined) {
          this.form.controls['ProjetTypeId'].setValue(selectId);
        }
      }, error => console.error(error));
  }


  public SelectTeacher(){
    if(this.form.value.TeacherId != ''){
      this.getOneTeachers(this.form.value.TeacherId.TeacherId)
      this.mostrarTeacher=true
    }
  }
  getOneTeachers(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
      if(cnt_groupFromApi.teacher.id != undefined){
          this.form2=cnt_groupFromApi.teacher
          let Group :any | null= null 
          if(cnt_groupFromApi.teacher.GroupTeachers?.length != undefined
            && cnt_groupFromApi.teacher.GroupTeachers?.length > 0){

              for (const clave of cnt_groupFromApi.teacher.GroupTeachers) {
                if(clave.GroupId && clave.status == true){
                  Group=clave?.GroupId
                }
              }

          }
          for (const key of this.groups) {

            if(Group != null && parseInt(Group) == key.id){
              this.Grupo=key
              this.form.controls['GroupId'].setValue(key)
              this.getLineProgramGroup()
              this.Semilleros()

            
              // console.log(this.Grupo,'this.Grupo')
            }
            
          }

          if(this.form.value.GroupId != ''){
            if(this.form.value.GroupId.HeadquarterProgram.Program.FacultyId != undefined){
              for (const key of this.facultys) {
                if(parseInt(this.form.value.GroupId.HeadquarterProgram.Program.FacultyId) == key.id){
                  this.form.controls['Facultad'].setValue(key)
                  this.SelectFacultad()
                }
              }
            }
          }
          // console.log(cnt_groupFromApi.teacher)
      }
    }, error => console.error(error));
  }
 public Semilleros(){
  // if(this.form.value.GroupId != ''){
  //    console.log(this.form.value.GroupId.Seedbeds,'this.form.value.GroupId.Seedbeds')
  //    this.seedbeds=[]
  //    if(this.form.value.GroupId.Seedbeds.length >0){
  //      for (let key of this.form.value.GroupId.Seedbeds) {
  //       this.seedbedService.getItem(key.id).subscribe((algo)=>{
  //         // for (let key of facultiesFromApi.teachers) {
  //           algo.seedbed.name =  algo.seedbed.name.charAt(0).toUpperCase() +  algo.seedbed.name.slice(1);
  //         // }
  //         this.seedbeds.push(algo.seedbed)
  //       })
         
  //      }
  //      this.mostrarSemilleros=true
  //     //  console.log(this.lines)
  //    }
  //   }
  if(this.form2.id != undefined){
    console.log(this.form2.Seedbeds,'this.form2.GroupId.Seedbeds')
    this.seedbeds=[]
    this.students=[]
    if( this.form2.Seedbeds != undefined&& this.form2.Seedbeds.length > 0){
      for (let key of this.form2.Seedbeds) {
        if(key.id)
       this.seedbedService.getItem(key.id).subscribe((algo)=>{
         // for (let key of facultiesFromApi.teachers) {
           algo.seedbed.name =  algo.seedbed.name.charAt(0).toUpperCase() +  algo.seedbed.name.slice(1);
         // }
         this.seedbeds.push(algo.seedbed)
         this.form.controls['SeedbedId'].setValue(algo.seedbed)
         if(algo.seedbed.SeedbedStudents != undefined && algo.seedbed.SeedbedStudents.length > 0){
          for (let key1 of algo.seedbed.SeedbedStudents) {
            if(key1.Student)
            this.students.push(key1.Student)
          }
         }
        
       })
        
      }
      this.mostrarSemilleros=true
     //  console.log(this.lines)
    }
   }
 }
  public getLineProgramGroup(){

    if(this.form2.GroupTeachers != undefined){
      this.lines=[]
    if(this.form2.GroupTeachers?.[0]){
      if( this.form2.GroupTeachers[0].status == false
        ){
        if(this.form2.GroupTeachers[0].GroupTeacherLines != undefined)
        {
          for (let index = 0; index < this.form2.GroupTeachers[0].GroupTeacherLines.length; index++) {
              this.form2.GroupTeachers?.[0].GroupTeacherLines.splice(index, this.form2.GroupTeachers[0].GroupTeacherLines.length) 
        }
      }

          // this.form2.GroupTeachers.[0].
      }else{
        if(this.form2.GroupTeachers[0].GroupTeacherLines != undefined)
        for (let index = 0; index < this.form2.GroupTeachers[0].GroupTeacherLines.length; index++) {
          let Lineas = this.form2.GroupTeachers?.[0].GroupTeacherLines[index];
          if(Lineas.GroupLine != undefined)
          if(Lineas.GroupLine?.status == false)
          {
            // this.FilesArchivos.splice(index,1) 
            this.form2.GroupTeachers?.[0].GroupTeacherLines.splice(index,1) 
          }
        }
      }
      console.log(this.form2.GroupTeachers[0].GroupTeacherLines,'this.form2.GroupTeachers[0].GroupTeacherLines')
      if(this.form2.GroupTeachers[0].GroupTeacherLines != undefined){
        for (let index = 0; index < this.form2.GroupTeachers[0].GroupTeacherLines.length; index++) {
          let Lineas = this.form2.GroupTeachers?.[0].GroupTeacherLines[index];
          if(Lineas.status == true &&Lineas.GroupLine != undefined){
            if(Lineas.GroupLine?.status == true)
            {

              this.lineService.getItem(Lineas.GroupLine.LineId).subscribe((algo)=>{
                      // for (let key of facultiesFromApi.teachers) {
                        algo.line.name =  algo.line.name.charAt(0).toUpperCase() +  algo.line.name.slice(1);
                      // }
                  this.lines.push(algo.line)
                })
            }
          }
        
        }
      }
    

    
    }

    //  console.log(this.form.value.GroupId)
    
    //  if(this.form.value.GroupId.GroupLines.length >0){
    //    for (let key of this.form.value.GroupId.GroupLines) {
    //     this.lineService.getItem(key.LineId).subscribe((algo)=>{
    //       // for (let key of facultiesFromApi.teachers) {
    //         algo.line.name =  algo.line.name.charAt(0).toUpperCase() +  algo.line.name.slice(1);
    //       // }
    //       this.lines.push(algo.line)
    //     })
         
    //    }
    //   //  console.log(this.lines)
    //  }
     this.mostrarlineasProgram=true

    }
  }
  public SelectFacultad(){
    if(this.form.value.Facultad != ''){
      this.getFacultadHeadquarterProgram(this.form.value.Facultad.id)
      this.mostrarFacultad=true
    }
  }
  public getFacultadHeadquarterProgram(id:number) {
    this.headquarterService.getFacultadHeadquarterProgramId(id).subscribe((rolesFromApi) => {
      this.FacultadHeadquarterProgram = rolesFromApi.FacultadHeadquarterProgram;
      for (const key of this.FacultadHeadquarterProgram) {
        if(this.Grupo != null && this.Grupo.HeadquarterProgram != undefined 
          && parseInt(this.Grupo.HeadquarterProgramId)==key.id){
            this.form.controls['HeadquarterProgramId'].setValue(key)
        }
      }
      // console.log(this.FacultadHeadquarterProgram)
    }, error => console.error(error));
  }

  public getHeadquarterProgram(){
    if(this.form.value.HeadquarterProgramId != ''){
      this.groupService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
       this.groups= rolesFromApi.groups
        this.mostrarHeadquarterProgram=true
        // this.getAllteachers(this.form.value.HeadquarterProgramId.id)

      })
    }
  }

  // getstudents() {
  //   this.studentService.AddStudentsSemilleros().subscribe(
  //      (facultiesFromApi) => {
  //        for (let key of facultiesFromApi.students) {
  //          key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
  //        }
  //        // console.log(facultiesFromApi.students)
  //        this.students =  facultiesFromApi.students;
  //      }, error => console.error(error));
  //  }
   geFacultad() {
     this.facultyService.getList().subscribe(teachersA => {
       for (let key of teachersA.facultys) {
         key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
       }
       this.facultys=teachersA.facultys
     }, error => console.error(error))
   }
   private getAllteachers() {
     this.teacherService.DocentesTeacherProyectos().subscribe(
       (facultiesFromApi) => {
         // for (const key of facultiesFromApi.teachers) {
         //   this.teachers.push(key)
         // }
         for (let key of facultiesFromApi.teachers) {
           key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);

          if(key.avatar != undefined){
            var avatar = key.avatar;
            var n = avatar.search("assets");
            if(n == -1){
              key.avatar=this.API_URI+key.avatar
              // console.log("avatar",key.avatar)
            }else{
              key.avatar= key.avatar
            }
  
          } 
         }
         this.teachers = facultiesFromApi.teachers;
       }, error => console.error(error));
   }

   get getlines() {
    return this.form.get('lines') as FormArray;//obtener todos los formularios
  }

  addlines(event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({
        LineId:['', [Validators.required]],
        ThematicId:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({
        LineId:['', [Validators.required]],
        ThematicId:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar2=true
  }
  removelines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({
      LineId:['', [Validators.required]],ThematicId:['', [Validators.required]]}))//nuevo input

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
      let  RoleResearchId:any
      for (const key of this.roleResearchs) {

        if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'docentes'){
          
            if(key.name.toLocaleLowerCase() === 'co-investigador'){
              RoleResearchId=key
            }
          }

          if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'investigador Colabolador'){
          
            if(key.name.toLocaleLowerCase() === 'co-investigador externo'){
              RoleResearchId=key

            }
          }

          
          if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'estudiante'){
          
            if(key.name.toLocaleLowerCase() === 'estudiante'){
              RoleResearchId=key

            }
          }
        }
    if(control.length == 0 && this.mostrarI == false){
      control.push(this.formBuilder.group({
        Usuarios:['', [Validators.required]],
        TypeMemberId:[this.form.value.TypeMemberId],
        RoleResearchId:[RoleResearchId],
        hours:['', [Validators.required]],
        ProjetId:[''],
      }))//nuevo input
      // control.removeAt(0)
    }
    if(control.length >= 1 && this.mostrarI == true){
      control.push(this.formBuilder.group({
        Usuarios:['', [Validators.required]],
        TypeMemberId:[this.form.value.TypeMemberId],
        RoleResearchId:[RoleResearchId],
        hours:['', [Validators.required]],
        ProjetId:[''],
      }))//nuevo input

    }
   
      this.mostrarI=true
  }
  removeInvestigatorCollaborators(index: number,event: Event){
    event.preventDefault();
    let  RoleResearchId:any
    for (const key of this.roleResearchs) {
      if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'docentes'){
          if(key.name.toLocaleLowerCase() === 'co-investigador'){
            RoleResearchId=key
          }
        }
        if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'investigador Colabolador'){
          if(key.name.toLocaleLowerCase() === 'co-investigador externo'){
            RoleResearchId=key
          }
        }
        if(this.form.value.TypeMemberId.name.toLocaleLowerCase() === 'estudiante'){
          if(key.name.toLocaleLowerCase() === 'estudiante'){
            RoleResearchId=key
          }
        }
      }

    let control = <FormArray>this.form.controls['InvestigatorCollaborators']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrarI=false
     control.push(this.formBuilder.group({
      Usuarios:['', [Validators.required]],
      TypeMemberId:[this.form.value.TypeMemberId],
      RoleResearchId:[RoleResearchId],
      hours:['', [Validators.required]],
      ProjetId:[''],
    }))//nuevo input
    }
  }

}
