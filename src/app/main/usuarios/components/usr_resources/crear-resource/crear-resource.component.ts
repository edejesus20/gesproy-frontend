import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-crear-resource',
  templateUrl: './crear-resource.component.html',
  styleUrls: ['./crear-resource.component.css']
})
export class CrearResourceComponent implements OnInit {
  public roles: RoleI[]=[];
  public mostrar:boolean=false;
  public algo:number[]=[0];
  public displayedColumns: string[] = ['roles'];
  public form:FormGroup=this.formBuilder.group({
    path: ['', [Validators.required]],
    method: ['', [Validators.required]],
    id_padre: ['', [Validators.required]],
    icono: ['', [Validators.required]],
    link: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private resourcesService: ResourcesService,
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
    const formValue: ResourceI = this.form.value;
    this.resourcesService.createResource(formValue).subscribe(
      () => {
        this.snackBar.open('Recurso creado exitosamente', 'Ok', {
          duration: 5000,
        });
        this.router.navigateByUrl('/usuarios/resources');
      },
      err => {
        this.snackBar.open('Error. El Recurso no pudo ser creado', 'Ok', {
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


  get path() { return this.form.get('path'); }
  get method() { return this.form.get('method'); }
  get id_padre() { return this.form.get('id_padre'); }
  get icono() { return this.form.get('icono'); }
  get link() { return this.form.get('link'); }
  get titulo() { return this.form.get('titulo'); }
  get Roles() { return this.form.get('Roles'); }
}
