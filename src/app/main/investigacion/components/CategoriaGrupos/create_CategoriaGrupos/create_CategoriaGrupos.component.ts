import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  // public groups: GroupI[]=[];
  public Dialog:boolean =false
  public bandera:boolean=false
 public form:FormGroup=this.formBuilder.group({
  });
 
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrarDialogo:boolean=false;

  constructor(
    private categoryGroupService:CategoryGroupService,
    // private groupService:GroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this. form=this.formBuilder.group({
      name:['', [Validators.required]],
      date:new Date().toDateString(),
      // GroupId:['', [Validators.required]],
     });
    
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
    // this.getAllFaculty();
    this.primengConfig.ripple = true;
  
  }

  cerrar(){
    this.router.navigateByUrl('/Investigation/mostrar_categorys');
  }
 private volver(){
    this.bandera=false
    this.ngOnInit()
  }
  // private getAllFaculty(selectId?: number) {
  //   this.groupService.getList().subscribe(
  //     (groupsFromApi) => {
  //       for (let key of groupsFromApi.groups) {
  //         key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
  //       }
  //       this.groups = groupsFromApi.groups;
  //     }, error => console.error(error));
  // }
  public cancelar(){
    this.ref.close(undefined);
  }
  public onSubmit() {
    let formValue: CategoryGroupI = this.form.value;
    // formValue.GroupId=this.form.value.GroupId.id

    if(formValue.name != '' 
    // && 
    // formValue.GroupId != ( 0 )
    ){
      this.bandera=true

    this.categoryGroupService.createItem(formValue).subscribe(
      (algo) => {
        if(this.mostrarDialogo== true){
          this.ref.close(algo);
        }else{
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
                detail: 'Categoria de Grupos Creada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/Investigation/mostrar_categorys');
                  clearInterval(interval); 
                 }
          }, 1000);
        }
      },async error => {
        if(error != undefined) {
      this.bandera=false

          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
}
}
