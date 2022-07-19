import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { FacultyI } from 'src/app/models/institution/faculty';
import { LineProgramI, ProgramI } from 'src/app/models/institution/program';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
import { MessageService } from 'primeng/api';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { Create_CategoryComponent } from '../../CategoriaProgramas/create_Category/create_Category.component';
import { CreateAdministrativeComponent } from 'src/app/main/usuarios/components/Administrativos/create-administrative/create-administrative.component';
import { LineI } from 'src/app/models/projet/line';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss'],
  providers: [DialogService]
})
export class CreateProgramComponent implements OnInit {
  public mostrar:boolean=true;
  public algo:number[]=[0];
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  public administratives: AdministrativeI[]=[]
  public headquarters: HeadquarterI[]=[]
  mostrar2:boolean = true


  public Dialog:boolean =false
   public bandera:boolean=false
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    FacultyId:['', [Validators.required]],
    CategoryId:['', [Validators.required]],
    Headquarters: this.formBuilder.array([this.formBuilder.group(
      {
        ProgramId:0,
        HeadquarterId:['', [Validators.required]],
        AdministrativeId:['']
    })]),
    Lines: this.formBuilder.array([this.formBuilder.group(
      {
        ProgramId:[''],
        LineId:[''],
    })]),
  });
  public lines:LineI[]=[]

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
private CategoryId:number=0
private FacultyId:number=0
public ref1:any;
private Headquarters1:any[] = [];
constructor(
  public dialogService: DialogService,
    private router: Router,
    private messageService:MessageService,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private administrativeService:AdministrativeService,
    private lineService: LineService,
    
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllFaculty();
    this.getAllCategorys()
    this.getAlladministratives()
    this.getAllheadquarters()
    // this.form=this.formBuilder.group({
    //   name:['', [Validators.required]],
    //   FacultyId:['', [Validators.required]],
    //   CategoryId:['', [Validators.required]],
    //   Headquarters: this.formBuilder.array([this.formBuilder.group(
    //     {
    //       ProgramId:0,
    //        HeadquarterId:['', [Validators.required]],
    //       AdministrativeId:['']
    //   })]),
    // });
    this.getAlllines();
    
  }
  private getAlllines(selectId?: number) {
    this.lineService.getList().subscribe(
      (facultiesFromApi) => {
        this.lines = facultiesFromApi.lines;
      }, error => console.error(error));
  }

  private getAllFaculty(selectId?: number) {
    this.facultyService.getList().subscribe(
      (facultiesFromApi) => {
        for (let key of facultiesFromApi.facultys) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.faculties = facultiesFromApi.facultys;
      }, error => console.error(error));
  }
  private getAllCategorys(selectId?: number) {
    this.categoryService.getList().subscribe(
      (facultiesFromApi) => {
        for (let key of facultiesFromApi.categorys) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.categorys = facultiesFromApi.categorys;
      }, error => console.error(error));
  }

  cerrar(){
    this.router.navigateByUrl('/institution/mostrar_programs');
  }
  private volver(){
    this.bandera=false
    this.Headquarters1=[]
    this.CategoryId = 0
    this.FacultyId = 0
    this.ngOnInit()
    this.vaciar()
}
private vaciar(){
  this.form.reset()
  this.getRoles.reset()
  this.getRoles.clear()
  this.form.controls['name'].setValue('')
  let control = <FormArray>this.form.controls['Headquarters']
  control.push(this.formBuilder.group({
    ProgramId:0,
    HeadquarterId:['', [Validators.required]],
  AdministrativeId:['']
  }))
}

  public onSubmit() {
    if(this.CategoryId == 0){
      this.CategoryId =this.form.value.CategoryId.id
    }
    if(this.FacultyId == 0){
      this.FacultyId =this.form.value.FacultyId.id
    }
    let formValue: any = this.form.value;
    formValue.FacultyId=this.FacultyId
    formValue.CategoryId=this.CategoryId

    if(this.Headquarters1.length == 0 ){
      let control = <FormArray>this.form.controls['Headquarters']
      for (const key of control.value) {
        // key.ProgramId=this.id,
        key.HeadquarterId=key.HeadquarterId.id
        if(key.AdministrativeId != ''){
          key.AdministrativeId=key.AdministrativeId?.AdministrativeId
        }else{
          key.AdministrativeId=null
        }
        this.Headquarters1.push({
          ProgramId:0,
        HeadquarterId:key.HeadquarterId,
        AdministrativeId:key.    AdministrativeId,
        })
      }
      this.Headquarters1 = this.form.value.Headquarters 

      formValue.Headquarters = this.form.value.Headquarters
    }else{
      formValue.Headquarters = this.Headquarters1
    }

    let control = <FormArray>this.form.controls['Lines']
    let array:LineProgramI[] =[]
  for (let key of control.value) {
    key.LineId=key.LineId.id
    array.push({LineId:key.LineId,ProgramId:0})
  }
  formValue.array=array

    console.log(formValue,'formValue')
    if(formValue.name != '' &&
    formValue.CategoryId != ( 0 )&&
    formValue.FacultyId != ( 0 )
    ){
      this.bandera=true

    this.programService.createItem(formValue).subscribe(
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
                detail: 'Registro de Programa Creado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/institution/mostrar_programs');
                  clearInterval(interval); 
                 }
          }, 1000);
      },async error => {
        if(error != undefined) {
    this.bandera=false

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
  
public datos(position:number){
  const control = <FormArray>this.form.controls['Headquarters']
  let valor = control.controls[position].get('HeadquarterId')
  if(valor != null){
  this.headquarterService.getItem(valor.value.id).subscribe(
    (AdministrativeFromApi) => {
      if(AdministrativeFromApi.headquarter.Administratives){
      for (let key of AdministrativeFromApi.headquarter.Administratives) {
        if(key.User?.Person?.name && key.User?.Person?.surname){
          key.User.Person.name =  key.User.Person.name.charAt(0).toUpperCase() +  key.User.Person.name.slice(1);
          key.User.Person.surname =  key.User.Person.surname.charAt(0).toUpperCase() +  key.User.Person.surname.slice(1);
        }
       
      }
      this.administratives = AdministrativeFromApi.headquarter.Administratives;
    }
      // console.log(this.administratives)
    }, error => console.error(error));
  }
}

  get getRoles() {
    return this.form.get('Headquarters') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();


    const control = <FormArray>this.form.controls['Headquarters']
      if(control.length == 0 && this.mostrar == false){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['']
        }))
      }
      if(control.length >= 1 && this.mostrar == true){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['']
        }))
      }
      this.mostrar=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Headquarters']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar=false
      control.push(this.formBuilder.group({
        ProgramId:0,
        HeadquarterId:['', [Validators.required]],
      AdministrativeId:['']
      }))
      }
  }

  private getAlladministratives() {
    this.administrativeService.getTipoAdministrative('6').subscribe(
      (AdministrativeFromApi) => {

          for (let decano of AdministrativeFromApi.administrativos) {
            if(!decano.Faculties?.length) {
              this.administratives.push(decano)
          }   
        }
        console.log(this.administratives)
      }, error => console.error(error));
  }

  private getAllheadquarters() {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        for (let key of AdministrativeFromApi.headquarters) {
          key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
        }
        this.headquarters = AdministrativeFromApi.headquarters;
      }, error => console.error(error));
  }
  addCategoria(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(Create_CategoryComponent, {
      width: '50vw',
      // height: '70vw',
      contentStyle:{'padding': '0%'} ,
      closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Categoria Creada', detail: person.name,life: 2000});
      this.getAllCategorys()

        }
  });
  }
  addAdministrativos(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(CreateAdministrativeComponent, {
      width: '60%',
      // height: '70vw',
      contentStyle:{'padding': '10px','overflow-y': 'auto'} ,
      closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
    if (person) {
      this.messageService.add({severity:'info', summary: 'Administrativo Creado', detail: person.name,life: 2000});
      this.administrativeService.getAdministrativesOneTipo(person.administrative.id).subscribe((algo)=>{
        this.administratives.push(algo.administrativos[0])
      })
      

    }
  });
  }


  get getLineas() {
    return this.form.get('Lines') as FormArray;//obtener todos los formularios
  }

  addLineas(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Lines']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ProgramId:[''],
          LineId:[''],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ProgramId:[''],
          LineId:[''],
        }))

      }
      this.mostrar2=true
  }
  removeLineas(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Lines']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      control.push(this.formBuilder.group({
        ProgramId:[''],
        LineId:[''],
      }))
      }
      // console.log(control)
  }
}
