import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({});
  public bandera:boolean=false


  constructor(
    private primengConfig: PrimeNGConfig,
    private studentService:StudentService,
    private router: Router,
    private messageService:MessageService,

    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.form=this.formBuilder.group({
      id: [''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      DocumentTypeId:['', [Validators.required]],
      identification:['', [Validators.required]],
      // GenderId:['', [Validators.required]],
      // address:['', [Validators.required]],
      // phone:['', [Validators.required]],
      email:['', [Validators.required]],
    });
    // this.getAllgenders()
    // this.getAlldocumentTypes()
  }

  public onSubmit() {
    const formValue={
      id: this.form.value.id,
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId.id,
      identification: this.form.value.identification,
      // GenderId: this.form.value.GenderId.id,
      // address: this.form.value.address,
      // phone: this.form.value.phone,
      username:'',
      fullName:'',
      email:this.form.value.email,
      password:'',
      UserId: 0,
    };
  this.bandera=true

    this.studentService.deleteItem(formValue.id).subscribe(
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
                detail: 'Registro de Estudiante Eliminado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  // this.router.navigateByUrl('/usuarios/Student');
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
}

public volver(event: Event){
  event.preventDefault
  this.tabla = true
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.bandera=false

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
  this.studentService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.student.id != undefined
      ){
      
        this.form.controls['id'].setValue(cnt_groupFromApi.student.id)
        if(cnt_groupFromApi.student.User?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.student.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.student.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.student.User.Person.identification)
          // this.form.controls['address'].setValue(cnt_groupFromApi.student.User.Person.address)
          // this.form.controls['phone'].setValue(cnt_groupFromApi.student.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.student.User.email)
          // console.log('aqui')
        }


        // if(cnt_groupFromApi.student.User?.Person?.DocumentTypeId != undefined)
        // this.documentTypeService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.DocumentTypeId)).subscribe((algo)=>{
          this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.student.User?.Person?.DocumentType)
        // })


        // if(cnt_groupFromApi.student.User?.Person?.GenderId != undefined)
        // this.genderService.getItem(parseInt(cnt_groupFromApi.student.User?.Person?.GenderId)).subscribe((algo)=>{
        //   this.form.controls['GenderId'].setValue(algo.gender)
        // })
    }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
}
