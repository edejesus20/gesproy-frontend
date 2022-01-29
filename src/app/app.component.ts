import { Component, OnInit,DoCheck } from '@angular/core';
import { createMenu } from './consts/menu';
import { AnonimoService } from './core/services/auth/anonimo.service';
import { AuthService } from './core/services/auth/auth.service';
import { listaMenuI } from './models/menu';
import { forkJoin } from 'rxjs';
import { UserService } from './core/services/usuarios/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from './layout/public-layout/components/form-login/form-login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginResponseI } from './models/authorization/usr_User';
import { FormRegisterComponent } from './layout/public-layout/components/form-register/form-register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public menu: listaMenuI[] = [];
  public algo:listaMenuI[] = [];
  public publicMenu: listaMenuI[] = [];
  public privateMenu: listaMenuI[] = [];
  public profileImageUrl = 'assets/images/usericon.jpg';
  public ImageUrl = 'assets/images/institution/fondeba2.png';
  public nombre:string = '';
  public subcribe:any;
  public token: string | null=null;

  constructor(
    private anonimoService: AnonimoService,
    private authService: AuthService, 
    private userService:UserService,
    private router:Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    var token :string | null= localStorage.getItem('token');
    var user :string | null= localStorage.getItem('user');
    // var menu :string | null= localStorage.getItem('menu');
    if(token!=null && user!=null){
      let userObjeto:any = JSON.parse(user); 
      // let menuObjeto:any = JSON.parse(menu); 
      let userLoginResponse={
        user:userObjeto,
        token:token,
      }
      this.isLoggedIn=true
      this.setLogin(true) 
            this.subcribe=this.authService.getMenu2(userLoginResponse).subscribe((mainSesion)=>{
              
                this.userService.getOneUser(userLoginResponse.user.id).subscribe((user)=>{
                  if(user.user.fullName){
                    this.nombre = user.user.fullName
                  }     
                })
                  this.privateMenu=createMenu(mainSesion.mainSesion) as any;
                  this.menu = this.privateMenu;
                
            })
      }else{
        this.isLoggedIn=false
        forkJoin({
          publicMenu: this.anonimoService.getMenu(),
        }).subscribe(({ publicMenu }) => {
          this.authService.isLoggedIn$.subscribe(isLoggedIn => {
  
            this.isLoggedIn = isLoggedIn;
            if(this.isLoggedIn){  
              this.subcribe=this.authService.userLoginResponse$.subscribe((userLoginResponse)=>{
                if(userLoginResponse.user.id == 0){
              console.log('usuario 0')
  
                }
                else{
                  this.userService.getOneUser(userLoginResponse.user.id).subscribe((user)=>{
                    if(user.user.fullName){
                      this.nombre = user.user.fullName
                    }     
                  })
                  
                  this.authService.getMenu2(userLoginResponse).subscribe((mainSesion)=>{
                    this.privateMenu=createMenu(mainSesion.mainSesion) as any;
                    this.menu = this.privateMenu;
                   }) 
                  
                  
                }
              })
            }else{
              // var token :string | null= localStorage.getItem('token');
              // if(token!=null){
              //   this.router.navigateByUrl('/dashboard')
              // }else{
                console.log('menu-public')
                this.publicMenu = createMenu(publicMenu.mainDefault) as any;
                this.menu = this.publicMenu;
              // }
  
            }
          });
        })
      }

}

  setLogin(value: boolean): void {
    this.authService.setLogin(value);
  }

  openDialogResgister(event: Event){
    event.preventDefault();
    const dialogRef = this.dialog.open(FormRegisterComponent,{
      width:'75%',height:'auto',
      data:{dato:1}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // this.getcarBank();
      // console.log(`Dialog result: ${result}`);
    });

  }
  openDialogLogin(event: Event){
    event.preventDefault();
    const dialogRef = this.dialog.open(FormLoginComponent,{
      width:'75%',height:'auto',
      data:{dato:1}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // this.getcarBank();
      // console.log(`Dialog result: ${result}`);
    });

  }
  cerrarSesion(){
    this.setLogin(false)
    this.snackBar.open('Sesión Cerrada !!!', 'OK', {
      duration: 2000,
    });
    this.authService.logout()
    this.ngOnInit()
    this.router.navigateByUrl('/landing')

  }
  // ngDoCheck() {
  //   this.token = sessionStorage.getItem('token');
  //   console.log(this.token)
  // }

}
