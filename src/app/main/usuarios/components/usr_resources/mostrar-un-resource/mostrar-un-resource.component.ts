import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';

@Component({
  selector: 'app-mostrar-un-resource',
  templateUrl: './mostrar-un-resource.component.html',
  styleUrls: ['./mostrar-un-resource.component.css']
})
export class MostrarUnResourceComponent implements OnInit {


  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private resourcesService: ResourcesService,
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
    this.resourcesService.getOneResource(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.resource.id != undefined
        ){

      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }


}
