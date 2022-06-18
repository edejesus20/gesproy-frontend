import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
const translate = require('translate');
@Component({
  selector: 'app-delete_Category',
  templateUrl: './delete_Category.component.html',
  styleUrls: ['./delete_Category.component.css']
})
export class Delete_CategoryComponent implements OnInit {
  public bandera:boolean=false

  public mostrar:number=2;
  public tabla:boolean=true;

  public form:CategoryI={
    id:0,
    name: '',
    // date:'',
    // GroupId: 0,
    Programs:undefined
  
  }

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  // private id:number=0
  constructor(
    private categoryService:CategoryService,
    private router: Router,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  
  }
  
  public onSubmit(f:NgForm) {
    // console.log(f)

    let formValue: CategoryI = {
      id:this.form.id,
      name: f.form.value.name,
      // date:this.form.date,
      // GroupId:0
    };


    // console.log(formValue)

   if(formValue.id)
   {
     this.bandera=true
    this.categoryService.deleteItem(formValue.id).subscribe(
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
                detail: 'Categoria de Programa Eliminada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  // this.router.navigateByUrl('/institution/mostrar_categorysP');
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
    }

}

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    //console.log(event)
   this.bandera=false

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
  this.categoryService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.category.name != undefined){
        
      this.form=cnt_groupFromApi.category
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

}
