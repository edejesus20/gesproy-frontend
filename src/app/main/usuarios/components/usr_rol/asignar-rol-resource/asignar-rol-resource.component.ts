import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { MessageService, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-asignar-rol-resource',
  templateUrl: './asignar-rol-resource.component.html',
  styleUrls: ['./asignar-rol-resource.component.css']
})
export class AsignarRolResourceComponent implements OnInit {
  public Dialog:boolean =false
   public bandera:boolean=false
  public resources: ResourceI[]=[];
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
  selectedProducts: ResourceI[]=[];
  public form:FormGroup=this.formBuilder.group({
    Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private resourcesService: ResourcesService,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.form=this.formBuilder.group({
    //   Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),
    // });
    this.primengConfig.ripple = true;
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'path', header: 'Ruta | Path' },
      { field: 'method', header: 'Metodo' },
      { field: 'icono', header: 'Icono' },
      { field: 'link', header: 'Enlace' },
      { field: 'titulo', header: 'Titulo' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  this.getUsrRoles()
  this.getUsrResource()
  this.loading = false;
  }

public onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedProducts = value;
}

public onSelectAllChange(event:any) {
    const checked = event.checked;

    if (checked) {
        this.resourcesService.getResource().subscribe(res => {
            this.selectedProducts = res.resources;
            this.selectAll = true;
        });
    }
    else {
        this.selectedProducts = [];
        this.selectAll = false;
    }
}

cerrar(){
  this.router.navigateByUrl('/usuarios/resources');
 }
private volver(){
  this.bandera=false
  this.selectAll= false
  this.selectedProducts=[]
  this.Roles1=[]
  this.ngOnInit()
    this.vaciar()
}
private vaciar(){
  this.form.reset()
  this.getRoles.reset()
  this.getRoles.clear()
  // this.form.controls['name'].setValue('')
  let control = <FormArray>this.form.controls['Roles']
  control.push(this.formBuilder.group({
    RoleId:['', [Validators.required]]
  }))
}

  getUsrResource() {
  this.resourcesService.getResource().subscribe((ResourceFromApi) => {
    this.resources = ResourceFromApi.resources;
    console.log(ResourceFromApi.resources)

  }, error => console.error(error));
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles = rolesFromApi.roles;
    }, error => console.error(error));
  }

  Buscar(event: Event, dt1:any){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
      console.log('aqui',dt1)
  }


    //enviar formularo asignar roles a recursos
    public onSubmit(e:Event):void {
      e.preventDefault()
      const array:any=[]
      let arrRoles:any=[]=this.form.value.Roles

      if(this.Roles1.length == 0 ){

        let control = <FormArray>this.form.controls['Roles']
        for (let key of control.value) {
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
                "ResourceId":recurso.id,
                "RoleId":role.RoleId   
            })
        } 
      }
      const formValue:assinRoleResourceI={
        RecursosRoles:array
      }


      
      // console.log(formValue)

      if(this.selectedProducts.length > 0 && formValue.RecursosRoles.length > 0){
        this.bandera=true

    this.rolesService.assinRoleResource(formValue).subscribe(
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
                detail: 'Rol de Recurso Asignado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/usuarios/resources');
                  clearInterval(interval); 
                }
          }, 1000);
      },async error => {
        if(error != undefined) {
  this.bandera=false

          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan Selecionar Recursos'});
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
       control.push(this.formBuilder.group({RoleId:['', [Validators.required]]}))
      }
    }

}
