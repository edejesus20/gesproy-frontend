import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI, SeedbedStudentI } from 'src/app/models/institution/seedbed';
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
const translate = require('translate');
import *as moment from 'moment';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { LineProgramGroupI } from 'src/app/models/institution/program';
import { StudentI } from 'src/app/models/user/student';
@Component({
  selector: 'app-delete_semilleros',
  templateUrl: './delete_semilleros.component.html',
  styleUrls: ['./delete_semilleros.component.css']
})
export class Delete_semillerosComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public seedbeds: any;
  public mostrarDialogo:boolean=false;
  public mostrarFacultad:boolean=false;
  public mostrarHeadquarterProgram:boolean=false;
  public mostrarlineasProgram:boolean=false;
  public FacultadHeadquarterProgram:any[]=[]
  public mostrar2:boolean=false;
  public algo:number[]=[0];
  public mostrar1:boolean=false;
  public algo1:number[]=[0];
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public form: FormGroup = this.formBuilder.group({});
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
public mostrarTeacher:boolean=false
public students:any[] =[]
public lines1:any[] =[]
public Students:any[] =[]
private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private GroupId:number = 0
public bandera:boolean=false
public construccion:string='assets/construccion.jpg'
public Valorconstruccion:boolean=false
  constructor(
    private seedbedService:SeedbedService,
    private formBuilder: FormBuilder,
    private teacherService:TeacherService,
    private messageService:MessageService,
    private headquarterService:HeadquarterService,
    private facultyService: FacultyService,
    private groupService:GroupService,
    private router: Router,
    private lineService: LineService,
    private studentService:StudentService,
    private programService:ProgramService
    ) { }
  ngOnInit(): void {
    this.Valorconstruccion=false

    this.buildForm();
    this.getAllteachers()
    this.geFacultad() 
    // this.getstudents()
  }
 getstudents(id:number) {
   this.studentService.OneAddStudentsSemilleros(id).subscribe(
      (ApiEstudiante) => {
        // console.log(ApiEstudiante.students)
        for (const key of ApiEstudiante.students) {
          this.students.push(key)
          //  =  facultiesFromApi.students;
         }
        // this.students =  facultiesFromApi.students;
      }, error => console.error(error));
  }
