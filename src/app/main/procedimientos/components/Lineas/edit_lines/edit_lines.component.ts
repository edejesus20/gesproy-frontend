import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
const translate = require('translate');
@Component({
  selector: 'app-edit_lines',
  templateUrl: './edit_lines.component.html',
  styleUrls: ['./edit_lines.component.css']
})
export class Edit_linesComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form: FormGroup = this.formBuilder.group({});

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
      id:[''],
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
    formValue.objectives !="" && formValue.id &&
    // formValue.thematics != ""  &&  
    formValue.resolution != ""){
    this.lineService.updateItem(formValue.id,formValue).subscribe(
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
          detail: 'Registro de Linea Actualizado con exito'});
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

  getOneCntAccount(id:number) {
    this.lineService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      if(cnt_groupFromApi.line.id != undefined)
      this.form.controls['id'].setValue(cnt_groupFromApi.line.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.line.name)
      this.form.controls['justification'].setValue(cnt_groupFromApi.line.justification)
      this.form.controls['objectives'].setValue(cnt_groupFromApi.line.objectives)
      // this.form.controls['thematics'].setValue(cnt_groupFromApi.line.thematics)
      this.form.controls['resolution'].setValue(cnt_groupFromApi.line.resolution)
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
    }, error => console.error(error));
  }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.ngOnInit()
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

}
