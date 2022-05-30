import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/core/services/dashboard/Notification.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { NotificationI } from 'src/app/models/desk/notifications';
const translate = require('translate');
import *as moment from 'moment';

@Component({
  selector: 'app-create_notification',
  templateUrl: './create_notification.component.html',
  styleUrls: ['./create_notification.component.css']
})
export class Create_notificationComponent implements OnInit {

  public form:FormGroup=this.formBuilder.group({
    date_firt: [''],
    date_end: ['', [Validators.required]],
    title: ['', [Validators.required]],
    abstract:['', [Validators.required]],
    description: ['', [Validators.required]],
    UserId: ['', [Validators.required]],
    Users:[''],
    Roles:[''],
    time:['', [Validators.required]]
  })

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrar2:boolean=false;
  public mostrar3:boolean=false;
  public users: any[]=[];
  public roles: any[]=[];
   public Scale:any[] =[]
   public ref1:any;
   algo2:any[]=[0]
   algo3:any[]=[0]
  public mostrarDialogo:boolean=false;
public Roles1:any[] =[]
public Users1:any[] =[]
 
  constructor(
    public dialogService: DialogService,
    private userService:UserService,

    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private notificationService:NotificationService,
    private rolesService:RolesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
    this.getAllScale()
    this.getAllRoles()

    var user :string | null= localStorage.getItem('user');

    if(user!=null ){
  
    let userObjeto:any = JSON.parse(user); 
    this.form.controls['UserId'].setValue(userObjeto.id)
    }

  }
  getAllRoles() {
    this.rolesService.getRole().subscribe((scalesApiFrom) => {
      this.roles =scalesApiFrom.roles
    })
  }
  public cancelar(){
    this.ref.close(undefined);
  }

  getAllScale() {
    
    this.userService.getUser().subscribe((scalesApiFrom) => {
      for (let key of scalesApiFrom.users) {

        if( key.todo == undefined ) {
          key.todo=`${key.fullName} - ${key.Person?.identification}`
          this.users.push(key)
        }
        
      }
      console.log(this.users)
      // this.users =scalesApiFrom.users
    })
  }

  public onSubmit() {
    this.form.controls['date_firt'].setValue(moment().format("YYYY-MM-DD hh:mm:ss"))
    let algo:string=`${this.form.value.date_end} ${this.form.value.time}`
    let date_end = moment(algo).format("YYYY-MM-DD hh:mm:ss"); 

    let formValue: NotificationI = this.form.value;
    formValue.date_end=date_end


    if(this.Roles1.length == 0 || this.Roles1.length == undefined){
      this.Roles1=[]
      for (const key of this.form.value.Roles) {
        this.Roles1.push({
        RoleId:key.id,
        })
      }
      formValue.Roles = this.Roles1
      // console.log('aqui')
    }else{
      formValue.Roles = this.Roles1
    }

    if(this.Users1.length == 0 || this.Users1.length == undefined){
      this.Users1=[]
      for (const key of this.form.value.Users) {
        this.Users1.push({
          UserId:key.id,
        })
      }
      formValue.Users = this.Users1
      // console.log('aqui')
    }else{
      formValue.Users = this.Users1
    }


    
    // if(formValue.Roles && formValue.Roles[0].RoleId == '' || formValue.Roles &&
    // formValue.Roles[0].RoleId == undefined ||this.Roles1.length == undefined){
    //   // this.form.value.Workexperiences=[]
    //   formValue.Roles=[]

    // }
    // if(formValue.Users && formValue.Users[0].UserId == '' || formValue.Users &&
    // formValue.Users[0].UserId == undefined ||this.Users1.length == undefined){
    //   // this.form.value.Workexperiences=[]
    //   formValue.Users=[]

    // }
      console.log(formValue)

    if(
    formValue.date_firt != ( 0 || '' || undefined)&&
    formValue.date_end != ( 0 || '' || undefined)&&
    formValue.title != ( 0 || '' || undefined)&&
    formValue.abstract != ( 0 || '' || undefined)&&
    formValue.description != ( 0 || '' || undefined) &&
    formValue.UserId != ( 0 || '' || undefined) 
    ){
      if((this.form.value.Users.length != undefined && this.form.value.Users.length > 0)
      || (this.form.value.Roles.length != undefined && this.form.value.Roles.length > 0)){

        this.notificationService.createItem(formValue).subscribe(
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
                  detail: 'Anuncio Creado con exito'});
                  }
                  date = new Date(date.getTime() - 1000);
                  if( minutes == '00' && seconds == '01' ) {
                    this.router.navigateByUrl('/dashboard/mostrar_Notification');
                    clearInterval(interval); 
                   }
            }, 1000);
          }
        },async error => {
          if(error != undefined) {
            let text = await translate(error.error.message, "es");
            if(error.error.dataErros){
              text = await translate(error.error.dataErros[0].message, "es");
            }
            this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
          }
        });
      }else{
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan Destinatarios'});

      }
  
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
  }
}
// get getUsers() {
//   return this.form.get('Users') as FormArray;//obtener todos los formularios
// }

//   addUsers(event: Event){
//     event.preventDefault();
//     const control = <FormArray>this.form.controls['Users']
//       if(control.length == 0 && this.mostrar2 == false){
//         control.push(this.formBuilder.group(
//           {   UserId:['']}))
//       }
//       if(control.length >= 1 && this.mostrar2 == true){
//         control.push(this.formBuilder.group(
//           {   UserId:['']}))

//       }
//       this.mostrar2=true
//   }

//   removeUsers(index: number,event: Event){
//     event.preventDefault();
//     let control = <FormArray>this.form.controls['Users']//aceder al control
//     control.removeAt(index)
//       if(control.length <= 0){
//       this.mostrar2=false
//       control.push(this.formBuilder.group({
//            UserId:['']}))
//       }
//   }

// get getRoles() {
//   return this.form.get('Scales') as FormArray;//obtener todos los formularios
// }

//   addRoles(event: Event){
//     event.preventDefault();
//     const control = <FormArray>this.form.controls['Scales']
//       if(control.length == 0 && this.mostrar3 == false){
//         control.push(this.formBuilder.group(
//           {   RoleId:['']}))
//       }
//       if(control.length >= 1 && this.mostrar3 == true){
//         control.push(this.formBuilder.group(
//           {   RoleId:['']}))

//       }
//       this.mostrar3=true
//   }

//   removeRoles(index: number,event: Event){
//     event.preventDefault();
//     let control = <FormArray>this.form.controls['Scales']//aceder al control
//     control.removeAt(index)
//       if(control.length <= 0){
//       this.mostrar3=false
//       control.push(this.formBuilder.group({
//            RoleId:['']}))
//       }
//   }


  // addroles(e:Event){
  //   e.preventDefault()
  
  //   this.ref1 = this.dialogService.open(Create_EscalafonComponent, {
  //     width: '35%',
  //     height: '50%',
  //     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
  //     baseZIndex: 10000,
  //     data: {
  //       id: '1'
  //   },
  // });
  
  // this.ref1.onClose.subscribe((person: any) =>{
  //     if (person) {
  //         this.messageService.add({severity:'info', summary: 'Escalafon Creado', detail: person.name,life: 2000});
  //     this.getAllScale()
  
  //       }
  // });
  // }

}
