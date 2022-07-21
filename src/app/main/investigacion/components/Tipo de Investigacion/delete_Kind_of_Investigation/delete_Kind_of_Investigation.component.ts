import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const translate = require('translate');
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Kind_of_InvestigationService } from 'src/app/core/services/Procedimientos/Kind_of_Investigation.service';
import { Kind_of_InvestigationI } from 'src/app/models/projet/projet';
@Component({
  selector: 'app-delete_Kind_of_Investigation',
  templateUrl: './delete_Kind_of_Investigation.component.html',
  styleUrls: ['./delete_Kind_of_Investigation.component.css']
})
export class Delete_Kind_of_InvestigationComponent implements OnInit {
  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

  public form:FormGroup=this.formBuilder.group({ });
  public bandera:boolean=false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private kind_of_InvestigationService:Kind_of_InvestigationService,

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.form=this.formBuilder.group({
      id:[''],
      name:['', [Validators.required]],
     });
  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
   this.bandera=false


    //console.log(event)
  }

  ngOnDestroy() {
    this.ngOnInit()
  this.tabla = true
  this.displayMaximizable2 = false
  }
  actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
  this.kind_of_InvestigationService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.kind_of_Investigation.name != undefined){
        
      this.form.controls['id'].setValue(cnt_groupFromApi.kind_of_Investigation.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.kind_of_Investigation.name)
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  public onSubmit() {
    let formValue: Kind_of_InvestigationI = this.form.value;
    if(formValue.id){
   this.bandera=true

    this.kind_of_InvestigationService.deleteItem(formValue.id).subscribe(
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
                detail: 'Tipo de Investigación Eliminado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
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
