
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Component, OnInit,DoCheck } from '@angular/core';
import { createMenu } from './consts/menu';
import { AnonimoService } from './core/services/auth/anonimo.service';
import { AuthService } from './core/services/auth/auth.service';
import { listaMenuI } from './models/menu';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from './core/services/usuarios/user.service';
import { Router } from '@angular/router';
import { UserLoginI } from './models/authorization/usr_User';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { valorReloj, XsegundoService } from './core/services/reloj/Xsegundo.service';
const translate = require('translate');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppTuristica';
  mantenimiento:boolean = false;
  video: string='assets/video/manteni.mp4';
  constructor(
    private primengConfig: PrimeNGConfig,
   ) {}

  ngOnInit() {
    this.primengConfig.ripple = true; 
  }
}

