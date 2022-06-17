import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_proyectodeextension',
  templateUrl: './delete_proyectodeextension.component.html',
  styleUrls: ['./delete_proyectodeextension.component.css']
})
export class Delete_proyectodeextensionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
