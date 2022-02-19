import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { assinRoleUserI } from 'src/app/models/usr_assinRoleUser';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserI } from 'src/app/models/authorization/usr_User';
import { PersonI } from 'src/app/models/user/person';

@Component({
  selector: 'app-asignar-rol-user',
  templateUrl: './asignar-rol-user.component.html',
  styleUrls: ['./asignar-rol-user.component.css']
})
export class AsignarRolUserComponent implements OnInit {
  public users:PersonI[]=[]
  public mostrar:boolean = false
  public roles: RoleI[]=[];
  public dataSource:any=[]
  public displayedColumns: string[] = ['ID','fullName','username','email','Rol'];
  public displayedColumns2: string[] =['roles'];
  public algo:number[]=[0];
  
  public form1:FormGroup=this.formBuilder.group({
    select: ['', [Validators.required]],
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private userService: UserService,
    private router: Router,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser()
  this.getUsrRoles()
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles = rolesFromApi.roles;
      //console.log(this.roles);
    }, error => console.error(error));
  }
  getUser() {
    this.userService.getUser().subscribe((userFromApi) => {
      this.users = userFromApi.users;
      // this.dataSource = new MatTableDataSource(this.users)
      //console.log(this.users)
      //console.log(this.dataSource)
    }, error => console.error(error));
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.mostrar = true;
  }
  //enviar formularo asignar roles a usuarios
  public onSubmit1():void {
    const formValue1: assinRoleUserI = {
      UserId:this.form1.value.select,
      Roles:this.form1.value.Roles
    }
    this.rolesService.assinRole(formValue1).subscribe(
      () => {
        // this.snackBar.open('Rol asignado exitosamente', 'Ok', {
        //   duration: 5000,
        // });
        this.router.navigateByUrl('/usuarios/users');
      },
      err => {
        // this.snackBar.open('Error. La Asignacion no pudo ser realizada', 'Ok', {
        //   duration: 5000,
        // });
        console.error(err);
      }
    );
  }

  //para metodos asignar roles
  get getRoles() {
    return this.form1.get('Roles') as FormArray;//obtener todos los formularios
  }


  asignarRoles(event: Event){
    event.preventDefault();
      const control = <FormArray>this.form1.controls['Roles']
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
      let control = <FormArray>this.form1.controls['Roles']//aceder al control
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrar=false
      }
  }


}
