import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';

@Component({
  selector: 'app-mostrar-un-user',
  templateUrl: './mostrar-un-user.component.html',
  styleUrls: ['./mostrar-un-user.component.css']
})
export class MostrarUnUserComponent implements OnInit {
  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private userService: UserService,

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
    this.userService.getOneUser(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.user.id != undefined
        ){
        // console.log(cnt_groupFromApi.user)
   
        
      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
