import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { Router } from '@angular/router';

import { FacultyI } from 'src/app/models/institution/faculty';
import { ProgramI } from 'src/app/models/institution/program';
import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';

// TODO: Fix with spaces and move to own file
export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {
  public faculties: FacultyI[]=[];
  public form: FormGroup=this.formBuilder.group({});
  public categorys:CategoryI[] = []

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private facultyService: FacultyService,
    private categoryService:CategoryService,
    private router: Router,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAllFaculty();
    this.getAllcolcienciaCategorys()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(REGEXP_ALPHANUMERIC)]],
      CategoryId: ['', Validators.required],
      FacultyId: ['', Validators.required],
    });
  }

  private getAllFaculty(selectId?: number) {
    this.facultyService.getList().subscribe(
      (facultiesFromApi) => {
        this.faculties = facultiesFromApi.facultys;
        if (selectId !== undefined) {
          this.form.value.FacultyId.setValue(selectId);
        }
      }, error => console.error(error));
  }
  private getAllcolcienciaCategorys(selectId?: number) {
    this.categoryService.getList().subscribe(
      (facultiesFromApi) => {
        this.categorys = facultiesFromApi.categorys;
        if (selectId !== undefined) {
          this.form.value.CategoryId.setValue(selectId);
        }
      }, error => console.error(error));
  }


  public onSubmit(): void {
    const formValue: ProgramI = this.form.value;
    this.programService.createItem(formValue).subscribe(
      () => {
        // this.snackBar.open('Programa creado exitosamente', 'Ok', {
        //   duration: 5000,
        // });
        this.router.navigateByUrl('/institution/mostrar_programs');
      },
      err => {
        // this.snackBar.open('Error. El programa no pudo ser creado', 'Ok', {
        //   duration: 5000,
        // });
        console.error(err);
      }
    );
  }

  get name() { return this.form.get('name'); }

  get CategoryId() { return this.form.get('CategoryId'); }

  get FacultyId() { return this.form.get('FacultyId'); }

}
