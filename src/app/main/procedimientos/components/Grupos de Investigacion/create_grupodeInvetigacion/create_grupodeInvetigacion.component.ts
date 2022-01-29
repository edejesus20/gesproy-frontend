import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { GroupI } from 'src/app/models/institution/group';
import {Location} from '@angular/common';
@Component({
  selector: 'app-create_grupodeInvetigacion',
  templateUrl: './create_grupodeInvetigacion.component.html',
  styleUrls: ['./create_grupodeInvetigacion.component.css']
})
export class Create_grupodeInvetigacionComponent implements OnInit {
  public seedbeds: any;
  public form: FormGroup = this.formBuilder.group({});
  constructor(
    private groupService:GroupService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      // AdministrativeId: ['', [Validators.required]],
    });
  }  
  
  public onSubmit(): void {
    const formValue: GroupI = this.form.value;
    this.groupService.createItem(formValue).subscribe(
      (newFaculty) => {

          this.snackBar.open('Facultad creada exitosamente', 'Ok', {
            duration: 5000,
          });
          this.router.navigateByUrl('/Procedimientos/mostrar_seedbeds');
        
      }, () => {

          this.snackBar.open('Error. La facultad no pudo ser creada', 'Ok', {
            duration: 5000,
          });
      }
    );
  }

  get name() { return this.form.get('name'); }


}
