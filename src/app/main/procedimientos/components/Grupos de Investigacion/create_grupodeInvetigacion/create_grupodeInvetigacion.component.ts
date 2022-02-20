import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { GroupI } from 'src/app/models/institution/group';
import { LineI } from 'src/app/models/projet/line';
import { TeacherI } from 'src/app/models/user/teacher';
@Component({
  selector: 'app-create_grupodeInvetigacion',
  templateUrl: './create_grupodeInvetigacion.component.html',
  styleUrls: ['./create_grupodeInvetigacion.component.css']
})
export class Create_grupodeInvetigacionComponent implements OnInit {
  public seedbeds: any;
  public mostrar:boolean=false;
  public mostrar2:boolean=false;
  public algo:number[]=[0];
  public algo2:number[]=[0];

  public FacultadHeadquarterProgram:any[]=[]
  public teachers: TeacherI[] =[]
  public lines: any[] =[]
  public Seedbeds:any[]=[]
  public facultys: FacultyI[] =[]
  public mostrarFacultad:boolean=false;
  public mostrarLienas:boolean=false;

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 

  public form: FormGroup = this.formBuilder.group({});
  constructor(
    private groupService:GroupService,
    private formBuilder: FormBuilder,
    private router: Router,
    private headquarterService:HeadquarterService,
    private teacherService:TeacherService,
    private lineService:LineService,
    private facultyService: FacultyService,
    ) { }
  ngOnInit(): void {
    this.buildForm();
    this.getTeachers();
    this.getLines();
    this.geFacultad();
  }
 public SelectFacultad(){
    if(this.form.value.Facultad != ''){
      this.getFacultadHeadquarterProgram(this.form.value.Facultad.id)
      this.mostrarFacultad=true
    }
  }

  public SelectTeacher(){
    if(this.form.value.TecaherId != ''){
      this.getLineTeacherId(this.form.value.TecaherId.id)
      this.mostrarLienas=true
    }
  }
  getLineTeacherId(id: any) {
      this.teacherService.getItem(id).subscribe(teacher=>{
        console.log(teacher.teacher)
        if(teacher.teacher.Seedbeds && teacher.teacher.Lines){
          this.Seedbeds=teacher.teacher.Seedbeds
          this.lines=teacher.teacher.Lines
        }
    }, error => console.error(error))
  }
  geFacultad() {
    this.facultyService.getList().subscribe(teachersA => {
      this.facultys=teachersA.facultys
    }, error => console.error(error))
  }
  getLines() {
    this.lineService.getList().subscribe(teachersA => {
      this.lines=teachersA.lines
    }, error => console.error(error))
  }
  getTeachers() {
    this.teacherService.getList().subscribe(teachersA => {
      this.teachers=teachersA.teachers
    }, error => console.error(error))
  }

  getFacultadHeadquarterProgram(id:number) {
    this.headquarterService.getFacultadHeadquarterProgramId(id).subscribe((rolesFromApi) => {
      this.FacultadHeadquarterProgram = rolesFromApi.FacultadHeadquarterProgram;
      console.log(this.FacultadHeadquarterProgram)
    }, error => console.error(error));
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      HeadquarterProgramId: ['', [Validators.required]],
      TecaherId:['', [Validators.required]],
      Tecahers: this.formBuilder.array([this.formBuilder.group({TecaherId:['', [Validators.required]]})]),
      ObjetivoGeneral: ['', [Validators.required]],
      ObjetivosEspecificos: ['', [Validators.required]],
      Mision: ['', [Validators.required]],
      Vision: ['', [Validators.required]],
      Perfil: ['', [Validators.required]],
      Metas: ['', [Validators.required]],
      Resultados: ['', [Validators.required]],
      Facultad: ['', [Validators.required]],
      // Lines: this.formBuilder.array([this.formBuilder.group({LineId:['', [Validators.required]]})]),
      Sector: ['', [Validators.required]],
      // Seedbeds: this.formBuilder.array([this.formBuilder.group({SeedbedId:['', [Validators.required]]})]),
      Anexos: this.formBuilder.array([this.formBuilder.group({Anexos:['', [Validators.required]]})]),
    });
  }  
  
  public onSubmit(e: Event): void {
    e.preventDefault();
    const formValue: GroupI = this.form.value;
    this.groupService.createItem(formValue).subscribe(
      (newFaculty) => {

          // this.snackBar.open('Facultad creada exitosamente', 'Ok', {
          //   duration: 5000,
          // });
          this.router.navigateByUrl('/Procedimientos/mostrar_seedbeds');
        
      }, () => {

          // this.snackBar.open('Error. La facultad no pudo ser creada', 'Ok', {
          //   duration: 5000,
          // });
      }
    );
  }


  get getTecahers() {
    return this.form.get('Tecahers') as FormArray;//obtener todos los formularios
  }

  addTecahers(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Tecahers']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar == false){
      control.push(this.formBuilder.group({TecaherId:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar == true){
      control.push(this.formBuilder.group({TecaherId:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar=true
  }
  removeTecahers(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Tecahers']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar=false
    }
  }


  get getAnexos() {
    return this.form.get('Anexos') as FormArray;//obtener todos los formularios
  }

  addAnexos(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Anexos']
    //console.log(control)      
      //crear los controles del array
    if(control.length == 0 && this.mostrar2 == false){
      control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input

    }
      this.mostrar2=true
  }
  removeAnexos(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Anexos']//aceder al control
    control.removeAt(index)
    if(control.length <= 0){
     this.mostrar2=false
    }
  }
}
