import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
const translate = require('translate');
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { RoleInvestigationsService } from 'src/app/core/services/institution/roleInvestigations.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { AnexosGroupI, GroupI, GroupKnowledge_areaI, Knowledge_areaI } from 'src/app/models/institution/group';
import { RoleInvestigationI } from 'src/app/models/institution/roles_investigation';
import { InvestigatorCollaboratorI } from 'src/app/models/user/investigator_colabolator';
import { PersonI } from 'src/app/models/user/person';
import { StudentI } from 'src/app/models/user/student';
import { AnexosI, TeacherI } from 'src/app/models/user/teacher';

import {DialogService} from 'primeng/dynamicdialog';
import { CategoryGroupI } from 'src/app/models/institution/category';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { Create_CategoriaGruposComponent } from 'src/app/main/investigacion/components/CategoriaGrupos/create_CategoriaGrupos/create_CategoriaGrupos.component';
import { Knowledge_areaService } from 'src/app/core/services/Procedimientos/Knowledge_area.service';
import { Create_Knowledge_areaComponent } from '../../Areas de conocimiento/create_Knowledge_area/create_Knowledge_area.component';
import { Create_InvestigatorCollaboratorComponent } from 'src/app/main/usuarios/components/Investigador colabolador/create_InvestigatorCollaborator/create_InvestigatorCollaborator.component';
import { CreateTeacherComponent } from 'src/app/main/usuarios/components/Docentes/create-teacher/create-teacher.component';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';
import { LineProgramGroupI } from 'src/app/models/institution/program';
import { environment } from 'src/environments/environment';
import { Archivo } from 'src/app/layout/private-layout/perfil/perfil.component';

@Component({
  selector: 'app-edit_grupodeInvetigacion',
  templateUrl: './edit_grupodeInvetigacion.component.html',
  styleUrls: ['./edit_grupodeInvetigacion.component.css']
})
export class Edit_grupodeInvetigacionComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  API_URI = environment.API_URI;

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public seedbeds: any[] = [];
  public mostrar4:boolean=true;
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
filteredCountries: any[]=[];
public mostrarIntegrantes:boolean=false

private deleteAnexos:any[] = []
private deleteInvestigatorCollaborators:any[] =[]
private deleteLineas:any[] = []
private deleteAreas:any[] = []

