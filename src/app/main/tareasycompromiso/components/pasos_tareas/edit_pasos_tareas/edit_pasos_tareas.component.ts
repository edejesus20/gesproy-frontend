import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Productivity_stepService } from 'src/app/core/services/productivity/productivity_step.service';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityStepI } from 'src/app/models/productivity/productivity_step';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';
const translate = require('translate');
@Component({
  selector: 'app-edit_pasos_tareas',
  templateUrl: './edit_pasos_tareas.component.html',
  styleUrls: ['./edit_pasos_tareas.component.css']
})
export class Edit_pasos_tareasComponent implements OnInit {

  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public productivityTypes:ProductivityTypeI[]=[]

  public form: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productivity_stepService:Productivity_stepService,
    private productivity_typesService:Productivity_typesService,
    private messageService:MessageService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getAll()
  }

  getAll() {
    this.productivity_typesService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.productivityTypes = AdministrativeFromApi.productivityTypes;
        // console.log(this.users)
      }, error => console.error(error));
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      level: ['', [Validators.required]],
      ProductivityTypeId: ['', [Validators.required]],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
    const formValue: ProductivityStepI = this.form.value;
    formValue.ProductivityTypeId=this.form.value.ProductivityTypeId.id
    if(formValue.name !="" && formValue.id &&
    formValue.description != ""  &&  formValue.responsable != "" && formValue.ProductivityTypeId != undefined){
    this.productivity_stepService.updateItem(formValue.id, formValue).subscribe(
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
          detail: 'Pasos de tarea Actualizado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            this.router.navigateByUrl('/tasksCommitments/mostrar_ProductivityStep');
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

  getOne(id:number) {
    this.productivity_stepService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      if(cnt_groupFromApi.productivityStep.id != undefined)
      this.form.controls['id'].setValue(cnt_groupFromApi.productivityStep.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.productivityStep.name)
      this.form.controls['description'].setValue(cnt_groupFromApi.productivityStep.description)
      this.form.controls['responsable'].setValue(cnt_groupFromApi.productivityStep.responsable)
      this.form.controls['level'].setValue(cnt_groupFromApi.productivityStep.level)
      this.productivity_typesService.getItem(cnt_groupFromApi.productivityStep.ProductivityTypeId).subscribe(
        (AdministrativeFromApi) => {
          this.form.controls['ProductivityTypeId'].setValue(AdministrativeFromApi.productivityType);
        }, error => console.error(error));
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
    this.getOne(id)
  }


}
