
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
interface menu{
    label:string,
    data?:string
    expandedIcon: string,
    collapsedIcon:string,
    children?:any[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppTuristica';
  display=false
  items: MenuItem[]=[];
  items2: MenuItem[]=[];

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
  public displayMaximizable:boolean =true
  public mostrar:boolean =false;
  public username: string | undefined=undefined
  public  password: string | undefined=undefined

  public files1:menu[]=[]
  datos$: Observable<valorReloj>=this.segundo.getInfoReloj();
  hora?: number=0;
  minutos?: string='';
  dia?: string='';
  fecha?: string='';
  ampm?: string='';
  segundos?: string='';


  public images: any[]=[
    
    {
        "imagen": "assets/images/fondo2.jpg",
        "thumbnailImageSrc": "assets/images/fondo2.jpg",
        "alt": "Description for Image 5",
        "title": "Title 5"
    },
    {
      "imagen": "assets/images/bloque2.jpg",
      "thumbnailImageSrc": "assets/images/bloque2.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
  },
     {
      "imagen": "assets/images/bloque.jpg",
      "thumbnailImageSrc": "assets/images/bloque.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
  },
    
];

public responsiveOptions:any[] = [
   {
       breakpoint: '1024px',
       numVisible: 5
   },
   {
       breakpoint: '768px',
       numVisible: 3
   },
   {
       breakpoint: '560px',
       numVisible: 1
   }
];






  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private anonimoService: AnonimoService,
    private authService: AuthService, 
    private userService:UserService,
    private router:Router,
    private segundo: XsegundoService) {}

  ngOnInit() {
        this.datos$=this.segundo.getInfoReloj();
        this.datos$.subscribe(x => {
          this.hora = x.hora;
          this.minutos = x.minutos;
          this.dia = x.diadesemana;
          this.fecha = x.diaymes;
          this.ampm = x.ampm;
          this.segundos = x.segundo
        });
        this.files1=
            [
                {
                    "label": "Pictures",
                    "data": "Pictures Folder",
                    "expandedIcon": "pi pi-folder-open",
                    "collapsedIcon": "pi pi-folder",
                    "children": [
                        {"label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo"},
                        {"label": "logo.jpg", "icon": "pi pi-image", "data": "PrimeFaces Logo"},
                        {"label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo"}]
                },

        ]
        var token :string | null= localStorage.getItem('token');
        var user :string | null= localStorage.getItem('user');
        // var menu :string | null= localStorage.getItem('menu');
      if(token!=null && user!=null){
          this.showSuccess()
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
                    if(user.user.User?.fullName){
                      this.nombre = user.user.User?.fullName
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
              //   console.log('usuario 0')
    
                  }
                  else{
                    this.userService.getOneUser(userLoginResponse.user.id).subscribe((user)=>{
                      if(user.user.User?.fullName){
                        this.nombre = user.user.User?.fullName
                      }     
                    })
                    
                    this.authService.getMenu2(userLoginResponse).subscribe((mainSesion)=>{
                    this.confirm()
                      this.privateMenu=createMenu(mainSesion.mainSesion) as any;
                      this.menu = this.privateMenu;
                    }) 
                    
                    
                  }
                })
                console.log(this.nombre)
                this.messageService.add({severity:'success', summary: 'Success',
                detail: `Bienvenido ${this.nombre}`});
          
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


      this.primengConfig.ripple = true;
      this.items2 = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      this.items = [
        {label: 'Update', icon: 'pi pi-refresh', command: () => {
            this.update();
        }},
        { label: 'Delete', icon: 'pi pi-times', command: () => {this.delete();}},
        { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
        {separator: true},
        {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
      ];
    
  }

  

  ocultarMenu(boolean: boolean){
    this.display=boolean
  }
  update() {
      this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }

  delete() {
      this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
  }

  setLogin(value: boolean): void {
    this.authService.setLogin(value);
  }

  openDialogResgister(event: Event){
    event.preventDefault();


  }
  public confirm() {
    this.showSuccess()
    this.displayMaximizable=false
}
showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Ingreso exitoso'});
}
save(id:string){

}

  openDialogLogin(event: Event){
    event.preventDefault();
    this.displayMaximizable=true
  }
  cerrarSesion(){
    this.setLogin(false)
    this.authService.logout()
    this.ngOnInit()
    this.router.navigateByUrl('/landing')

  }
  // ngDoCheck() {
  //   this.token = sessionStorage.getItem('token');
  //   console.log(this.token)
  // }

  onSubmit(f:NgForm) {
      if(f.form.value.username != "" && f.form.value.password != ""){
        const formValue: UserLoginI = {
            username:f.form.value.username,
            password:f.form.value.password
        };
        this.authService.login(formValue).subscribe(
            () => {
               
              // this.snackBar.open('Autenticacion Exitosa !!!', 'OK', {
              //   duration: 5000,
              // });
              // if(this.data?.dato == undefined){
                this.router.navigateByUrl('/landing');
               
              // }
             
            }
            ,async error => {
              if(error != undefined) {
                const text = await translate(error.error.message, "es");
                this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
              }
            });
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
      }
    
    
  }

}

