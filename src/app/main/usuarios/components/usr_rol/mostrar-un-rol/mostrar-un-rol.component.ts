import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';

@Component({
  selector: 'app-mostrar-un-rol',
  templateUrl: './mostrar-un-rol.component.html',
  styleUrls: ['./mostrar-un-rol.component.css']
})
export class MostrarUnRolComponent implements OnInit {

  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private rolesService: RolesService,

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
    this.rolesService.getOneRole(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.role.id != undefined
        ){

      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }

}
