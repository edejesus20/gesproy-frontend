import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { OcupationService } from 'src/app/core/services/usuer/Ocupation.service';
import { OcupationI } from 'src/app/models/user/ocupation';
import { PersonI } from 'src/app/models/user/person';
import { UserService } from 'src/app/core/services/usuarios/user.service';
let uploadefiles:Array<File>
@Component({
  selector: 'app-create-administrative',
  templateUrl: './create-administrative.component.html',
  styleUrls: ['./create-administrative.component.css']
})
export class CreateAdministrativeComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public form:FormGroup=this.formBuilder.group({
    name:[''],
    surname:[''],
    DocumentTypeId:[''],
    identification:[''],
    GenderId:[''],
    address:[''],
    phone:[''],
    email:[''],
    UserId:[''],
    nationality:[''],
    date_of_birth:[''],
    HeadquarterId:['', [Validators.required]],
    OcupationId:['', [Validators.required]],
   });

   public mostrarUser:boolean=false;
   public users:PersonI[]=[];
   
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarters: HeadquarterI[]=[]
  public ocupations:OcupationI[]=[]

  constructor(
    private administrativeService:AdministrativeService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private headquarterService: HeadquarterService,
    private ocupationService:OcupationService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private router: Router,
    private userService:UserService,

    // private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getAllgenders()
    this.getAlldocumentTypes()
    this.getAllheadquarters()
    this.getAllocupations()
    this.getAllUser()
  }

  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        this.users = AdministrativeFromApi.userseadministrative;
        // console.log(this.users)
      }, error => console.error(error));
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
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.headquarters = AdministrativeFromApi.headquarters;
      }, error => console.error(error));
  }

  private getAllocupations(selectId?: number) {
    this.ocupationService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.ocupations = AdministrativeFromApi.ocupations;
      }, error => console.error(error));
  }

  public onSubmit(e: Event) {
    e.preventDefault()
    let formValue:any={}
    formValue={
      name:  this.form.value.name,
      surname:  this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId.id,
      identification:  this.form.value.identification,
      GenderId:  this.form.value.GenderId.id,
      address:  this.form.value.address,
      phone:  this.form.value.phone,
      username: this.form.value.username,
      email: this.form.value.email,
      UserId:  this.form.value.UserId.UserId,
      OcupationId: this.form.value.OcupationId.id,
    HeadquarterId: this.form.value.HeadquarterId.id,
    nationality: this.form.value.nationality,
    date_of_birth: this.form.value.date_of_birth,
    };

    if(this.mostrarUser == false){
      formValue.UserId=  this.form.value.UserId.UserId
    }

    if(this.mostrarUser == true){
      formValue.UserId= undefined
    }
    if((this.mostrarUser == true && formValue.name != ""&& formValue.surname != ""&&
    formValue.DocumentTypeId != ( 0 || undefined)&& formValue.identification != ""&&
    formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
    formValue.phone != ""&& formValue.email != ""&&
      formValue.nationality != ("" || undefined) && 
      formValue. date_of_birth!= ("" || undefined)
      )
    ||(this.mostrarUser == false && formValue.UserId != ( 0 || undefined))
    ){
    // console.log(formValue)

            this.administrativeService.createItem(formValue).subscribe(
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
                        detail: 'Registro de Administrativo Creado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.router.navigateByUrl('/usuarios/Administrative');
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


  // onFileChange(e: Event) {
  //   e.preventDefault()
  //   const algo= (e.target as HTMLInputElement)
  //   if(algo.files){
  //     if(algo.files.length > 0) {
  //       const file = algo.files[0]
  //       this.images = file
  //       console.log('aqui',this.images)
  //     }
  //   }
  // }

  // public onSubmit() {
  //   let formData = new FormData();
  //   formData.append("file",this.images);
  //   // console.log(formData)
  //   this.http.post<any>('http://localhost:4000/api/subir',formData).subscribe(
  //     (res)=> console.log(res),(err)=> console.log(err)
  //   )
  // }

}
