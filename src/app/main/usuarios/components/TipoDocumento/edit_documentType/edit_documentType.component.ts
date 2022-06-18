import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DocumentTypeService } from 'src/app/core/services/usuer/DocumentType.service';
import { DocumentTypeI } from 'src/app/models/user/document_types';
const translate = require('translate');
@Component({
  selector: 'app-edit_documentType',
  templateUrl: './edit_documentType.component.html',
  styleUrls: ['./edit_documentType.component.css']
})
export class Edit_documentTypeComponent implements OnInit {

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public bandera:boolean=false

  public form:FormGroup=this.formBuilder.group({ });
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private documentTypeService:DocumentTypeService,

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.form=this.formBuilder.group({
      id:[''],
      name:['', [Validators.required]],
     });
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
  this.documentTypeService.getItem(id).subscribe((cnt_groupFromApi) => {
  
    if(cnt_groupFromApi.documentType.name != undefined){
        
      this.form.controls['id'].setValue(cnt_groupFromApi.documentType.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.documentType.name)
      // console.log(this.form)
          }
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
  }

  public onSubmit() {
    let formValue: DocumentTypeI = this.form.value;
    if(formValue.name != ''  && formValue.id){
    this.bandera=true

    this.documentTypeService.updateItem(formValue.id, formValue).subscribe(
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
                detail: 'Registro de Tipo de Documento Actualizado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
                  // this.router.navigateByUrl('/usuarios/documentType');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
    this.bandera=false

          console.log(error);
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
