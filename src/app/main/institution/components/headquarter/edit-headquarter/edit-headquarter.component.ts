import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { ProgramI } from 'src/app/models/institution/program';
import { UniversityI } from 'src/app/models/institution/university';
import { AdministrativeI } from 'src/app/models/user/administrative';
const translate = require('translate');
@Component({
  selector: 'app-edit-headquarter',
  templateUrl: './edit-headquarter.component.html',
  styleUrls: ['./edit-headquarter.component.css']
})
export class EditHeadquarterComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
 private id:number=0

 public universitys: UniversityI[]=[]

 public mostrar2:boolean=false;
 public algo:number[]=[0];
 public edit2:boolean=false;

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!]+$/ 

public form:FormGroup=this.formBuilder.group({});
public form2:HeadquarterI={
  id:0,
  name:'',
  cordinatorInvestigation:'',
  UniversityId:0,
    University:{
      id:0,
      name:'',
      nit:'',
      addres:''
    
  }
}
 constructor( 
   private router: Router,
   private messageService:MessageService,
   private headquarterService: HeadquarterService,
   private universityService:UniversityService,
   private formBuilder: FormBuilder,
   ) { }

 ngOnInit(): void {
  
   this.getAlluniversidades()

   this.form=this.formBuilder.group({
    id: [''],
   name:['', [Validators.required]],
   cordinatorInvestigation:['', [Validators.required]],
   UniversityId:['', [Validators.required]],
  });
 }


 public onSubmit() {
   let formValue: HeadquarterI = this.form.value;
   formValue.UniversityId=this.form.value.UniversityId.id

   if(this.edit2 ==  false){
     if(this.form2.University?.id != undefined)
    formValue.UniversityId=this.form2.University?.id
    }else{
      formValue.UniversityId=this.form.value.UniversityId.id
    }
  //  console.log(formValue)

   if(formValue.name != '' && 
   formValue.cordinatorInvestigation != '' &&
   formValue.UniversityId != ( 0 )){
   this.headquarterService.updateItem(this.id,formValue).subscribe(
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
               detail: 'Registro de Sede Actualizado con exitoso'});
               }
               date = new Date(date.getTime() - 1000);
               if( minutes == '00' && seconds == '01' ) {
                 this.router.navigateByUrl('/institution/mostrar_headquarters');
                 clearInterval(interval); 
                }
         }, 1000);
     },async error => {
       if(error != undefined) {
         const text = await translate(error.error.message, "es");
         this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
       }
     });
 }else{
   this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
 }
}



 private getAlluniversidades() {
   this.universityService.getList().subscribe(
     (AdministrativeFromApi) => {
       this.universitys = AdministrativeFromApi.universitys;
     }, error => console.error(error));
 }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
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

getOneCntAccount(id:number) {
  this.headquarterService.getItem(id).subscribe((cnt_groupFromApi) => {

    if(cnt_groupFromApi.headquarter.id != undefined){
      this.id=cnt_groupFromApi.headquarter.id
      this.form2=cnt_groupFromApi.headquarter
      this.form.controls['id'].setValue(cnt_groupFromApi.headquarter.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.headquarter.name)
      this.form.controls['cordinatorInvestigation'].setValue(cnt_groupFromApi.headquarter.cordinatorInvestigation)
      this.form.controls['UniversityId'].setValue(cnt_groupFromApi.headquarter.UniversityId)
      }

    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}


}
