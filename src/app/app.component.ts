
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
import { MaintenanceService } from './core/services/auth/maintenance.service';
const translate = require('translate');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppTuristica';
  mantenimiento:boolean = false;
  video: string='assets/video/manteni.mp4';
  constructor(
    private primengConfig: PrimeNGConfig,
    private maintenanceService: MaintenanceService,
    private router: Router
   ) {}

  ngOnInit() {
    // console.log(this.router.url)
    this.maintenanceService.getUrl('/').subscribe((cnt_groupFromApi)=>{
      if(cnt_groupFromApi.maintenance != null){
            this.mantenimiento= true
            // console.log('aquii')
        }else{
          this.mantenimiento= false

        }
        // console.log(this.mantenimiento)

        if(this.mantenimiento == true){
          this.router.navigateByUrl('/mantenimiento');
        }
     
    })
    this.primengConfig.ripple = true; 
  }
}

