import { Component, OnInit } from '@angular/core';
import { ChargeService } from 'src/app/core/services/investigacion/Charge.service';

@Component({
  selector: 'app-show_one_Charge',
  templateUrl: './show_one_Charge.component.html',
  styleUrls: ['./show_one_Charge.component.css']
})
export class Show_one_ChargeComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private chargeService:ChargeService,

  ) { }

  ngOnInit() {
  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
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
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
