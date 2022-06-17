import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_ponencias',
  templateUrl: './show_ponencias.component.html',
  styleUrls: ['./show_ponencias.component.css']
})
export class Show_ponenciasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
