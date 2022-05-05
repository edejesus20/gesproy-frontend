import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { TeacherI } from 'src/app/models/user/teacher';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { MessageService } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { GroupI } from 'src/app/models/institution/group';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateTeacherComponent } from 'src/app/main/usuarios/components/Docentes/create-teacher/create-teacher.component';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';
const translate = require('translate');

@Component({
  selector: 'app-create_semilleros',
  templateUrl: './create_semilleros.component.html',
  styleUrls: ['./create_semilleros.component.css'],
  providers: [DialogService]
})
export class Create_semillerosComponent implements OnInit {
  public seedbeds: any;
  public mostrarDialogo:boolean=false;
  public mostrarFacultad:boolean=false;
  public mostrarHeadquarterProgram:boolean=false;
  public mostrarlineasProgram:boolean=false;
  public FacultadHeadquarterProgram:any[]=[]
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public mostrar1:boolean=false;
  public algo1:number[]=[0];

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public form: FormGroup = this.formBuilder.group({});
  public teachers: TeacherI[] =[]
  public facultys: FacultyI[] =[]
  public groups: GroupI[]=[]
  public lines: LineI[] =[]
  public form2:TeacherI= {
    id:0,   
     UserId: 0,
    ScaleId: 0,
    hours_of_dedication:'',
    ColcienciaCategoryId: 0,
    User:undefined, 
    Scale:undefined, 
    Group:undefined, 
    ColcienciaCategory:undefined, 
    TrainingTeacher:undefined, 
    Trainings:undefined, 
    LinkTypeId:0,
    LinkType:undefined
}
public mostrarTeacher:boolean=false
public students:any[] =[]
public lines1:any[] =[]
public Students:any[] =[]
private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private GroupId:number = 0
public ref1:any;

