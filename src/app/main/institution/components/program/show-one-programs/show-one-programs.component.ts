import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { ProgramI } from 'src/app/models/institution/program';

@Component({
  selector: 'app-show-one-programs',
  templateUrl: './show-one-programs.component.html',
  styleUrls: ['./show-one-programs.component.css']
})
export class ShowOneProgramsComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form:ProgramI={
    id: 0,
    name: '',
    FacultyId:0,
    CategoryId:0,
    Faculty:{ 
      id:0,
      name:'',
      AdministrativeId: 0,
        University:
        {
          id: 0,
          name: '',
          nit: '',
          addres: '',
        } 
    },
    Category:{ 
      id:0,
      name:'',
    }
  
  }
  constructor(
    private messageService:MessageService,
    private programService: ProgramService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
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
  this.programService.getItem(id).subscribe((cnt_groupFromApi) => {
   
    if(cnt_groupFromApi.program.Faculty?.Administrative?.User != undefined
      ){
      this.form=cnt_groupFromApi.program
      // this.selectedUniversit=cnt_groupFromApi.headquarter.University
      // console.log(this.selectedUniversit)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
}
