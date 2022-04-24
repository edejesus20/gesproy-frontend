import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { assinRoleUserI } from 'src/app/models/usr_assinRoleUser';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { PersonI } from 'src/app/models/user/person';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-asignar-rol-user',
  templateUrl: './asignar-rol-user.component.html',
  styleUrls: ['./asignar-rol-user.component.css']
})
export class AsignarRolUserComponent implements OnInit {
  public users:PersonI[]=[]
  public mostrar:boolean = false
  public roles: RoleI[]=[];
  public Roles1:any[] =[]
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public algo:number[]=[0];
 
  selectAll: boolean = false;
  totalRecords: number=0
  first = 0;
  loading: boolean = true;
  rows = 1;
  cols: any[]=[];
  exportColumns: any[]=[];
  selectedProducts: PersonI[]=[];

  public form:FormGroup=this.formBuilder.group({
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private userService: UserService,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser()
  this.getUsrRoles()
  this.loading = false;
  this.primengConfig.ripple = true;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'surname', header: 'Apellido' },
      { field: 'identification', header: 'Identificacion' },
      { field: 'User.email', header: 'Correo Electronico' },
      { field: 'phone', header: 'Telefono' },
      { field: 'address', header: 'Direccion' },
      { field: 'Gender.name', header: 'Genero' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles = rolesFromApi.roles;
      //console.log(this.roles);
    }, error => console.error(error));
  }
  getUser() {
    this.userService.getUser().subscribe((userFromApi) => {
      for (const key of userFromApi.users) {
        if(key.Person != undefined){
          this.users.push(key.Person)
        }
      }
      // this.users = userFromApi.users;
    }, error => console.error(error));
  }
  public onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedProducts = value;
}

public onSelectAllChange(event:any) {
    const checked = event.checked;

    if (checked) {
        this.userService.getUser().subscribe(res => {
            this.selectedProducts = this.users;
            this.selectAll = true;
        });
    }
    else {
        this.selectedProducts = [];
        this.selectAll = false;
    }
}
Buscar(event: Event, dt1:any){
  event.preventDefault();
    const filterValue = (event.target as HTMLInputElement).value;
    dt1.filterGlobal(filterValue, 'contains')
    console.log('aqui',dt1)
}

  public onSubmit(e:Event):void {
    e.preventDefault()
    const array:any=[]
    let arrRoles:any=[]=this.form.value.Roles

    if(this.Roles1.length == 0 || this.Roles1 == []){

      let control = <FormArray>this.form.controls['Roles']
      for (const key of control.value) {
        key.RoleId=key.RoleId.id 
        this.Roles1.push({
        RoleId:key.RoleId,
        })
      }
      arrRoles = this.form.value.Roles
      // console.log('aqui')
    }else{
      arrRoles = this.Roles1
    }

    for (let recurso of this.selectedProducts) { 
      for (let role of arrRoles){
        array.push(
          {
              "UserId":recurso.UserId,
              "RoleId":role.RoleId   
          })
      } 
    }
    const formValue:assinRoleUserI={
      UsersRoles:array
    }


    
    console.log(formValue)

    if(this.selectedProducts != [] && formValue.UsersRoles.length > 0){

      this.rolesService.assinRole(formValue).subscribe(
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
              detail: 'Rol asignado a Usuario con exito'});
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
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan Selecionar Usuarios'});
  }
  
  }


  get getRoles() {
    return this.form.get('Roles') as FormArray;
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Roles']
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))

    }
      this.mostrar=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Roles']
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
    }
  }



}
