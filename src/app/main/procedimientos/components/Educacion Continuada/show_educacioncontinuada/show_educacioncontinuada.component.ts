import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_educacioncontinuada',
  templateUrl: './show_educacioncontinuada.component.html',
  styleUrls: ['./show_educacioncontinuada.component.css']
})
export class Show_educacioncontinuadaComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
