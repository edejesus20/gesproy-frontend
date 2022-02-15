import { Component, OnInit } from '@angular/core';
import { GenderService } from 'src/app/core/services/usuer/Gender.service';

@Component({
  selector: 'app-show_one_gender',
  templateUrl: './show_one_gender.component.html',
  styleUrls: ['./show_one_gender.component.css']
})
export class Show_one_genderComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private genderService:GenderService,

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
  this.genderService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.gender.name != undefined){
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
