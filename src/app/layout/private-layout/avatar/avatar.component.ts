import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';
const translate = require('translate');
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  public form:FormGroup=this.formBuilder.group({
    id:['', [Validators.required]],
    avatar: ['', [Validators.required]],
  });
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

  displayMaximizable2:boolean=true
  public mostrarDialogo:boolean=false;
  public image3:string=''
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  var user :string | null= localStorage.getItem('user');
  if(user!=null ){
  let userObjeto:any = JSON.parse(user); 
  this.userService.getOneUser(userObjeto.id).subscribe((user)=>{
    if(user.user.User?.fullName && user.user.User?.avatar != undefined){
      this.image3=user.user.User?.avatar
    this.form.controls['id'].setValue(user.user.User.id)
    }     
  })
  }
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
  }
  public cancelar(){
    this.ref.close(undefined);
  }
public seleccionar(src:string,e:Event){
  e.preventDefault()

  if(this.form.value.avatar == src){
    this.form.controls['avatar'].setValue(undefined)
  }else{
    this.form.controls['avatar'].setValue(src)
  }

}
  public onSubmit(): void {
    let formValue: any = this.form.value;
    if(formValue.avatar !='' && formValue.avatar != undefined && formValue.id != undefined){
      this.userService.actualzarAvatar(formValue).subscribe(
        (algo) => {
          if(this.mostrarDialogo== true){
            this.ref.close(algo);
          }else{
            var date = new Date('2020-01-01 00:00:03');
                  function padLeft(n:any){ 
                     return n ="00".substring(0, "00".length - n.length) + n;
                  }
                  var interval = setInterval(() => {
                  var minutes = padLeft(date.getMinutes() + "");
                  var seconds = padLeft(date.getSeconds() + "");
                  // console.log(minutes, seconds);
                  if( seconds == '03') {
                  this.messageService.add({severity:'success', summary: 'Success', 
                  detail: 'Avatar Cambiado con exito'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.router.navigateByUrl('/landing');
                    clearInterval(interval); 
                   }
                  })
                }
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
    
 
  }else{
    this.messageService.add({severity:'warnning', summary: 'Alerta', detail: `Faltan Datos`});

  }
  }
}
