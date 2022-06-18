import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
const translate = require('translate');
@Component({
  selector: 'app-edit_Category',
  templateUrl: './edit_Category.component.html',
  styleUrls: ['./edit_Category.component.css']
})
export class Edit_CategoryComponent implements OnInit {

  public mostrar:number=1;
  public tabla:boolean=true;

  public form:FormGroup=this.formBuilder.group({ });

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public bandera:boolean=false

  constructor(
    private categoryService:CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.form=this.formBuilder.group({
      id:[''],
      name:['', [Validators.required]],
      date:new Date().toDateString(),
      // GroupId:['', [Validators.required]],
     });
  
  }


  public onSubmit() {
    let formValue: CategoryI = this.form.value;
    // formValue.GroupId=this.form.value.GroupId.id

    if(formValue.name != '' 
    && formValue.id
    // formValue.GroupId != ( 0 )
    ){
          this.bandera=true

    this.categoryService.updateItem(formValue.id,formValue).subscribe(
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
                detail: 'Categoria de Programa Actualizada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  // this.router.navigateByUrl('/institution/mostrar_categorysP');
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  clearInterval(interval); 
                 }
          }, 1000);
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

    public volver(event: Event){
      event.preventDefault
      this.tabla = true
      this.displayMaximizable2 = false
      this.ngOnInit()
      this.bandera=false

      //console.log(event)
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
    this.categoryService.getItem(id).subscribe((cnt_groupFromApi) => {
    
      if(cnt_groupFromApi.category.id != undefined){
        this.form.controls['id'].setValue(cnt_groupFromApi.category.id)
    this.form.controls['name'].setValue(cnt_groupFromApi.category.name)
    // this.form.controls['GroupId'].setValue(cnt_groupFromApi.categoryGroup.GroupId)
    // this.groupService.getItem(cnt_groupFromApi.categoryGroup.GroupId).subscribe((algo)=>{
      // this.form.controls['GroupId'].setValue(algo.group)
    // })
        // console.log(this.form)
            }
      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
    }
}
