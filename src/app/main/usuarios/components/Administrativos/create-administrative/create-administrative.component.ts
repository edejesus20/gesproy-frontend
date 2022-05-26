import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { ChargeI } from 'src/app/models/user/charge';
import { PersonI } from 'src/app/models/user/person';
import { UserService } from 'src/app/core/services/usuarios/user.service';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Create_ChargeComponent } from '../../Cargo/create_Charge/create_Charge.component';
import { ChargeService } from 'src/app/core/services/investigacion/Charge.service';

let uploadefiles:Array<File>
@Component({
  selector: 'app-create-administrative',
  templateUrl: './create-administrative.component.html',
  styleUrls: ['./create-administrative.component.css'],
  providers: [DialogService]

})
export class CreateAdministrativeComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public form:FormGroup=this.formBuilder.group({
    name:[''],
    surname:[''],
    DocumentTypeId:[1],
    identification:[''],
    // GenderId:[''],
    // address:[''],
    // phone:[''],
    email:[''],
    UserId:[''],
    // nationality:[''],
    // date_of_birth:[''],
    HeadquarterId:['', [Validators.required]],
    Charges: this.formBuilder.array([this.formBuilder.group({
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]]})]),

   });

   public mostrarUser:boolean=false;
   public users:PersonI[]=[];
   public Charges1:any[] = [];
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public headquarters: HeadquarterI[]=[]
  public charges:ChargeI[]=[]
  public mostrarDialogo:boolean=false;

  public ref1:any;
  constructor(
    public ref: DynamicDialogRef,

    public dialogService: DialogService,
    private administrativeService:AdministrativeService,

    private headquarterService: HeadquarterService,
    private chargeService:ChargeService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private router: Router,
    private userService:UserService,
    public config: DynamicDialogConfig,

    // private http: HttpClient,
  ) { }

  ngOnInit() {
    // this.getAllgenders()
    // this.getAlldocumentTypes()
    this.getAllheadquarters()
    this.getAllocupations()
    this.getAllUser()
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
  }
  public cancelar(){
    this.ref.close(undefined);
  }
  getAllUser() {
    this.userService.userteacher().subscribe(
      (AdministrativeFromApi) => {
        this.users = AdministrativeFromApi.userseadministrative;
        // console.log(this.users)
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
    this.chargeService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.charges = AdministrativeFromApi.charges;
      }, error => console.error(error));
  }

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


    console.log(formValue)

    if(this.mostrarUser == false){
      formValue.UserId=  this.form.value.UserId.UserId
    }

    if(this.mostrarUser == true){
      formValue.UserId= undefined
    }
    if((this.mostrarUser == true && formValue.name != ""&& 
    formValue.surname != ""&&
    formValue.DocumentTypeId != ( 0 || undefined)&& 
    // formValue.identification != ""&&
    // formValue.GenderId != ( 0 || undefined)&& formValue.address != ""&&
    // formValue.phone != ""&& 
    formValue.email != ""
      // formValue.nationality != ("" || undefined) && 
      // formValue. date_of_birth!= ("" || undefined)
      )
    ||(this.mostrarUser == false && formValue.UserId != ( 0 || undefined))
    ){
    // console.log(formValue)

            this.administrativeService.createItem(formValue).subscribe(
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
                        detail: 'Registro de Administrativo Creado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.router.navigateByUrl('/usuarios/Administrative');
                          clearInterval(interval); 
                        }
                  }, 1000);
                }
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



  addOcupacion(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_ChargeComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Cargo Creado', detail: person.name,life: 2000});
      this.getAllocupations()

        }
  });
  }

  //metodos para agregar controles de Roles
  get getRoles() {
    return this.form.get('Charges') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Charges']
    
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({
        ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
      }))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
        date:['', [Validators.required]],
    }))
    this.mostrar=true
    //nuevo input
    }
     
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Charges']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
     control.push(this.formBuilder.group({
      ChargeId:['', [Validators.required]],
      date:['', [Validators.required]],
     }))//nuevo input

    }
  }

}
