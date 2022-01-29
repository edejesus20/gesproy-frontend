import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { REGEXP_ALPHANUMERIC } from 'src/app/main/institution/components/program/create-program/create-program.component';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { InstitutionI } from 'src/app/models/desk/institution';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { FacultyI } from 'src/app/models/institution/faculty';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';

@Component({
  selector: 'app-create-facultie',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss']
})
export class CreateFacultyComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group({});
  @Input() isEmbedded = false;
  public administratives: AdministrativeI[]=[];
  public universitys: UniversityI[]=[];
  
  constructor(
    private universityService: UniversityService,
    private administrativeService: AdministrativeService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,

    private router: Router,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAlladministrative()
    this.getAlluniversidades()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      AdministrativeId: ['', [Validators.required]],
      UniversityId:['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    const formValue: FacultyI = this.form.value;
    this.facultyService.createItem(formValue).subscribe(
      (newFaculty) => {

          // this.snackBar.open('Facultad creada exitosamente', 'Ok', {
          //   duration: 5000,
          // });
          this.router.navigateByUrl('/institution/mostrar_facultys');
        
      }, () => {

          // this.snackBar.open('Error. La facultad no pudo ser creada', 'Ok', {
          //   duration: 5000,
          // });
      }
    );
  }

  private getAlladministrative(selectId?: number) {
    this.administrativeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.administratives = AdministrativeFromApi.administratives;
        console.log(this.administratives)
        if (selectId !== undefined) {
          this.form.controls['AdministrativeId'].setValue(selectId);
        }
      }, error => console.error(error));
  }

  private getAlluniversidades(selectId?: number) {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;
        if (selectId !== undefined) {
          this.form.controls['UniversityId'].setValue(selectId);
        }
      }, error => console.error(error));
  }

  get name() { return this.form.get('name'); }

  get AdministrativeId() { return this.form.get('AdministrativeId'); }
  get UniversityId() { return this.form.get('UniversityId'); }

}
