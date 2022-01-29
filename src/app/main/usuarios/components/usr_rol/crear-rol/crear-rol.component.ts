import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit {
  
  public roles: RoleI[]=[];
  //variables necesarias para hacer el filtrado de los datos
  public dataSource:any=[]
  public dataSource2:any=[]

  //variables para condiciones en el html
  public desicion:number=0
  public mostrar1:boolean = false
  public mostrar2:boolean = false
  public mostrar3:boolean = false
  //formulario para agregar nuevo usuario
  public form:FormGroup=this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  //formulario para signar roles a usuarios o a recursos
  
  
  
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,

    private router: Router,
    // private snackBar: MatSnackBar,
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
  //enviar formulario nuevo rol
  public onSubmit(): void {
    const formValue: RoleI = this.form.value;
    this.rolesService.createRole(formValue).subscribe(
      () => {
        // this.snackBar.open('Rol creado exitosamente', 'Ok', {
        //   duration: 5000,
        // });
        this.router.navigateByUrl('/usuarios/roles');
      },
      err => {
        // this.snackBar.open('Error. El Rol no pudo ser creado', 'Ok', {
        //   duration: 5000,
        // });
        console.error(err);
      }
    );
  }

 
  get name() { return this.form.get('name'); }


}

