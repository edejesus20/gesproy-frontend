import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserI } from 'src/app/models/authorization/usr_User';
import { MessageService } from 'primeng/api';
import { PersonI } from 'src/app/models/user/person';
import { GenderI } from 'src/app/models/user/gender';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
const translate = require('translate');

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  
  public roles: RoleI[]=[];
  public mostrar:boolean=false;
  public algo:number[]=[0];
 
  public documentTypes:DocumentTypeI[]=[]
  public genders:GenderI[] =[]
  public Roles1:any[] =[]
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:['', [Validators.required]],
    identification:['', [Validators.required]],
    GenderId:['', [Validators.required]],
    address:['', [Validators.required]],
    phone:['', [Validators.required]],
    email:['', [Validators.required]],
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,
    private messageService:MessageService,
    private genderService:GenderService,
    private documentTypeService:DocumentTypeService,
   
  ) { }

  ngOnInit(): void {
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


     //metodos para agregar controles de Roles
     get getRoles() {
      return this.form.get('Roles') as FormArray;//obtener todos los formularios
    }
  
    addRoles(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Roles']
      //console.log(control)      
        //crear los controles del array
      if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))//nuevo input
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))//nuevo input
  
      }
        this.mostrar=true
    }
    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Roles']//aceder al control
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrar=false
      }
    }

    public onSubmit(e: Event) {
      e.preventDefault()
  
      const formValue={
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
        UserId: 0,
        Roles:this.form.value.Roles,
      };
      if(this.Roles1.length == 0 || this.Roles1 == []){
        let control = <FormArray>this.form.controls['Roles']
        for (const key of control.value) {
          key.RoleId=key.RoleId.id 
          this.Roles1.push({
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
                formValue.email != ""){
  
              this.userService.createUser(formValue).subscribe(
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
                          detail: 'Registro de Usuario Creado con exito'});
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

}
