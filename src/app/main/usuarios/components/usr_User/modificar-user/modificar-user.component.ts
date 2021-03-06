import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { GenderI } from 'src/app/models/user/gender';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { CrearRolComponent } from '../../usr_rol/crear-rol/crear-rol.component';
const translate = require('translate');
@Component({
  selector: 'app-modificar-user',
  templateUrl: './modificar-user.component.html',
  styleUrls: ['./modificar-user.component.css'],
  providers: [DialogService]
})
export class ModificarUserComponent implements OnInit {
  public image:string='assets/images/images.jpg'
  public bandera:boolean=false

  public mostrar:number=1;
  public mostrar2:boolean=false;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public form:FormGroup=this.formBuilder.group({});
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public roles: RoleI[]=[];
  public Roles1:any[] =[]

  public ref1:any;
  constructor(
    public dialogService: DialogService,
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
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
      // nationality: ['', [Validators.required]],
      // date_of_birth: ['', [Validators.required]],
      Roles: this.formBuilder.array([this.formBuilder.group({
        UserId:0,RoleId:['', [Validators.required]]})]),

    });
  
      this.getUsrRoles()
  
      // this.getAllgenders()
      // this.getAlldocumentTypes()
    }
    getUsrRoles() {
      this.rolesService.getRole().subscribe((rolesFromApi) => {
        for (let key of rolesFromApi.roles) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.roles = rolesFromApi.roles;
        //console.log(this.roles);
      }, error => console.error(error));
    }

  public onSubmit(e:Event) {
    e.preventDefault();
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
      UserId:this.form.value.id,
      Roles:this.form.value.Roles,
      // nationality: this.form.value.nationality,
      // date_of_birth: this.form.value.date_of_birth,
    };
    if(this.Roles1.length == 0  || this.Roles1.length == undefined){
      let control = <FormArray>this.form.controls['Roles']
      for (const key of control.value) {
        key.RoleId=key.RoleId.id 
        this.Roles1.push({
          UserId:this.form.value.id,
        RoleId:key.RoleId,
        })
      }
      formValue.Roles = this.form.value.Roles
      // console.log('aqui')
    }else{
      formValue.Roles = this.Roles1
      // console.log('aqui2')

    }
    if(this.form.value.Roles[0].RoleId == '' ||
      this.form.value.Roles[0].RoleId == undefined ||this.Roles1.length == undefined){
        // this.form.value.Workexperiences=[]
        formValue.Roles=[]
  
      }
    // console.log(formValue)
            if(formValue.name != ""&&
              formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&&
              formValue.identification != ""&&
              formValue.id != ( 0 || undefined)&&
              // formValue.address != ""&&
              // formValue.phone != ""&&
              formValue.email != ""
              // &&
              // formValue.nationality != "" && 
              // formValue. date_of_birth!= ""
              ){
                this.bandera=true

            this.userService.updateUser(formValue).subscribe(
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
                        detail: 'Registro de Usuario Actualizado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.ngOnInit()
                          this.volver(new Event(''))
                         this.bandera=false
                          // this.router.navigateByUrl('/usuarios/users');
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



public volver(event: Event){
  event.preventDefault
  this.tabla = true
  this.mostrar2 = false
  this.displayMaximizable2 = false
  this.ngOnInit()
  this.bandera=false
  this.Roles1=[]

}

ngOnDestroy() {
  this.tabla = true
  this.mostrar2 = false
  this.displayMaximizable2 = false
  this.ngOnInit()
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {
  this.userService.getOneUser(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.user.id != undefined
      ){
      // console.log(cnt_groupFromApi.user)
      // console.log(cnt_groupFromApi.rolesUsers)
        this.form.controls['id'].setValue(id)
        if(cnt_groupFromApi.user?.Person != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.user.Person.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.user.Person.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.user.Person.identification)
          // this.form.controls['address'].setValue(cnt_groupFromApi.user.address)
          // this.form.controls['phone'].setValue(cnt_groupFromApi.user.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.user.email)

          // this.form.controls['nationality'].setValue(cnt_groupFromApi.user.nationality)
          // this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.user.date_of_birth)
          // console.log('aqui')
          this.form.controls['DocumentTypeId'].setValue(cnt_groupFromApi.user.Person.DocumentType)

          }

          // if(cnt_groupFromApi.user.DocumentTypeId != undefined)
          // this.documentTypeService.getItem(parseInt(cnt_groupFromApi.user.DocumentTypeId)).subscribe((algo)=>{
          // })
  
   

        // if(cnt_groupFromApi.user.GenderId != undefined)
        // this.genderService.getItem(parseInt(cnt_groupFromApi.user.GenderId)).subscribe((algo)=>{
        //   this.form.controls['GenderId'].setValue(algo.gender)
        // })

        if(cnt_groupFromApi.rolesUsers.length != undefined && cnt_groupFromApi.rolesUsers.length > 0){
          
          this.agregarDescuentos(cnt_groupFromApi.rolesUsers)
          
        }
        // console.log(this.form.value)
      
    }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(rolesUsers: any[]) {
    if(rolesUsers.length){
      for (let key of rolesUsers) {
        if(key.RoleId != undefined) {
          // console.log(DiscountLine)
          let control = <FormArray>this.form.controls['Roles']
          let Role:any | null=null
          for (const key2 of this.roles) {
            if(key2.id == key.RoleId){
              Role=key2
            }
            
          }
          if(Role != null){
            control.push(this.formBuilder.group({UserId:this.form.value.id,RoleId:[Role, [Validators.required]]}))

          }

            // this.rolesService.getOneRole(key.RoleId).subscribe((algo)=>{
            //   if(algo.role && key.name != undefined){
            //   }
            // })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['Roles']
      control.removeAt(0)
    }
  }

  get getRoles() {
    return this.form.get('Roles') as FormArray;//obtener todos los formularios
  }
  
    addRoles(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Roles']
        if(control.length == 0 && this.mostrar2 == false){
          control.push(this.formBuilder.group(
            { UserId:this.form.value.id,
              RoleId:['', [Validators.required]]}))
        }
        if(control.length >= 1 && this.mostrar2 == true){
          control.push(this.formBuilder.group({UserId:this.form.value.id,
            RoleId:['', [Validators.required]]}))
  
        }
        this.mostrar2=true
    }

    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Roles']//aceder al control
      control.removeAt(index)
        if(control.length <= 0){
        this.mostrar2=false
        control.push(this.formBuilder.group({UserId:this.form.value.id,
          RoleId:['']}))
        }
    }


    addroles(e:Event){
      e.preventDefault()
    
      this.ref1 = this.dialogService.open(CrearRolComponent, {
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
            this.messageService.add({severity:'info', summary: 'Rol Creado', detail: person.name,life: 2000});
        this.getUsrRoles()
    
          }
    });
    }
}
