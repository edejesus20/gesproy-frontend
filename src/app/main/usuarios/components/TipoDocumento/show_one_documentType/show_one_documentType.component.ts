import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';

@Component({
  selector: 'app-show_one_documentType',
  templateUrl: './show_one_documentType.component.html',
  styleUrls: ['./show_one_documentType.component.css']
})
export class Show_one_documentTypeComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  constructor(
    private documentTypeService:DocumentTypeService,

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
  this.documentTypeService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.documentType.name != undefined){
        
      // this.form=cnt_groupFromApi.ocupation
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
