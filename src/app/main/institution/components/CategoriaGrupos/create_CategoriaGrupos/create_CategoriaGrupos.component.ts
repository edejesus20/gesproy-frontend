import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { CategoryGroupI } from 'src/app/models/institution/category';
import { GroupI } from 'src/app/models/institution/group';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-create_CategoriaGrupos',
  templateUrl: './create_CategoriaGrupos.component.html',
  styleUrls: ['./create_CategoriaGrupos.component.css']
})
export class Create_CategoriaGruposComponent implements OnInit {
  public groups: GroupI[]=[];
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    date:new Date().toDateString(),
    GroupId:['', [Validators.required]],
   });
  
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  constructor(
    private categoryGroupService:CategoryGroupService,
    private groupService:GroupService,
    private router: Router,
    private formBuilder: FormBuilder,
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

  public onSubmit() {
    let formValue: CategoryGroupI = this.form.value;
    formValue.GroupId=this.form.value.GroupId.id

    if(formValue.name != '' && 
    formValue.GroupId != ( 0 )){

    this.categoryGroupService.createItem(formValue).subscribe(
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
                detail: 'Registro de Categoria de Grupos Creado con exitoso'});
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
}
