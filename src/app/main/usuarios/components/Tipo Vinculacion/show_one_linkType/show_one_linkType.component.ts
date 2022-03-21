import { Component, OnInit } from '@angular/core';
import { LinkTypeService } from 'src/app/core/services/usuer/LinkType.service';

@Component({
  selector: 'app-show_one_linkType',
  templateUrl: './show_one_linkType.component.html',
  styleUrls: ['./show_one_linkType.component.css']
})
export class Show_one_linkTypeComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private linkTypeService:LinkTypeService,

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
  this.linkTypeService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.linkType.name != undefined){
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
