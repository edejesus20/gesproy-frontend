import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/core/services/dashboard/Notification.service';
import { NotificationI, RecipientI } from 'src/app/models/desk/notifications';

@Component({
  selector: 'app-Anuncios',
  templateUrl: './Anuncios.component.html',
  styleUrls: ['./Anuncios.component.css'],
  providers: [DialogService]
})
export class AnunciosComponent implements OnInit {
  public notifications:RecipientI[]=[]
  public notifications_noleidos:RecipientI[]=[]
  public notifications_leidos:RecipientI[]=[]
  public image:string='assets/images/images.jpg'
  public Notificacion:any
  public Recipient:any
  public mostrarModal:boolean=false
  public UserId:number=0
  constructor(
    private notificationService: NotificationService,
    private messageService:MessageService,
    public ref: DynamicDialogRef,
    
  ) { }

  ngOnInit() {

  var user :string | null= localStorage.getItem('user');

if( user!=null ){
  let userObjeto:any = JSON.parse(user); 
  this.UserId=userObjeto.id
  this.notificationService.getUserNotification(userObjeto.id).subscribe(algo => {

    for (let index = 0; index < algo.recipients.length; index++) {
      if(index < 3){
        const key = algo.recipients[index];
        if(key.status_recipients == 'no leido'){
          this.notifications_noleidos.push(key)
        }
        if(key.status_recipients == 'leido'){
          this.notifications_leidos.push(key)
        }
      }
     
    }
    this.notifications=algo.recipients;
    console.log(this.notifications_noleidos,'notifications_noleidos')
  })
  }
}
  public cancelar(){
    this.ref.close(undefined);
  }
  public OneNOtificaciones(item:RecipientI,event: Event){
    event.preventDefault()
    if(item.id)
    this.Recipient=item
    this.notificationService.getItem(item.NotificationId).subscribe(algo => {
      this.Notificacion=algo.notification
      console.log(this.Notificacion)
      this.mostrarModal=true
    })
  }
  public marcar(item:any,event: Event){
    event.preventDefault()
    if(item.id)
    if(this.UserId !=0){
      let algo={
        status_recipients:'leido',
        UserId:this.UserId
      }
      this.notificationService.marcar(item.id,algo).subscribe(algo => {

            var date = new Date('2020-01-01 00:00:04');
            function padLeft(n:any){ 
              return n ="00".substring(0, "00".length - n.length) + n;
            }
            var interval = setInterval(() => {
            var minutes = padLeft(date.getMinutes() + "");
            var seconds = padLeft(date.getSeconds() + "");
            // console.log(minutes, seconds);
    
            if( seconds == '04') {
          this.messageService.add({severity:'success', summary: 'Anuncio Editado', 
          detail: `Anuncio Marcado`});

              // this.messageService.add({severity:'successs', summary: 'Success',
              // detail: 'Anuncio Marcado',life: 2000});
            }
            date = new Date(date.getTime() - 1000);
            if(minutes == '00' && seconds == '01'){
              // console.log('aqui',seconds);
            // }
            // if( minutes == '00' && seconds == '03' ) {
              this.mostrarModal=true
            this.Recipient=''
            this.ref.close(algo);
              clearInterval(interval); 
            }
        }, 1000)
   
      })
    }
   

  }
}
