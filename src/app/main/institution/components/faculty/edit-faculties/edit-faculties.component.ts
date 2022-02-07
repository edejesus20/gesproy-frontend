import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UniversityI } from 'src/app/models/institution/university';
import { UniversityService } from 'src/app/core/services/institution/university.service';
const translate = require('translate');

@Component({
  selector: 'app-edit-faculties',
  templateUrl: './edit-faculties.component.html',
  styleUrls: ['./edit-faculties.component.css']
})
export class EditFacultiesComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  private id:number=0
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public administratives: AdministrativeI[]=[];
 
public universitys: UniversityI[]=[]

public form:FormGroup=this.formBuilder.group({});

  constructor(
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private router: Router,
    private messageService:MessageService,
    private universityService:UniversityService,
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAlladministrative()
    this.getAlluniversidades()
    this.primengConfig.ripple = true;

    this.form=this.formBuilder.group({
      id: [''],
     name:['', [Validators.required]],
     AdministrativeId:['', [Validators.required]],
     UniversityId:['', [Validators.required]],
    });
  
  }


  public onSubmit() {
      let formValue: FacultyI = this.form.value;
      formValue.AdministrativeId=this.form.value.AdministrativeId.id
      formValue.UniversityId=this.form.value.UniversityId.id
      if(formValue.name != '' && 
      formValue.AdministrativeId != ( 0 ) &&
      formValue.UniversityId != ( 0 )){
    this.facultyService.updateItem(this.id,formValue).subscribe(
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
                detail: 'Registro de Facultad Actualizado con exitoso'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_facultys');
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


  private getAlladministrative(selectId?: number) {
    this.administrativeService.getList().subscribe(
      (AdministrativeFromApi) => {
        // console.log(AdministrativeFromApi.administratives)
        this.administratives = AdministrativeFromApi.administratives;
      }, error => console.error(error));
  }

  private getAlluniversidades(selectId?: number) {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;

      }, error => console.error(error));
  }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    //console.log(event)
  }

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }

  getOneCntAccount(id:number) {
    this.facultyService.getItem(id).subscribe((cnt_groupFromApi) => {
     
      if(cnt_groupFromApi.faculty.UniversityId != undefined && cnt_groupFromApi.faculty.id
        ){
          this.id=cnt_groupFromApi.faculty.id 
          this.form.controls['id'].setValue(cnt_groupFromApi.faculty.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.faculty.name)
      this.form.controls['AdministrativeId'].setValue(cnt_groupFromApi.faculty.AdministrativeId)
      this.administrativeService.getItem(cnt_groupFromApi.faculty.AdministrativeId).subscribe((algo)=>{
        this.form.controls['AdministrativeId'].setValue(algo.administrative)
      })
      this.universityService.getItem(cnt_groupFromApi.faculty.UniversityId).subscribe((algo)=>{
        this.form.controls['UniversityId'].setValue(algo.university)
      })
        
        // this.form.Administrative.User.fullName=cnt_groupFromApi.faculty.Administrative?.User?.fullName
      }

      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }
}
