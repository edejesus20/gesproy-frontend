import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_proyectodeextension',
  templateUrl: './edit_proyectodeextension.component.html',
  styleUrls: ['./edit_proyectodeextension.component.css']
})
export class Edit_proyectodeextensionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }
}
