import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_educacioncontinuada',
  templateUrl: './show_one_educacioncontinuada.component.html',
  styleUrls: ['./show_one_educacioncontinuada.component.css']
})
export class Show_one_educacioncontinuadaComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