FilesArchivos:Archivo[] =[]
ArchivosEliminados:AnexosI[] =[]
private anterior:any

  constructor( private primengConfig: PrimeNGConfig,
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
  
    ngOnInit() {
    this.Valorconstruccion=false

      this.primengConfig.ripple = true;
      this.buildForm();
      // this.getTeachers();
      this.geFacultad();
      // this.getInvestigatorCollaborators()
      this.getRoles()
      this.getCateghoria()
      this.getKnowledge_area()
    }
    getOneCntAccount(id:number) {
      this.groupService.getItem(id).subscribe((cnt_groupFromApi) => {
        console.log(cnt_groupFromApi.group)
        if(cnt_groupFromApi.group.id != undefined){
          // console.log(cnt_groupFromApi.seedbed);
          this.form.controls['id'].setValue(cnt_groupFromApi.group.id)
          this.form.controls['name'].setValue(cnt_groupFromApi.group.name)
          // let creation_date=moment(cnt_groupFromApi.group.creation_date,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
  
          this.form.controls['Perfil'].setValue(cnt_groupFromApi.group.Perfil)
          this.form.controls['ObjetivoGeneral'].setValue(cnt_groupFromApi.group.ObjetivoGeneral)
          this.form.controls['ObjetivosEspecificos'].setValue(cnt_groupFromApi.group.ObjetivosEspecificos)
          this.form.controls['Mision'].setValue(cnt_groupFromApi.group.Mision)
          this.form.controls['Vision'].setValue(cnt_groupFromApi.group.Vision)
          this.form.controls['Metas'].setValue(cnt_groupFromApi.group.Metas)
          this.form.controls['Resultados'].setValue(cnt_groupFromApi.group.Resultados)
          this.form.controls['Sector'].setValue(cnt_groupFromApi.group.Sector)
          if(cnt_groupFromApi.group.HeadquarterProgram?.Program?.Faculty != undefined){
            for (const key of this.facultys) {
              if(key.id == cnt_groupFromApi.group.HeadquarterProgram?.Program?.Faculty.id){
               this.form.controls['Facultad'].setValue(key)
              }
            }
                        // this.SelectFacultad(undefined)

            if(this.form.value.Facultad != ''){
              this.getFacultadHeadquarterProgram(this.form.value.Facultad.id)
              this.facultyService.getItem(this.form.value.Facultad.id).subscribe((rolesFromApi) => {
                if( rolesFromApi.faculty.Programs != undefined){
                  this.FacultadHeadquarterProgram = rolesFromApi.faculty.Programs;
                  for (const key of this.FacultadHeadquarterProgram) {
                    if(key.id == cnt_groupFromApi.group.HeadquarterProgram?.Program?.id){
                      // console.log('aqui')
                      this.form.controls['HeadquarterProgramId'].setValue(key)
                     }
                  }
                  this.mostrarFacultad=true

                  this.teachers=[]
                  if(this.form.value.HeadquarterProgramId != ''){
                    this.teacherService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
                  
                     this.teachers=[]
                    this.lines=rolesFromApi.lines
                     this.seedbeds= rolesFromApi.semilleros
                     if(rolesFromApi.teachers.length != undefined && rolesFromApi.teachers.length > 0){
                      for (const key of rolesFromApi.teachers) {
                        if(key.TeacherId){
                         this.teacherService.getItem(key.TeacherId).subscribe((algo1)=>{
                           this.teachers.push(algo1.teacher)
                           console.log(this.teachers,'aqui--teacher')
                           for (const key of this.teachers) {
                              if(key.id == cnt_groupFromApi.group.TeacherId){
                                console.log('aqui')
                                this.form.controls['TeacherId'].setValue(key)
                                this.form2=key
                                this.mostrarTeacher=true
                                this.mostrarLienas=true
                               }
                            
                             
                           }
                         })
                        }
                        
                      }
                     }else{
                      this.teacherService.getItem(cnt_groupFromApi.group.TeacherId).subscribe((algo1)=>{
                        this.teachers.push(algo1.teacher)
                        // console.log(this.teachers,'aqui--teacher')
                        for (const key of this.teachers) {
                           if(key.id == cnt_groupFromApi.group.TeacherId){
                             console.log('aqui')
                             this.form.controls['TeacherId'].setValue(key)
                             this.form2=key
                             this.mostrarTeacher=true
                             this.mostrarLienas=true
                            }
                         
                          
                        }
                      })
                     }
                     if(cnt_groupFromApi.group.LineProgramGroups?.length != undefined && 
                      cnt_groupFromApi.group.LineProgramGroups.length > 0){
                        this.agregarLinea(cnt_groupFromApi.group.LineProgramGroups)
                      }

                      if(cnt_groupFromApi.group.GroupKnowledge_areas?.length != undefined && 
                        cnt_groupFromApi.group.GroupKnowledge_areas.length > 0){
                          this.agregarAreasConocimiento(cnt_groupFromApi.group.GroupKnowledge_areas)
                        }

                        if(cnt_groupFromApi.group.AnexosGroups?.length != undefined && 
                          cnt_groupFromApi.group.AnexosGroups.length > 0){
                            this.agregarAnexos(cnt_groupFromApi.group.AnexosGroups)
                          }
                     
                      this.mostrarHeadquarterProgram=true
              
                    })
                  }
                  // console.log(this.FacultadHeadquarterProgram)
                }
             
              }, error => console.error(error));
            
            }
                  // console.log(this.FacultadHeadquarterProgram
           
          }
        }
        this.displayMaximizable2=true
        this.tabla = false
        //console.log(this.cnt_group);
      }, error => console.error(error));
    }
  agregarAnexos(AnexosGroups:AnexosGroupI[]) {
    if(AnexosGroups.length){
      let cont=0
      for (let key of AnexosGroups) {
        if(key.Anexo != undefined && key.id){
          let control = <FormArray>this.form.controls['Anexos']
        //crear los controles del array
            control.push(this.formBuilder.group({
              id:[key.id],
              Anexos:[key.Anexo, [Validators.required]],
              anterior:true
              //  LineId:[0, [Validators.required]],
            }))

            this.FilesArchivos.push({
              id:key.id,position:cont
            })
            cont =cont + 1
        }
        
      }
      this.mostrar2 == true
      let control = <FormArray>this.form.controls['Anexos']
      control.removeAt(0)
     
    }
  }
  agregarAreasConocimiento(GroupKnowledge_areas: GroupKnowledge_areaI[]) {

    if(GroupKnowledge_areas.length){
      for (let key of GroupKnowledge_areas) {
        if(key.Knowledge_area?.id != undefined){
          let control = <FormArray>this.form.controls['knowledge_areas']
      console.log(this.knowledge_areas)      
        //crear los controles del array
        for (const key1 of this.knowledge_areas) {
          if(key1.id == key.Knowledge_area.id){
            control.push(this.formBuilder.group({
              id:[key.id],
              Knowledge_areaId:[key1, [Validators.required]],
              //  LineId:[0, [Validators.required]],
            }))
          }
          
        }
        }
        
      }
      this.mostrar3 == true
      let control = <FormArray>this.form.controls['knowledge_areas']
      control.removeAt(0)
     
    }
  }
  agregarLinea(LineProgramGroups:LineProgramGroupI[]) {
    console.log(LineProgramGroups)
    let arrayProfesor:any[] = []
    let RoleInvestigationId: any | null = null
    if(LineProgramGroups.length){
      for (let key of LineProgramGroups) {
        if(key.LineProgram?.Line != undefined){
          let control = <FormArray>this.form.controls['lines']
      // console.log(this.lines)      
        //crear los controles del array
        if(key.LineProgramGroupTeachers){
          for (const key1 of key.LineProgramGroupTeachers) {
            if(key1.RoleInvestigationId){
              this.userService.getUserteacherinvestigatorstudent(key1.RoleInvestigationId)
              .subscribe(teachersA => {
                if(teachersA.users !== undefined && teachersA.users.length > 0){
                  this.users=teachersA.users
                  }else{
                    this.users=[{todo:'No hay registros'}]
                  }
                  arrayProfesor=[]
                  // console.log(this.users)  
                  for (const clave of this.users) {
                    if(parseInt(clave.UserId) == key1.Teacher?.UserId){
                      arrayProfesor.push(clave)
                      RoleInvestigationId=clave.RoleInvestigationId
                    }
                  }
                  for (const algo of this.roles) {
                    if(algo.id == RoleInvestigationId){
                      RoleInvestigationId=algo
                    }
                    
                  }
                  this.form.controls['RoleInvestigador'].setValue(RoleInvestigationId)
                  let control1 = <FormArray>this.form.controls['InvestigatorCollaborators']
                  control1.push(this.formBuilder.group({
                    id:[key1.id],
                    Usuarios:[arrayProfesor, [Validators.required]],
                    RoleInvestigadorId:[RoleInvestigationId],
                  }))

                  this.mostrarIntegrantes= true
              })
            }

            
          }
         
        }
        // arrayProfesor=key.LineProgramGroupTeachers
        for (const key1 of this.lines) {
          
          if(key1.id == key.LineProgram.Line.id){
            control.push(this.formBuilder.group({
              id:[key.id],
              LineId:[key1, [Validators.required]]}))//nuevo input
          }
          
        }
        }
        
      }
      this.mostrar4 == true
      this.mostrarI=true
      let control1 = <FormArray>this.form.controls['InvestigatorCollaborators']
      control1.removeAt(0)

      let control = <FormArray>this.form.controls['lines']
      control.removeAt(0)
     
    }
    
  }
  
    public volver(event: Event){
      event.preventDefault
      this.tabla = true
      this.displayMaximizable2 = false
      this.ngOnInit()
      //console.log(event)
    }
  
    ngOnDestroy() {
      this.tabla = true
      this.displayMaximizable2 = false
    }
    actualizar(id: number){
      // console.log(id)
      this.getOneCntAccount(id)
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
      const control = <FormArray>this.form.controls['InvestigatorCollaborators']

        if(control.length == 1 &&  this.mostrarI==false){
        
          control.controls[0].get('RoleInvestigadorId')?.setValue(this.form.value.RoleInvestigador)
          this.mostrarI=true
        }
        this.userService.getUserteacherinvestigatorstudent(this.form.value.RoleInvestigador.id)
        .subscribe(teachersA => {
  
          if(teachersA.users !== undefined && teachersA.users.length > 0){
            this.users=teachersA.users
            }else{
              this.users=[{todo:'No hay registros'}]
            }
            console.log(this.users)  
            this.mostrarIntegrantes= true
        })
            
      }
    }
  
    private buildForm() {
      this.form = this.formBuilder.group({
        id:[''],
        name: ['', [Validators.required]],
        // group_code:['', [Validators.required]],
        Facultad: ['', [Validators.required]],
        HeadquarterProgramId: ['', [Validators.required]],
        // ident_colciencias:['', [Validators.required]],
        // CategoryGroupId: ['', [Validators.required]],
        // resolution: ['', [Validators.required]],
        // Link_gruplac: ['', [Validators.required]],
        RoleInvestigador: ['', [Validators.required]],
        ObjetivoGeneral: ['', [Validators.required]],
        ObjetivosEspecificos: ['', [Validators.required]],
        Mision: ['', [Validators.required]],
        Vision: ['', [Validators.required]],
        Perfil: ['', [Validators.required]],
        Metas: ['', [Validators.required]],
        Resultados: ['', [Validators.required]],
        Sector: ['', [Validators.required]],
        TeacherId:['', [Validators.required]],
        InvestigatorCollaborators: this.formBuilder.array([this.formBuilder.group({
            id:0,Usuarios:['', [Validators.required]],RoleInvestigadorId:[''],
          })]),
        knowledge_areas: this.formBuilder.array([this.formBuilder.group({
        id:0, Knowledge_areaId:['',[Validators.required]]})]),
        lines: this.formBuilder.array([this.formBuilder.group({id:0,LineId:['',[Validators.required]]})]),
        // Seedbeds: this.formBuilder.array([this.formBuilder.group({SeedbedId: ['', [Validators.required]]})]),
        Anexos: this.formBuilder.array([this.formBuilder.group({
          id:0,Anexos:['', [Validators.required]],anterior:false})]),
      });
    }  
    // al seleccionar la facultad
   public SelectFacultad(e?:Event){
    if(e)e.preventDefault();
      if(this.form.value.Facultad != ''){
        this.getFacultadHeadquarterProgram(this.form.value.Facultad.id)
        this.mostrarFacultad=true
      }
    }
    // buscar programas de facultad
    getFacultadHeadquarterProgram(id:number) {
      this.facultyService.getItem(id).subscribe((rolesFromApi) => {
        if( rolesFromApi.faculty.Programs != undefined){
          this.FacultadHeadquarterProgram = rolesFromApi.faculty.Programs;
          // console.log(this.FacultadHeadquarterProgram)
        }
     
      }, error => console.error(error));
    }
  // al seleccionar el lider proncipal
    public SelectTeacher(e:Event){
      e.preventDefault();
      if(this.form.value.TeacherId != ''){
        // this.getLineTeacherId(this.form.value.TeacherId.id)
        this.getOneTeachers(this.form.value.TeacherId.id)
        this.mostrarTeacher=true
        this.mostrarLienas=true
      }
    }
      // datos del lider principal
      getOneTeachers(id:number) {
        this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
          if(cnt_groupFromApi.teacher.id != undefined){
              this.form2=cnt_groupFromApi.teacher
          }
        }, error => console.error(error));
      }


    // getLineTeacherId(id: any) {
    //     this.teacherService.getItem(id).subscribe(teacher=>{
    //       // console.log(teacher.teacher)
    //       if(teacher.teacher.Seedbeds && teacher.teacher.Lines){
    //         for (let key of teacher.teacher.Seedbeds) {
    //           key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
    //         }
    //         this.Seedbeds=teacher.teacher.Seedbeds
    //         // this.lines=teacher.teacher.Lines
    //       }
    //   }, error => console.error(error))
    // }

    // *************************datos iniciales roles y facultada************
    geFacultad() {
      this.facultyService.getList().subscribe(teachersA => {
        for (let key of teachersA.facultys) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.facultys=teachersA.facultys
        // console.log(teachersA.facultys)
      }, error => console.error(error))
    }
    getRoles() {
      this.roleInvestigationsService.getList().subscribe(teachersA => {
        for (let key of teachersA.roleInvestigations) {
          if(key.id != 1)
          // for (let key of categoryGroups.categoryGroups) {
            key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          // }
          this.roles.push(key)
        }
      }, error => console.error(error))
    } 

    // buscar lineas y areas de grupos dependiendo al programa
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
  
  // filtrado para investigadores secundarios
    llenar(event:Event){
      let filterValue = (event.target as HTMLInputElement).value;
      this.filterCountry(event,filterValue)
  
    }
    filterCountry(event:Event,filterValue?:string){
      if(filterValue != undefined){
        let filtered : any[] = [];
        let query = filterValue;
    
        for(let i = 0; i < this.users.length; i++) {
            let country = this.users[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
      }
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    
  
      
  }
  
// **************enviar datos ******************************************
    public onSubmit(){
      // console.log('aqui1')
      let formValue: any = this.form.value;
      formValue.deleteAnexos=this.deleteAnexos
      formValue.deleteInvestigatorCollaborators=this.deleteInvestigatorCollaborators
      formValue.deleteLineas=this.deleteLineas
      formValue.deleteAreas=this.deleteAreas
      formValue.ArchivosEliminados=this.ArchivosEliminados
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
          for (const key of control1.value) {
            // key.RoleId=key.RoleId.id 
            key.Usuarios=key.Usuarios 
            this.InvestigatorCollaborators1.push({
              RoleInvestigadorId:  key.RoleInvestigadorId.id,
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
        console.log(formValue)
        console.log(this.FilesArchivos)
      // if(this.mostrarFacultad == true && formValue.name != ""&&
      // // formValue.ident_colciencias != "" &&
      // // formValue.resolution != "" && 
      // // formValue.group_code != "" && 
      // formValue.Sector != "" && 
      // formValue.ObjetivoGeneral != "" && 
      // formValue.ObjetivosEspecificos != "" && 
      // formValue.Mision != "" && 
      // formValue.Vision != "" && 
      // formValue.Resultados != "" && 
      // formValue.Perfil != "" && 
      // formValue.Metas != "" && 
      // formValue.TeacherId != ( 0 || undefined)&&
      // formValue.HeadquarterProgramId != ( 0 || undefined)
      // // &&
      // // formValue.CategoryGroupId != ( 0 || undefined)&&
      // // formValue.Link_gruplac != ""
      // ){
      //   console.log(formValue,'aqui')
      // this.groupService.createItem(formValue).subscribe(
      //   () => {
      //     var date = new Date('2020-01-01 00:00:03');
      //       function padLeft(n:any){ 
      //         return n ="00".substring(0, "00".length - n.length) + n;
      //       }
      //       var interval = setInterval(() => {
      //       var minutes = padLeft(date.getMinutes() + "");
      //       var seconds = padLeft(date.getSeconds() + "");
      //       // console.log(minutes, seconds);
      //       if( seconds == '03') {
      //       this.messageService.add({severity:'success', summary: 'Success', 
      //       detail: 'Registro de Grupo Creado con exito'});
      //       }
      //       date = new Date(date.getTime() - 1000);
      //       if( minutes == '00' && seconds == '01' ) {
      //         this.router.navigateByUrl('/Procedimientos/mostrar_groups');
      //         clearInterval(interval); 
      //       }
      // }, 1000);
      //   },async error => {
      //     if(error != undefined) {
      //       let text = await translate(error.error.message, "es");
      //       if(error.error.dataErros){
      //         text = await translate(error.error.dataErros[0].message, "es");
      //       }
      //       this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
      //     }
      //   });
      //   }else{
      //   this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
      //   }
    }
  
  // ******************************Añadir lineas*******************************
    get getlines() {
      return this.form.get('lines') as FormArray;//obtener todos los formularios
    }
    addlines(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['lines']
      //console.log(control)      
        //crear los controles del array
      if(control.length == 0 && this.mostrar4 == false){
        control.push(this.formBuilder.group({LineId:['', [Validators.required]]}))//nuevo input
      }
      if(control.length >= 1 && this.mostrar4 == true){
        control.push(this.formBuilder.group({LineId:['', [Validators.required]]}))//nuevo input
  
      }
        this.mostrar4=true
    }
    removelines(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['lines']//aceder al control
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteLineas.push(control.value[index]);
      }
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrar4=false
      }
    }
  // ******************************Añadir Anexos
    get getAnexos() {
      return this.form.get('Anexos') as FormArray;//obtener todos los formularios
    }
    addAnexos(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Anexos']
      //console.log(control)      
        //crear los controles del array
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          id:0,
          Anexos:['', [Validators.required]],
          anterior:false}))//nuevo input
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          id:0,
          Anexos:['', [Validators.required]],
        anterior:false}))//nuevo input
  
      }
        this.mostrar2=true
    }
    removeAnexos(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Anexos']//aceder al control
      // control.removeAt(index)
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteAnexos.push(control.value[index]);
      }
      control.removeAt(index)
      if( this.FilesArchivos[index] != undefined){
          this.FilesArchivos.splice(index,1) 
        }
      if(control.length <= 0){
       this.mostrar2=false
       control.push(this.formBuilder.group({
        id:0,
        Anexos:['', [Validators.required]],anterior:false}))//nuevo input
  
      }
    }
  
  // **************************Investigadores secundarios *****************
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
          id:0,
          Usuarios:['', [Validators.required]],
        RoleInvestigadorId:[this.form.value.RoleInvestigador],

            // RoleId:['', [Validators.required]]
        }))//nuevo input
        // control.removeAt(0)
      }
      if(control.length >= 1 && this.mostrarI == true){
        control.push(this.formBuilder.group({
          id:0,
          Usuarios:['', [Validators.required]],
        RoleInvestigadorId:[this.form.value.RoleInvestigador],
        }))//nuevo input
  
      }
     
        this.mostrarI=true
    }
    removeInvestigatorCollaborators(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['InvestigatorCollaborators']//aceder al control
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteInvestigatorCollaborators.push(control.value[index]);
      }
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrarI=false
       control.push(this.formBuilder.group({
        id:0,
        Usuarios:['', [Validators.required]],
      RoleInvestigadorId:[this.form.value.RoleInvestigador],

          // RoleId:['', [Validators.required]]
      }))//nuevo input
      }
    }
  // ********************Areas del conocimiento**********************
    get getknowledge_areas() {
      return this.form.get('knowledge_areas') as FormArray;//obtener todos los formularios
    }
  
    addknowledge_areas(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['knowledge_areas']
        if(control.length == 0 && this.mostrar3 == false){
          control.push(this.formBuilder.group({
            id:0,
            Knowledge_areaId:['', [Validators.required]],
            //  LineId:[0, [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar3 == true){
          control.push(this.formBuilder.group({
            id:0,
            Knowledge_areaId:['', [Validators.required]],
            //  LineId:[0, [Validators.required]],
          }))
  
        }
        this.mostrar3=true
    }
    removeknowledge_areas(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['knowledge_areas']//aceder al control
      if(control.value[index].id !== undefined && control.value[index].id != ''){
        this.deleteAreas.push(control.value[index]);
      }
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar3=false
        control.push(this.formBuilder.group({
          id:0,
          Knowledge_areaId:['', [Validators.required]],
        }))
        }
        // console.log(control)
    }


// *****************Archivos********************************************

    onFileChange1(event:any,pointIndex:number) {
      event.preventDefault();
      const control = <FormArray>this.form.controls['Anexos']
      // console.log(control.value[pointIndex].Anexos)
      if(control.value[pointIndex].Anexos != ''){
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
              
              if( this.FilesArchivos[pointIndex] != undefined){
                // console.log('aquii-actualizado file')
  
                this.FilesArchivos[pointIndex]={
                  id:control.value[pointIndex].id,
                  position:pointIndex,
                  file:file}
  
              }else{
                // console.log('aquii-nuevo file')
                this.FilesArchivos.push({id:control.value[pointIndex].id,position:pointIndex,file:file})
  
              }
              console.log(this.FilesArchivos,'this.FilesArchivos')
              // console.log(this.file)
              // console.log(reader,'reader')
          // }
      }
      }
    
  
    
    }

    removeArchivoC(item:any,event:Event,pointIndex:number){
      event.preventDefault()
      this.ArchivosEliminados.push(item)
      // console.log(this.ArchivosEliminados,'this.ArchivosEliminados--1');
      let control = <FormArray>this.form.controls['Anexos']
      this.anterior=item
      // this.form.controls['Anexos'].get('Anexos').setValue('')
      control.controls[pointIndex].get('Anexos')?.setValue('')
      control.controls[pointIndex].get('anterior')?.setValue(false)
      // console.log(this.form.value.Anexos[pointIndex].Anexos.name,'form.value.Anexos[pointIndex].Anexos.name')
    }
    volverArchivoC(event:Event,pointIndex:number){
      event.preventDefault()
      let control1 = <FormArray>this.form.controls['Anexos']
      control1.controls[pointIndex].get('anterior')?.setValue(true)
      
      if( this.ArchivosEliminados[pointIndex] != undefined){
          this.ArchivosEliminados.splice(pointIndex,1) 
        }
        let control2 = <FormArray>this.form.controls['Anexos']
      control2.controls[pointIndex].get('Anexos')?.setValue( this.anterior)
      console.log(this.ArchivosEliminados,'this.ArchivosEliminados--2');
      
    }



      // *************Ventanas modales
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
