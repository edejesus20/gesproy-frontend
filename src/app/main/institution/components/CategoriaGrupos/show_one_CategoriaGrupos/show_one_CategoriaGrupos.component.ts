import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { CategoryGroupI } from 'src/app/models/institution/category';

@Component({
  selector: 'app-show_one_CategoriaGrupos',
  templateUrl: './show_one_CategoriaGrupos.component.html',
  styleUrls: ['./show_one_CategoriaGrupos.component.css']
})
export class Show_one_CategoriaGruposComponent implements OnInit {
  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public form:CategoryGroupI={
    id:0,
    name: '',
    date:'',
    GroupId: 0,
    Group:undefined
  
  }
  constructor(
    private categoryGroupService:CategoryGroupService,
    private groupService:GroupService,
    private router: Router,
    private messageService:MessageService,
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
  this.categoryGroupService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.categoryGroup.Group?.name != undefined){
        
      this.form=cnt_groupFromApi.categoryGroup
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }
}
