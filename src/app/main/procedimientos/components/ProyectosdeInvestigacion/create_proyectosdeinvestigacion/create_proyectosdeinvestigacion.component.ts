import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/core/services/Procedimientos/projet.service';
import { ProjetI } from 'src/app/models/projet/projet';
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

@Component({
  selector: 'app-create_proyectosdeinvestigacion',
  templateUrl: './create_proyectosdeinvestigacion.component.html',
  styleUrls: ['./create_proyectosdeinvestigacion.component.css']
})
export class Create_proyectosdeinvestigacionComponent implements OnInit {

  items: MenuItem[]=[]
    
    activeIndex: number = 0;

  public seedbeds: any;
  public mostrarDialogo:boolean=false;
  public mostrarFacultad:boolean=false;
  public mostrarHeadquarterProgram:boolean=false;
  public mostrarlineasProgram:boolean=false;
  public FacultadHeadquarterProgram:any[]=[]
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public mostrar1:boolean=true;
  public algo1:number[]=[0];
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public Dialog:boolean =false
  public bandera:boolean=false
 public form:FormGroup= this.formBuilder.group({
  TeacherId: ['', [Validators.required]],
  hours_dedicated: ['', [Validators.required]],
  Facultad: [''],
  HeadquarterProgramId: ['', [Validators.required]],
  GroupId:[''],
  title: ['', [Validators.required]],
  LineId: ['', [Validators.required]],
  ThematicId:['', [Validators.required]],
  duration:['', [Validators.required]],
  place_of_execution:['', [Validators.required]],
  kind_of_investigation:['', [Validators.required]],
  project_modality:['', [Validators.required]],

  // lines: this.formBuilder.array([this.formBuilder.group({LineId:['', [Validators.required]]})]),
  Students: this.formBuilder.array([this.formBuilder.group({
    StudentId:['',[Validators.required]],
    Horas:['',[Validators.required]]
  })]),
});
  
  public teachers: TeacherI[] =[]
  public facultys: FacultyI[] =[]
  public groups: GroupI[]=[]
  public lines: LineI[] =[]
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
public Grupo:any | null=null
public mostrarTeacher:boolean=false
public students:any[] =[]
public lines1:any[] =[]
public Students:any[] =[]
private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private GroupId:number = 0
public ref1:any;
public kind_of_investigations:any[] =[
  { 
    id:1,
    value:'BÁSICA'
  },
  { 
    id:2,
    value:'APLICADA'
  },
  { 
    id:3,
    value:'OTRA '
  }
]
public project_modalitys:any[] =[
  { 
    id:1,
    value:'INVESTIGACIÓN INTERNO'
  },
  { 
    id:2,
    value:'INVESTIGACIÓN CON PARTICIPACIÓN EXTERNA'
  },
  { 
    id:3,
    value:'PROYECTOS INSTITUCIONALES '
  }
]
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false

  public thematics: ThematicI[]=[];
  public projetTypes:ProjetTypeI[] =[]
  public lineValue:boolean=false
  constructor(
    private projetService:ProjetService,
    private projetTypeService:ProjetTypeService,
    private formBuilder: FormBuilder,
    private location: Location,

    public dialogService: DialogService,
    private seedbedService:SeedbedService,
    private teacherService:TeacherService,
    private messageService:MessageService,
    private headquarterService:HeadquarterService,
    private facultyService: FacultyService,
    private groupService:GroupService,
    private router: Router,
    private lineService: LineService,
    private studentService:StudentService
    // private snackBar: MatSnackBar,
    ) { }
  ngOnInit(): void {

    this.items = [{
      label: 'Docente Responsable',
      command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
  },
  {
      label: 'Datos Basicos',
      command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
      }
  },
  {
      label: 'Colaboladores',
      command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
      }
  },
  {
      label: 'Datos del Proyecto',
      command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
      }
  }
  
];

    this.Valorconstruccion=false

    this.buildForm();
    this.getAllProjetTypeId()
    this.getAllteachers()
    this.geFacultad() 
    this.getstudents()
    this.getGrupos()
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
      LineId: ['', [Validators.required]],
      ThematicId:['', [Validators.required]],
      duration:['', [Validators.required]],
      place_of_execution:['', [Validators.required]],
      kind_of_investigation:['', [Validators.required]],
      project_modality:['', [Validators.required]],
      Students: this.formBuilder.array([this.formBuilder.group({
        StudentId:['',[Validators.required]],
        Horas:['',[Validators.required]]
      })]),
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
  get name() { return this.form.get('name'); }
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
          if(cnt_groupFromApi.teacher.GroupLineTeachers?.length != undefined
            && cnt_groupFromApi.teacher.GroupLineTeachers?.length > 0){

              for (const clave of cnt_groupFromApi.teacher.GroupLineTeachers) {
                if(clave.GroupLine?.GroupId && clave.status == true){
                  Group=clave.GroupLine?.GroupId
                }
              }

          }
          for (const key of this.groups) {

            if(Group != null && parseInt(Group) == key.id){
              this.Grupo=key
              this.form.controls['GroupId'].setValue(key)
              this.getLineProgramGroup()

            
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

  public getLineProgramGroup(){
    if(this.form.value.GroupId != ''){
    //  console.log(this.form.value.GroupId)
     this.lines=[]
     if(this.form.value.GroupId.GroupLines.length >0){
       for (let key of this.form.value.GroupId.GroupLines) {
        this.lineService.getItem(key.LineId).subscribe((algo)=>{
          // for (let key of facultiesFromApi.teachers) {
            algo.line.name =  algo.line.name.charAt(0).toUpperCase() +  algo.line.name.slice(1);
          // }
          this.lines.push(algo.line)
        })
         
       }
       this.mostrarlineasProgram=true
      //  console.log(this.lines)
     }
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

  getstudents() {
    this.studentService.AddStudentsSemilleros().subscribe(
       (facultiesFromApi) => {
         for (let key of facultiesFromApi.students) {
           key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
         }
         // console.log(facultiesFromApi.students)
         this.students =  facultiesFromApi.students;
       }, error => console.error(error));
   }
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
         }
         this.teachers = facultiesFromApi.teachers;
       }, error => console.error(error));
   }

}
