import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import {  UserLoginI } from 'src/app/models/authorization/usr_User';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderI } from 'src/app/models/user/gender';
const translate = require('translate');

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  public form: FormGroup=this.formBuilder.group({});
  public mostrar:boolean =false;
  displayMaximizable:boolean=true
  // public form2:FormGroup=this.formBuilder.group({
  //   username:['', [Validators.required]],
  //   password:['', [Validators.required]],
  //  });
  selectedCities3: any[]=[];
  cities: RoleI[]=[];
  public image :string='assets/img/logo-uniguajira.png'

   public images: any[]=[
    
    {
        "previewImageSrc": "assets/images/fondo2.jpg",
        "thumbnailImageSrc": "assets/images/bloque2.jpg",
        "alt": "Description for Image 5",
        "title": "Title 5"
    },
    {
      "previewImageSrc": "assets/images/bloque2.jpg",
      "thumbnailImageSrc": "assets/images/fondo2.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
  },
     {
      "previewImageSrc": "assets/images/bloque.jpg",
      "thumbnailImageSrc": "assets/images/fondo2.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
  },
  {
    "previewImageSrc": "assets/images/fondo2.jpg",
    "thumbnailImageSrc": "assets/images/bloque2.jpg",
    "alt": "Description for Image 5",
    "title": "Title 5"
},
  {
    "previewImageSrc": "assets/images/bloque.jpg",
    "thumbnailImageSrc": "assets/images/fondo2.jpg",
    "alt": "Description for Image 3",
    "title": "Title 3"
},
];

public responsiveOptions:any[] = [
   {
       breakpoint: '768px',
       numVisible: 5
   },
  
];
blockSpecial: RegExp = /^[^<>*!]+$/ 

public documentTypes:DocumentTypeI[]=[]
public genders:GenderI[] =[]
public Roles1:any[] =[]

  constructor(
    private formBuilder: FormBuilder,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
    private router: Router, 
    private authService:AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private rolesService: RolesService,

  ) { 
  }

  ngOnInit(): void {
this.rolesService.getRole().subscribe(role => {
  if(role.roles){
    for (const key of role.roles) {

      if(key.name.toLocaleLowerCase() === 'docente'){
        this.cities.push(key)
  
      }
      if(key.name.toLocaleLowerCase() === 'administrativo'){
        this.cities.push(key)

      }
      
    }
  }
})

    var token :string | null= localStorage.getItem('token');
    var user :string | null= localStorage.getItem('user');
    // var menu :string | null= localStorage.getItem('menu');
    if(token!=null && user!=null){
        // this.showSuccess()
      let userObjeto:any = JSON.parse(user); 
      // let menuObjeto:any = JSON.parse(menu); 
      let userLoginResponse={
        user:userObjeto,
        token:token,
      }
        this.router.navigateByUrl('/welcome'); 
    }else{
 
    }
    this.buildForm();
    // this.getAllgenders()
    // this.getAlldocumentTypes()
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
  private buildForm(){
    this.form = this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:[1],
    identification:['', [Validators.required]],
    // GenderId:['', [Validators.required]],
    // address:['', [Validators.required]],
    // phone:['', [Validators.required]],
    email:['', [Validators.required]],
    // nationality: ['', [Validators.required]],
    // date_of_birth: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    Roles:['', [Validators.required]]
    // documentTypeId: [1]
    });
  }

  onSubmit(){
    let formValue={
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId,
      identification: this.form.value.identification,
      // GenderId: this.form.value.GenderId.id,
      // address: this.form.value.address,
      // phone: this.form.value.phone,
      email:this.form.value.email,
      password:this.form.value.password,
      Roles: this.form.value.Roles
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
    };

    if(this.Roles1.length == 0 || this.Roles1.length == undefined){
      this.Roles1=[]
      // let control = <FormArray>this.form.controls['Roles']
      for (const key of this.form.value.Roles) {
        this.Roles1.push({
        RoleId:key.id,
        })
      }
      formValue.Roles = this.Roles1
      console.log('aqui')
    }else{
      formValue.Roles = this.Roles1
    }


    // if(formValue.Roles[0].RoleId == '' ||
    // formValue.Roles[0].RoleId == undefined ||this.Roles1.length == undefined){
    //   // this.form.value.Workexperiences=[]
    //   formValue.Roles=[]

    // }

    if(this.form.value.password !== this.form.value.password2){
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Contraseñas No Coinciden'});

    }else{
      if(formValue.name != ""&&
                formValue.surname != ""&&
                formValue.DocumentTypeId != ( 0 || undefined)&&
                formValue.identification != ""&&
                // formValue.GenderId != ( 0 || undefined)&&
                // formValue.address != ""&&
                // formValue.phone != ""&&
                formValue.email != "" && 
                formValue.password != "" 
                // && 
                // formValue.nationality != "" && 
                // formValue. date_of_birth!= ""
                ){
                  console.log(formValue)
  
              this.userService.createUser(formValue).subscribe(
                (algo) => {
                    var date = new Date('2020-01-01 00:00:03');
                    function padLeft(n:any){ 
                      return n ="00".substring(0, "00".length - n.length) + n;
                    }
                    var interval = setInterval(() => {
                    var minutes = padLeft(date.getMinutes() + "");
                    var seconds = padLeft(date.getSeconds() + "");
                    if( seconds == '03') {
                    this.messageService.add({severity:'success', summary: 'Success', 
                    detail: 'Registro de Usuario Creado con exito'});
                    }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      this.router.navigateByUrl('/login');
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
    

    
  }




  


}
