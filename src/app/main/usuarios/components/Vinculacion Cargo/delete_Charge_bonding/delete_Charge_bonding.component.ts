import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';
import { ScaleI } from 'src/app/models/institution/scale';
import { Charge_bondingI } from 'src/app/models/user/teacher';

const translate = require('translate');
@Component({
  selector: 'app-delete_Charge_bonding',
  templateUrl: './delete_Charge_bonding.component.html',
  styleUrls: ['./delete_Charge_bonding.component.css']
})
export class Delete_Charge_bondingComponent implements OnInit {

  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:FormGroup=this.formBuilder.group({ });
  public scales: ScaleI[]=[];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private charge_bondingService:Charge_bondingService,
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
    this.scales=[]
    
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
  this.charge_bondingService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.charge_bonding.name != undefined){
        
      this.form.controls['id'].setValue(cnt_groupFromApi.charge_bonding.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.charge_bonding.name)
      // console.log(this.form)
          }

          if(cnt_groupFromApi.charge_bonding?.ChargebondingScales?.length  != undefined
            && cnt_groupFromApi.charge_bonding.ChargebondingScales.length > 0){
              this.agregar(cnt_groupFromApi.charge_bonding.ChargebondingScales)
      


          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }
  agregar(ChargebondingScales: any[]) {
    if(ChargebondingScales.length){
      this.scales=[]
      for (let key of ChargebondingScales) {
        if(key.Scale != undefined && key.status == true) {
            this.scales.push(key.Scale)
        }
      }
    }
  }

  public onSubmit() {
    let formValue: Charge_bondingI = this.form.value;
    if(formValue.id){
    this.charge_bondingService.deleteItem(formValue.id).subscribe(
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
                detail: 'Vinculación de Cargo Eliminada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/usuarios/Charge_bonding');
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

}
