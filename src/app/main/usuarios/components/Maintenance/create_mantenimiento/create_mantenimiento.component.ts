import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaintenanceService } from 'src/app/core/services/auth/maintenance.service';
const translate = require('translate');

@Component({
  selector: 'app-create_mantenimiento',
  templateUrl: './create_mantenimiento.component.html',
  styleUrls: ['./create_mantenimiento.component.css']
})
export class Create_mantenimientoComponent implements OnInit {
  public Dialog:boolean =true
   public bandera:boolean=false
   public clave:string=''
  constructor(
    private router: Router,
    private maintenanceService:MaintenanceService,
    private messageService:MessageService,

  ) { }

  ngOnInit() {
  }
  cerrar(){
    this.router.navigateByUrl('/landing');
  }
  enviar(id:any){
    console.log(id)
    if(id != ''){
      this.bandera=true
      this.maintenanceService.getclave(id).subscribe((cnt_groupFromApi)=>{
        if(cnt_groupFromApi.maintenance != null){
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
          detail: 'Mantenimiento Asignado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            // this.volver()
            this.router.navigateByUrl('/');
            clearInterval(interval); 
           }
          }, 1000);
        }
      },async error => {
        if(error != undefined) {
          console.log(error);
    this.bandera=false

          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          if(error.error.message != undefined){
            text = await translate(error.error.message, "es");

          }
          console.log(text);
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
    }
  }
}
