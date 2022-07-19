import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';
import { Create_CategoryComponent } from '../../CategoriaProgramas/create_Category/create_Category.component';
import { CreateAdministrativeComponent } from 'src/app/main/usuarios/components/Administrativos/create-administrative/create-administrative.component';
import { DialogService } from 'primeng/dynamicdialog';

import { FacultyI } from 'src/app/models/institution/faculty';
import { LineProgramI, ProgramI } from 'src/app/models/institution/program';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';
import { MessageService } from 'primeng/api';
import { HeadquarterI, HeadquarterProgramI } from 'src/app/models/institution/headquarter';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
const translate = require('translate');
// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
@Component({
  selector: 'app-edit-programs',
  templateUrl: './edit-programs.component.html',
  styleUrls: ['./edit-programs.component.css'],
  providers: [DialogService]
})
export class EditProgramsComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  public faculties: FacultyI[]=[];
  public categorys:CategoryI[] = []
  public administratives: AdministrativeI[]=[]
  public headquarters: HeadquarterI[]=[]
  public algo:number[]=[0];
  public mostrar2:boolean=false;
  public bandera:boolean=false
  
  public form:FormGroup=this.formBuilder.group({});
  
  selectedFacultyI: FacultyI={
    id:0,
    name:'',
    AdministrativeId: 0,
      University:
      {
        id: 0,
        name: '',
        nit: '',
        addres: '',
       
    }
    
};

selectedCategoryI: CategoryI={
  id:0,
  name:'',
};

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
private CategoryId:number=0
private FacultyId:number=0
public ref1:any;
private Headquarters1:any[] = [];
public lines:LineI[]=[]

