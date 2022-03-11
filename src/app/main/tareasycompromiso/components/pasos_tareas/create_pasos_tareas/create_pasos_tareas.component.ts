import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { Productivity_stepService } from 'src/app/core/services/productivity/productivity_step.service';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityStepI } from 'src/app/models/productivity/productivity_step';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';
import { LineI } from 'src/app/models/projet/line';
const translate = require('translate');
@Component({
  selector: 'app-create_pasos_tareas',
  templateUrl: './create_pasos_tareas.component.html',
  styleUrls: ['./create_pasos_tareas.component.css']
})
export class Create_pasos_tareasComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({});
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public productivityTypes:ProductivityTypeI[]=[]

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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      level: ['', [Validators.required]],
      ProductivityTypeId: ['', [Validators.required]],
    });
  }  

  public onSubmit(): void {
    const formValue: ProductivityStepI = this.form.value;
    if(formValue.name !="" && 
    formValue.description != ""  &&  formValue.responsable != ""){
    this.productivity_stepService.createItem(formValue).subscribe(
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
          detail: 'Pasos de tarea Creada con exito'});
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

}
