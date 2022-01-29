import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class LandingComponent implements OnInit {
  // public image:string='assets/images/institution/fondeba1.jpg'
  // public image2:string='assets/images/institution/alcaldia.png'
  // public image3:string='assets/images/fondoBienvenido.jpg'

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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

}
