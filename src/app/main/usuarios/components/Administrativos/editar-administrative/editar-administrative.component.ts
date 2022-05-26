import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { ChargeAdministrativeI } from 'src/app/models/user/administrative';
@Component({
  selector: 'app-editar-administrative',
  templateUrl: './editar-administrative.component.html',
  styleUrls: ['./editar-administrative.component.css'],
  providers: [DialogService]
})
export class EditarAdministrativeComponent implements OnInit {

  public mostrar:number=1;

  public mostrar2:boolean=true;
  public algo:number[]=[0];

  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:FormGroup=this.formBuilder.group({ });
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarters: HeadquarterI[]=[]
  public charges:ChargeI[]=[]
  public Charges1:any[] = [];

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
      Charges: this.formBuilder.array([this.formBuilder.group({
        ChargeId:['', [Validators.required]],
        date:['', [Validators.required]]})]),
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
          for (const key of this.headquarters) {
            if(key.id != undefined && key.id == parseInt(cnt_groupFromApi.administrative.HeadquarterId)){
              this.form.controls['HeadquarterId'].setValue(key)
            }
          }
          // if(cnt_groupFromApi.administrative.Headquarter != undefined)
          // this.headquarterService.getItem(parseInt(cnt_groupFromApi.administrative.HeadquarterId)).subscribe((algo2)=>{
          //   this.form.controls['HeadquarterId'].setValue(algo2.headquarter)   
          //  }) 
            // if(cnt_groupFromApi.administrative.User?.Person?.DocumentTypeId != undefined){
            //   this.documentTypeService.getItem(parseInt(cnt_groupFromApi.administrative.User?.Person?.DocumentTypeId)).subscribe((algo3)=>{
                
                // this.form.controls['GenderId'].setValue(algo1.gender)
          

                // console.log(cnt_groupFromApi.administrative);
        // console.log(this.form.value);
                // })
              // }
      
        // })
        this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.administrative.User?.Person?.DocumentType)


        if(cnt_groupFromApi.administrative.ChargeAdministratives?.length != undefined
          && cnt_groupFromApi.administrative.ChargeAdministratives.length > 0){
            this.agregar(cnt_groupFromApi.administrative.ChargeAdministratives)
          // this.chargeService.getItem(parseInt(cnt_groupFromApi.administrative.ChargeId)).subscribe( (algo4)=>{
          //   this.form.controls['ChargeId'].setValue(algo4.charge)
          // })
          
        }
      }
      }
      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }
  agregar(ChargeAdministratives:ChargeAdministrativeI[]) {
    if(ChargeAdministratives.length){
      for (let key of ChargeAdministratives) {
        if(key.ChargeId != undefined) {
          // console.log(DiscountLine)
          let control = <FormArray>this.form.controls['Charges']
          let Charge:any | null=null

          for (const key2 of this.charges) {
            if(key2.id == key.ChargeId && key.status == true) {
              Charge=key2
          }
        }
          if(Charge != null){
            control.push(this.formBuilder.group({UserId:this.form.value.id,ChargeId:[Charge, 
              [Validators.required]],
            date:[key.date, [Validators.required]]}))

          }

            // this.rolesService.getOneRole(key.RoleId).subscribe((algo)=>{
            //   if(algo.role && key.name != undefined){
            //   }
            // })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['Charges']
      control.removeAt(0)
    }
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
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }


  public onSubmit(e: Event) {
    e.preventDefault()

    let formValue={
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
      Charges: this.form.value.Charges,
      HeadquarterId: this.form.value.HeadquarterId.id,
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
    };

    if(this.Charges1.length == 0 || this.Charges1.length == undefined){
      this.Charges1=[]
      let control = <FormArray>this.form.controls['Charges']
      for (const key of control.value) {
        key.ChargeId=key.ChargeId.id 
        this.Charges1.push({
          date:key.date,
        ChargeId:key.ChargeId,
        })
      }
      formValue.Charges = this.form.value.Charges
      // console.log('aqui')
    }else{
      formValue.Charges = this.Charges1
      // console.log('aqui2')

    }


    if(this.form.value.Charges[0].ChargeId == '' ||
    this.form.value.Charges[0].ChargeId == undefined ||this.Charges1.length == undefined){
      // this.form.value.Workexperiences=[]
      formValue.Charges=[]

    }

            if(formValue.name != ""&&
              formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&&
              // formValue.ChargeId != ( 0 || undefined)&&
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

  get getRoles() {
    return this.form.get('Charges') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Charges']
    
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({
        ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
      }))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
    }))
    this.mostrar2=true
    //nuevo input
    }
     
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Charges']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
     control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]],
     }))//nuevo input

    }
  }
}
