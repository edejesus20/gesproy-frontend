import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { CategoryGroupI } from 'src/app/models/institution/category';
import { GroupI } from 'src/app/models/institution/group';
const translate = require('translate');
@Component({
  selector: 'app-edit_CategoriaGrupos',
  templateUrl: './edit_CategoriaGrupos.component.html',
  styleUrls: ['./edit_CategoriaGrupos.component.css']
})
export class Edit_CategoriaGruposComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  public groups: GroupI[]=[];

  public form:CategoryGroupI={
    id:0,
    name: '',
    date:'',
    GroupId: 0,
    Group:{
      id:0,
      name: '',
      ident_colciencias:''
    }
  
  }

  selectedGroupI: GroupI={
    id:0,
    name: '',
    ident_colciencias:''
  };
  
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  // private id:number=0
  public edit:boolean=false;
  constructor(
    private categoryGroupService:CategoryGroupService,
    private groupService:GroupService,
    private router: Router,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.getAllFaculty();
    this.primengConfig.ripple = true;
  
  }
  private getAllFaculty(selectId?: number) {
    this.groupService.getList().subscribe(
      (groupsFromApi) => {
        this.groups = groupsFromApi.groups;
      }, error => console.error(error));
  }

  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: CategoryGroupI = {
      id:this.form.id,
      name: f.form.value.name,
      date:this.form.date,
      GroupId:0
    };

    if(this.edit ==  false){
      formValue.GroupId=this.form.GroupId
    }else{
      formValue.GroupId=f.form.value.GroupId.id

    }

    // console.log(formValue)

    if(formValue.name != '' && formValue.GroupId != ( 0) && formValue.GroupId != undefined
    ){
    if(formValue.id)
    this.categoryGroupService.updateItem(formValue.id,formValue).subscribe(
      () => {
              var date = new Date('2020-01-01 00:00:03');
                function padLeft(n:any){ 
                   return n ="00".substring(0, "00".length - n.length) + n;
                }
                var interval = setInterval(() => {
                var minutes = padLeft(date.getMinutes() + "");
                var seconds = padLeft(date.getSeconds() + "");
                // console.log(minutes, seconds);
                if( seconds == '03') {
                this.messageService.add({severity:'success', summary: 'Success', 
                detail: 'Registro de Categoria de Grupos Actualizado con exitoso'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_categorys');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
          const text = await translate(error.error.message, "es");
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
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
