import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserLoginI } from 'src/app/models/authorization/usr_User';
export interface datos{
  dato?:number;  
}
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  public mostrar:boolean =false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
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
  }

  onSubmit() {
    const formValue: UserLoginI = this.loginForm.value;
    this.authService.login(formValue).subscribe(
      () => {
        // this.snackBar.open('Autenticacion Exitosa !!!', 'OK', {
        //   duration: 5000,
        // });
        // if(this.data?.dato == undefined){
          this.router.navigateByUrl('/landing');
        // }
       
      },
      err => {
        // this.snackBar.open('Error al iniciar, revise sus datos !!!', 'OK', {
        //   duration: 5000,
        // });
        // const dialogRef = this.dialog.open(FormLoginComponent,{
        //   width:'75%',height:'auto',
        //   data:{dato:1}
        // });
    
        // dialogRef.afterClosed().subscribe(result => {
        // });
      }
    );
  }

}
