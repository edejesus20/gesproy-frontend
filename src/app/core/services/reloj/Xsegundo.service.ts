import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, Subject, timer } from 'rxjs';
import { NotificationService } from '../dashboard/Notification.service';
const KEY_ANUNCIOS = 'anuncios';
export interface valorReloj {
  hora?: number;
  minutos?: string;
  ampm?: string;
  diadesemana?: string;
  diaymes?: string;
  segundo?: string;
}
@Injectable({
  providedIn: 'root'
})

export class XsegundoService {

  clock: Observable <Date>;
  infofecha$ = new Subject<valorReloj>();
  vr: valorReloj={};
  ampm: string='';
  hours: number=0;
  minute: string='';
  weekday: string='';
  months: string='';
  verificar:any

  constructor(
    private notificationService:NotificationService,
  ) {
    this.clock = timer(0,1000).pipe(map(t => new Date()),shareReplay(1));

   }
   getInfoReloj(): Observable<valorReloj>{
     this.clock.subscribe(t => {
      this.hours = t.getHours() % 12;
      this.hours = this.hours ? this.hours : 12;
       this.vr = {
         hora: this.hours,
         minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
         ampm: t.getHours() > 11 ? 'PM' : 'AM',
         diaymes: t.toLocaleString('es-MX', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
         diadesemana: t.toLocaleString('es-MX', { weekday: 'long' }).replace('.', ''),
         segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()

       }
      //  if(this.vr?.minutos){
        
      //   console.log(this.verificar,'valor')
      //   if(parseInt(this.verificar) == parseInt(this.vr.minutos)){
      //     var user :string | null= localStorage.getItem('user');
      //     if ( user!=null) {
      //       let userObjeto:any = JSON.parse(user); 
      //     this.notificationService.getUserNotification(userObjeto.id).subscribe(algo => {
      //       localStorage.removeItem(KEY_ANUNCIOS);
      //       localStorage.setItem(KEY_ANUNCIOS, JSON.stringify(algo.recipients))
      //     })

      //   //  console.log(this.vr,'aqui---')
      //     }
      //   }
      //     this.verificar=`${parseInt(this.vr.minutos) + 1}`
      //  }
      

    
     
       this.infofecha$.next(this.vr);
       
     });
     return this.infofecha$.asObservable();

   }
}
