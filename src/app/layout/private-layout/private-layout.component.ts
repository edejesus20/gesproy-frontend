
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Component, OnInit,DoCheck } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { valorReloj, XsegundoService } from 'src/app/core/services/reloj/Xsegundo.service';
import { listaMenuI } from 'src/app/models/menu';
import { AnonimoService } from 'src/app/core/services/auth/anonimo.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { createMenu } from 'src/app/consts/menu';
import { UserLoginResponseI } from 'src/app/models/authorization/usr_User';
import { DialogService } from 'primeng/dynamicdialog';
import { CambicarPasswordUserComponent } from 'src/app/main/usuarios/components/usr_User/cambicar-password-user/cambicar-password-user.component';
import { AvatarComponent } from './avatar/avatar.component';
const translate = require('translate');
interface menu{
  label:string,
  data?:string
  expandedIcon: string,
  collapsedIcon:string,
  children?:any[]
}
@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  providers: [DialogService]
})
export class PrivateLayoutComponent implements OnInit {
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
  public ref1:any;
  public image3:string='assets/avatares/avatars-avataaars.png'
  public image2:string='assets/images/logoGrupoSem2.png'
  public Dialog:boolean =false

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private anonimoService: AnonimoService,
    private authService: AuthService, 
    private userService:UserService,
    private router:Router,
    private segundo: XsegundoService,
    public dialogService: DialogService,

  ) { 

  }

  ngOnInit  () {
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

    this.verificar()


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
    { label: 'Avatar', icon: 'pi pi-user ', command: () => {
      this.modalAvatar(new Event(''));
  }},
    { label: 'Cambiar Clave', icon: 'pi pi-refresh', command: () => {this.modalCambiarClave(new Event(''))}},
    {label: 'Cerrar Sesion', icon: 'pi pi-power-off', command: () => {
      this.showConfirm();
  }},
    {separator: true},
    {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];

}
  modalAvatar(e:Event) {
  e.preventDefault()
    
    this.ref1 = this.dialogService.open(AvatarComponent, {
      width: '60%',
      // height: '55%',
      contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:false, closeOnEscape:false,
       showHeader:false, 
      // baseZIndex: 10000,
      data: {
        id: '1'
    },
  });
  this.ref1.onClose.subscribe((person: any) =>{
    if (person) {
        this.messageService.add({severity:'warn', summary: 'Avatar Cambiado', detail: person.name,life: 2000});
      this.ngOnInit()
this.router.navigateByUrl('/login')

      }
});
}

modalCambiarClave(e:Event){
  e.preventDefault()
  
  this.ref1 = this.dialogService.open(CambicarPasswordUserComponent, {
    width: '35%',
    // height: '55%',
    contentStyle:{'overflow-y': 'auto','padding':'20px'} ,closable:false, closeOnEscape:false,
     showHeader:false, 
    // baseZIndex: 10000,
    data: {
      id: '1'
  },
});

this.ref1.onClose.subscribe((person: any) =>{
    if (person) {
        this.messageService.add({severity:'warn', summary: 'Contraseña Cambiada', detail: person.name,life: 2000});
      this.ngOnInit()
      }
});
}

ocultarMenu(boolean: boolean){
this.display=boolean
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
this.router.navigateByUrl('/login')
}

showConfirm() {
  this.Dialog = true;
  
}

hideDialog() {
  this.Dialog = false;
}

 public verificar(){
  var token :string | null= localStorage.getItem('token');
  var user :string | null= localStorage.getItem('user');
  var menu :string | null= localStorage.getItem('menu');

if(token!=null && user!=null && menu != null){
    this.showSuccess()
  let userObjeto:any = JSON.parse(user); 
  let menuObjeto:any = JSON.parse(menu);
// console.log(menuObjeto)
  this.privateMenu=createMenu(menuObjeto.mainSesion) as any;
  this.menu = this.privateMenu;
  this.userService.getOneUser(userObjeto.id).subscribe((user)=>{
  if(user.user.User?.fullName && user.user.User?.avatar != undefined){
    this.nombre = user.user.User?.fullName
    this.image3=user.user.User?.avatar

  }     
})
  this.isLoggedIn=true
  this.setLogin(true) 
  }else{
    this.isLoggedIn=false
    this.setLogin(false) 
    this.menu = [];
    // console.log(this.isLoggedIn,'aqui')
    this.router.navigateByUrl('/login');
  }
}
}
