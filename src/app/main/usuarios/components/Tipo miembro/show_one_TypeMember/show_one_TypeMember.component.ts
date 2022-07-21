import { Component, OnInit } from '@angular/core';
import { TypeMemberService } from 'src/app/core/services/Procedimientos/TypeMember.service';

@Component({
  selector: 'app-show_one_TypeMember',
  templateUrl: './show_one_TypeMember.component.html',
  styleUrls: ['./show_one_TypeMember.component.css']
})
export class Show_one_TypeMemberComponent implements OnInit {

  public mostrar:number=3;
  public algo:number[]=[0];
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private typeMemberService: TypeMemberService,

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
    this.typeMemberService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.typeMember.id != undefined
        ){

      }
  
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }

}
