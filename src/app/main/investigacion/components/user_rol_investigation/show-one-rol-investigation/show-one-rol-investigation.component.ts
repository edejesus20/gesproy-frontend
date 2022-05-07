import { Component, OnInit } from '@angular/core';
import { RoleInvestigationsService } from 'src/app/core/services/institution/roleInvestigations.service';

@Component({
  selector: 'app-show-one-rol-investigation',
  templateUrl: './show-one-rol-investigation.component.html',
  styleUrls: ['./show-one-rol-investigation.component.css']
})
export class ShowOneRolInvestigationComponent implements OnInit {

  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private roleInvestigationsService:RoleInvestigationsService,

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
    this.roleInvestigationsService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.roleInvestigation.id != undefined
        ){

      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
