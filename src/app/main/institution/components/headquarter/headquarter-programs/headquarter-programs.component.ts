import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { HeadquarterProgramI } from 'src/app/models/institution/headquarter';

export const REGEXP_ALPHANUMERIC = /^[a-zA-Z0-9\_\- ]*$/;
export interface UserBasicoI {
  id?: number;
  name: string;
  surname: string;
}
export interface ProgramBasicoI {
  id?: number;
  name: string;
}
export interface HeadquarterBasicoI {
  id?: number;
  name: string;
}
@Component({
  selector: 'app-headquarter-programs',
  templateUrl: './headquarter-programs.component.html',
  styleUrls: ['./headquarter-programs.component.scss']
})
export class HeadquarterProgramsComponent implements OnInit {

  
  public listHeadquarters: HeadquarterBasicoI[] = [
    {
      id: 1,
      name: 'Riohacha'
    },
    {
      id: 2,
      name: 'Maicao'
    },
    {
      id: 3,
      name: 'Fonseca'
    }
  ]

  public listPrograms: ProgramBasicoI[] = [
    {
      id: 1,
      name: 'Ing Sistemas'
    },
    {
      id: 2,
      name: 'Ing Industrial'
    },
    {
      id: 3,
      name: 'Cont Publica'
    }
  ]
  public listCoordinatorField: UserBasicoI[] = [
    {
      id: 1,
      name: 'Nicole Carolina',
      surname: 'Quintero'
    },
    {
      id: 2,
      name: 'Freddy',
      surname: 'Martinez'
    },
    {
      id: 3,
      name: 'Luis',
      surname: 'Ortiz'
    }
  ]
  
  public listHeadquarterPrograms: HeadquarterProgramI[] = [
    
  ]
  public form: FormGroup= this.formBuilder.group({});
  public subform: FormGroup=this.subformBuilder.group({});

  location: any;
  constructor(
    private formBuilder: FormBuilder,
    private subformBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buildForm();
    // this.buildSubForm();
    this.subform = this.subformBuilder.group({
      registers: this.subformBuilder.array([]),
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      opcListHeadquarter: ['', [Validators.required, Validators.pattern(REGEXP_ALPHANUMERIC)]],
      opcListProgram: ['', Validators.required],
      opcListProgcoordinatorField: ['', Validators.required],
    });
  }
  
  // buildSubForm() {
  //   this.subform = this.subformBuilder.group({
  //     registers: this.subformBuilder.array([]),
  //   });
  // }

  public navigateBack(): void {
    this.location.back();
  }

  public asignarProgram(event: Event): void {
    event.preventDefault();
   
  }

  public addRegistro(event: Event): void {
    event.preventDefault();

    // const regs = this.subform.controls.registers as FormArray;
    // regs.push(this.subformBuilder.group({
    //   username: '',
    //   password: '',
    // }));
   
  }

}
