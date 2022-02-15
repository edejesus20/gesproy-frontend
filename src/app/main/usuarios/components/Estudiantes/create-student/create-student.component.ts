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
import { ProgramService } from 'src/app/core/services/program/program.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { ProgramI } from 'src/app/models/institution/program';
import { UserService } from 'src/app/core/services/usuarios/user.service';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:['', [Validators.required]],
    identification:['', [Validators.required]],
    GenderId:['', [Validators.required]],
    address:['', [Validators.required]],
    phone:['', [Validators.required]],
    email:['', [Validators.required]],
    headquarterProgramStudent: this.formBuilder.array([this.formBuilder.group(
      {
        StudentId:0,
        HeadquarterProgramId:['', [Validators.required]],
    })]),
   });

   public headquarterProgram: any[]=[]
   public headquarterProgramStudent1:any[]=[]
  constructor(
    private studentService:StudentService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private programService: ProgramService ,
    private userService:UserService,

  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllheadquarters()
  }
  
  public onSubmit(e:Event) {
    e.preventDefault()
          const formValue={
            name: this.form.value.name,
            surname: this.form.value.surname,
            DocumentTypeId: this.form.value.DocumentTypeId.id,
            identification: this.form.value.identification,
            GenderId: this.form.value.GenderId.id,
            address: this.form.value.address,
            phone: this.form.value.phone,
            username:'',
            fullName:'',
            email:this.form.value.email,
            password:'',
            UserId: 0,
            headquarterProgramStudent: this.form.value.headquarterProgramStudent
          };

          if(this.headquarterProgramStudent1.length == 0 || this.headquarterProgramStudent1 == []){
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
            // console.log('aqui2')

          }
  //  console.log(formValue.headquarterProgramStudent)
        if(
          formValue.name != ""&&
          formValue.surname != ""&&
          formValue.DocumentTypeId != ( 0 || undefined)&&
          formValue.identification != ""&&
          formValue.GenderId != ( 0 || undefined)&&
          formValue.address != ""&&
          formValue.phone != ""&&
          formValue.email != ""){
    
        this.studentService.createItem(formValue).subscribe(
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
                    detail: 'Registro de Estudiante Creado con exito'});
                    }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      this.router.navigateByUrl('/usuarios/Student');
                      clearInterval(interval); 
                     }
              }, 1000);
          },async error => {
            if(error != undefined) {
              // console.log(error);
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

  private getAllgenders(selectId?: number) {
    this.genderService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.genders = AdministrativeFromApi.genders;
      }, error => console.error(error));
  }
  
  private getAlldocumentTypes(selectId?: number) {
    this.documentTypeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.documentTypes = AdministrativeFromApi.documentTypes;
  
      }, error => console.error(error));
  }

  private getAllheadquarters(selectId?: number) {
    this.headquarterService.HeadquarterProgram().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.headquarterProgram = AdministrativeFromApi.headquarterProgram;
      }, error => console.error(error));
  }
  
  get getRoles() {
    return this.form.get('headquarterProgramStudent') as FormArray;//obtener todos los formularios
  }
  
    addRoles(event: Event){
      event.preventDefault();
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
        }
    }
  
}
