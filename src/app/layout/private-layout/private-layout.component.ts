
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Component, OnInit,DoCheck } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { PerfilComponent } from './perfil/perfil.component';
import { NotificationService } from 'src/app/core/services/dashboard/Notification.service';
import { RecipientI } from 'src/app/models/desk/notifications';
import { AnunciosComponent } from './Anuncios/Anuncios.component';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';
import { environment } from 'src/environments/environment';
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
    private API_URI:string=environment.API_URI
  public isLoggedIn = false;
  public menu1: listaMenuI[] = [];
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
  public recipients:RecipientI[]=[]
  public notifications:RecipientI[]=[]
  public notifications_noleidos:RecipientI[]=[]
  private UserId:number=0
  public mensaje:boolean=false
 public mostrarDialogoClave:boolean=false
// cambiarr colave
 public form:FormGroup=this.formBuilder.group({
  id:[''],
  oldPassword: ['', [Validators.required]],
  newPassword: ['', [Validators.required]],
});
public motrar:boolean = false
public mostrarAvatarClave:boolean=false
// cambiar avatar
public form2:FormGroup=this.formBuilder.group({
  id:['', [Validators.required]],
  UserId:['', [Validators.required]],
  avatar: [''],
  // avatarImagen: [''],
});
public imagenNueva:any | null= null
public imagenAdjuntada:any | null= null
public responsiveOptions:any[] = [
  {
      breakpoint: '1068px',
      numVisible: 1
  },
 
];
public images: any[]=[
  {"src": "assets/avatares/avataaars-1.png",},
  {"src": "assets/avatares/avataaars-2.png",},
  {"src": "assets/avatares/avataaars-example.png",},
  {"src": "assets/avatares/avataaars.png",},
  {"src": "assets/avatares/180808avatar04.png",},
  {"src": "assets/avatares/50445980-88299a80-0912-11e9-962a-6fd92fd18027.png",},
  {"src": "assets/avatares/avataaars-e28093-koolinus-1-12mar2019.png",},
  {"src": "assets/avatares/avataaars-Frances.png",},
  {"src": "assets/avatares/avatars-avataaars.png",},
  {"src": "assets/avatares/CleanShot-2020-12-06-at-06.57.14.png",},
  {"src": "assets/avatares/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png",},
  {"src": "assets/avatares/DPFz5pjWsAA9bjE.png",},
  {"src": "assets/avatares/images (2).png",},
  {"src": "assets/avatares/images (1).png",},
  {"src": "assets/avatares/images.png",},
  {"src": "assets/avatares/infiltrado.jpg",},
];
public adjuntar:boolean=false
public adjuntarM:boolean=false
uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private notificationService: NotificationService,
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private userService: UserService,
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
      this.mostrarAvatarClave=true
  }},
    { label: 'Cambiar Clave', icon: 'pi pi-refresh', command: () => {this.mostrarDialogoClave=true}},
    {label: 'Cerrar Sesion', icon: 'pi pi-power-off', command: () => {
      this.showConfirm();
  }},
    {separator: true},
    {label: 'Perfil', icon: 'pi pi-cog',  command: () => {
      
      this.modalPerfil(new Event(''))
    }}
  ];

}
  modalPerfil(e: Event) {
    e.preventDefault()
  
    this.ref1 = this.dialogService.open(PerfilComponent, {
      width: '90%',
      // height: '55%',
      contentStyle:{'padding':'20px'} ,closable:false, closeOnEscape:false,
       showHeader:false, 
      // baseZIndex: 10000,
      data: {
        id: '1'
    },
  });
  
  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'successs', summary: 'Perfil Editado', detail: person.name,life: 2000});
        this.ngOnInit()
        }
  });
  }
  modalAvatar(e:Event) {
  e.preventDefault()
    
    this.ref1 = this.dialogService.open(AvatarComponent, {
      width: '60%',
      // height: '55%',
      contentStyle:{'padding':'20px'} ,closable:false, closeOnEscape:false,
       showHeader:false, 
      // baseZIndex: 10000,
      data: {
        id: '1'
    },
  });
  this.ref1.onClose.subscribe((person: any) =>{
    if (person) {
     
     this.messageService.add({severity:'success', summary: 'Success', 
    detail: 'Cambio realizado con exito',life: 2000});
        this.ngOnInit()
        this.router.navigateByUrl('/landing')
        console.log('aqui')
    }
});
}


