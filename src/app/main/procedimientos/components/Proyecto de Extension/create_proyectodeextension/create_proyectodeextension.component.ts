import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_proyectodeextension',
  templateUrl: './create_proyectodeextension.component.html',
  styleUrls: ['./create_proyectodeextension.component.css']
})
export class Create_proyectodeextensionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
