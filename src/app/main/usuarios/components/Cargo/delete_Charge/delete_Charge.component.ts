import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ChargeService } from 'src/app/core/services/investigacion/Charge.service';
import { ChargeI } from 'src/app/models/user/charge';

const translate = require('translate');
@Component({
  selector: 'app-delete_Charge',
  templateUrl: './delete_Charge.component.html',
  styleUrls: ['./delete_Charge.component.css']
})
export class Delete_ChargeComponent implements OnInit {
  public bandera:boolean=false

  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:FormGroup=this.formBuilder.group({ });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private chargeService:ChargeService,
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
    this.bandera=false
    //console.log(event)
  }

  ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  }
  actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
  this.chargeService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.charge.name != undefined){
        
      this.form.controls['id'].setValue(cnt_groupFromApi.charge.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.charge.name)
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  public onSubmit() {
    let formValue: ChargeI = this.form.value;
    if(formValue.id){
  this.bandera=true

    this.chargeService.deleteItem(formValue.id).subscribe(
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
                detail: 'Cargo Eliminado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false

                  // this.router.navigateByUrl('/usuarios/Charge');
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