// cambiar clave
public onSubmit(): void {
  const formValue: CambiarPasswordI = this.form.value;
  this.motrar=true
  this.userService.actualzarContraseña(formValue).subscribe(
    (algo) => {
        

            var date = new Date('2020-01-01 00:00:04');
            function padLeft(n:any){ 
              return n ="00".substring(0, "00".length - n.length) + n;
            }
            var interval = setInterval(() => {
            var minutes = padLeft(date.getMinutes() + "");
            var seconds = padLeft(date.getSeconds() + "");
            // console.log(minutes, seconds);
    
            if( seconds == '03') {
              this.messageService.add({severity:'success', summary: 'Success', 
              detail: 'Contraseña Cambiada con exito'});
            }
            date = new Date(date.getTime() - 1000);
            if(minutes == '00' && seconds == '01'){
              // console.log('aqui',seconds);
            // }
            // if( minutes == '00' && seconds == '03' ) {
              this.mostrarDialogoClave=false
              this.motrar=false
              this.ngOnInit()
              this.cerrarSesion()
          // this.router.navigateByUrl('/login');

              clearInterval(interval); 
            }
      }, 1000)
  }
    ,async error => {
      if(error != undefined) {
        this.motrar=false
        let text = await translate(error.error.message, "es");
        if(error.error.dataErros){
          text = await translate(error.error.dataErros[0].message, "es");
        }
        this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
      }
    }
  );
}
// cambiar avatar

adjuntarCancelar(a:any){
  console.log(a)
  this.imagenNueva=null
  this.uploadedFiles=[]
  a.files=[]
  a.clear()
  this.adjuntar= false
  this.adjuntarM= false
}
onFileChange(event:any,a:any) {
  event.preventDefault();
  // console.log(control.value[pointIndex].resolution_convalidation)
  // console.log(this.imagenAdjuntada)
  // if(this.imagenNueva == null){
    // console.log('uploadedFiles',this.uploadedFiles)
    // console.log('aquii a',a)
    let file1=a.files[0];

    // console.log('aquii file1',file1)
    // console.log('aquii',this.fileUpload)
  
    // let file=event.target.files[0];
      this.imagenNueva=file1
  //   for(let file of event.target.files) {
  //     this.imagenNueva=file
  //     // this.uploadedFiles.push(file);
  // }

    // if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
    //   let file=event.target.files[0];
    //   this.imagenNueva=file
      this.form2.controls['avatar'].setValue(undefined)
    //   }
  console.log(this.imagenNueva)

    // }
  }
  
