import { Component, OnInit } from '@angular/core';
import { OcupationService } from 'src/app/core/services/usuer/Ocupation.service';

@Component({
  selector: 'app-Show_One_Ocupation',
  templateUrl: './Show_One_Ocupation.component.html',
  styleUrls: ['./Show_One_Ocupation.component.css']
})
export class Show_One_OcupationComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private ocupationService:OcupationService,

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
  this.ocupationService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.ocupation.name != undefined){
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }
}
