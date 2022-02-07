import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { GroupI } from 'src/app/models/institution/group';
import { ScaleI } from 'src/app/models/institution/scale';
import { TrainingI, TrainingTeacherI } from 'src/app/models/institution/training';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { TeacherI } from 'src/app/models/user/teacher';
const translate = require('translate');
@Component({
  selector: 'app-AsignarTeacher',
  templateUrl: './AsignarTeacher.component.html',
  styleUrls: ['./AsignarTeacher.component.css']
})
export class AsignarTeacherComponent implements OnInit {
  public mostrar:number=4;
  public tabla:boolean=true;
  public algo:number[]=[0];
  private id:number=0
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar2:boolean=false
  public form2:TeacherI= {
    id:0,   
     UserId: 0,
    ScaleId: 0,
    ColcienciaCategoryId: 0,
    GroupId: 0,
    User:undefined, 
    Scale:undefined, 
    Group:undefined, 
    ColcienciaCategory:undefined, 
    TrainingTeacher:undefined, 
    Trainings:undefined, 
}

  public form:FormGroup=this.formBuilder.group({
    trainingTeacher: this.formBuilder.array([this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        date_graduation: ['', [Validators.required]],
        name_institution: ['', [Validators.required]],
        resolution_convalidation: ['', [Validators.required]],
        degree_certificate: ['', [Validators.required]],
        TeacherId:this.form2.id,
        TrainingId:['', [Validators.required]],
    })]),
  })
  public trainings: TrainingI[]=[]
  public teachers: TeacherI[] =[]

  
  
  constructor(
    private primengConfig: PrimeNGConfig,
    private teacherService:TeacherService,
    private trainingsService:TrainingsService,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getAlltrainings()
    this.getAllteachers()

  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  
  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  actualizar(id: number){
    console.log(id)
    this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.teacher.id != undefined
        ){
        
          this.id=cnt_groupFromApi.teacher.id 
          this.form2=cnt_groupFromApi.teacher
      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }

  get getRoles() {
    return this.form.get('trainingTeacher') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['trainingTeacher']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          name: ['', [Validators.required]],
          date_graduation: ['', [Validators.required]],
          name_institution: ['', [Validators.required]],
          resolution_convalidation: ['', [Validators.required]],
          degree_certificate: ['', [Validators.required]],
          TeacherId:this.form2.id,
          TrainingId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          name: ['', [Validators.required]],
          date_graduation: ['', [Validators.required]],
          name_institution: ['', [Validators.required]],
          resolution_convalidation: ['', [Validators.required]],
          degree_certificate: ['', [Validators.required]],
          TeacherId:this.form2.id,
          TrainingId:['', [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['trainingTeacher']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      }
  }

  
  private getAlltrainings(selectId?: number) {
    this.trainingsService.getList().subscribe(
      (facultiesFromApi) => {
        this.trainings = facultiesFromApi.trainings;
      }, error => console.error(error));
  }
  private getAllteachers(selectId?: number) {
    this.teacherService.getList().subscribe(
      (facultiesFromApi) => {
        this.teachers = facultiesFromApi.teachers;
      }, error => console.error(error));
  }

  public onSubmit() {

    let control = <FormArray>this.form.controls['trainingTeacher']

    for (const key of control.value) {
      key.TeacherId=this.form2.id
      key.TrainingId=key.TrainingId.id
    }

    let formValue = this.form.value;

    // if(formValue[0].name != '' &&
    // formValue[0].TeacherId != ( 0 )&&
    // formValue[0].TrainingId != ( 0 )
    // ){

    this.teacherService.AsignarTeacher(formValue).subscribe(
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
                detail: 'Registro de Asignacion de formacion con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/usuarios/Teacher');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
          const text = await translate(error.error.message, "es");
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
  // }else{
  //   this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  // }
}
}
