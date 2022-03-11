import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Productivity_stepService } from 'src/app/core/services/productivity/productivity_step.service';
@Component({
  selector: 'app-show_one_pasos_tareas',
  templateUrl: './show_one_pasos_tareas.component.html',
  styleUrls: ['./show_one_pasos_tareas.component.css']
})
export class Show_one_pasos_tareasComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private productivity_stepService:Productivity_stepService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.productivity_stepService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
    }, error => console.error(error));
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

}
