import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { MessageService } from 'primeng/api';
import { GenderI } from 'src/app/models/user/gender';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Create_documentTypeComponent } from '../../TipoDocumento/create_documentType/create_documentType.component';
import { Create_genderComponent } from '../../Genero/create_gender/create_gender.component';
import { CrearRolComponent } from '../../usr_rol/crear-rol/crear-rol.component';
const translate = require('translate');

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css'],
  providers: [DialogService]
})
export class CrearUserComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=true;
  public algo:number[]=[0];

  public roles: RoleI[]=[];
  public Roles1:any[] =[]
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    surname:['', [Validators.required]],
    DocumentTypeId:[1],
    identification:[''],
    // GenderId:['', [Validators.required]],
    // address:['', [Validators.required]],
  //  phone:['', [Validators.required]],
    email:['', [Validators.required]],
    // nationality: ['', [Validators.required]],
    // date_of_birth: ['', [Validators.required]],
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['']})]),
  });
  public mostrarDialogo:boolean=false;
  // public TipoUser:string=''
  public ref1:any;
  constructor(
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,
    private messageService:MessageService,

    public ref: DynamicDialogRef,
 public config: DynamicDialogConfig,
    
     
  ) { }

  ngOnInit(): void {

    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }

    }else{
      this.mostrarDialogo= false

    }
    
    this.getUsrRoles()
    // this.getAllgenders()
    // this.getAlldocumentTypes()
  }
  public cancelar(){
    this.ref.close(undefined);
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      for (let key of rolesFromApi.roles) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.roles = rolesFromApi.roles;
      // console.log(this.roles);
    }, error => console.error(error));
  }



     //metodos para agregar controles de Roles
     get getRoles() {
      return this.form.get('Roles') as FormArray;//obtener todos los formularios
    }
  
    addRoles(event: Event){
      event.preventDefault();
      const control = <FormArray>this.form.controls['Roles']
      this.mostrar=true
      //console.log(control)      
        //crear los controles del array
      // if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({RoleId:['']}))//nuevo input
      // }
      // if(control.length >= 1 && this.mostrar == true){
      //   control.push(this.formBuilder.group({RoleId:['']}))//nuevo input
      // }
       
    }
    removeRoles(index: number,event: Event){
      event.preventDefault();
      let control = <FormArray>this.form.controls['Roles']//aceder al control
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrar=false
      //  control.push(this.formBuilder.group({RoleId:['']}))//nuevo input

      }
    }

    public onSubmit(e: Event) {
      e.preventDefault()
  
      let formValue:any
      // if(this.mostrarDialogo!= true){
        formValue={
          name: this.form.value.name,
          surname: this.form.value.surname,
          DocumentTypeId: this.form.value.DocumentTypeId,
          identification: this.form.value.identification,
          // GenderId: this.form.value.GenderId.id,
          // address: this.form.value.address,
          // phone: this.form.value.phone,
          username:'',
          fullName:'',
          email:this.form.value.email,
          password:this.form.value.identification,
          UserId: 0,
          Roles:this.form.value.Roles,
          // nationality: this.form.value.nationality,
          // date_of_birth: this.form.value.date_of_birth,
        };


              
      if(this.Roles1.length == 0 || this.Roles1.length == undefined){
        this.Roles1=[]
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


      if(this.form.value.Roles[0].RoleId == '' ||
      this.form.value.Roles[0].RoleId == undefined ||this.Roles1.length == undefined){
        // this.form.value.Workexperiences=[]
        formValue.Roles=[]
  
      }


      console.log(formValue)
              if(formValue.name != ""&&
                formValue.surname != ""&&
                formValue.DocumentTypeId != ( 0 || undefined)&&
                // formValue.identification != ""&&
                // formValue.GenderId != ( 0 || undefined)&&
                // formValue.address != ""&&
                // formValue.phone != ""&&
                formValue.email != ""
                //  && 
                // formValue.nationality != "" && 
                // formValue. date_of_birth!= ""
                ){
  
              this.userService.createUser(formValue).subscribe(
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
                    detail: 'Registro de Usuario Creado con exito'});
                    }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      this.router.navigateByUrl('/usuarios/users');
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
