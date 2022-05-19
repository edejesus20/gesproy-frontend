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
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAdministrativeComponent } from 'src/app/main/usuarios/components/Administrativos/create-administrative/create-administrative.component';

@Component({
  selector: 'app-edit-faculties',
  templateUrl: './edit-faculties.component.html',
  styleUrls: ['./edit-faculties.component.css'],
  providers: [DialogService]
})
export class EditFacultiesComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  private id:number=0
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

  public administratives: AdministrativeI[]=[];
 
public universitys: UniversityI[]=[]

public form:FormGroup=this.formBuilder.group({});
public ref1:any;
constructor(
  public dialogService: DialogService,
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
      formValue.AdministrativeId=this.form.value.AdministrativeId.AdministrativeId
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
                detail: 'Registro de Facultad Actualizado con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.router.navigateByUrl('/institution/mostrar_facultys');
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


  private getAlladministrative(selectId?: number) {
    this.administrativeService.getTipoAdministrative('1').subscribe(
      (AdministrativeFromApi) => {

          for (let decano of AdministrativeFromApi.administrativos) {
            if(!decano.Faculties?.length) {
              this.administratives.push(decano)
          }   
        }
        console.log(this.administratives)
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
    this.administratives=[]

    //console.log(event)
  }

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
    this.ngOnInit()
    this.administratives=[]
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
      // this.form.controls['AdministrativeId'].setValue(cnt_groupFromApi.faculty.AdministrativeId)

      this.getAlladministrative()

      for (const key of this.universitys) {
        if(key.id == cnt_groupFromApi.faculty.UniversityId){
          this.form.controls['UniversityId'].setValue(key)

        }
     
      } 
      let AdministrativeId:any=''
      for (const key of this.administratives) {
        if(key.id == cnt_groupFromApi.faculty.AdministrativeId){

          AdministrativeId=key
          this.form.controls['AdministrativeId'].setValue(AdministrativeId)
        }
      } 
      if(AdministrativeId == ''){
        this.administrativeService.getAdministrativesOneTipo(cnt_groupFromApi.faculty.AdministrativeId).subscribe((algo)=>{
  
          this.administratives.push(algo.administrativos[0])
         
          this.form.controls['AdministrativeId'].setValue(algo.administrativos[0])
        })
      }
    

   
      // this.universityService.getItem(cnt_groupFromApi.faculty.UniversityId).subscribe((algo)=>{
      //   this.form.controls['UniversityId'].setValue(algo.university)
      // })
        
        // this.form.Administrative.User.fullName=cnt_groupFromApi.faculty.Administrative?.User?.fullName
      }

      this.displayMaximizable2=true
      this.tabla = false
    }, error => console.error(error));
  }

  addAdministrative(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(CreateAdministrativeComponent, {
      width: '65vw',
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
      // this.messageService.add({severity:'info', summary: 'Administrativo Creado', detail: person.name,life: 2000});
      this.administrativeService.getAdministrativesOneTipo(person.administrative.id).subscribe((algo)=>{
        
        this.administratives.push(algo.administrativos[0])
      })
      

    }
  });
  }
}
