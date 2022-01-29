import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserI } from 'src/app/models/authorization/usr_User';


@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

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
    private snackBar: MatSnackBar,
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
  public onSubmit(): void {
    const formValue: UserI = this.form.value;
    this.userService.createUser(formValue).subscribe(
      () => {
        this.snackBar.open('Usuario creado exitosamente', 'Ok', {
          duration: 5000,
        });
        this.router.navigateByUrl('/usuarios/users');
      },
      err => {
        this.snackBar.open('Error. El Usuario no pudo ser creado', 'Ok', {
          duration: 5000,
        });
        console.error(err);
      }
    );
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

    
  get fullName() { return this.form.get('fullName'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }


}
