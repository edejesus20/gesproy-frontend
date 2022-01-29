import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/core/services/Procedimientos/projet.service';
import { ProjetI } from 'src/app/models/projet/projet';
import {Location} from '@angular/common';
import { ProjetTypeService } from 'src/app/core/services/Procedimientos/projetType.service';
import { ProjetTypeI } from 'src/app/models/projet/projet_type';

@Component({
  selector: 'app-create_proyectosdeinvestigacion',
  templateUrl: './create_proyectosdeinvestigacion.component.html',
  styleUrls: ['./create_proyectosdeinvestigacion.component.css']
})
export class Create_proyectosdeinvestigacionComponent implements OnInit {
  public seedbeds: any;
  public projetTypes:ProjetTypeI[]=[]
  public form: FormGroup = this.formBuilder.group({});
  constructor(
    private projetService:ProjetService,
    private projetTypeService:ProjetTypeService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    // private snackBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    this.buildForm();
    this.getAllProjetTypeId()
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      ProjetTypeId: ['', [Validators.required]],
    });
  }  
  
  public onSubmit(): void {
    const formValue: ProjetI = this.form.value;
    this.projetService.createItem(formValue).subscribe(
      (newFaculty) => {

          // this.snackBar.open('Proyecto de Investigacion creado exitosamente', 'Ok', {
          //   duration: 5000,
          // });
          this.router.navigateByUrl('/Procedimientos/mostrar_projets');
        
      }, () => {

          // this.snackBar.open('Error. El Proyecto de Investigacion no pudo ser creado', 'Ok', {
          //   duration: 5000,
          // });
      }
    );
  }
  private getAllProjetTypeId(selectId?: number) {
    this.projetTypeService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.projetTypes = AdministrativeFromApi.projetTypes;
        if (selectId !== undefined) {
          this.form.controls['ProjetTypeId'].setValue(selectId);
        }
      }, error => console.error(error));
  }
  get name() { return this.form.get('name'); }


}
