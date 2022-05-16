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
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Create_ChargeComponent } from '../../Cargo/create_Charge/create_Charge.component';
import { ChargeService } from 'src/app/core/services/investigacion/Charge.service';
import { ChargeI } from 'src/app/models/user/charge';
@Component({
  selector: 'app-editar-administrative',
  templateUrl: './editar-administrative.component.html',
  styleUrls: ['./editar-administrative.component.css'],
  providers: [DialogService]
})
export class EditarAdministrativeComponent implements OnInit {

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({ });
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarters: HeadquarterI[]=[]
  public charges:ChargeI[]=[]

  public ref:any;
  constructor(
    public dialogService: DialogService,
    private administrativeService:AdministrativeService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private headquarterService: HeadquarterService,
    private chargeService:ChargeService,
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
      // GenderId:['', [Validators.required]],
      // address:['', [Validators.required]],
      // phone:['', [Validators.required]],
      email:['', [Validators.required]],
      HeadquarterId:['', [Validators.required]],
      ChargeId:['', [Validators.required]],
      // nationality:['', [Validators.required]],
      // date_of_birth:['', [Validators.required]],
     });
  
      // this.getAllgenders()
      // this.getAlldocumentTypes()
      this.getAllheadquarters()
      this.getAllCharges()
    }

    
    private getAllheadquarters(selectId?: number) {
      this.headquarterService.getList().subscribe(
        (AdministrativeFromApi) => {
          // console.log(AdministrativeFromApi.administratives)
          this.headquarters = AdministrativeFromApi.headquarters;
        }, error => console.error(error));
    }
  
    private getAllCharges(selectId?: number) {
      this.chargeService.getList().subscribe(
        (AdministrativeFromApi) => {
          // console.log(AdministrativeFromApi.administratives)
          this.charges = AdministrativeFromApi.charges;
        }, error => console.error(error));
    }
  getOneCntAccount(id:number) {
    this.administrativeService.getItem(id).subscribe((cnt_groupFromApi) => {
       if(cnt_groupFromApi.administrative.id != undefined
      ){
      // console.log(cnt_groupFromApi.administrative)
        this.form.controls['id'].setValue(cnt_groupFromApi.administrative.id)
        if(cnt_groupFromApi.administrative.User?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.administrative.User.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.administrative.User.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.administrative.User.Person.identification)
          // this.form.controls['address'].setValue(cnt_groupFromApi.administrative.User.Person.address)
          // this.form.controls['phone'].setValue(cnt_groupFromApi.administrative.User.Person.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.administrative.User.email)
            // this.form.controls['nationality'].setValue(cnt_groupFromApi.administrative.User.Person.nationality)
            // this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.administrative.User.Person.date_of_birth)
         

        // if(cnt_groupFromApi.administrative.User?.Person?.GenderId != undefined)
        // this.genderService.getItem(parseInt(cnt_groupFromApi.administrative.User?.Person?.GenderId)).subscribe((algo1)=>{
        
          if(cnt_groupFromApi.administrative.Headquarter != undefined)
          this.headquarterService.getItem(parseInt(cnt_groupFromApi.administrative.HeadquarterId)).subscribe((algo2)=>{
            this.form.controls['HeadquarterId'].setValue(algo2.headquarter)   
           }) 
            // if(cnt_groupFromApi.administrative.User?.Person?.DocumentTypeId != undefined){
            //   this.documentTypeService.getItem(parseInt(cnt_groupFromApi.administrative.User?.Person?.DocumentTypeId)).subscribe((algo3)=>{
                
                // this.form.controls['GenderId'].setValue(algo1.gender)
          

                // console.log(cnt_groupFromApi.administrative);
        // console.log(this.form.value);
                // })
              // }
      
        // })
        this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.administrative.User?.Person?.DocumentType)


        if(cnt_groupFromApi.administrative.Charge != undefined){
          this.chargeService.getItem(parseInt(cnt_groupFromApi.administrative.ChargeId)).subscribe( (algo4)=>{
            this.form.controls['ChargeId'].setValue(algo4.charge)
          })
          
        }
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
      ChargeId: this.form.value.ChargeId.id,
      HeadquarterId: this.form.value.HeadquarterId.id,
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
    };

            if(formValue.name != ""&&
              formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&&
              formValue.ChargeId != ( 0 || undefined)&&
              formValue.HeadquarterId != ( 0 || undefined)&&
              formValue.identification != ""&&
              // formValue.GenderId != ( 0 || undefined)&&
              // formValue.address != ""&&
              // formValue.phone != ""&&
              formValue.email != ""
              // &&
              // formValue.nationality != ("" || undefined) 
              // && 
              // formValue. date_of_birth!= ("" || undefined)
              ){


            this.administrativeService.updateItem(formValue.id,formValue).subscribe(
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
                        detail: 'Registro de Administrativo Actualizado con exito'});
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


  addOcupacion(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_ChargeComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Cargo Creado', detail: person.name,life: 2000});
      this.getAllCharges()

        }
  });
  }
}
