import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { LineI, LineThematicI, ThematicI } from 'src/app/models/projet/line';
import { Create_ThematicComponent } from '../../Areas y tematicas lineas/create_Thematic/create_Thematic.component';
const translate = require('translate');
@Component({
  selector: 'app-edit_lines',
  templateUrl: './edit_lines.component.html',
  styleUrls: ['./edit_lines.component.css'],
  providers: [DialogService]
})
export class Edit_linesComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form: FormGroup = this.formBuilder.group({});
  public mostrar2:boolean=false;
  public thematics:ThematicI[] =[]
  public algo:number[]=[0];
  public ref:any;

  constructor(
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private lineService:LineService,
    private messageService:MessageService,
    private thematicService:ThematicService

  ) { }

  ngOnInit() {
    this.buildForm();
    this.thematic()
  }
  thematic() {
    this.thematicService.getList().subscribe(list => {
      this.thematics=list.thematics
    })
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.required]],
      justification: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      Thematics: this.formBuilder.array([this.formBuilder.group(
        {
          ThematicId:['', [Validators.required]],
          LineId:[0, [Validators.required]],
      })]),
      // resolution: ['', [Validators.required]],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
    const formValue: LineI = this.form.value;
    let control = <FormArray>this.form.controls['Thematics']
    let array:LineThematicI[] =[]
    for (const key of control.value) {
      key.ThematicId=key.ThematicId.id
      array.push({LineId:key.LineId,ThematicId:key.ThematicId})
    }
    if(formValue.name != "" && formValue.justification != "" && 
    formValue.objectives !="" && formValue.id 
    // &&
    // formValue.thematics != ""  &&  
    // formValue.resolution != ""
    ){
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
      console.log(cnt_groupFromApi.line);      
      if(cnt_groupFromApi.line.id != undefined)
      this.form.controls['id'].setValue(cnt_groupFromApi.line.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.line.name)
      this.form.controls['justification'].setValue(cnt_groupFromApi.line.justification)
      this.form.controls['objectives'].setValue(cnt_groupFromApi.line.objectives)
      // this.form.controls['thematics'].setValue(cnt_groupFromApi.line.thematics)
      // this.form.controls['resolution'].setValue(cnt_groupFromApi.line.resolution)
      if(cnt_groupFromApi.line.Thematics != undefined && cnt_groupFromApi.line.Thematics.length > 0){
        this.agregarThematics(cnt_groupFromApi.line.Thematics)  
      } 
      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }
  agregarThematics(Thematics: ThematicI[]) {
    if(Thematics.length){
      for (let key of Thematics) {
        if(key.id != undefined && key.LineThematic?.ThematicId != undefined) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['Thematics']
            this.thematicService.getItem(key.LineThematic.ThematicId).subscribe((algo)=>{
              if(algo.thematic && key.id != undefined){
                  control.push(this.formBuilder.group({
                    ThematicId:[algo.thematic, [Validators.required]],
                    LineId:[this.form.value.id, [Validators.required]],
                  }))
                }
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['Thematics']
      control.removeAt(0)
      // console.log(control)
    }
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

  get getThematics() {
    return this.form.get('Thematics') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Thematics']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
           LineId:[0, [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
           LineId:[0, [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Thematics']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      control.push(this.formBuilder.group({
        ThematicId:['', [Validators.required]],
           LineId:[0, [Validators.required]],
      }))
      }
      // console.log(control)
  }

  // modal

  addTematica(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_ThematicComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Tematica Creada', detail: person.name,life: 2000});
      this.thematic()

        }
  });
  }

}
