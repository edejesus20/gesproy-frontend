import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RoleInvestigationsService } from 'src/app/core/services/institution/roleInvestigations.service';
import { RoleInvestigationI } from 'src/app/models/institution/roles_investigation';

@Component({
  selector: 'app-crear-rol-investigation',
  templateUrl: './crear-rol-investigation.component.html',
  styleUrls: ['./crear-rol-investigation.component.css']
})
export class CrearRolInvestigationComponent implements OnInit {

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
    private roleInvestigationsService:RoleInvestigationsService
  ) { }

  ngOnInit() {
    this. form=this.formBuilder.group({
      name:['', [Validators.required]],
     });
    this.primengConfig.ripple = true;
  }
  cerrar(){
    this.router.navigateByUrl('/Investigation/mostrar_RoleInvestigations');
  }
  private volver(){
    this.bandera=false
    this.ngOnInit()
  }
  public onSubmit() {
    let formValue: RoleInvestigationI = this.form.value;
    if(formValue.name != ''){
    this.bandera=true

    this.roleInvestigationsService.createItem(formValue).subscribe(
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
                detail: 'Rol de Investigacion Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/Investigation/mostrar_RoleInvestigations');
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