  constructor(
    public dialogService: DialogService,
    private seedbedService:SeedbedService,
    private formBuilder: FormBuilder,
    private teacherService:TeacherService,
    private messageService:MessageService,
    private headquarterService:HeadquarterService,
    private facultyService: FacultyService,
    private groupService:GroupService,
    private router: Router,
    private lineService: LineService,
    private studentService:StudentService
    ) { }
  ngOnInit(): void {
    this.buildForm();
    this.getAllteachers()
    this.geFacultad() 
    this.getstudents()
  }
 getstudents() {
   this.studentService.AddStudentsSemilleros().subscribe(
      (facultiesFromApi) => {
        // console.log(facultiesFromApi.students)
        this.students =  facultiesFromApi.students;
      }, error => console.error(error));
  }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
      this.facultys=teachersA.facultys
    }, error => console.error(error))
  }
  private getAllteachers(selectId?: number) {
    this.teacherService.AddTeacherSemilleros().subscribe(
      (facultiesFromApi) => {
        // for (const key of facultiesFromApi.teachers) {
        //   this.teachers.push(key)
        // }
        
        this.teachers = facultiesFromApi.teachers;
      }, error => console.error(error));
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      creation_date:['', [Validators.required]],
      // approval_date:['', [Validators.required]],
      // resolution:['', [Validators.required]],
      // article:['', [Validators.required]],
      name: ['', [Validators.required]],
      TeacherId: ['', [Validators.required]],
      ObjetivoGeneral: ['', [Validators.required]],
      ObjetivosEspecificos: ['', [Validators.required]],
      Mision: ['', [Validators.required]],
      Vision: ['', [Validators.required]],
      Facultad: ['', [Validators.required]],
      estrategias: ['', [Validators.required]],
      HeadquarterProgramId: ['', [Validators.required]],
      GroupId:['', [Validators.required]],
      lines: this.formBuilder.array([this.formBuilder.group({LineId:['', [Validators.required]]})]),
      Students: this.formBuilder.array([this.formBuilder.group({
        date_firt:['',[Validators.required]],
        date_end:['',[Validators.required]],
        StudentId:['',[Validators.required]],
        Horas:['',[Validators.required]]
      })]),
    });
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
      // console.log(this.FacultadHeadquarterProgram)
    }, error => console.error(error));
  }

  public getHeadquarterProgram(){
    if(this.form.value.HeadquarterProgramId != ''){
      this.groupService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
       this.groups= rolesFromApi.groups
        this.mostrarHeadquarterProgram=true

      })
    }
  }
  public getLineProgramGroup(){
    if(this.form.value.GroupId != ''){
     console.log(this.form.value.GroupId)
     this.lines=[]
     if(this.form.value.GroupId.LineProgramGroups.length >0){
       for (let key of this.form.value.GroupId.LineProgramGroups) {
        this.lineService.getItem(key.LineProgram.LineId).subscribe((algo)=>{
          this.lines.push(algo.line)
        })
         
       }
       this.mostrarlineasProgram=true
       console.log(this.lines)
     }
    }
  }
  public SelectTeacher(){
    if(this.form.value.TeacherId != ''){
      this.getOneTeachers(this.form.value.TeacherId.id)
      this.mostrarTeacher=true
    }
  }
  getOneTeachers(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
      if(cnt_groupFromApi.teacher.id != undefined){
          this.form2=cnt_groupFromApi.teacher
      }
    }, error => console.error(error));
  }



  public onSubmit(): void {
    let formValue: SeedbedI = this.form.value;
    formValue.TeacherId=this.form.value.TeacherId.TeacherId
    formValue.GroupId=this.form.value.GroupId.id
    formValue.HeadquarterProgramId=this.form.value.HeadquarterProgramId.id

    if(this.HeadquarterProgramId == 0 &&
      this.TeacherId == 0 &&
      this.GroupId == 0
      ){
        this.HeadquarterProgramId= formValue.HeadquarterProgramId
        this.TeacherId= formValue.TeacherId
        this.GroupId= formValue.GroupId
      }else{
        formValue.TeacherId=this.TeacherId
        formValue.GroupId=this.GroupId
        formValue.HeadquarterProgramId=this.HeadquarterProgramId
      }
    
    
    
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
    if(this.Students.length == 0 || this.Students == []){
      let control = <FormArray>this.form.controls['Students']
      for (const key of control.value) {
        key.StudentId=key.StudentId.StudentId 
        this.Students.push({
          StudentId:key.StudentId,
          Horas:key.Horas,
          date_firt:key.date_firt,
          date_end:key.date_end
        })
      }
      formValue.Students = this.form.value.Students
      // console.log('aqui')
    }else{
      formValue.Students = this.Students
    }
    // console.log(formValue)
    if(formValue.TeacherId != 0 && formValue.name != "" &&
    formValue.creation_date != "" && 
    // formValue.approval_date != "" && 
    // formValue.resolution != "" && 
    // formValue.article != "" && 
    formValue.ObjetivoGeneral != "" && 
    formValue.ObjetivosEspecificos != "" && 
    formValue.Mision != "" && 
    formValue.Vision != "" && 
    formValue.estrategias != "" && 
    formValue.HeadquarterProgramId != ( 0 || undefined)&&
    formValue.GroupId != ( 0 || undefined)

    ){
      this.seedbedService.createItem(formValue).subscribe(
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
            detail: 'Registro de Semillero Creado con exito'});
            }
            date = new Date(date.getTime() - 1000);
            if( minutes == '00' && seconds == '01' ) {
              this.router.navigateByUrl('/Procedimientos/mostrar_seedbeds');
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
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
      Horas:['',[Validators.required]]
    }))
    }
    if(control.length >= 1 && this.mostrar1 == true){
      control.push(this.formBuilder.group({  StudentId:['', [Validators.required]],
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
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
     control.push(this.formBuilder.group({  StudentId:['', [Validators.required]],
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
      Horas:['',[Validators.required]]
    }))
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
      control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar=true
  }
  removelines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
     control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input

    }
  }
  addTeacher(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(CreateTeacherComponent, {
      width: '70%',
      // height: '50%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Docente Creado', detail: person.name,life: 2000});
      this.getAllteachers()

        }
  });
  }
  addStudent(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(CreateStudentComponent, {
      width: '70%',
      // height: '50%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Estudiante Creado', detail: person.name,life: 2000});
      this.getstudents()

        }
  });
  }
}
