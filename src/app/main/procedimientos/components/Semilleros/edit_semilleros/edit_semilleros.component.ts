import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI, SeedbedLineI, SeedbedStudentI } from 'src/app/models/institution/seedbed';
import { TeacherI } from 'src/app/models/user/teacher';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { MenuItem, MessageService } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { GroupI, GroupLineSeedbedI } from 'src/app/models/institution/group';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
const translate = require('translate');
import *as moment from 'moment';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { LineProgramGroupI } from 'src/app/models/institution/program';
import { StudentI } from 'src/app/models/user/student';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateTeacherComponent } from 'src/app/main/usuarios/components/Docentes/create-teacher/create-teacher.component';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit_semilleros',
  templateUrl: './edit_semilleros.component.html',
  styleUrls: ['./edit_semilleros.component.css'],
  providers: [DialogService]
})
export class Edit_semillerosComponent implements OnInit {
  public mostrar:number=1;
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
  public teachers: any[] =[]
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
public bandera:boolean=false

public mostrarTeacher:boolean=false

public lines1:any[] =[]
public students:any[] =[]
public Students:any[] =[]
private HeadquarterProgramId:number = 0
private TeacherId:number = 0
private GroupId:number = 0
public ref1:any;
public construccion:string='assets/construccion.jpg'
public Valorconstruccion:boolean=false

public Grupo:any | null=null
public deletelines:any[] =[]
public  deleteStudents:any[] =[]

API_URI = environment.API_URI;
BanderaAnexo:boolean=false
mostrarAnexo:string | null = null
items: MenuItem[]=[]
    
activeIndex: number = 0;
AnexoAdjuntado:any | null = null
filteredCountries2:any[] =[]
thematics:any[] =[]
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
    private studentService:StudentService,
    private programService:ProgramService
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

    this.buildForm();
    this.getAllteachers()
    this.geFacultad() 
    // this.getstudents()
    this.getGrupos()
  }
  getGrupos() {
    this.groupService.getList().subscribe((rolesFromApi) => {
      this.groups= rolesFromApi.groups
      //  this.mostrarHeadquarterProgram=true
       // this.getAllteachers(this.form.value.HeadquarterProgramId.id)

     })
  }
 getstudents(id:number) {
  // this.students=[]
   this.studentService.OneAddStudentsSemilleros(id).subscribe(
      (ApiEstudiante) => {
        // console.log(ApiEstudiante.students)
        for (let key of ApiEstudiante.students) {
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
          this.students.push(key)
         }
        // this.students =  facultiesFromApi.students;
      }, error => console.error(error));
  }
