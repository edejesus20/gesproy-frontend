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
  selector: 'app-crear-resource',
  templateUrl: './crear-resource.component.html',
  styleUrls: ['./crear-resource.component.css']
})
export class CrearResourceComponent implements OnInit {
  public roles: RoleI[]=[];
  public Roles1:any[] =[]

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar:boolean=false;
  public algo:number[]=[0];

  public form:FormGroup=this.formBuilder.group({
    path: ['', [Validators.required]],
    method: [''],
    id_padre: [''],
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
    private messageService:MessageService,

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
  public onSubmit(e: Event) {
    e.preventDefault()
    const formValue:ResourceI={
      path: this.form.value.path,
      method: this.form.value.method,
      id_padre: this.form.value.id_padre,
      icono: this.form.value.icono,
      link: this.form.value.link,
      titulo: this.form.value.titulo,
      Roles:this.form.value.Roles,
    };
    if(this.Roles1.length == 0 || this.Roles1 == []){
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
    }
    if(formValue.id_padre == "")formValue.id_padre ="0"
    
    if(formValue.method == "") formValue.method ="null"
    
  // console.log(formValue)
            if(formValue.path != ""&&
              formValue.icono != ""&&
              formValue.link != ""&&
              formValue.titulo != ""){

            this.resourcesService.createResource(formValue).subscribe(
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
                        detail: 'Registro de Recurso Creado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.router.navigateByUrl('/usuarios/resources');
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
            this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
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
