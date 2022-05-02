import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/usuarios/user.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class LandingComponent implements OnInit {
  // public image:string='assets/images/institution/fondeba1.jpg'
  // public image2:string='assets/images/institution/alcaldia.png'
  public image3:string='assets/avatars-avataaars.png'
  public bandera:boolean=false
  public nombre:string = '';


  constructor(
    private userService:UserService,

    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    var token :string | null= localStorage.getItem('token');
    var user :string | null= localStorage.getItem('user');
    // var menu :string | null= localStorage.getItem('menu');
    if(token!=null && user!=null){
        this.showSuccess()
        this.bandera=true
        let userObjeto:any = JSON.parse(user); 
      // console.log(menuObjeto)
        this.userService.getOneUser(userObjeto.id).subscribe((user)=>{
        if(user.user.User?.fullName && user.user.Gender?.name){
          this.nombre = user.user.User?.fullName
          let sexo=user.user.Gender?.name
          if(sexo == 'masculino'){
            this.image3='assets/avatares/avatars-avataaars.png'
          }else if(sexo == 'femenino'){
            this.image3='assets/avatares/avataaars-example.png'
          }else{
            this.image3='assets/avatares/infiltrado.jpg'

          }
        }     
      })
      }else{
        this.bandera=false
      }
  //   var token :string | null= localStorage.getItem('token');
  //   var user :string | null= localStorage.getItem('user');
  //  console.log(user)

  //   if(token!=null && user !=null){
  //     let userObjeto:any = JSON.parse(user); 
  //     console.log(userObjeto)
  //     this.messageService.add({severity:'success', summary: 'Success',
  //      detail: 'Bienvenido '+userObjeto?.username+''});
  //     }else{
  //       this.messageService.add({severity:'success', summary: 'Success', detail: 'Bienvenido '});

  //     }
  }

 public showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Ingreso exitoso'});
}
}
