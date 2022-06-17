import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_proyectodeextension',
  templateUrl: './show_proyectodeextension.component.html',
  styleUrls: ['./show_proyectodeextension.component.css']
})
export class Show_proyectodeextensionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
