import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
@Component({
  selector: 'app-show-one-administrative',
  templateUrl: './show-one-administrative.component.html',
  styleUrls: ['./show-one-administrative.component.css']
})
export class ShowOneAdministrativeComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private administrativeService:AdministrativeService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.administrativeService.getItem(id).subscribe((cnt_groupFromApi) => {
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
