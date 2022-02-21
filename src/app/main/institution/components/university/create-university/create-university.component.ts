import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';
const translate = require('translate');
@Component({
  selector: 'app-create-university',
  templateUrl: './create-university.component.html',
  styleUrls: ['./create-university.component.css']
})
export class CreateUniversityComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    nit:['', [Validators.required]],
    addres:['', [Validators.required]],
  });

  constructor(
    private universityService: UniversityService,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit() {
    
  }
  public onSubmit() {
    let formValue: UniversityI = this.form.value;
    if(formValue.name != "" && formValue.nit != "" && formValue.addres != ""){
    this.universityService.createItem(formValue).subscribe(
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
                detail: 'Registro de Universidad Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_universitys');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
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
