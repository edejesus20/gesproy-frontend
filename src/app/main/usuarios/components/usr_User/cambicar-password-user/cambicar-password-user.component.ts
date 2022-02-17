import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';
const translate = require('translate');
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
  displayMaximizable2:boolean=true

  constructor(
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const formValue: CambiarPasswordI = this.form.value;
    this.userService.actualzarContraseña(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/usuarios/users');
      }
      ,async error => {
        if(error != undefined) {
          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      }
    );
  }

  get oldPassword() { return this.form.get('oldPassword'); }
  get newPassword() { return this.form.get('newPassword'); }

}
