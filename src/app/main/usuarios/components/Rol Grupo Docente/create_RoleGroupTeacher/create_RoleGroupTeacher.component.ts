import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleGroupTeacherService } from 'src/app/core/services/Procedimientos/RoleGroupTeacher.service';
import { RoleGroupTeacherI } from 'src/app/models/institution/group';

@Component({
  selector: 'app-create_RoleGroupTeacher',
  templateUrl: './create_RoleGroupTeacher.component.html',
  styleUrls: ['./create_RoleGroupTeacher.component.css']
})
export class Create_RoleGroupTeacherComponent implements OnInit {

  public mostrarDialogo:boolean=false;
  public Dialog:boolean =false
   public bandera:boolean=false
  public form:FormGroup=this.formBuilder.group({
   });
  
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private roleGroupTeacherService: RoleGroupTeacherService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      name:['', [Validators.required]],
     });
    this.primengConfig.ripple = true;
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
  }
  public cancelar(){
    this.ref.close(undefined);
  }
  cerrar(){
    this.router.navigateByUrl('/usuarios/RoleGroupTeacher');
  }
 private volver(){
    this.bandera=false
    this.ngOnInit()
  }

  public onSubmit() {
    let formValue: RoleGroupTeacherI = this.form.value;
    if(formValue.name != ''){
    this.bandera=true

    this.roleGroupTeacherService.createItem(formValue).subscribe(
      (algo) => {
        if(this.mostrarDialogo== true){
          this.ref.close(algo);
        }else{
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
                detail: 'Rol Docente de Grupo Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/usuarios/roles');
                  clearInterval(interval); 
                 }
          }, 1000);
        }
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
