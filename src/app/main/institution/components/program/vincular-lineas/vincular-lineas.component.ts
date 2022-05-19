import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';

import { LineProgramI, ProgramI } from 'src/app/models/institution/program';
import { MessageService } from 'primeng/api';
import { LineI } from 'src/app/models/projet/line';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
const translate = require('translate');
@Component({
  selector: 'app-vincular-lineas',
  templateUrl: './vincular-lineas.component.html',
  styleUrls: ['./vincular-lineas.component.css']
})
export class VincularLineasComponent implements OnInit {

  public mostrar:number=4;
  public tabla:boolean=true;
public lines:LineI[]=[]

  public algo:number[]=[0];
  public mostrar2:boolean=false;
  
  public form:FormGroup=this.formBuilder.group({});


displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

private id:number=0
public edit:boolean=false;
public edit2:boolean=false;
public form2:ProgramI={
  id: 0,
  name: '',
  FacultyId:0,
  CategoryId:0,
  Faculty:undefined,
  Category:undefined,
  createdAt:'',
  Headquarters:undefined,
  HeadquarterProgram:undefined,
}
  constructor(
    private messageService:MessageService,
    private programService: ProgramService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lineService: LineService,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.form=this.formBuilder.group({
      id:[''],
      name:['', [Validators.required]],
      FacultyId:['', [Validators.required]],
      CategoryId:['', [Validators.required]],
      Lines: this.formBuilder.array([this.formBuilder.group(
        {
          ProgramId:[this.id, [Validators.required]],
          LineId:['', [Validators.required]],
      })]),
    });
    this.getAlllines();
 
  }

  private getAlllines(selectId?: number) {
    this.lineService.getList().subscribe(
      (facultiesFromApi) => {
        this.lines = facultiesFromApi.lines;
      }, error => console.error(error));
  }



  public onSubmit() {
    let control = <FormArray>this.form.controls['Lines']
      let array:LineProgramI[] =[]
    for (const key of control.value) {
      key.LineId=key.LineId.id
      array.push({LineId:key.LineId,ProgramId:this.id})
    }
    if(array.length > 0){
      // console.log({array})
    this.programService.vincularLine(this.id,{array}).subscribe(
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
                detail: 'Vinculación de Lineas realizada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_programs');
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

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.id =0
    this.mostrar2=false
    //console.log(event)
  }

ngOnDestroy() {
  this.tabla = true
  this.displayMaximizable2 = false
  this.mostrar2=false
  this.ngOnInit()
}
actualizar(id: number){
  // console.log(id)
  this.getOneCntAccount(id)
}

getOneCntAccount(id:number) {

 

  this.programService.getItem(id).subscribe((cnt_groupFromApi) => {
    console.log(cnt_groupFromApi.program)
    if(cnt_groupFromApi.program.id != undefined && cnt_groupFromApi.program.CategoryId != undefined
      && cnt_groupFromApi.program.FacultyId != undefined
      ){
      this.id=cnt_groupFromApi.program.id
      this.form.controls['id'].setValue(cnt_groupFromApi.program.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.program.name)
      this.form.controls['FacultyId'].setValue(cnt_groupFromApi.program.Faculty?.name)
      // this.facultyService.getItem(cnt_groupFromApi.program.FacultyId).subscribe((algo)=>{
      //   this.form.controls['FacultyId'].setValue(algo.faculty)
      // })
      // this.categoryService.getItem(cnt_groupFromApi.program.CategoryId).subscribe((algo)=>{
      this.form.controls['CategoryId'].setValue(cnt_groupFromApi.program.Category?.name)
    // })
      this.form2=cnt_groupFromApi.program
      }
      this.programService.OneProgram(id).subscribe((algo)=>{
        // console.log(algo.program)
        if(algo.program != null){
          if(algo.program.LinePrograms != undefined &&
            algo.program.LinePrograms.length > 0){
        
            this.agregarLines(algo.program.LinePrograms)
            
          }
        }
      
      })
 
   
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarLines(LinePrograms: LineProgramI[]) {
    if(LinePrograms.length){
    for (let key of LinePrograms) {
      if(key.LineId != undefined) {
        // console.log(DiscountLine)
        
        let control = <FormArray>this.form.controls['Lines']
        let  LineId:any
        for (const key2 of this.lines) {
          if(key2.id == key.LineId){
            LineId=key2
          }
        }
          // this.lineService.getItem(key.id).subscribe((algo1)=>{
          //   if(algo1.line && key.id != undefined){

                  control.push(this.formBuilder.group({
                    ProgramId:[this.id, [Validators.required]],
                    LineId:[LineId, [Validators.required]],
                  }))
          //       }           
          // })
      }
    }
    this.mostrar2= true
    let control = <FormArray>this.form.controls['Lines']
    control.removeAt(0)
  }
  }



// public datos(position:number){
//   const control = <FormArray>this.form.controls['Lines']
//   let valor = control.controls[position].get('Lines')
//   if(valor != null){
//   this.lineService.getItem(valor.value.id).subscribe(
//     (AdministrativeFromApi) => {
//       if(AdministrativeFromApi.line.Administratives)
//       this.administratives = AdministrativeFromApi.headquarter.Administratives;
//       // console.log(this.administratives)
//     }, error => console.error(error));
//   }
// }

  get getRoles() {
    return this.form.get('Lines') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Lines']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ProgramId:[this.id, [Validators.required]],
          LineId:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ProgramId:[this.id, [Validators.required]],
          LineId:['', [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Lines']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      control.push(this.formBuilder.group({
        ProgramId:[this.id, [Validators.required]],
        LineId:['', [Validators.required]],
      }))
      }
      // console.log(control)
  }
}
