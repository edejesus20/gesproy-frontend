import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

const translate = require('translate');
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { TeacherI } from 'src/app/models/user/teacher';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { GroupI } from 'src/app/models/institution/group';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public scales:ScaleI[] =[]
  public groups:GroupI[] =[]
  public colcienciaCategorys:ColcienciaCategoryI[] =[]
  // selectedDocumentTypeI: DocumentTypeI={
  //   id:1,
  //   name:'cedula de ciudadania',
  // };
  // selectedGenderI: GenderI={
  //   id:0,
  //   name: '',
  // };
  constructor(
    private teacherService:TeacherService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private scaleService:ScaleService,
    private groupService:GroupService,
    private colcienciaCategoryService:ColcienciaCategoryService,
  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllscales()
    this.getAllgroups()
    this.getAllcolcienciaCategorys()
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

  private getAllscales(selectId?: number) {
    this.scaleService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.scales = AdministrativeFromApi.scales;
      }, error => console.error(error));
  }

  private getAllgroups(selectId?: number) {
    this.groupService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.groups = AdministrativeFromApi.groups;
      }, error => console.error(error));
  }

  private getAllcolcienciaCategorys(selectId?: number) {
    this.colcienciaCategoryService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.colcienciaCategorys = AdministrativeFromApi.colcienciaCategorys;
      }, error => console.error(error));
  }

  public onSubmit(f:NgForm) {

    const formValue={
      name: f.form.value.name,
      surname: f.form.value.surname,
      DocumentTypeId: f.form.value.DocumentTypeId.id,
      identification: f.form.value.identification,
      GenderId: f.form.value.GenderId.id,
      address: f.form.value.address,
      phone: f.form.value.phone,
      username:'',
      fullName:'',
      email:f.form.value.email,
      password:'',
      UserId: 0,
      scaleId: f.form.value.scaleId.id,
      colcienciasCategoryId: f.form.value.colcienciasCategoryId.id,
      groupId: f.form.value.groupId.id,
    };
    // console.log(f)
   
    if(
      formValue.name != ""&&
      formValue.surname != ""&&
      formValue.DocumentTypeId != ( 0 || undefined)&&
      formValue.identification != ""&&
      formValue.GenderId != ( 0 || undefined)&&
      formValue.address != ""&&
      formValue.phone != ""&&
      formValue.email != ""&&
     formValue.scaleId !=("" || undefined)
    &&formValue.colcienciasCategoryId != ("" || undefined)
    &&formValue.groupId != ("" || undefined)){
      console.log(formValue)

    this.teacherService.createItem(formValue).subscribe(
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
                detail: 'Registro de Docente Creado con exitoso'});
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
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
}

}
