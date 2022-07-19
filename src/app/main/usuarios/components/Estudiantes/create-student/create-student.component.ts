import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';

import { UserService } from 'src/app/core/services/usuarios/user.service';
import { PersonI } from 'src/app/models/user/person';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI } from 'src/app/models/institution/seedbed';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
  providers: [DialogService]
})
export class CreateStudentComponent implements OnInit {
  public mostrarDialogo:boolean=false;

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=true;
  public mostrar2:boolean=false;
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public algo:number[]=[0];
  public algo1:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:[1],
    identification:[''],
    email:['', [Validators.required]],
    UserId:[''],
    headquarterProgramStudent: this.formBuilder.array([this.formBuilder.group({
        StudentId:0,
        HeadquarterProgramId:['', [Validators.required]],
    })]),
    StudentInternship: this.formBuilder.array([this.formBuilder.group({
      StudentId:0,
      nameP:[''],
      start_date:[''],
      final_date:[''],
      name_institution:[''],
      internship_certificate:[''],
      practice_hours:[''],
      area:[''],
      post:[''],
      functions:[''],
  })]),
    // SeedbedId:[''],
    // Horas:[''],
    // date_firt:[''],
    // date_end:[''],
   });

   public headquarterProgram: any[]=[]
   public headquarterProgramStudent1:any[]=[]

   public mostrarUser:boolean=false;
   public users:PersonI[]=[];
   public ref1:any;
   public seedbeds:SeedbedI[] =[]
 public Dialog:boolean =false
 public bandera:boolean=false

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private studentService:StudentService,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private userService:UserService,
    private seedbedService:SeedbedService

  ) { }

  ngOnInit() {
    // this.getAllgenders()
    // this.getAlldocumentTypes()
    this.getAllheadquarters()
    this.getAllUser()
    this.getSeedbed()
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
    // this.form=this.formBuilder.group({
    //   name:['', [Validators.required]],
    //   surname:['', [Validators.required]],
    //   DocumentTypeId:[1],
    //   identification:[''],
    //   email:['', [Validators.required]],
    //   UserId:[''],
    //   headquarterProgramStudent: this.formBuilder.array([this.formBuilder.group({
    //       StudentId:0,
    //       HeadquarterProgramId:['', [Validators.required]],
    //   })]),
    //   StudentInternship: this.formBuilder.array([this.formBuilder.group({
    //     StudentId:0,
    //     nameP:[''],
    //     start_date:[''],
    //     final_date:[''],
    //     name_institution:[''],
    //     internship_certificate:[''],
    //     practice_hours:[''],
    //     area:[''],
    //     post:[''],
    //     functions:[''],
    // })]),
    //   SeedbedId:[''],
    //   Horas:[''],
    //   date_firt:[''],
    //   date_end:[''],
    //  });
  }

  cerrar(){
    this.router.navigateByUrl('/usuarios/Student');
  }
 private volver(){
    this.mostrarUser= false
    this.mostrar=true;
    this.mostrar2=false;
    this.headquarterProgram=[]
    this.bandera= false
    this.headquarterProgramStudent1 = []
    this.ngOnInit()
    this.vaciar()
  }
  private vaciar(){
    this.form.reset()
    this.getRoles.reset()
    this.getRoles.clear()
    this.getStudentInternships.reset()
    this.getStudentInternships.clear()
    this.form.controls['name'].setValue('')
    this.form.controls['surname'].setValue('')
    this.form.controls['DocumentTypeId'].setValue('1')
    this.form.controls['identification'].setValue('')
    this.form.controls['email'].setValue('')
    this.form.controls['UserId'].setValue('')
    // this.form.controls['SeedbedId'].setValue('')
    // this.form.controls['Horas'].setValue('')
    // this.form.controls['date_firt'].setValue('')
    // this.form.controls['date_end'].setValue('')
    
    let control = <FormArray>this.form.controls['headquarterProgramStudent']
    control.push(this.formBuilder.group({
      StudentId:0,
      HeadquarterProgramId:['', [Validators.required]],
    }))
    let control1 = <FormArray>this.form.controls['StudentInternship']
    control1.push(this.formBuilder.group({
      StudentId:0,
      nameP:[''],
      start_date:[''],
      final_date:[''],
      name_institution:[''],
      internship_certificate:[''],
      practice_hours:[''],
      area:[''],
      post:[''],
      functions:[''],
    }))
  }

  public cancelar(){
    this.ref.close(undefined);
  }
  getSeedbed() {
    this.seedbedService.getList().subscribe(data => {
      for (let key of data.seedbeds) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.seedbeds=data.seedbeds
    }, error => console.error(error));
  }

  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        this.users = AdministrativeFromApi.usersestudiente;
        for (let key of AdministrativeFromApi.usersestudiente) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          key.surname =  key.surname.charAt(0).toUpperCase() +  key.surname.slice(1);
        }
        // console.log(this.users)
      }, error => console.error(error));
  }
  public onSubmit(e:Event) {
    e.preventDefault()

    let formValue:any={}
    formValue={
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId,
      identification: this.form.value.identification,
      // GenderId: this.form.value.GenderId.id,
      // address: this.form.value.address,
      // phone: this.form.value.phone,
      username:'',
      fullName:'',
      email:this.form.value.email,
      password:'',
      UserId: undefined,
      headquarterProgramStudent: this.form.value.headquarterProgramStudent,
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
      // SeedbedId:this.form.value.SeedbedId.id,
      // Horas: this.form.value.Horas,
      // date_firt:this.form.value.date_firt,
      // date_end:this.form.value.date_end,
      // current_semester: this.form.value.current_semester,
      // current_average: this.form.value.current_average,
      // experienciaInvestigativa: this.form.value.experienciaInvestigativa,
      // areasEstudio: this.form.value.areasEstudio,
      // publicacionesResientes: this.form.value.publicacionesResientes,
      // practicas: this.form.value.practicas,
      StudentInternship:this.form.value.StudentInternship,
    };
    if(this.mostrar2==false){
      formValue.StudentInternship=[]
    }

    // console.log(formValue)
      if(this.headquarterProgramStudent1.length == 0 ){
            let control = <FormArray>this.form.controls['headquarterProgramStudent']
            for (const key of control.value) {
              key.HeadquarterProgramId=key.HeadquarterProgramId.id 
              this.headquarterProgramStudent1.push({
               StudentId:0,
              HeadquarterProgramId:key.HeadquarterProgramId,
              })
            }
            formValue.headquarterProgramStudent = this.form.value.headquarterProgramStudent
            // console.log('aqui')
          }else{
            formValue.headquarterProgramStudent = this.headquarterProgramStudent1
          }

      // if((this.mostrarUser == true && 
        if(  formValue.name != ""&& formValue.surname != ""&&
      formValue.DocumentTypeId != ( 0 || undefined)&& 
      // formValue.identification != ""&&
      // &&
      // formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
      // formValue.nationality != ("" || undefined) && 
      // formValue.SeedbedId != ( 0 || undefined)&& formValue.Horas != ""&&
      // formValue. date_of_birth!= ("" || undefined) && 
      // formValue.phone != ""
       formValue.email != "" 
      // && 
      // formValue.current_semester  != "" && formValue.current_average  != "" 
      // )
      // ||(this.mostrarUser == false && formValue.UserId != ( 0 || undefined) && 
      // formValue.current_semester  != "" && formValue.current_average  != "")
      ){
 
        this.bandera= true
        this.studentService.createItem(formValue).subscribe(
          (algo) => {
            if(this.mostrarDialogo== true){
              this.ref.close(algo);
            }else{
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
                    detail: 'Registro de Estudiante Creado con exito'});
                    }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      this.volver()
                      // this.router.navigateByUrl('/usuarios/Student');
                      clearInterval(interval); 
                     }
              }, 1000);
            }
          },async error => {
            if(error != undefined) {
              // console.log(error);
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

  private getAllheadquarters(selectId?: number) {
    this.headquarterService.HeadquarterProgram().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        for (let key of AdministrativeFromApi.headquarterProgram) {
          if(key.Headquarter?.name){
            key.Headquarter.name =  key.Headquarter.name.charAt(0).toUpperCase() +  key.Headquarter.name.slice(1);
          }
          if(key.Program?.name){
            key.Program.name =  key.Program.name.charAt(0).toUpperCase() +  key.Program.name.slice(1);
          }
        }
        this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
      }, error => console.error(error));
  }
  
  get getRoles() {
    return this.form.get('headquarterProgramStudent') as FormArray;//obtener todos los formularios
  }
  
    addRoles(event: Event){
      event.preventDefault();
      // this.mostrar=true
      const control = <FormArray>this.form.controls['headquarterProgramStudent']
        if(control.length == 0 && this.mostrar == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
        }
        if(control.length >= 1 && this.mostrar == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            HeadquarterProgramId:['', [Validators.required]],
          }))
  
        }
        this.mostrar=true
    }
    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['headquarterProgramStudent']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar=false
        control.push(this.formBuilder.group({
          StudentId:0,
          HeadquarterProgramId:['', [Validators.required]],
        }))
        }
    }
    get getStudentInternships() {
      return this.form.get('StudentInternship') as FormArray;//obtener todos los formularios
    }

    addStudentInternships(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['StudentInternship']
        if(control.length == 0 && this.mostrar2 == false){
          control.push(this.formBuilder.group({
            StudentId:0,
            nameP:[''],
            start_date:[''],
            final_date:[''],
            name_institution:[''],
            internship_certificate:[''],
            practice_hours:[''],
            area:[''],
            post:[''],
            functions:[''],
          }))
        }
        if(control.length >= 1 && this.mostrar2 == true){
          control.push(this.formBuilder.group({
            StudentId:0,
            nameP:[''],
            start_date:[''],
            final_date:[''],
            name_institution:[''],
            internship_certificate:[''],
            practice_hours:[''],
            area:[''],
            post:[''],
            functions:[''],
          }))
  
        }
        this.mostrar2=true
    }
    removeStudentInternships(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['StudentInternship']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
          console.log('aqui')
        this.mostrar2=false
        control.push(this.formBuilder.group({
          StudentId:0,
          nameP:[''],
          start_date:[''],
          final_date:[''],
          name_institution:[''],
          internship_certificate:[''],
          practice_hours:[''],
          area:[''],
          post:[''],
          functions:[''],
        }))
        }
    }

}
