import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvestigadorColaboladorService } from 'src/app/core/services/usuer/InvestigadorColabolador.service';
const translate = require('translate');

@Component({
  selector: 'app-delete_InvestigatorCollaborator',
  templateUrl: './delete_InvestigatorCollaborator.component.html',
  styleUrls: ['./delete_InvestigatorCollaborator.component.css']
})
export class Delete_InvestigatorCollaboratorComponent implements OnInit {
  public bandera:boolean=false

  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form={
  id:0,
  name:'',
  surname:'',
  DocumentTypeId:'',
  identification:'',
  // GenderId:'',
  // address:'',
  // phone:'',
  email:'',
 };

  constructor(
    private investigadorColaboladorService:InvestigadorColaboladorService,
    private messageService:MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form={
    id:0,
    name:'',
    surname:'',
    DocumentTypeId:'',
    identification:'',
    // GenderId:'',
    // address:'',
    // phone:'',
    email:'',
  }
    }


  getOneCntAccount(id:number) {
    this.investigadorColaboladorService.getItem(id).subscribe((cnt_groupFromApi) => {
       if(cnt_groupFromApi.investigatorCollaborator.id != undefined
      ){
      // console.log(cnt_groupFromApi.investigatorCollaborator)
        this.form.id=cnt_groupFromApi.investigatorCollaborator.id
        if(cnt_groupFromApi.investigatorCollaborator.User?.Person?.surname != undefined &&
          // cnt_groupFromApi.investigatorCollaborator.User?.Person?.address != undefined &&
          // cnt_groupFromApi.investigatorCollaborator.User?.Person?.phone != undefined &&
          cnt_groupFromApi.investigatorCollaborator.User?.Person?.DocumentType != undefined
          // cnt_groupFromApi.investigatorCollaborator.User?.Person?.Gender != undefined
          ){
          this.form.name=cnt_groupFromApi.investigatorCollaborator.User.Person.name
          this.form.surname=cnt_groupFromApi.investigatorCollaborator.User.Person.surname
          this.form.identification=cnt_groupFromApi.investigatorCollaborator.User.Person.identification
          // this.form.address=cnt_groupFromApi.investigatorCollaborator.User.Person.address
          // this.form.phone=cnt_groupFromApi.investigatorCollaborator.User.Person.phone
          this.form.email=cnt_groupFromApi.investigatorCollaborator.User.email
          this.form.DocumentTypeId=cnt_groupFromApi.investigatorCollaborator.User?.Person?.DocumentType.name
          // this.form.GenderId=(cnt_groupFromApi.investigatorCollaborator.User?.Person?.Gender?.name)
          }
      }
      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }

  public volver(event: Event){
    event.preventDefault
    this.tabla = true
    this.displayMaximizable2 = false
    this.bandera=false

    //console.log(event)
  }

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }


  public onSubmit(e: Event) {
    e.preventDefault()
    this.bandera=true

      this.investigadorColaboladorService.deleteItem(this.form.id).subscribe(
              () => {
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
                        detail: 'Investigador Colabolador Eliminado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.ngOnInit()
                          this.volver(new Event(''))
                         this.bandera=false
                          // this.router.navigateByUrl('/usuarios/InvestigatorCollaborator');
                          clearInterval(interval); 
                        }
                  }, 1000);
              },async error => {
                if(error != undefined) {
                  let text = await translate(error.error.message, "es");
                  if(error.error.dataErros){
                    text = await translate(error.error.dataErros[0].message, "es");
                  }
                  this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
                }
              });
          }

}
