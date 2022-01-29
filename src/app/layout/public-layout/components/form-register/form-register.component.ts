import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserI } from 'src/app/models/authorization/usr_User';
import { datos } from '../form-login/form-login.component';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  public form: FormGroup=this.formBuilder.group({});
  public mostrar:boolean =false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    // private snackBar: MatSnackBar,
    private router: Router, 
    // public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data? : datos
  ) { 
  }

  ngOnInit(): void {
    // if(this.data?.dato != undefined){
    //   this.mostrar=true
    // }
    this.buildForm();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      profilePicture: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      documentTypeId: [1]
    });
  }

  onRegister(event: Event): void{
    event.preventDefault();
    if(this.form.value.password ===this.form.value.password2){
      // this.snackBar.open('Error al registrar, revise sus contraseñas !!!', 'OK', {
      //   duration: 5000,
      // });
    }else{
      const formValue: UserI = this.form.value;
        this.authService.register(formValue).subscribe(
          res => {
            // this.snackBar.open('Autenticacion Exitosa !!!', 'OK', {
            //   duration: 5000,
            // });
            this.router.navigateByUrl('/landing');
          },
          err => {
            console.error(err)
          // this.snackBar.open('Error al registrar, revise sus datos !!!', 'OK', {
          //   duration: 5000,
          // });
          // const dialogRef = this.dialog.open(FormRegisterComponent,{
          //   width:'75%',height:'auto',
          //   data:{dato:1}
          // });
      
          // dialogRef.afterClosed().subscribe(result => {
          // });
        }
        )
    }
    

    
  }



  get nameField(){
    return this.form.get('name');
  }

  get surnameField(){
    return this.form.get('surname');
  }

  get birthdateField(){
    return this.form.get('birthdate');
  }

  get phoneNumberField(){
    return this.form.get('phoneNumber');
  }

  get profilePictureField(){
    return this.form.get('profilePicture');
  }

  get identificationField(){
    return this.form.get('identification');
  }

  get emailField(){
    return this.form.get('email');
  }

  get passwordField(){
    return this.form.get('password');
  }

}
