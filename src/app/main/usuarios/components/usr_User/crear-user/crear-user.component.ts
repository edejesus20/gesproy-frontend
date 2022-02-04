import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserI } from 'src/app/models/authorization/usr_User';
import { MessageService } from 'primeng/api';
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
  public displayedColumns: string[] = ['roles'];

  
  public form:FormGroup=this.formBuilder.group({
    
    fullName: ['', [Validators.required]],
    identification: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,
    private messageService:MessageService
   
  ) { }

  ngOnInit(): void {
    this.getUsrRoles()
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles = rolesFromApi.roles;
      //console.log(this.roles);
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

    
    public onSubmit(f:NgForm) {
      // console.log(f)
      if(f.form.value.name != "" && f.form.value.nit != "" && f.form.value.addres != ""){
        const formValue: UserI = {
          username: f.form.value.username,
          Person:{ 
            identification: f.form.value.identification,
            name: f.form.value.name,
            surname: f.form.value.surname,
          },
          email: f.form.value.email,
          fullName: f.form.value.fullName,
          password: f.form.value.password,
        };
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
                  detail: 'Registro de Usuario Creado con exitoso'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.router.navigateByUrl('/usuarios/users');
                    clearInterval(interval); 
                   }
            }, 1000);
        },async error => {
          if(error != undefined) {
            const text = await translate(error.error.message, "es");
            this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
          }
        });
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
    }
  }
}
