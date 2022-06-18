import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-eliminar-resource',
  templateUrl: './eliminar-resource.component.html',
  styleUrls: ['./eliminar-resource.component.css']
})
export class EliminarResourceComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  public roles: RoleI[]=[];
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar2:boolean=false;
  public algo:number[]=[0];
  public form:FormGroup=this.formBuilder.group({});
  public bandera:boolean=false

  constructor(
    private formBuilder: FormBuilder,
    private resourcesService: ResourcesService,
    private rolesService: RolesService,
    private router: Router,
    private messageService:MessageService,
  ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      id: [''],
      path: ['', [Validators.required]],
      method: [''],
      id_padre: [''],
      icono: ['', [Validators.required]],
      link: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      Roles: this.formBuilder.array([this.formBuilder.group({RoleId:['', [Validators.required]]})]),});

      this.getUsrRoles()
    }
    getUsrRoles() {
      this.rolesService.getRole().subscribe((rolesFromApi) => {
        this.roles = rolesFromApi.roles;
        //console.log(this.roles);
      }, error => console.error(error));
    }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.bandera=false

  }
  get getRoles() {
    return this.form.get('Roles') as FormArray;
  }
  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }
  
  getOneCntAccount(id:number) {
    this.resourcesService.getOneResource(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.resource.id != undefined){
        console.log(cnt_groupFromApi.resource)
          this.form.controls['id'].setValue(cnt_groupFromApi.resource.id)
          if(cnt_groupFromApi.resource?.Roles != undefined
            ){
            this.form.controls['path'].setValue(cnt_groupFromApi.resource.path)
            this.form.controls['method'].setValue(cnt_groupFromApi.resource.method)
            this.form.controls['id_padre'].setValue(cnt_groupFromApi.resource.id_padre)
            this.form.controls['icono'].setValue(cnt_groupFromApi.resource.icono)
            this.form.controls['link'].setValue(cnt_groupFromApi.resource.link)
            this.form.controls['titulo'].setValue(cnt_groupFromApi.resource.titulo)
            }
          if(cnt_groupFromApi.resource.Roles != undefined){
            
            this.agregarDescuentos(cnt_groupFromApi.resource.Roles)
          }        
      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
    agregarDescuentos(Roles: RoleI[]) {
      if(Roles.length){
        for (let key of Roles) {
          if(key.id != undefined) {
            // console.log(DiscountLine)
            let control = <FormArray>this.form.controls['Roles']
              this.rolesService.getOneRole(key.id).subscribe((algo)=>{
                if(algo.role && key.name != undefined){
                  control.push(this.formBuilder.group({UserId:this.form.value.id,RoleId:[algo.role, [Validators.required]]}))
                }
              })
          }
        }
        this.mostrar2= true
        let control = <FormArray>this.form.controls['Roles']
        control.removeAt(0)
      }
    }

  
  public onSubmit(e: Event) {
    e.preventDefault()
    const formValue:ResourceI={
      id:this.form.value.id,
      path: this.form.value.path,
      method: this.form.value.method,
      id_padre: this.form.value.id_padre,
      icono: this.form.value.icono,
      link: this.form.value.link,
      titulo: this.form.value.titulo,
      Roles:this.form.value.Roles,
    };
    // console.log(formValue)
            if(formValue.id){
              this.bandera=true

            this.resourcesService.eliminarResource(formValue.id).subscribe(
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
                        detail: 'Registro de Recurso Eliminado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.ngOnInit()
                          this.volver(new Event(''))
                         this.bandera=false
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
            this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
          }
  }

}
