import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const translate = require('translate');
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
@Component({
  selector: 'app-delete-administrative',
  templateUrl: './delete-administrative.component.html',
  styleUrls: ['./delete-administrative.component.css']
})
export class DeleteAdministrativeComponent implements OnInit {
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
  GenderId:'',
  address:'',
  phone:'',
  email:'',
  HeadquarterId:'',
  ChargeId:'',
 };


  constructor(
    private administrativeService:AdministrativeService,
   
    private formBuilder: FormBuilder,
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
    GenderId:'',
    address:'',
    phone:'',
    email:'',
    HeadquarterId:'',
    ChargeId:''
  }
    }


  getOneCntAccount(id:number) {
    this.administrativeService.getItem(id).subscribe((cnt_groupFromApi) => {
       if(cnt_groupFromApi.administrative.id != undefined
      ){
      // console.log(cnt_groupFromApi.administrative)
        this.form.id=cnt_groupFromApi.administrative.id
        if(cnt_groupFromApi.administrative.User?.Person?.surname != undefined &&
          cnt_groupFromApi.administrative.User?.Person?.address != undefined &&
          cnt_groupFromApi.administrative.User?.Person?.phone != undefined &&
          cnt_groupFromApi.administrative.User?.Person?.DocumentType != undefined &&
          cnt_groupFromApi.administrative.User?.Person?.Gender != undefined &&
          cnt_groupFromApi.administrative.Charge != undefined &&
          cnt_groupFromApi.administrative.Headquarter != undefined
          ){
          this.form.name=cnt_groupFromApi.administrative.User.Person.name
          this.form.surname=cnt_groupFromApi.administrative.User.Person.surname
          this.form.identification=cnt_groupFromApi.administrative.User.Person.identification
          this.form.address=cnt_groupFromApi.administrative.User.Person.address
          this.form.phone=cnt_groupFromApi.administrative.User.Person.phone
          this.form.email=cnt_groupFromApi.administrative.User.email
          this.form.DocumentTypeId=cnt_groupFromApi.administrative.User?.Person?.DocumentType.name
          this.form.GenderId=(cnt_groupFromApi.administrative.User?.Person?.Gender?.name)
          this.form.HeadquarterId=(cnt_groupFromApi.administrative.Headquarter?.name)
          this.form.ChargeId=(cnt_groupFromApi.administrative.Charge?.name)
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
      this.administrativeService.deleteItem(this.form.id).subscribe(
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
                        detail: 'Registro de Administrativo Eliminado con exito'});
                        }
                        date = new Date(date.getTime() - 1000);
                        if( minutes == '00' && seconds == '01' ) {
                          this.router.navigateByUrl('/usuarios/Administrative');
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
