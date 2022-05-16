import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { Create_capacitacionComponent } from 'src/app/main/institution/components/Capacitacion/create_capacitacion/create_capacitacion.component';
import { TrainingI, TrainingTeacherI } from 'src/app/models/institution/training';
import { TeacherI, WorkexperienceI } from 'src/app/models/user/teacher';
const translate = require('translate');
@Component({
  selector: 'app-AsignarTeacher',
  templateUrl: './AsignarTeacher.component.html',
  styleUrls: ['./AsignarTeacher.component.css'],
  providers: [DialogService]
})
export class AsignarTeacherComponent implements OnInit {
  public mostrar:number=4;
  public tabla:boolean=true;
  public algo:number[]=[0];
  public mostrar3:boolean=false;
  public algo3:number[]=[0];

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar2:boolean=false
  public form2:TeacherI= {
    id:0,   
     UserId: 0,
    ScaleId: 0,
    // hours_of_dedication:'',
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
public ref:any;
  public form:FormGroup=this.formBuilder.group({})
  public trainings: TrainingI[]=[]
  public Workexperiences:any[] =[]
  public teachers: TeacherI[] =[]

  constructor(
    private primengConfig: PrimeNGConfig,
    private teacherService:TeacherService,
    private trainingsService:TrainingsService,
    private router: Router,
    public dialogService: DialogService,
    private messageService:MessageService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getAlltrainings()
    this.getAllteachers()

    this.form=this.formBuilder.group({
      id: [''],
      trainingTeacher: this.formBuilder.array([this.formBuilder.group(
        {
          name: [''],
          date_graduation: [''],
          name_institution: [''],
          resolution_convalidation: [''],
          degree_certificate: [''],
          TeacherId:this.form2.id,
          TrainingId:[''],
      })]),
      Workexperiences:this.formBuilder.array([this.formBuilder.group(
        {
          TeacherId:0,
          name_institution: [''],
          position_type: [''],
          functions:[''],
          start_date:[''],
          final_date:[''],
      })]),
    })

  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.mostrar2= false
    this.mostrar3= false
  }
  
  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.teacher.id != undefined
        ){
          // console.log(cnt_groupFromApi.teacher)
          this.form2=cnt_groupFromApi.teacher
          this.form.controls['id'].setValue(cnt_groupFromApi.teacher.id)
          if(cnt_groupFromApi.teacher.Trainings?.length != undefined && cnt_groupFromApi.teacher.Trainings?.length > 0){
            // console.log(cnt_groupFromApi.teacher.Trainings)
            this.agregarDescuentos(cnt_groupFromApi.teacher.Trainings)    
          }
          
          if(cnt_groupFromApi.teacher.Workexperiences?.length != undefined && cnt_groupFromApi.teacher.Workexperiences?.length > 0){
            // console.log(cnt_groupFromApi.teacher.Trainings)
            this.agregarDescuentos2(cnt_groupFromApi.teacher.Workexperiences)    
          }
      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
  agregarDescuentos2(Workexperiences: WorkexperienceI[]) {
    if(Workexperiences.length){
      for (let key of Workexperiences) {
        if(key.TeacherId != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['Workexperiences']
                    control.push(this.formBuilder.group({
                      final_date: key.final_date,
                      functions: key.functions,
                      name_institution:key.name_institution,
                      position_type:key.position_type,
                      start_date:key.start_date
                    }))
      }
    }
      this.mostrar3= true
      let control = <FormArray>this.form.controls['Workexperiences']
      control.removeAt(0)
    }
  }
  agregarDescuentos(Trainings: TrainingI[]) {
    if(Trainings.length){
      for (let key of Trainings) {
        if(key.TrainingTeacher != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['trainingTeacher']
            this.teacherService.getItem(key.TrainingTeacher.TeacherId).subscribe((algo1)=>{
              if(algo1.teacher.id != undefined && key.TrainingTeacher != undefined) {
                this.trainingsService.getItem(key.TrainingTeacher.TrainingId).subscribe((algo)=>{
                  if(algo.training.id != undefined){
                    control.push(this.formBuilder.group({
                      name: [key.TrainingTeacher?.name, [Validators.required]],
                      date_graduation: [key.TrainingTeacher?.date_graduation, [Validators.required]],
                      name_institution: [key.TrainingTeacher?.name_institution, [Validators.required]],
                      resolution_convalidation: [key.TrainingTeacher?.resolution_convalidation, [Validators.required]],
                      degree_certificate: [key.TrainingTeacher?.degree_certificate, [Validators.required]],
                      TeacherId:algo1.teacher.id,
                      TrainingId:[algo.training, [Validators.required]],
                    }))
                  }
      
                })
              }
              
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['trainingTeacher']
      control.removeAt(0)
    }

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
          TrainingId:['', [Validators.required]]
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
          TrainingId:['', [Validators.required]]
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
      control.push(this.formBuilder.group({
        name: ['', [Validators.required]],
        date_graduation: ['', [Validators.required]],
        name_institution: ['', [Validators.required]],
        resolution_convalidation: ['', [Validators.required]],
        degree_certificate: ['', [Validators.required]],
        TeacherId:this.form2.id,
        TrainingId:['', [Validators.required]]
      }))
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
public verificar(){
  let bandera:boolean=false;
  let control = <FormArray>this.form.controls['trainingTeacher']
  for (const key of control.value) {
    key.TeacherId=this.form2.id
    key.TrainingId=key.TrainingId.id
    if(!key.TrainingId && key.TrainingId == undefined) {
      return bandera=false
    }
  }
  return bandera=true
}
  public onSubmit() {

    let bandera = this.verificar()
    console.log(bandera);
    if(bandera == true){
      let formValue = this.form.value;
      if(this.Workexperiences.length == 0 ){
        this.Workexperiences = this.form.value.Workexperiences 
        formValue.Workexperiences = this.form.value.Workexperiences
      }else{
        formValue.Workexperiences = this.Workexperiences
      }
      if(this.form.value.Workexperiences[0].name_institution == ''){
        // this.form.value.Workexperiences=[]
        formValue.Workexperiences=[]
  
      }
      console.log(formValue);
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
            let text = await translate(error.error.message, "es");
            if(error.error.dataErros){
              text = await translate(error.error.dataErros[0].message, "es");
            }
            this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
          }
        });
    }else{
      
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Seleccione la formacion'});
    }
  }

  get getWorkexperiences() {
    return this.form.get('Workexperiences') as FormArray;//obtener todos los formularios
  }
  
    addWorkexperiences(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Workexperiences']
        if(control.length == 0 && this.mostrar3 == false){
          control.push(this.formBuilder.group({
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
          }))
        }
        if(control.length >= 1 && this.mostrar3 == true){
          control.push(this.formBuilder.group({
            TeacherId:0,
            name_institution: [''],
            position_type: [''],
            functions:[''],
            start_date:[''],
            final_date:[''],
          }))
  
        }
        this.mostrar3=true
    }
    removeWorkexperiences(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Workexperiences']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar3=false
        control.push(this.formBuilder.group({
          TeacherId:0,
          name_institution: [''],
          position_type: [''],
          functions:[''],
          start_date:[''],
          final_date:[''],
        }))
        }
    }

    addCapacitaciones(e:Event){
      e.preventDefault()
  
      this.ref = this.dialogService.open(Create_capacitacionComponent, {
        width: '35%',
        height: '50%',
        contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false,showHeader:false,
        baseZIndex: 10000,
        data: {
          id: '1'
      },
    });
  
    this.ref.onClose.subscribe((person: any) =>{
        if (person) {
            this.messageService.add({severity:'info', summary: 'Capacitación Creada', detail: person.name,life: 2000});
        this.getAlltrainings()
  
          }
    });
    }
}
