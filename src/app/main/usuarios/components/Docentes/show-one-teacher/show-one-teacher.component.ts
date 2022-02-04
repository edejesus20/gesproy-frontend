import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';

@Component({
  selector: 'app-show-one-teacher',
  templateUrl: './show-one-teacher.component.html',
  styleUrls: ['./show-one-teacher.component.css']
})
export class ShowOneTeacherComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private teacherService:TeacherService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.teacherService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
    }, error => console.error(error));
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

}
