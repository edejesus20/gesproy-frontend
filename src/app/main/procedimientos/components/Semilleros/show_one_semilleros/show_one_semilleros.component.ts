import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
@Component({
  selector: 'app-show_one_semilleros',
  templateUrl: './show_one_semilleros.component.html',
  styleUrls: ['./show_one_semilleros.component.css']
})
export class Show_one_semillerosComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor( private primengConfig: PrimeNGConfig,
    private seedbedService:SeedbedService,

    ) { }
  
    ngOnInit() {
      this.primengConfig.ripple = true;
    }
    getOneCntAccount(id:number) {
      this.seedbedService.getItem(id).subscribe((cnt_groupFromApi) => {
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
