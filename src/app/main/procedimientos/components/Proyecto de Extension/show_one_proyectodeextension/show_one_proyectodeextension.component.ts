import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_proyectodeextension',
  templateUrl: './show_one_proyectodeextension.component.html',
  styleUrls: ['./show_one_proyectodeextension.component.css']
})
export class Show_one_proyectodeextensionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