constructor(
  public dialogService: DialogService,
    private messageService:MessageService,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private headquarterService: HeadquarterService,
    private administrativeService:AdministrativeService,
    private lineService: LineService,

    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.form=this.formBuilder.group({
      id:[''],
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

    this.getAllFaculty();
    this.getAllCategorys();

    this.getAllheadquarters()
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

  public onSubmit() {
    let formValue: any = this.form.value;
    let control = <FormArray>this.form.controls['Lines']
    let array:LineProgramI[] =[]
  // for (let key of control.value) {
  //   key.LineId=key.LineId.id
  //   array.push({LineId:key.LineId,ProgramId:this.id})
  // }
  // formValue.array=array
  if(control.controls[0].value.LineId!= ""){
    for (let key of control.value) {
      key.LineId=key.LineId.id
      array.push({LineId:key.LineId,ProgramId:this.id})
    }
    formValue.array=array
  }else{
    formValue.array=[]
  }
  
    if(this.CategoryId == 0){
      this.CategoryId =this.form.value.CategoryId.id
    }
    if(this.FacultyId == 0){
      this.FacultyId =this.form.value.FacultyId.id
    }
   
    formValue.FacultyId=this.FacultyId
    formValue.CategoryId=this.CategoryId

    if(this.Headquarters1.length == 0 ){
      let control = <FormArray>this.form.controls['Headquarters']
      for (const key of control.value) {
        key.ProgramId=this.id,
        key.HeadquarterId=key.HeadquarterId.id
        if(key.AdministrativeId != ''){
          key.AdministrativeId=key.AdministrativeId?.AdministrativeId
        }else{
          key.AdministrativeId=null
        }
        // key.AdministrativeId=key.AdministrativeId?.AdministrativeId
        this.Headquarters1.push({
          ProgramId:this.id,
        HeadquarterId:key.HeadquarterId,
        AdministrativeId:key.AdministrativeId,
        })
      }
      this.Headquarters1 = this.form.value.Headquarters 

      formValue.Headquarters = this.form.value.Headquarters
    }else{
      formValue.Headquarters = this.Headquarters1
    }
    console.log(formValue)


    if(formValue.name != '' &&
    formValue.CategoryId != ( 0 )&&
    formValue.FacultyId != ( 0 )
    ){
    
      this.bandera=true
    this.programService.updateItem(this.id,formValue).subscribe(
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
                detail: 'Registro de Programa Actualizado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.ngOnInit()
                  this.volver(new Event(''))
                 this.bandera=false
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

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.id =0
    this.mostrar2=false
    this.administratives=[]
    this.bandera=false

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
      // this.form.controls['FacultyId'].setValue(cnt_groupFromApi.program.FacultyId)
      // this.facultyService.getItem(cnt_groupFromApi.program.FacultyId).subscribe((algo)=>{
      //   this.form.controls['FacultyId'].setValue(algo.faculty)
      // })

      this.programService.OneProgram(id).subscribe((algo)=>{
        // console.log(algo.program)
        if(algo.program != null){
          if(algo.program.LinePrograms != undefined &&
            algo.program.LinePrograms.length > 0){
        
            this.agregarLines(algo.program.LinePrograms)
            
          }
        }
      
      })

      for (const key of this.faculties) {
        if(key.id == cnt_groupFromApi.program.FacultyId){
          this.form.controls['FacultyId'].setValue(key)

        }
     
      } 

      for (const key of this.categorys) {
        if(key.id == cnt_groupFromApi.program.CategoryId){
         this.form.controls['CategoryId'].setValue(key)
        }
      } 
      // this.administrativeService.getItem(cnt_groupFromApi.faculty.AdministrativeId).subscribe((algo)=>{
  
      //   this.administratives.push(algo.administrative)
       
      //   this.form.controls['AdministrativeId'].setValue(algo.administrative)
      // })

    //   this.categoryService.getItem(cnt_groupFromApi.program.CategoryId).subscribe((algo)=>{
    //   this.form.controls['CategoryId'].setValue(algo.category)
    // })
      this.form2=cnt_groupFromApi.program
      }
      this.getAlladministratives()

      if(cnt_groupFromApi.program.HeadquarterPrograms != undefined){
        console.log(cnt_groupFromApi.program.HeadquarterPrograms)
        this.agregarDescuentos(cnt_groupFromApi.program.HeadquarterPrograms)
        
      }
   
    this.displayMaximizable2=true
    this.tabla = false
  }, error => console.error(error));
}
  agregarDescuentos(HeadquarterPrograms: HeadquarterProgramI[]) {
    if(HeadquarterPrograms.length){
    for (let key of HeadquarterPrograms) {
      if(key.Headquarter != undefined) {
        // console.log(DiscountLine)
        
        let control = <FormArray>this.form.controls['Headquarters']
        let  HeadquarterId:any
        for (const key2 of this.headquarters) {
          if(key2.id == key.Headquarter.id ){
           HeadquarterId=key2
          }
        } 
        let AdministrativeId:any=''
        let ProgramId=key.ProgramId
        // this.administratives.push(algo.administrative)
          for (const key2 of this.administratives) {
          if(key2.UserId == key.ChargeAdministrative?.AdministrativeId){
          AdministrativeId=key2
          control.push(this.formBuilder.group({
            ProgramId:[ProgramId, [Validators.required]],
            HeadquarterId:[HeadquarterId, [Validators.required]],
            AdministrativeId:[AdministrativeId],
          }))

            }
          } 
        if(AdministrativeId == '' && key.ChargeAdministrative != undefined && key.ChargeAdministrative != null){
          this.administrativeService.getAdministrativesOneTipo(key.ChargeAdministrative?.AdministrativeId).subscribe((algo)=>{
            this.administratives.push(algo.administrativos[0])
                AdministrativeId=algo.administrativos[0]

            control.push(this.formBuilder.group({
              ProgramId:[ProgramId, [Validators.required]],
              HeadquarterId:[HeadquarterId, [Validators.required]],
              AdministrativeId:[AdministrativeId],
            }))
          })
        }else{
          control.push(this.formBuilder.group({
            ProgramId:[ProgramId, [Validators.required]],
            HeadquarterId:[HeadquarterId, [Validators.required]],
            AdministrativeId:[''],
          }))
        }


   
          // this.headquarterService.getItem(key.HeadquarterProgram.HeadquarterId).subscribe((algo1)=>{
            // if(algo1.headquarter && key.HeadquarterProgram != undefined){
              // this.administrativeService.getItem(key.HeadquarterProgram.AdministrativeId).subscribe((algo)=>{
                // if(algo.administrative && key.HeadquarterProgram != undefined){
                 
                // }
    
              // })
            // }
            
          // })
      }
    }
    this.mostrar2= true
    let control = <FormArray>this.form.controls['Headquarters']
    control.removeAt(0)
  }
  }


  agregarLines(LinePrograms: LineProgramI[]) {
    if(LinePrograms.length){
      console.log(LinePrograms,'  console.log(LinePrograms)')
      let  LineId:any | null = null
    for (let key of LinePrograms) {
      if(key.Line?.id != undefined && key.status == true) {
      
        
        let control = <FormArray>this.form.controls['Lines']
 
        for (let key2 of this.lines) {
          if(key2.id == key.Line?.id){
            LineId=key2
          }
        }
        if(LineId != null){
          // console.log(LineId,'  key2')
          control.push(this.formBuilder.group({
            ProgramId:[this.id],
            LineId:[LineId],
          }))
        }
       

          // this.lineService.getItem(LineId.id).subscribe((algo1)=>{
          //   if(algo1.line.id != undefined){

          //     control.push(this.formBuilder.group({
          //       ProgramId:[this.id, [Validators.required]],
          //       LineId:[algo1.line, [Validators.required]],
          //     }))
          //   }           
          // })
      }
    }
    this.mostrar2= true
    let control = <FormArray>this.form.controls['Lines']
    control.removeAt(0)
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
    }, error => console.error(error));
  }
}

get getLineas() {
  return this.form.get('Lines') as FormArray;//obtener todos los formularios
}

addLineas(event: Event){
  event.preventDefault();
  const control = <FormArray>this.form.controls['Lines']
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({
        ProgramId:[this.id],
        LineId:[''],
      }))
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({
        ProgramId:[this.id],

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
      ProgramId:[this.id],

      LineId:[''],
    }))
    }
    // console.log(control)
}
  get getRoles() {
    return this.form.get('Headquarters') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Headquarters']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['']
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ProgramId:0,
          HeadquarterId:['', [Validators.required]],
        AdministrativeId:['']
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Headquarters']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      control.push(this.formBuilder.group({
        ProgramId:0,
        HeadquarterId:['', [Validators.required]],
      AdministrativeId:['']
      }))
      }
  }

  private getAlladministratives() {
    // this.administratives=[]
    this.administrativeService.getTipoAdministrative('6').subscribe(
      (AdministrativeFromApi) => {

          for (let decano of AdministrativeFromApi.administrativos) {
            if(!decano.Faculties?.length) {
              this.administratives.push(decano)
          }   
        }
        // console.log(this.administratives)
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
      height: '70%',
      // contentStyle:{'padding': '5px','overflow-y': 'auto'} ,
      closable:true, closeOnEscape:true, showHeader:false, 
      modal:true,
      // baseZIndex: 10000,
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

}
