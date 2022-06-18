import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InvestigadorColaboladorService } from 'src/app/core/services/usuer/InvestigadorColabolador.service';
@Component({
  selector: 'app-edit_InvestigatorCollaborator',
  templateUrl: './edit_InvestigatorCollaborator.component.html',
  styleUrls: ['./edit_InvestigatorCollaborator.component.css'],
  providers: [DialogService]
})
export class Edit_InvestigatorCollaboratorComponent implements OnInit {
  public bandera:boolean=false

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({ });
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public image:string='assets/images/images.jpg'


  public ref:any;
  constructor(
    public dialogService: DialogService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private investigadorColaboladorService:InvestigadorColaboladorService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      id:[''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      DocumentTypeId:['', [Validators.required]],
      identification:['', [Validators.required]],
      email:['', [Validators.required]],

     });
  

   }


  getOneCntAccount(id:number) {
    this.investigadorColaboladorService.getItem(id).subscribe((cnt_groupFromApi) => {
       if(cnt_groupFromApi.investigatorCollaborator.id != undefined
      ){
      // console.log(cnt_groupFromApi.administrative)
        this.form.controls['id'].setValue(id)
        if(cnt_groupFromApi.investigatorCollaborator.User?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.identification)
          // this.form.controls['address'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.address)
          // this.form.controls['phone'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.investigatorCollaborator.User.email)
            // this.form.controls['nationality'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.nationality)
            // this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.investigatorCollaborator.User.Person.date_of_birth)
          

        // if(cnt_groupFromApi.investigatorCollaborator.User?.Person?.GenderId != undefined){
        // this.genderService.getItem(parseInt(cnt_groupFromApi.investigatorCollaborator.User?.Person?.GenderId)).subscribe((algo1)=>{
        //     if(cnt_groupFromApi.investigatorCollaborator.User?.Person?.DocumentTypeId != undefined){
        //       this.documentTypeService.getItem(parseInt(cnt_groupFromApi.investigatorCollaborator.User?.Person?.DocumentTypeId)).subscribe((algo3)=>{
                
                this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.investigatorCollaborator.User?.Person?.DocumentType)
                // this.form.controls['GenderId'].setValue(algo1.gender)
               
        //         })
        //       }
      
        // })
      // }
          }
    }

        
      
      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    //console.log(event)
    this.bandera=false

  }

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }


  public onSubmit(e: Event) {
    e.preventDefault()

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
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
    };
    // console.log(formValue)

            if(formValue.name != ""&&
              formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&&
              formValue.identification != ""&&
              // formValue.GenderId != ( 0 || undefined)&&
              formValue.id != ( 0 || undefined)&&
              // formValue.address != ""&&
              // formValue.phone != ""&&
              formValue.email != ""
              // &&
              // formValue.nationality != ("" || undefined) && 
              // formValue. date_of_birth!= ("" || undefined)
              ){

                this.bandera=true

            this.investigadorColaboladorService.updateItem(formValue.id,formValue).subscribe(
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
                        detail: 'Investigador Colabolador Actualizado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.ngOnInit()
                          this.volver(new Event(''))
                         this.bandera=false
                          // this.router.navigateByUrl('/usuarios/InvestigatorCollaborator');
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
          }else{
            this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
          }
  }

  // addGenero(e:Event){
  //   e.preventDefault()
  
  //   this.ref = this.dialogService.open(Create_genderComponent, {
  //     width: '35%',
  //     height: '50%',
  //     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
  //     baseZIndex: 10000,
  //     data: {
  //       id: '1'
  //   },
  // });
  
  // this.ref.onClose.subscribe((person: any) =>{
  //     if (person) {
  //         this.messageService.add({severity:'info', summary: 'Genero Creado', detail: person.name,life: 2000});
  //     this.getAllgenders()
  
  //       }
  // });
  // }
  
  
  // addTipoDocumento(e:Event){
  //   e.preventDefault()
  
  //   this.ref = this.dialogService.open(Create_documentTypeComponent, {
  //     width: '35%',
  //     height: '50%',
  //     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
  //     baseZIndex: 10000,
  //     data: {
  //       id: '1'
  //   },
  // });
  
  // this.ref.onClose.subscribe((person: any) =>{
  //     if (person) {
  //         this.messageService.add({severity:'info', summary: 'Tipo de Documento Creado', detail: person.name,life: 2000});
  //     this.getAlldocumentTypes()
  
  //       }
  // });
  // }
}
