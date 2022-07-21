import { Component, OnInit } from '@angular/core';
import { Kind_of_InvestigationService } from 'src/app/core/services/Procedimientos/Kind_of_Investigation.service';

@Component({
  selector: 'app-show_one_Kind_of_Investigation',
  templateUrl: './show_one_Kind_of_Investigation.component.html',
  styleUrls: ['./show_one_Kind_of_Investigation.component.css']
})
export class Show_one_Kind_of_InvestigationComponent implements OnInit {

  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private kind_of_InvestigationService:Kind_of_InvestigationService,

  ) { }

  ngOnInit(): void {
  }
  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  
  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }
  
  getOneCntAccount(id:number) {
    this.kind_of_InvestigationService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.kind_of_Investigation.id != undefined
        ){

      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
