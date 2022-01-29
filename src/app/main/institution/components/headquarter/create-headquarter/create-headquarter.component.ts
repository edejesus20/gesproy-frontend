import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { UniversityI } from 'src/app/models/institution/university';
import { REGEXP_ALPHANUMERIC } from '../headquarter-programs/headquarter-programs.component';

@Component({
  selector: 'app-create-headquarter',
  templateUrl: './create-headquarter.component.html',
  styleUrls: ['./create-headquarter.component.scss']
})
export class CreateHeadquarterComponent implements OnInit {
  public universitys: UniversityI[]=[]
  public form: FormGroup=this.formBuilder.group({});
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private headquarterService: HeadquarterService,
    // private snackBar: MatSnackBar,
    private universityService:UniversityService
    ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAlluniversidades()
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(REGEXP_ALPHANUMERIC)]],
      cordinatorInvestigation: ['', Validators.required],
      UniversityId: ['', Validators.required],
    });
  }
  public onSubmit(): void {
    const formValue: HeadquarterI = this.form.value;
    this.headquarterService.createItem(formValue).subscribe(
      () => {
        // this.snackBar.open('Sede creada exitosamente', 'Ok', {
        //   duration: 5000,
        // });
        this.router.navigateByUrl('/institution/mostrar_headquarters');
      },
      err => {
        // this.snackBar.open('Error. El Sede no pudo ser creada', 'Ok', {
        //   duration: 5000,
        // });
        console.error(err);
      }
    );
  }

  get name() { return this.form.get('name'); }

  get cordinatorInvestigation() { return this.form.get('cordinatorInvestigation'); }
  get UniversityId() { return this.form.get('UniversityId'); }

  private getAlluniversidades(selectId?: number) {
    this.universityService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.universitys = AdministrativeFromApi.universitys;
        if (selectId !== undefined) {
          this.form.controls['UniversityId'].setValue(selectId);
        }
      }, error => console.error(error));
  }
}
