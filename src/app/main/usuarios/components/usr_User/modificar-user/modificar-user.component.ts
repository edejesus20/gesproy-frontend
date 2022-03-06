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

const translate = require('translate');
@Component({
  selector: 'app-modificar-user',
  templateUrl: './modificar-user.component.html',
  styleUrls: ['./modificar-user.component.css']
})
export class ModificarUserComponent implements OnInit {

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

  constructor(
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
      GenderId:['', [Validators.required]],
      address:['', [Validators.required]],
      phone:['', [Validators.required]],
      email:['', [Validators.required]],
      nationality: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      Roles: this.formBuilder.array([this.formBuilder.group({
        UserId:0,RoleId:['', [Validators.required]]})]),

    });
  
      this.getUsrRoles()
  
      this.getAllgenders()
      this.getAlldocumentTypes()
    }
    getUsrRoles() {
      this.rolesService.getRole().subscribe((rolesFromApi) => {
        this.roles = rolesFromApi.roles;
        //console.log(this.roles);
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
  

  public onSubmit(e:Event) {
    e.preventDefault();
    const formValue={
      id: this.form.value.id,
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: this.form.value.DocumentTypeId.id,
      identification: this.form.value.identification,
      GenderId: this.form.value.GenderId.id,
      address: this.form.value.address,
      phone: this.form.value.phone,
      username:'',
      fullName:'',
      email:this.form.value.email,
      password:'',
      UserId:this.form.value.id,
      Roles:this.form.value.Roles,
      nationality: this.form.value.nationality,
      date_of_birth: this.form.value.date_of_birth,
    };
    if(this.Roles1.length == 0 || this.Roles1 == []){
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
    // console.log(formValue)
            if(formValue.name != ""&&
              formValue.surname != ""&&
              formValue.DocumentTypeId != ( 0 || undefined)&&
              formValue.identification != ""&&
              formValue.GenderId != ( 0 || undefined)&&
              formValue.address != ""&&
              formValue.phone != ""&&
              formValue.email != ""&&
              formValue.nationality != "" && 
              formValue. date_of_birth!= ""){

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
                          this.router.navigateByUrl('/usuarios/users');
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



public volver(event: Event){
  event.preventDefault
  this.tabla = true
  this.mostrar2 = false
  this.displayMaximizable2 = false
  this.ngOnInit()
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
        this.form.controls['id'].setValue(cnt_groupFromApi.user.id)
        if(cnt_groupFromApi.user?.User != undefined
          ){
          this.form.controls['name'].setValue(cnt_groupFromApi.user.name)
          this.form.controls['surname'].setValue(cnt_groupFromApi.user.surname)
          this.form.controls['identification'].setValue(cnt_groupFromApi.user.identification)
          this.form.controls['address'].setValue(cnt_groupFromApi.user.address)
          this.form.controls['phone'].setValue(cnt_groupFromApi.user.phone)
          this.form.controls['email'].setValue(cnt_groupFromApi.user.User.email)

          this.form.controls['nationality'].setValue(cnt_groupFromApi.user.nationality)
          this.form.controls['date_of_birth'].setValue(cnt_groupFromApi.user.date_of_birth)
          // console.log('aqui')
       
          }

          if(cnt_groupFromApi.user.DocumentTypeId != undefined)
          this.documentTypeService.getItem(parseInt(cnt_groupFromApi.user.DocumentTypeId)).subscribe((algo)=>{
            this.form.controls['DocumentTypeId'].setValue(algo.documentType)
          })
  
   

        if(cnt_groupFromApi.user.GenderId != undefined)
        this.genderService.getItem(parseInt(cnt_groupFromApi.user.GenderId)).subscribe((algo)=>{
          this.form.controls['GenderId'].setValue(algo.gender)
        })

        if(cnt_groupFromApi.user.User?.Roles != undefined){
          
          this.agregarDescuentos(cnt_groupFromApi.user.User?.Roles)
          
        }
        // console.log(this.form.value)
      
    }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(Roles: RoleI[]) {
    if(Roles.length){
      for (let key of Roles) {
        if(key.id != undefined) {
          // console.log(DiscountLine)
          let control = <FormArray>this.form.controls['Roles']
            this.rolesService.getOneRole(key.id).subscribe((algo)=>{
              if(algo.role && key.name != undefined){
                control.push(this.formBuilder.group({UserId:this.form.value.id,RoleId:[algo.role, [Validators.required]]}))
              }
            })
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
        }
    }

}