public onSubmit2(): void {
  let formValue: any = this.form2.value;
  if(this.imagenNueva != null || formValue.avatar !='' && formValue.avatar != undefined){

    if(this.imagenNueva != null && formValue.UserId != undefined && 
      formValue.avatar == undefined){
      if(this.imagenNueva != null){
        // this.motrar=true
        this.adjuntarM=true
        this.userService.createImagen(formValue.UserId,this.imagenNueva).subscribe(
          (algo) => {
         console.log('cambio')
           
            var date = new Date('2020-01-01 00:00:04');
                function padLeft(n:any){ 
                  return n ="00".substring(0, "00".length - n.length) + n;
                }
                var interval = setInterval(() => {
                var minutes = padLeft(date.getMinutes() + "");
                var seconds = padLeft(date.getSeconds() + "");
                // console.log(minutes, seconds);
        
                if( seconds == '04') {
                  this.messageService.add({severity:'success', summary: 'Cambio de Imagen con exito', 
                  detail: 'Refrescar pagina para ver cambios'});
                }
                date = new Date(date.getTime() - 1000);
                if(minutes == '00' && seconds == '01'){
                  this.mostrarAvatarClave=false
                  this.motrar=false
                  this.adjuntarM=false

                  this.verificar()
                  this.ngOnInit()
                  this.router.navigateByUrl('/login');
    
                  clearInterval(interval); 
                }
          }, 1000)
        }
          ,async error => {
            this.motrar=false
             this.adjuntarM=false

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
      
    }else if(formValue.avatar !='' && formValue.avatar != undefined && formValue.id != undefined
    && this.imagenNueva == null){
      this.motrar=true
      this.userService.actualzarAvatar(formValue).subscribe(
       
        (algo) => {
         console.log('cambio')
          var date = new Date('2020-01-01 00:00:04');
              function padLeft(n:any){ 
                return n ="00".substring(0, "00".length - n.length) + n;
              }
              var interval = setInterval(() => {
              var minutes = padLeft(date.getMinutes() + "");
              var seconds = padLeft(date.getSeconds() + "");
              // console.log(minutes, seconds);
      
              if( seconds == '04') {
                this.messageService.add({severity:'success', summary: 'Cambio de Imagen con exito', 
                detail: 'Refrescar pagina para ver cambios'});
              }
              date = new Date(date.getTime() - 1000);
              if(minutes == '00' && seconds == '01'){
                this.mostrarAvatarClave=false
                this.motrar=false
                this.verificar()
                this.ngOnInit()
                this.router.navigateByUrl('/login');
  
                clearInterval(interval); 
              }
        }, 1000)
      }
        ,async error => {
          this.motrar=false
          if(error != undefined) {
            let text = await translate(error.error.message, "es");
            if(error.error.dataErros){
              text = await translate(error.error.dataErros[0].message, "es");
            }
            this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
          }
        }
      );
    
    }else{
      if(this.imagenNueva != null && formValue.avatar !='' && formValue.avatar != undefined){
    this.messageService.add({severity:'warnning', summary: 'Alerta', detail: `Solo Puedes Adjuntar Imagen o seleccionar Avatar, no ambas`});

      }else{
        this.messageService.add({severity:'warnning', summary: 'Alerta', detail: `Faltan Datos`});

      }

    }

  }else{
    this.messageService.add({severity:'warnning', summary: 'Alerta', detail: `Faltan Datos`});
  }
 

}
public seleccionar(src:string,e:Event){
  e.preventDefault()

  if(this.form2.value.avatar == src){
    this.form2.controls['avatar'].setValue(undefined)
    // this.form2.controls['avatarImagen'].setValue(undefined)
    this.imagenNueva=null
    this.imagenAdjuntada=null
  }else{
    this.form2.controls['avatar'].setValue(src)
    // this.form2.controls['avatarImagen'].setValue(undefined)
    this.imagenNueva=null
    this.imagenAdjuntada=null


  }

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

private notificaciones(id:number){

  this.notificationService.getUserNotification(id).subscribe(algo => {
    this.notifications=algo.recipients;
    this.notifications_noleidos=[]
    this.recipients=[]
    for (let index = 0; index < algo.recipients.length; index++) {
      if(index < 3){
        const key = algo.recipients[index];
        if(key.status_recipients == 'no leido'){
          this.notifications_noleidos.push(key)
        }

        this.recipients.push(key)
      }
     
    }
  
    // console.log(this.recipients)
  })
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
  this.menu1 = this.privateMenu;
  this.UserId=userObjeto.id
this.notificaciones(this.UserId)

  this.userService.getOneUser(userObjeto.id).subscribe((data)=>{
    this.form2.controls['id'].setValue(data.user.id)
    this.form2.controls['UserId'].setValue(data.user.id)
  if(data.user.fullName && data.user.avatar != undefined){
    this.nombre = data.user.fullName
    var str = data.user.avatar;
    var n = str.search("assets");
    // console.log(n)
    if(n == -1){
      console.log(this.API_URI+data.user.avatar)
      this.image3=this.API_URI+data.user.avatar
    }else{
      this.image3=data.user.avatar
    }
    
    // this.form2.controls['avatar'].setValue(this.image3)

  }     
})
  this.isLoggedIn=true
  this.setLogin(true) 
  }else{
    this.isLoggedIn=false
    this.setLogin(false) 
    this.menu1 = [];
    // console.log(this.isLoggedIn,'aqui')
    this.router.navigateByUrl('/login');
  }
}

  mostrarNOtificaciones(event: Event){
    event.preventDefault()
    this.ref1 = this.dialogService.open(AnunciosComponent, {
      width: '80%',
      // height: '55%',
      contentStyle:{'padding':'20px'} ,closable:false, closeOnEscape:false,
      showHeader:false, 
      // baseZIndex: 10000,
      data: {
        id: '1'
    },
  });

  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
        this.notificaciones(this.UserId)
          // this.messageService.add({severity:'successs', summary: 'Perfil Editado', detail: person.name,life: 2000});
        this.ngOnInit()
        }
  });

  }

  // modalCambiarClave(e:Event){
    // e.preventDefault()
  //   this.ref1 = this.dialogService.open(CambicarPasswordUserComponent, {
  //     width: '35%',
  //     // height: '55%',
  //     contentStyle:{'padding':'10px'} ,closable:false, closeOnEscape:false,
  //      showHeader:false, 
  //     // baseZIndex: 10000,
  //     data: {
  //       id: '1'
  //   },
  // });
  
  // this.ref1.onClose.subscribe((person: any) =>{
  //     if (person) {
  //         this.messageService.add({severity:'warn', summary: 'Contraseña Cambiada', detail: person.name,life: 2000});
  //       this.ngOnInit()
  //       }
  // });
  // }
}