getstudents2() {
  // this.students=[]
  this.studentService.AddStudentsSemilleros().subscribe(
     (ApiSemillero) => {
       // console.log(ApiSemillero.students)
       for (let key of ApiSemillero.students) {
        key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
        this.students.push(key)
        //  =  facultiesFromApi.students;
       }
       console.log(this.students)
       
     }, error => console.error(error));
 }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
    //   for (let key of teachersA.facultys) {
    //     key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
    //   this.students.push(key)
    //  }
     for (let key of teachersA.facultys) {
      key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
    }
    // this.facultys=teachersA.facultys
      this.facultys=teachersA.facultys
      // console.log(teachersA.facultys,'teachersA.facultys')

    }, error => console.error(error))
  }
  private getAllteachers() {
    // this.teacherService.AddTeacherSemilleros(id).subscribe(
    //   (facultiesFromApi) => {
    //     for (const key of facultiesFromApi.teachers) {
    //       this.teachers.push(key)
    //     }
        
    //     // this.teachers = facultiesFromApi.teachers;
    //   }, error => console.error(error));
    this.teacherService.DocentesTeacherSemilleros().subscribe(
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
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      creation_date:['', [Validators.required]],
      // approval_date:['', [Validators.required]],
      // resolution:['', [Validators.required]],
      // article:['', [Validators.required]],
      name: ['', [Validators.required]],
      TeacherId: ['', [Validators.required]],
      ObjetivoGeneral: [''],
      ObjetivosEspecificos: [''],
      Mision: [''],
      Vision: [''],
      Facultad: [''],
      estrategias: [''],
      HeadquarterProgramId: [''],
      GroupId:[''],

      Anexo: [''],
      lines: this.formBuilder.array([this.formBuilder.group({
        id:0,
        LineId:['', [Validators.required]], 
        ThematicId:['', [Validators.required]],
      })]),

      Students: this.formBuilder.array([this.formBuilder.group({
      id:0,
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
    // this.headquarterService.getFacultadHeadquarterProgramId(id).subscribe((rolesFromApi) => {
    //   this.FacultadHeadquarterProgram = rolesFromApi.FacultadHeadquarterProgram;
    //   // console.log(this.FacultadHeadquarterProgram)
    // }, error => console.error(error));
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
      // console.log(this.form.value.HeadquarterProgramId,'this.form.value.HeadquarterProgramId')
      this.groupService.getItemHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe((rolesFromApi) => {
       this.groups= rolesFromApi.groups
        this.mostrarHeadquarterProgram=true
        // this.getAllteachers(this.form.value.HeadquarterProgramId.id)

      })
    }
  }
  public getLineProgramGroup(){
    if(this.form.value.GroupId != ''){
      console.log(this.form.value.GroupId,'GroupId')
      this.lines=[]
      if(this.form.value.GroupId.GroupLines.length >0){
        for (let key of this.form.value.GroupId.GroupLines) {
          if(key.status == true){
         this.lineService.getItem(key.LineId).subscribe((algo)=>{
           // for (let key of facultiesFromApi.teachers) {
             algo.line.name =  algo.line.name.charAt(0).toUpperCase() +  algo.line.name.slice(1);
           // }
           this.lines.push(algo.line)
         })
        }
      }
        this.mostrarlineasProgram=true
    }
    }
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
        console.log(cnt_groupFromApi.teacher)
          this.form2=cnt_groupFromApi.teacher
          let Group :any | null= null 
          if(cnt_groupFromApi.teacher.GroupTeachers?.length != undefined
            && cnt_groupFromApi.teacher.GroupTeachers?.length > 0){

              for (const clave of cnt_groupFromApi.teacher.GroupTeachers) {
                if(clave.Group?.id && clave.status == true){
                  Group=clave.Group?.id
                }
              }

          }

          
          for (const key of this.groups) {

            if(Group != null && parseInt(Group) == key.id){
              this.Grupo=key
              this.form.controls['GroupId'].setValue(key)
              this.getLineProgramGroup()

            
              console.log(this.Grupo,'this.Grupo')
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
    this.students=[]
    this.lines=[]
    this.Grupo=null
    this.deletelines =[]
    this.deleteStudents =[]
    this.teachers=[]
    this.vaciar()
    //console.log(event)
  }

  private vaciar(){
    this.AnexoAdjuntado=null
    this.lines=[]
    this.filteredCountries2=[]
    this.thematics=[]
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
  this.form.controls['Anexo'].setValue('')

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
      LineId:['', [Validators.required]], 
      ThematicId:['', [Validators.required]],
    }))//nuevo input
  
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

  public onSubmit(): void {
    let formValue: any = this.form.value;
    formValue.deletelines=this.deletelines
    formValue.deleteStudents=this.deleteStudents
    formValue.TeacherId=this.form.value.TeacherId.TeacherId
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
        id: key.id,
         LineId:key.LineId,
         ThematicId:key.ThematicId
        })
      }
      formValue.lines = this.lines1
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

    if(this.form.value.Students[0].Horas == ''){
      // this.form.value.trainingTeacher=[]
      formValue.Students=[]
    }
    if(this.form.value.lines[0].LineId == ''){
      // this.form.value.Workexperiences=[]
      formValue.lines=[]

    }
    // console.log(formValue)
    if(
      formValue.id !=undefined &&
      formValue.TeacherId != 0 && formValue.name != "" &&
    formValue.creation_date != "" && 
   
    formValue.HeadquarterProgramId != ( 0 || undefined)&&
    formValue.GroupId != ( 0 || undefined)

    ){
    this.bandera=true

      this.seedbedService.updateItem(formValue.id, formValue).subscribe(
        (algo) => {

          if(algo.seedbed.id){
            if(this.AnexoAdjuntado != null){
              let data ={
                SeedbedId:algo.seedbed.id,
                url:'',
                file:this.AnexoAdjuntado
                }
    
                this.seedbedService.Anexo(data.SeedbedId.toString(),data.url.
                toString(),data.file).subscribe(result=>{
                  if(result){
                    this.finalizar()
                  }
                }, error => console.error(error))
          }else{
            // Bandera=true
            this.finalizar()
          }
          }else{

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
    // console.log(minutes, seconds);
    if( seconds == '03') {
    this.messageService.add({severity:'success', summary: 'Success', 
    detail: 'Semillero Actualizado con exito'});
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
      id:0,
      StudentId:['', [Validators.required]],
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
      Horas:['',[Validators.required]]

    }))
    }
    if(control.length >= 1 && this.mostrar1 == true){
      control.push(this.formBuilder.group({  
      id:0,
      StudentId:['', [Validators.required]],
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
    this.deleteStudents.push(control.value[index])
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar1=false
     control.push(this.formBuilder.group({  
      id:0,
      StudentId:['', [Validators.required]],
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
      control.push(this.formBuilder.group({
      id:0,
      LineId:['', [Validators.required]],ThematicId:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({
      id:0,
      LineId:['', [Validators.required]],ThematicId:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar2=true
  }
  removelines(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['lines']//aceder al control
    this.deletelines.push(control.value[index])
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({
      id:0,
      LineId:['', [Validators.required]],ThematicId:['', [Validators.required]]}))//nuevo input

    }
  }

  getOneCntAccount(id:number) {
    this.seedbedService.getItem(id).subscribe((cnt_groupFromApi) => {
        
      if(cnt_groupFromApi.seedbed.id != undefined){
        console.log(cnt_groupFromApi.seedbed);
        this.form.controls['id'].setValue(cnt_groupFromApi.seedbed.id)
        this.form.controls['name'].setValue(cnt_groupFromApi.seedbed.name)
        let creation_date=moment(cnt_groupFromApi.seedbed.creation_date,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")

        this.form.controls['creation_date'].setValue(creation_date)

        if(cnt_groupFromApi.seedbed.DetailSeedbed != undefined){
          this.form.controls['ObjetivoGeneral'].setValue(cnt_groupFromApi.seedbed.DetailSeedbed.ObjetivoGeneral)
          this.form.controls['ObjetivosEspecificos'].setValue(cnt_groupFromApi.seedbed.DetailSeedbed.ObjetivosEspecificos)
          this.form.controls['Mision'].setValue(cnt_groupFromApi.seedbed.DetailSeedbed.Mision)
          this.form.controls['Vision'].setValue(cnt_groupFromApi.seedbed.DetailSeedbed.Vision)
          this.form.controls['estrategias'].setValue(cnt_groupFromApi.seedbed.DetailSeedbed.estrategias)

          }


        if(cnt_groupFromApi.seedbed.Anexo != undefined && cnt_groupFromApi.seedbed.Anexo != null){
          this.mostrarAnexo=cnt_groupFromApi.seedbed.Anexo
          this.BanderaAnexo=false
  
        }else{
          this.BanderaAnexo=true
          this.mostrarAnexo=null
        }

        if(cnt_groupFromApi.seedbed.Teacher != undefined){
          this.teacherService.OneAddTeacherSemilleros(cnt_groupFromApi.seedbed.id).subscribe(item=>{
            // this.teachers=[]
            if(item.teachers[0].avatar != undefined){
              var avatar = item.teachers[0].avatar;
              var n = avatar.search("assets");
              if(n == -1){
                item.teachers[0].avatar=this.API_URI+item.teachers[0].avatar
                // console.log("avatar",key.avatar)
              }else{
                item.teachers[0].avatar= item.teachers[0].avatar
              }
    
            } 
            this.teachers.push(item.teachers[0]) 
            // this.getAllteachers()
            this.form.controls['TeacherId'].setValue(item.teachers[0])
            if(this.form.value.TeacherId != ''){
            
              this.teacherService.getItem(this.form.value.TeacherId.TeacherId).subscribe((Apiteacher) => {
                if(Apiteacher.teacher.id != undefined){
                    this.form2=Apiteacher.teacher

                    let Group :any | null= null 
                    if(Apiteacher.teacher.GroupTeachers?.length != undefined
                      && Apiteacher.teacher.GroupTeachers?.length > 0){
          
                        for (const clave of Apiteacher.teacher.GroupTeachers) {
                          if(clave.Group?.id && clave.status == true){
                            Group=clave.Group?.id
                          }
                        }
          
                    }
          
                    for (const key of this.groups) {
          
                      if(Group != null && parseInt(Group) == key.id){
                        this.Grupo=key
                        this.form.controls['GroupId'].setValue(key)
                        // this.getLineProgramGroup()
                        // console.log(this.Grupo,'this.Grupo')
                      
                         if(this.form.value.GroupId != '' && cnt_groupFromApi.seedbed){
                          // console.log(this.form.value.GroupId,'GroupId')
                          this.lines=[]
                          let cont=0
                              if(this.Grupo.GroupLines.length >0){
                                for (let key of this.Grupo.GroupLines) {
                                 
                                // this.lineService.getItem(key.LineId).subscribe((algo)=>{
                                  // for (let key of facultiesFromApi.teachers) {
                                    key.Line.name =  key.Line.name.charAt(0).toUpperCase() +  key.Line.name.slice(1);
                                  // }
                                  this.lines.push(key.Line)
                        
                                 
                                // })
                                  // console.log(this.lines)
                                }
                                
                               
                                this.mostrarlineasProgram=true
                              //  console.log(this.lines)
                             
                              }
                          }
                      }
                      
                    }
                    if(this.Grupo.GroupLines.length){
                      if(cnt_groupFromApi.seedbed.SeedbedLines != undefined 
                        && cnt_groupFromApi.seedbed.SeedbedLines.length >0){
                        this.agregarLinea1(cnt_groupFromApi.seedbed.SeedbedLines)
              
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
              this.mostrarTeacher=true
            }
            
          
           })
         }

       


        // if(cnt_groupFromApi.seedbed.HeadquarterProgram?.Program != undefined){
        //   this.programService.getItem(cnt_groupFromApi.seedbed.HeadquarterProgram?.ProgramId).subscribe(algo=>{
        //     if(algo.program.id != undefined && algo.program.FacultyId != undefined){

        //       for (const clave of this.facultys) {
        //         if(algo.program.FacultyId == clave.id){
        //           this.form.controls['Facultad'].setValue(clave)
        //           // console.log(clave,'algo.program.FacultyId')
        //           // console.log(this.form.controls['Facultad'],'this.form.controls[Facultad]')
        //         }
                
        //       }
              
        //         this.headquarterService.getOneFacultadHeadquarterProgram(cnt_groupFromApi.seedbed.HeadquarterProgramId).subscribe(key1=>{
        //           if(key1.FacultadHeadquarterProgram != undefined){
        //             this.form.controls['HeadquarterProgramId'].setValue(key1.FacultadHeadquarterProgram[0])
        //           this.groupService.getItemOneHeadquarterProgram(this.form.value.HeadquarterProgramId.id).subscribe(key2=>{
        //             if(key2.group.id != undefined){
        //               this.form.controls['GroupId'].setValue(key2.group)

        //             }
        //             // this.getLineProgramGroup()
        //             // if(cnt_groupFromApi.seedbed.Group?.LineProgramGroups != undefined && cnt_groupFromApi.seedbed.Group?.LineProgramGroups.length >0){
        //             //   this.agregarLine(cnt_groupFromApi.seedbed.Group?.LineProgramGroups)
            
        //             // }
        //           })
        //           }
                  
        //         })
           
        //     }
        //   })

        // }
        
        this.studentService.AddStudentsSemilleros().subscribe(
          (ApiSemillero) => {
            // console.log(ApiSemillero.students)
            for (let key of ApiSemillero.students) {
             key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
             this.students.push(key)
             //  =  facultiesFromApi.students;
            }
            // console.log(this.students)
            if(cnt_groupFromApi.seedbed?.id){
              this.studentService.OneAddStudentsSemilleros(cnt_groupFromApi.seedbed?.id).subscribe(
                (ApiEstudiante) => {
                  // console.log(ApiEstudiante.students)
                  for (let key of ApiEstudiante.students) {
                      key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
                    this.students.push(key)
                   }
                   if(cnt_groupFromApi.seedbed.SeedbedStudents != undefined 
                    && cnt_groupFromApi.seedbed.SeedbedStudents.length >0){
                   this.agregarEstudiantes(cnt_groupFromApi.seedbed.SeedbedStudents)
                  }
                  // this.students =  facultiesFromApi.students;
                }, error => console.error(error));
            }
          
            
          }, error => console.error(error));

      }

      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }

  agregarLinea1(SeedbedLines:SeedbedLineI[]) {
    if(SeedbedLines.length){
      let LineId:any | null = null;

      for (let key of SeedbedLines) {
        if(key.Line?.id != undefined && key.status == true){
          let ArrayThematicId: any[] = []
          let control = <FormArray>this.form.controls['lines']
          for (const key1 of this.lines) { 
            if(key1.id == key.Line.id){
              LineId=key1
            }
          }
          if(key.SeedbedLineThematics?.length!= undefined && key.SeedbedLineThematics?.length > 0){
            for (const clave of key.SeedbedLineThematics) {
              if(clave.status == true){
                ArrayThematicId.push(clave.Thematic)
              }
            }
          }
          // console.log(ArrayThematicId,'ArrayThematicId')
          control.push(this.formBuilder.group({
            id:[key.id],
            LineId:[LineId, [Validators.required]],
            ThematicId:[ArrayThematicId],
          }))//nuevo input
        }
      }

      this.mostrar2= true
      let control = <FormArray>this.form.controls['lines']
      control.removeAt(0)
    }
  }

  agregarEstudiantes(SeedbedStudents:SeedbedStudentI[]) {
    if(SeedbedStudents.length){
      for (let key of SeedbedStudents) {
        let Studen:any | null=null
       console.log(key.Student,'key.Student')
       console.log(this.students,'this.students')
        for (const key1 of this.students) {
          let control = <FormArray>this.form.controls['Students']
          let date_firt=moment(key.date_firt,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
          let date_end=moment(key.date_end,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")

          if(key.Student?.UserId == parseInt(key1.UserId)){
            Studen=key1
            control.push(this.formBuilder.group({
              id:key.id,
              StudentId:[Studen, [Validators.required]],
              date_firt:[date_firt,[Validators.required]],
              date_end:[date_end,[Validators.required]],
              Horas:[key.hours,[Validators.required]]

            }))
          } 
        }
      //  console.log(Studen,'Studen')
      }
      this.mostrar1= true
      let control = <FormArray>this.form.controls['Students']
      control.removeAt(0)

    }
  }
  // agregarLine(LineProgramGroups: LineProgramGroupI[]) {
  //   if(LineProgramGroups.length){
  //     for (let key of LineProgramGroups) {
  //       if(key.id != undefined && key.LineProgram?.LineId != undefined) {          
  //         let control = <FormArray>this.form.controls['lines']
  //         this.lineService.getItem(key.LineProgram.LineId).subscribe((algo)=>{
  //           control.push(this.formBuilder.group({
  //             LineId:[algo.line, [Validators.required]],
  //           }))
  //         })
  //       }
  //     }
  //     this.mostrar2= true
  //     let control = <FormArray>this.form.controls['lines']
  //     control.removeAt(0)
  //     // console.log(control,'control')
  //     // console.log(this.lines,'lines')
  //   }
  // }
 


  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
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
          this.teacherService.OneAddTeacherSemilleros(this.form.value.id).subscribe(item=>{
            this.teachers=[]
            if(item.teachers[0].avatar != undefined){
              var avatar = item.teachers[0].avatar;
              var n = avatar.search("assets");
              if(n == -1){
                item.teachers[0].avatar=this.API_URI+item.teachers[0].avatar
                // console.log("avatar",key.avatar)
              }else{
                item.teachers[0].avatar= item.teachers[0].avatar
              }
    
            } 
            this.teachers.push(item.teachers[0]) 
            this.getAllteachers()
            this.form.controls['TeacherId'].setValue(item.teachers[0])
            this.SelectTeacher()
           })

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
        this.messageService.add({severity:'info', summary: 'Estudiante Creado', detail: person.student.fullName,life: 2000});
        // console.log(person,'person');
        this.studentService.OneAddStudentsSemilleros3(person.student.id).subscribe((student: any) =>{
          // console.log(student,'student');
          for (let key of student.students) {
            key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
          this.students.push(key)
         }
        })

        }
  });
  }

  onFileChangeA(event:any) {
    event.preventDefault();
    // let control = <FormArray>this.form.controls['Anexos']
    // console.log(control.value[pointIndex].resolution_convalidation)
    if(this.form.value.Anexo != '' && this.BanderaAnexo == true){
      // console.log('aquii')
      if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];
        this.AnexoAdjuntado=file
            // console.log(this.AnexoAdjuntado,'this.Anexo')
        }
      }
    }
}
