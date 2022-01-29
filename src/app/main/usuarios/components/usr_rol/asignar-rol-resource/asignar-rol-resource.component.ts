import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-asignar-rol-resource',
  templateUrl: './asignar-rol-resource.component.html',
  styleUrls: ['./asignar-rol-resource.component.css']
})
export class AsignarRolResourceComponent implements OnInit {

  public resources: ResourceI[]=[];
  public mostrar:boolean = false
  public roles: RoleI[]=[];
  public dataSource:any=[]
  public selection:any=[]
  public displayedColumns1: string[] = ['ID','titulo','method','path','Roles'];
  public displayedColumns2: string[] =['roles'];
  public algo:number[]=[0];
  //columnas para las tablas

  public form2:FormGroup=this.formBuilder.group({
    //select: ['', [Validators.required]],
    Roles1: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private resourcesService: ResourcesService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  this.getUsrRoles()
  this.getUsrResource()
  }
  getUsrResource() {
  this.resourcesService.getResource().subscribe((ResourceFromApi) => {
    this.resources = ResourceFromApi.resources;
    //this.dataSource2 = new MatTableDataSource(this.resources)
    this.dataSource = new MatTableDataSource<ResourceI>(this.resources);
    this.selection = new SelectionModel<ResourceI>(true, []);
    //console.log(this.resources);
  }, error => console.error(error));
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles = rolesFromApi.roles;
      //console.log(this.roles);
    }, error => console.error(error));
  }


    /** para el checkbox */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }


    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }

      this.selection.select(...this.dataSource.data);
    }


    checkboxLabel(row?: ResourceI): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.mostrar = true;
  }
  //enviar formularo asignar roles a usuarios

    //enviar formularo asignar roles a recursos
    public onSubmit2():void {

      const array:any=[]

      for (let recurso of this.selection._selected) { 

        for (let role of this.form2.value.Roles1){
          array.push(
            {
                "ResourceId":recurso.id,
                "RoleId":role.RoleId   
            }
        )
        }
        
      }
      //console.log(array)
      const formValue:assinRoleResourceI={
        RecursosRoles:array
      }
      console.log(formValue)
      this.rolesService.assinRoleResource(formValue).subscribe(
        () => {
          this.snackBar.open('Asignado exitosamente', 'Ok', {
            duration: 5000,
          });
          this.router.navigateByUrl('/usuarios/resources');
        },
        err => {
          this.snackBar.open('Error. La Asignacion no pudo ser realizada', 'Ok', {
            duration: 5000,
          });
          console.error(err);
        }
      );
    }

  //para metodos asignar roles
  get getRoles1() {
    return this.form2.get('Roles1') as FormArray;//obtener todos los formularios
  }

  asignarRoles(event: Event){
    //console.log(this.selection._selected)
    //console.log(this.form2.value.Roles1)
    event.preventDefault();
    const control = <FormArray>this.form2.controls['Roles1']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))//nuevo input

    }

    this.mostrar =true
  }

  removeRoles(index: number,event: Event){
    event.preventDefault();
      let control = <FormArray>this.form2.controls['Roles1']//aceder al control
      control.removeAt(index)
      if(control.length <= 0){
       this.mostrar=false
    }
    
  }


  //get select() { return this.form2.get('select'); }
  
  get Roles1() { return this.form2.get('Roles1'); }
}
