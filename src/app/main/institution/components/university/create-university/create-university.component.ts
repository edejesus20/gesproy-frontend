import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';
import { REGEXP_ALPHANUMERIC } from '../../program/create-program/create-program.component';

@Component({
  selector: 'app-create-university',
  templateUrl: './create-university.component.html',
  styleUrls: ['./create-university.component.css']
})
export class CreateUniversityComponent implements OnInit {
  public form: FormGroup=this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private router: Router,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,]], //Validators.pattern(REGEXP_ALPHANUMERIC)]],
      nit: ['', Validators.required],
      addres: ['', Validators.required],
    });
  }
  public onSubmit(): void {
    const formValue: UniversityI = this.form.value;
    this.universityService.createItem(formValue).subscribe(
      () => {
        this.snackBar.open('Universidad creado exitosamente', 'Ok', {
          duration: 5000,
        });
        this.router.navigateByUrl('/institution/mostrar_universitys');
      },
      err => {
        this.snackBar.open('Error. El Universidad no pudo ser creado', 'Ok', {
          duration: 5000,
        });
        console.error(err);
      }
    );
  }

  get name() { return this.form.get('name'); }
  get nit() { return this.form.get('nit'); }
  get addres() { return this.form.get('addres'); }
}
