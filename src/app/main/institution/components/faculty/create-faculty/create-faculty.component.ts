import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';
import { CreateAdministrativeComponent } from 'src/app/main/usuarios/components/Administrativos/create-administrative/create-administrative.component';
import { DialogService } from 'primeng/dynamicdialog';
const translate = require('translate');
@Component({
  selector: 'app-create-facultie',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss'],
  providers: [DialogService]
})
export class CreateFacultyComponent implements OnInit {

  public administratives: AdministrativeI[]=[];
  public universitys: UniversityI[]=[]

displayMaximizable2:boolean=true
blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 

public form:FormGroup=this.formBuilder.group({
 name:['', [Validators.required]],
 AdministrativeId:['', [Validators.required]],
 UniversityId:['', [Validators.required]],
});
public ref1:any;
constructor(
  public dialogService: DialogService,
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    private universityService:UniversityService,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAlladministrative()
    this.getAlluniversidades()
  
  }

  public onSubmit() {
    let formValue: FacultyI = this.form.value;
    formValue.AdministrativeId=this.form.value.AdministrativeId.AdministrativeId
    formValue.UniversityId=this.form.value.UniversityId.id
    if(formValue.name != '' && 
    formValue.AdministrativeId != ( 0 ) &&
    formValue.UniversityId != ( 0 )){

    this.facultyService.createItem(formValue).subscribe(
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
                detail: 'Registro de Facultad Creado con exito'});
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
        // this.administratives = AdministrativeFromApi.decanos;
      }, error => console.error(error));
  }

  private getAlluniversidades(selectId?: number) {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;

      }, error => console.error(error));
  }

  
  addAdministrative(e:Event){
    e.preventDefault()

    this.ref1 = this.dialogService.open(CreateAdministrativeComponent, {
      // width: '65vw',
      height: '50vw',
      contentStyle:{'padding': '20px'} ,
      closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Ocupación Creada', detail: person.name,life: 2000});
          if (person) {
            console.log(person)

            this.messageService.add({severity:'info', summary: 'Administrativo Creado', detail: person.name,life: 2000});
            this.administrativeService.getAdministrativesOneTipo(person.administrative.id).subscribe((algo)=>{
              this.administratives.push(algo.administrativos[0])
            })
            
  
          }

        }
  });
  }

}
