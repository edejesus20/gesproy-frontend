import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';
const translate = require('translate');
@Component({
  selector: 'app-show-one-university',
  templateUrl: './show-one-university.component.html',
  styleUrls: ['./show-one-university.component.css']
})
export class ShowOneUniversityComponent implements OnInit {

  public mostrar:number=3;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  private id:number=0
  constructor(
    private universityService: UniversityService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  getOneCntAccount(id:number) {
    this.universityService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
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
    console.log(id)
    this.getOneCntAccount(id)
  }
}
