import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { CreateStudentComponent } from 'src/app/main/usuarios/components/Estudiantes/create-student/create-student.component';
import { SeedbedStudentI } from 'src/app/models/institution/seedbed';
const translate = require('translate');
@Component({
  selector: 'app-vincular_estudiantes',
  templateUrl: './vincular_estudiantes.component.html',
  styleUrls: ['./vincular_estudiantes.component.css'],
  providers: [DialogService]
})
export class Vincular_estudiantesComponent implements OnInit {
  public mostrar:number=4;
  public tabla:boolean=true;
  public construccion:string='assets/construccion.jpg'
public Valorconstruccion:boolean=false
public students:any[] =[]
public Students:any[] =[]
public formulario: FormGroup = this.formBuilder.group({});
public bandera:boolean=false
public mostrar1:boolean=true;
public algo1:number[]=[0];
public  deleteStudents:any[] =[]
displayMaximizable2:boolean=false
public ref1:any;
form:any
public image:string='assets/images/images.jpg'

  constructor(
    private messageService:MessageService,
  public dialogService: DialogService,
    private seedbedService:SeedbedService,
    private teacherService:TeacherService,
    private studentService:StudentService,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    this.Valorconstruccion=false
    this.buildForm();
  }
  private buildForm() {
    this.formulario = this.formBuilder.group({
      id:[''],
      Students: this.formBuilder.array([this.formBuilder.group({
      id:0,
        date_firt:['',[Validators.required]],
        date_end:['',[Validators.required]],
        StudentId:['',[Validators.required]],
        Horas:['',[Validators.required]]
      })]),
      
    });
  }  

  public volver(event: Event){
    this.displayMaximizable2 = false

    event.preventDefault
    this.tabla = true
    this.ngOnInit()
    this.bandera=false

    this.Students=[]
    this.students=[]

    this.vaciar()
    //console.log(event)
  }

  private vaciar(){
    this.formulario.reset()
    this.getStudents.reset()
    this.getStudents.clear()
    this.formulario.controls['id'].setValue('')
    let control = <FormArray>this.formulario.controls['Students']
    control.push(this.formBuilder.group({
      id:0,
        StudentId:['', [Validators.required]],
      date_firt:['',[Validators.required]],
      date_end:['',[Validators.required]],
      Horas:['',[Validators.required]]
    }))

  
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }
  getOneCntAccount(id:number) {
    this.seedbedService.getItem(id).subscribe((cnt_groupFromApi) => {
      console.log(cnt_groupFromApi.seedbed);
      this.displayMaximizable2=true

      this.tabla = false
      this.form=cnt_groupFromApi.seedbed
        this.formulario.controls['id'].setValue(cnt_groupFromApi.seedbed?.id)


        this.studentService.AddStudentsSemilleros().subscribe(
          (ApiSemillero) => {
            // console.log(ApiSemillero.students)
            for (let key of ApiSemillero.students) {
             key.fullName =  key.fullName.charAt(0).toUpperCase() +  key.fullName.slice(1);
             this.students.push(key)
             //  =  facultiesFromApi.students;
            }
            console.log(this.students)
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

      // }else{
      //   // console.log('aquiii');
      // }
 
      
    }, error => console.error(error));
  }

  agregarEstudiantes(SeedbedStudents:SeedbedStudentI[]) {
    if(SeedbedStudents.length){
      for (let key of SeedbedStudents) {
        let Studen:any | null=null
      //  console.log(key.Student,'key.Student')
      //  console.log(this.students,'this.students')
        for (const key1 of this.students) {
          let control = <FormArray>this.formulario.controls['Students']
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
      let control = <FormArray>this.formulario.controls['Students']
      control.removeAt(0)

    }
  }

  
  get getStudents() {
    return this.formulario.get('Students') as FormArray;//obtener todos los formularios
  }

  addStudents(event: Event){
    event.preventDefault();
    const control = <FormArray>this.formulario.controls['Students']
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
    let control = <FormArray>this.formulario.controls['Students']//aceder al control
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

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }

  public onSubmit(): void {
    let formValue: any = this.formulario.value;
    formValue.deleteStudents=this.deleteStudents


    if(this.Students.length == 0 ){
      let control = <FormArray>this.formulario.controls['Students']
      for (let key of control.value) {
        key.StudentId=key.StudentId.StudentId 
        this.Students.push({
          id: key.id,
          StudentId:key.StudentId,
          Horas:key.Horas,
          date_firt:key.date_firt,
          date_end:key.date_end
        })
      }
      formValue.Students = this.formulario.value.Students
      // console.log('aqui')
    }else{
      formValue.Students = this.Students
    }

    if(this.formulario.value.Students[0].Horas == ''){
      formValue.Students=[]
    }

    // console.log(formValue)
    if(
      formValue.id !=undefined &&  formValue.Students.length > 0
    ){
    this.bandera=true

      this.seedbedService.VincularEstudiante(formValue.id, formValue).subscribe(
        (algo) => {
          this.finalizar()
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
  
          // this.students=[]
      // this.getstudents(this.form.value.id)
      // this.getstudents2()

        }
  });
  }
}
