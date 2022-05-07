import { Component, OnInit } from '@angular/core';
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';

@Component({
  selector: 'app-show_one_Charge_bonding',
  templateUrl: './show_one_Charge_bonding.component.html',
  styleUrls: ['./show_one_Charge_bonding.component.css']
})
export class Show_one_Charge_bondingComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private charge_bondingService:Charge_bondingService,

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
  this.charge_bondingService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.charge_bonding.name != undefined){
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
