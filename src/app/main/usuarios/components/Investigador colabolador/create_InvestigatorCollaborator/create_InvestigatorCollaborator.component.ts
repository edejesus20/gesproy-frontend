import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
import { PersonI } from 'src/app/models/user/person';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InvestigadorColaboladorService } from 'src/app/core/services/usuer/InvestigadorColabolador.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create_InvestigatorCollaborator',
  templateUrl: './create_InvestigatorCollaborator.component.html',
  styleUrls: ['./create_InvestigatorCollaborator.component.css'],
  providers: [DialogService]
})
export class Create_InvestigatorCollaboratorComponent implements OnInit {
  API_URI = environment.API_URI;

  items: MenuItem[]=[]
  activeIndex: number = 0;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrarDialogo:boolean=false;
  public Dialog:boolean =false

  public form:FormGroup=this.formBuilder.group({
   });
   public image:string='assets/images/images.jpg'
   public bandera:boolean=false
  public mostrarUser:boolean=false;
  public users:PersonI[]=[];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public ref1:any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    // private genderService:GenderService,
    // private documentTypeService:DocumentTypeService,
    private investigadorColaboladorService:InvestigadorColaboladorService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private router: Router,
    private userService:UserService,
  ) { }
  ngOnInit() {
    this.items = [
      {
      label: 'Datos Basicos',
      command: (event: any) => {
          this.activeIndex = 0;
         }
      },
    ];
    // this.getAllgenders()
    this.getAllUser()
    // this.getAlldocumentTypes()
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
    this.form=this.formBuilder.group({
      name:[''],
      surname:[''],
      DocumentTypeId:[1],
      identification:[''],
      email:[''],
      UserId:[''],
   
     });
  }

  cerrar(){
    this.router.navigateByUrl('/usuarios/InvestigatorCollaborator');
  }
 private volver(){
  this.bandera= false
  this.activeIndex = 0;
    this.mostrarUser= false

    this.ngOnInit()
  }

  public cancelar(){
    this.ref.close(undefined);
  }
  cambiarFormDatosBasico(){
    if( this.mostrarUser==false){
      this.mostrarUser=true
      this.form.controls['UserId'].setValue('')
    }else{
      this.mostrarUser=false
      this.form.controls['name'].setValue('')
      this.form.controls['surname'].setValue('')
      this.form.controls['email'].setValue('')
      // this.form.controls['identification'].setValue('')

    }
  }
  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.usersInvestigador) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          key.surname =  key.surname.charAt(0).toUpperCase() +  key.surname.slice(1);
          key.todo=key.name +'- '+  key.surname + 'CC : '+key.identification;

          if(key.avatar != undefined){
            var avatar =key.avatar ;
            var n = avatar.search("assets");
            if(n == -1){
             key.avatar =this.API_URI+key.avatar
              // console.log("avatar",key.avatar)
            }else{
             key.avatar =key.avatar 
            }
  
          } 
        }
        this.users = AdministrativeFromApi.usersInvestigador;
        // console.log(this.users)
      }, error => console.error(error));
  }
  // private getAllgenders(selectId?: number) {
  //   this.genderService.getList().subscribe(
  //     (AdministrativeFromApi) => {
  //       // console.log(AdministrativeFromApi.administratives)
  //       this.genders = AdministrativeFromApi.genders;
  //     }, error => console.error(error));
  // }

  // private getAlldocumentTypes(selectId?: number) {
  //   this.documentTypeService.getList().subscribe(
  //     (AdministrativeFromApi) => {
  //       this.documentTypes = AdministrativeFromApi.documentTypes;
  
  //     }, error => console.error(error));
  // }

  public onSubmit(e: Event) {
    e.preventDefault()
    let formValue:any={}
    formValue={
      name:  this.form.value.name,
      surname:  this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId,
      identification:  this.form.value.identification,
      // GenderId:  this.form.value.GenderId.id,
      // address:  this.form.value.address,
      // phone:  this.form.value.phone,
      username: this.form.value.username,
      email: this.form.value.email,
      UserId:  this.form.value.UserId.UserId,
    // nationality: this.form.value.nationality,
    // date_of_birth: this.form.value.date_of_birth,
    };

    if(this.mostrarUser == false){
      formValue.UserId=  this.form.value.UserId.UserId
    }

    if(this.mostrarUser == true){
      formValue.UserId= undefined
    }
    if((this.mostrarUser == true && formValue.name != ""&& formValue.surname != ""&&
    formValue.DocumentTypeId != ( 0 || undefined)&& 
    // formValue.identification != ""&&
    // formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
    // formValue.phone != ""&& 
    formValue.email != ""
      // formValue.nationality != ("" || undefined) && 
      // formValue. date_of_birth!= ("" || undefined)
      )||(this.mostrarUser == false && formValue.UserId != ( 0 || undefined))
    ){
    // console.log(formValue)
      this.bandera=true
            this.investigadorColaboladorService.createItem(formValue).subscribe(
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
                        detail: 'Investigador Colabolador Creado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.volver()
                          // this.router.navigateByUrl('/usuarios/InvestigatorCollaborator');
                          clearInterval(interval); 
                        }
                     
                  }, 1000);
                }
              },async error => {
                // console.log(error)
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

// addGenero(e:Event){
//   e.preventDefault()

//   this.ref1 = this.dialogService.open(Create_genderComponent, {
//     width: '35%',
//     height: '50%',
//     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
//     baseZIndex: 10000,
//     data: {
//       id: '1'
//   },
// });

// this.ref1.onClose.subscribe((person: any) =>{
//     if (person) {
//         this.messageService.add({severity:'info', summary: 'Genero Creado', detail: person.name,life: 2000});
//     this.getAllgenders()

//       }
// });
// }


// addTipoDocumento(e:Event){
//   e.preventDefault()

//   this.ref1 = this.dialogService.open(Create_documentTypeComponent, {
//     width: '35%',
//     height: '50%',
//     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
//     baseZIndex: 10000,
//     data: {
//       id: '1'
//   },
// });

// this.ref1.onClose.subscribe((person: any) =>{
//     if (person) {
//         this.messageService.add({severity:'info', summary: 'Tipo de Documento Creado', detail: person.name,life: 2000});
//     this.getAlldocumentTypes()

//       }
// });
// }
}
