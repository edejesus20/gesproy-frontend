import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
const translate = require('translate');
@Component({
  selector: 'app-create_lines',
  templateUrl: './create_lines.component.html',
  styleUrls: ['./create_lines.component.css']
})
export class Create_linesComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({});
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private lineService:LineService,
    private messageService:MessageService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      justification: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      // thematics: ['', [Validators.required]],
      resolution: ['', [Validators.required]],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
    const formValue: LineI = this.form.value;
    if(formValue.name != "" && formValue.justification != "" && 
    formValue.objectives !="" && 
    // formValue.thematics != ""  &&  
    formValue.resolution != ""){
    this.lineService.createItem(formValue).subscribe(
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
          detail: 'Registro de Linea Creado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            this.router.navigateByUrl('/Procedimientos/line');
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