getstudents2() {
  this.studentService.AddStudentsSemilleros().subscribe(
     (ApiSemillero) => {
       // console.log(ApiSemillero.students)
       for (const key of ApiSemillero.students) {
        this.students.push(key)
        //  =  facultiesFromApi.students;
       }
       
     }, error => console.error(error));
 }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
      this.facultys=teachersA.facultys
    }, error => console.error(error))
  }
  private getAllteachers(selectId?: number) {
    this.teacherService.getList().subscribe(
      (facultiesFromApi) => {
        // console.log(facultiesFromApi.teachers)
        this.teachers = facultiesFromApi.teachers;
      }, error => console.error(error));
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      creation_date:['', [Validators.required]],
      // approval_date:['', [Validators.required]],
      // resolution:['', [Validators.required]],
      // article:['', [Validators.required]],
      name: [''],
      TeacherId: [''],
      ObjetivoGeneral: [''],
      ObjetivosEspecificos: [''],
      Mision: [''],
      Vision: [''],
      Facultad: [''],
      estrategias: [''],
      HeadquarterProgramId: [''],
      GroupId:[''],
      lines: this.formBuilder.array([this.formBuilder.group({LineId:['']})]),
      Students: this.formBuilder.array([this.formBuilder.group({
        date_firt:[''],
        date_end:[''],
        StudentId:[''],
        Horas:['']
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
      // console.log(this.form.value.HeadquarterProgramId,'this.form.value.HeadquarterProgramId')
      this.groupService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
       this.groups= rolesFromApi.groups
        this.mostrarHeadquarterProgram=true

      })
    }
  }
  public getLineProgramGroup(){
    if(this.form.value.GroupId != ''){
    //  console.log(this.form.value.GroupId)
    
     if(this.form.value.GroupId.LineProgramGroups.length >0){
      this.lines=[]
       for (let key of this.form.value.GroupId.LineProgramGroups) {
        this.lineService.getItem(key.LineProgram.LineId).subscribe((algo)=>{
          this.lines.push(algo.line)
        })
         
       }
       this.mostrarlineasProgram=true
       
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
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.ngOnInit()
    this.displayMaximizable2 = false
    this.bandera=false
    this.HeadquarterProgramId = 0
     this.TeacherId = 0
     this.GroupId = 0
     this.lines1=[]
     this.Students=[]

    //console.log(event)
    this.vaciar()
    //console.log(event)
  }

  private vaciar(){
    this.form.reset()
    this.getStudents.reset()
    this.getStudents.clear()
    this.getlines.reset()
    this.getlines.clear()
    this.form.controls['creation_date'].setValue('')
    this.form.controls['TeacherId'].setValue('')
    this.form.controls['ObjetivoGeneral'].setValue('')
    this.form.controls['ObjetivosEspecificos'].setValue('')
    this.form.controls['Mision'].setValue('')
    this.form.controls['Vision'].setValue('')
    this.form.controls['Facultad'].setValue('')
    this.form.controls['estrategias'].setValue('')
    this.form.controls['HeadquarterProgramId'].setValue('')
    this.form.controls['GroupId'].setValue('')
    let control = <FormArray>this.form.controls['Students']
    control.push(this.formBuilder.group({
      id:0,
        StudentId:['', [Validators.required]],
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
      Horas:['',[Validators.required]]
    }))
    let control1 = <FormArray>this.form.controls['lines']
    control1.push(this.formBuilder.group({
      id:0,
      LineId:['', [Validators.required]]}))//nuevo input
  
  }
  public onSubmit(): void {
    let formValue: any = this.form.value;
    formValue.TeacherId=this.form.value.TeacherId.id
    formValue.GroupId=this.form.value.GroupId.id
    formValue.HeadquarterProgramId=this.form.value.HeadquarterProgramId.id

    if(this.HeadquarterProgramId == 0 && this.TeacherId == 0 && this.GroupId == 0){
        this.HeadquarterProgramId= formValue.HeadquarterProgramId
        this.TeacherId= formValue.TeacherId
        this.GroupId= formValue.GroupId
      }else{
        formValue.TeacherId=this.TeacherId
        formValue.GroupId=this.GroupId
        formValue.HeadquarterProgramId=this.HeadquarterProgramId
      }
    
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
    if(this.Students.length == 0 ){
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
    if(
      formValue.id !=undefined &&
      formValue.TeacherId != 0 && formValue.name != "" &&
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
      this.bandera=true

      this.seedbedService.deleteItem(formValue.id).subscribe(
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
            detail: 'Semillero Eliminado con exito'});
            }
            date = new Date(date.getTime() - 1000);
            if( minutes == '00' && seconds == '01' ) {
              this.ngOnInit()
              this.volver(new Event(''))
             this.bandera=false
              // this.router.navigateByUrl('/Procedimientos/mostrar_seedbeds');
              clearInterval(interval); 
            }
      }, 1000);
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
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar2=true
  }
  removelines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({LineId:['', [Validators.required]],Horas:['', [Validators.required]]}))//nuevo input

    }
  }

  getOneCntAccount(id:number) {
    this.seedbedService.getItem(id).subscribe((cnt_groupFromApi) => {
        
      if(cnt_groupFromApi.seedbed.id != undefined){
        // console.log(cnt_groupFromApi.seedbed);
        this.form.controls['id'].setValue(cnt_groupFromApi.seedbed.id)
        this.form.controls['name'].setValue(cnt_groupFromApi.seedbed.name)
        let creation_date=moment(cnt_groupFromApi.seedbed.creation_date,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")

        this.form.controls['creation_date'].setValue(creation_date)
        this.form.controls['ObjetivoGeneral'].setValue(cnt_groupFromApi.seedbed.ObjetivoGeneral)
        this.form.controls['ObjetivosEspecificos'].setValue(cnt_groupFromApi.seedbed.ObjetivosEspecificos)
        this.form.controls['Mision'].setValue(cnt_groupFromApi.seedbed.Mision)
        this.form.controls['Vision'].setValue(cnt_groupFromApi.seedbed.Vision)
        this.form.controls['estrategias'].setValue(cnt_groupFromApi.seedbed.estrategias)
        if(cnt_groupFromApi.seedbed.HeadquarterProgram?.ProgramId != undefined){
          this.programService.getItem(cnt_groupFromApi.seedbed.HeadquarterProgram?.ProgramId).subscribe(algo=>{
            if(algo.program.id != undefined && algo.program.FacultyId != undefined){

              for (const clave of this.facultys) {
                if(algo.program.FacultyId == clave.id){
                  this.form.controls['Facultad'].setValue(clave)
                  // console.log(clave,'algo.program.FacultyId')
                  // console.log(this.form.controls['Facultad'],'this.form.controls[Facultad]')
                }
                
              }

              // this.facultyService.getItem(algo.program.FacultyId).subscribe(key=>{
              //   this.form.controls['Facultad'].setValue(key.faculty)
                this.headquarterService.getOneFacultadHeadquarterProgram(cnt_groupFromApi.seedbed.HeadquarterProgramId).subscribe(key1=>{
                  if(key1.FacultadHeadquarterProgram != undefined){
                    this.form.controls['HeadquarterProgramId'].setValue(key1.FacultadHeadquarterProgram[0])
                  this.groupService.getItemOneHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe(key2=>{
                    if(key2.group.id != undefined){
                      this.form.controls['GroupId'].setValue(key2.group)

                    }
                    if(cnt_groupFromApi.seedbed.GroupLineSeedbeds?.length != undefined){
                      //  console.log(this.form.value.GroupId)
                      
                       if(cnt_groupFromApi.seedbed.GroupLineSeedbeds.length >0){
                        this.lines=[]
                         for (let key of cnt_groupFromApi.seedbed.GroupLineSeedbeds) {
                          if(key.GroupLine && key.status == true)
                          this.lineService.getItem(key.GroupLine.LineId).subscribe((algo)=>{
                            this.lines.push(algo.line)
                          })
                           
                         }
                         this.mostrarlineasProgram=true
                         
                       }
                      }
                    if(cnt_groupFromApi.seedbed.Group?.LineProgramGroups != undefined && cnt_groupFromApi.seedbed.Group?.LineProgramGroups.length >0){
                      this.agregarLine(cnt_groupFromApi.seedbed.Group?.LineProgramGroups)
            
                    }
                    this.SelectFacultad()
                    this.getHeadquarterProgram()
                    
                  
                  })
                  }
                  
                })
              // })
            }
          })

        }
        



       if(cnt_groupFromApi.seedbed.Teacher != undefined)
       this.teacherService.getItem(cnt_groupFromApi.seedbed.TeacherId).subscribe(item=>{
        this.form.controls['TeacherId'].setValue(item.teacher)
        this.SelectTeacher()
       })
       this.getstudents(cnt_groupFromApi.seedbed.id)
       this.getstudents2()
       if(cnt_groupFromApi.seedbed.SeedbedStudents != undefined && cnt_groupFromApi.seedbed.SeedbedStudents.length >0){
         this.agregarEstudiantes(cnt_groupFromApi.seedbed.SeedbedStudents)
       }
       
     
      }
      // console.log(cnt_groupFromApi.seedbed,'seedbed')
      // console.log(this.form.value,'formulario')

      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }
  agregarEstudiantes(SeedbedStudents:SeedbedStudentI[]) {
    if(SeedbedStudents.length){
      for (let key of SeedbedStudents) {
        if(key.Student != undefined && key.Student?.id != undefined) {          
          let control = <FormArray>this.form.controls['Students']
          // this.lineService.getItem(key.LineProgram.LineId).subscribe((algo)=>{
        let date_firt=moment(key.date_firt,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
        let date_end=moment(key.date_end,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
          this.studentService.OneAddStudentsSemilleros2(key.Student.id).subscribe((student)=>{
            control.push(this.formBuilder.group({
              StudentId:[student.students[0], [Validators.required]],
              date_firt:[date_firt,[Validators.required]],
              date_end:[date_end,[Validators.required]],
              Horas:[key.hours,[Validators.required]]

            }))
          })
          
          // })
        }
      }
      this.mostrar1= true
      let control = <FormArray>this.form.controls['Students']
      control.removeAt(0)
      // console.log(control,'control')
      // console.log(this.lines,'lines')
    }
  }
  agregarLine(LineProgramGroups: LineProgramGroupI[]) {
    if(LineProgramGroups.length){
      for (let key of LineProgramGroups) {
        if(key.id != undefined && key.LineProgram?.LineId != undefined) {          
          let control = <FormArray>this.form.controls['lines']
          this.lineService.getItem(key.LineProgram.LineId).subscribe((algo)=>{
            control.push(this.formBuilder.group({
              LineId:[algo.line, [Validators.required]],
            }))
          })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['lines']
      control.removeAt(0)
      // console.log(control,'control')
      // console.log(this.lines,'lines')
    }
  }



  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }



}
