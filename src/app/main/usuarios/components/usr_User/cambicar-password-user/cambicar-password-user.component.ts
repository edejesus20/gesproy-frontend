import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';

@Component({
  selector: 'app-cambicar-password-user',
  templateUrl: './cambicar-password-user.component.html',
  styleUrls: ['./cambicar-password-user.component.css']
})
export class CambicarPasswordUserComponent implements OnInit {
  public form:FormGroup=this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
  });
  constructor(
    private router: Router,
    // private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const formValue: CambiarPasswordI = this.form.value;
    this.userService.actualzarContraseña(formValue).subscribe(
      () => {
        // this.snackBar.open('Cambio de Contraseña exitoso', 'Ok', {
        //   duration: 5000,
        // });
        this.router.navigateByUrl('/usuarios/users');
      },
      err => {
        // this.snackBar.open('Error. El Cambio de Contraseña no pudo ser exitoso', 'Ok', {
        //   duration: 5000,
        // });
        console.error(err);
      }
    );
  }

  get oldPassword() { return this.form.get('oldPassword'); }
  get newPassword() { return this.form.get('newPassword'); }

}
